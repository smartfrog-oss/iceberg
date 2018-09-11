const vars = {
  NODE_ENV: 'dev',
  PORT: 4000,
  HOST: '0.0.0.0',
  NO_UI: '',
  NO_API: ''
}

const SPACES_BETWEEN = 11

Object.keys(vars)
.map(k => {
  process.env[k] = process.env[k] || vars[k]
  const spaces = ' '.repeat(Math.max(0, SPACES_BETWEEN - k.length))
  return `  >>> ${k} ${spaces} ${process.env[k]}`
})
.map(i => console.log(i))
