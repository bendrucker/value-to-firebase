'use strict'

var test = require('tape')
var valueToFirebase = require('./')

test(function (t) {
  function when (value) {
    return function () {
      return valueToFirebase(value)
    }
  }

  t.throws(when(undefined), /cannot accept undefined/)
  t.throws(when(function () {}), /cannot accept function/)

  t.equal(valueToFirebase(new Date()), null)
  t.equal(valueToFirebase(/Firebase/), null)
  t.equal(valueToFirebase(null), null)

  t.deepEqual(valueToFirebase([0, 1]), {'0': 0, '1': 1})
  t.notOk(Array.isArray(valueToFirebase([0, 1])))

  t.equal(valueToFirebase([]), null)
  t.equal(valueToFirebase({}), null)
  t.deepEqual(valueToFirebase({foo: 'bar'}), {foo: 'bar'})
  t.throws(when({'foo/': 'bar'}))
  t.throws(when({'': 'bar'}))

  t.equal(typeof valueToFirebase({
    '.sv': 'timestamp'
  }), 'number')

  t.end()
})
