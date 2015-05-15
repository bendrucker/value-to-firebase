'use strict'

import test from 'tape'
import toFirebase from '../'

test((t) => {
  function when (value) {
    return function () {
      return toFirebase(value)
    }
  }

  t.throws(when(undefined), /cannot accept undefined/)
  t.throws(when(function () {}), /cannot accept function/)

  t.equal(toFirebase(new Date()), null)
  t.equal(toFirebase(/Firebase/), null)
  t.equal(toFirebase(null), null)

  t.deepEqual(toFirebase([0, 1]), {'0': 0, '1': 1})
  t.notOk(Array.isArray(toFirebase([0, 1])))

  t.equal(toFirebase([]), null)
  t.equal(toFirebase({}), null)
  t.deepEqual(toFirebase({foo: 'bar'}), {foo: 'bar'})
  t.throws(when({'foo/': 'bar'}))
  t.throws(when({'': 'bar'}))

  t.equal(typeof toFirebase({
    '.sv': 'timestamp'
  }), 'number')

  t.end()
})
