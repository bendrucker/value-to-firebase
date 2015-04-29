'use strict'

import extend from 'xtend'

export default function valueToFirebase (value) {
  if (typeof value === 'undefined') {
    throw new Error('Firebase cannot accept undefined values')
  }
  if (typeof value === 'function') {
    throw new Error(`Firebase cannot accept function values: ${value.toString()}`)
  }
  if (value instanceof Date || value instanceof RegExp) {
    return null
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) value = extend({}, value)
    return Object.keys(value).length ? value : null
  }
  return value
}
