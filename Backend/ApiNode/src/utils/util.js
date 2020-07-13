const isEmpty = value => {
  return (
    (typeof value === 'string' && !value.trim()) ||
    typeof value === 'undefined' ||
    value === null
  )
}

export { isEmpty }
