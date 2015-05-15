# value-to-firebase [![Build Status](https://travis-ci.org/bendrucker/value-to-firebase.svg?branch=master)](https://travis-ci.org/bendrucker/value-to-firebase)
Convert a JS value into its Firebase representation

## Installing

```sh
$ npm install value-to-firebase
```

## API

##### `valueToFirebase(value)` -> `Any`

`valueToFirebase` converts common JavaScript values to their Firebase representations:

* `undefined` is illegal and triggers an exception
* `Function` is illegal and triggers an exception
* `Date` and `RegExp` are `null`
* `Array` becomes a plain object with numeric keys
* `Object` is:
  * `null` if empty (including an empty `Array`)
  * Parsed as a `ServerValue` by [firebase-server-value](https://github.com/bendrucker/firebase-server-value) where applicable
  * Invalid and triggers an exception if any key is [invalid](https://github.com/bendrucker/firebase-validate-key)
  * Returned as-is otherwise

Other values (e.g. `String` and `Number`) are returned as-is. 

Objects are *not* recursively transformed—only top level keys are evaluated. If you want to recursively transform an object using `valueToFirebase`, use [object-to-firebase](https://github.com/bendrucker/object-to-firebase). 

The copy of firebase-server-value in use is exported as `sv`. 
