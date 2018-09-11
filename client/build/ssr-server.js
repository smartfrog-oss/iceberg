'use strict'
var config = require('../config')
var path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  template, // (optional) page template
  clientManifest // (optional) client build manifest
})

// inside a server handler...
// server.get('*', (req, res) => {
//   const context = { url: req.url }
//   // No need to pass an app here because it is auto-created by
//   // executing the bundle. Now our server is decoupled from our Vue app!
//   renderer.renderToString(context, (err, html) => {
//     // handle error...
//     res.end(html)
//   })
// })


exports.register = function(server, options, next) {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  }

  var compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    // host: 4000,
    // port: 'localhost',
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: false
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
  })

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
      hotMiddleware.publish({
        action: 'reload'
      })
      cb()
    })
  })

  server.ext('onRequest', (request, reply) => {
    devMiddleware(request.raw.req, request.raw.res, (err) => {
      if (err) {
        return reply(err);
      }
      return reply.continue();
    });
  })

  server.ext('onRequest', (request, reply) => {
    hotMiddleware(request.raw.req, request.raw.res, (err) => {
      if (err) {
        return reply(err);
      }
      return reply.continue();
    });
  });

  server.ext('onPreResponse', (request, reply) => {
    // This assumes you are using the html-webpack-plugin
    // If you are serving a static html file just reply with that file directly
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (fileReadErr, result) => {
      if (fileReadErr) {
        return reply(fileReadErr);
      }
      reply(result).type('text/html');
    });
  });

  next()
}

exports.register.attributes = {
  name: 'app'
}
