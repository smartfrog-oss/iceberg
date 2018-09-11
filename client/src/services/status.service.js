export function extractData (items = []) {
  return items.map(data => {
    let { status } = data
    status = status.toString() === 'true' ? 'matches' : 'not matching'
    const details = {}
    Object.entries(data.details).forEach(([breakpoint, status]) => {
      details[breakpoint] = status.match ? 'matches' : 'not matching'
    })
    return { ...data, status, details }
  })
}
