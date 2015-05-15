'use strict'

import validateKey from 'firebase-validate-key'
import extend from 'xtend'
import find from 'babel-runtime/core-js/array/find'
import * as serverValue from 'firebase-server-value'

export default function valueToFirebase (value) {
  if (typeof value === 'undefined') {
    throw new Error('Firebase cannot accept undefined values')
  }
  if (typeof value === 'function') {
    throw new Error(`Firebase cannot accept function values: ${value.toString()}`)
  }
  if (value instanceof Date || value instanceof RegExp || value === null) {
    return null
  }
  if (typeof value === 'object') {
    if (serverValue.is(value)) return serverValue.parse(value)
    if (Array.isArray(value)) {
      if (!value.length) return null
      value = extend({}, value)
    }
    const keys = Object.keys(value)
    if (!keys.length) return null
    keys.forEach(validateKey)
  }
  return value
}

valueToFirebase.sv = sv
