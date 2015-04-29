'use strict'

import extend from 'xtend'
import find from 'babel-runtime/core-js/array/find'

const illegal = ['.', '$', '#', '[', ']', '/']

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
    if (Array.isArray(value)) {
      if (!value.length) return null
      value = extend({}, value)
    }
    const keys = Object.keys(value)
    if (!keys.length) return null
    const invalidKey = findInvalidKey(keys)
    if (invalidKey != null) {
      throw new Error(`Firebase cannot accept key "${invalidKey}" in ${JSON.stringify(value)}`)
    }
  }
  return value
}

function findInvalidKey (keys) {
  return find(keys, (key) => {
    return !key || illegal.some(character => ~key.indexOf(character))
  })
}
