# json-where

> :mag: Transparent query, pointer and path descriptors for JSON

---

`json-where` converges the following standards and libraries in order to help normalize JSON query/addressing descriptors:

 - JsonPath
   * Specification: http://goessner.net/articles/JsonPath/
   * Library: https://www.npmjs.com/package/jsonpath
 - JsonPointer
   * Specification: http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-08
   * Library: https://www.npmjs.com/package/jsonpointer
 - JsonQuery
   * Library: https://www.npmjs.com/package/json-query

The goal is to increase developer transparency and to provide a unified interface for matching related JSON data.

`json-where`'s simple interface spares developers from having to:

  1. decide between which query/addressing specifications(s) to support in their projects
  2. write an interface for when more than one standard needs support
  3. bottleneck integrators of their library into a certain specificaton
  4. write a mechanism that provides a consistent return format (e.g. array vs. element)

## Installation

`npm install json-where`

## Usage

### Implicit

This example shows how to use the main feature of `json-where`, which is being able to provide any query or reference string to `$`, an "operator" which will automatically imply the correct specification to use based on the reference itself:

```javascript
import $ from 'json-where'

const data = {
  foo: {
    bar: 'baz'
  }
}

let query   = $('foo.bar').use(data).get()   // 'baz'
let path    = $('$.foo.bar').use(data).get() // 'baz'
let pointer = $('/foo/bar').use(data).get()  // 'baz'
```

If you want to be slightly more concise:

```javascript
let query   = $('foo[bar]', data).get()  // 'baz'
let path    = $('$.foo.bar', data).get() // 'baz'
let pointer = $('/foo/bar', data).get()  // 'baz'
```

### Explicit

You may also, of course, access and use each specification individually:

```javascript
import {query, path, pointer} from 'json-where'

query('foo[bar]', data).get()   // 'baz'
path('$.foo.bar', data).get()   // 'baz'
pointer('/foo/bar', data).get() // 'baz'
```

### Collections

You can easily specify whether or not you should expect a single object or a collection:

```javascript
$('foo[bar]', data).one() // 'baz'
$('foo[bar]', data).all() // ['baz']
```

A couple of common utility methods are also defined for working with collections:

```javascript
$('foo[bar]', data).count() // 1
$('foo[bar]', data).any()   // true
$('bar[baz]', data).any()   // false
```

### Identification

You can also infer the specification directly from the relation itself via `which`:

```javascript
which('foo[bar]')  // 'json-query'
which('$.foo.bar') // 'json-path'
which('/foo/bar')  // 'json-pointer'
```

### Update

Currently only `json-pointer` supports updating values in a query-like fasion:

```javascript
const path = pointer('/foo/bar', data)

path.get()      // 'bar'
path.set('zab') // ...
path.get()      // 'zab'
```