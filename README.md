# json-rel

> :link: Transparent references in JSON

---

`json-rel` converges the following standards and libraries in order to help normalize JSON reference/relationship descriptors:

 - JsonPath
   * Specification: http://goessner.net/articles/JsonPath/
   * Library: https://www.npmjs.com/package/jsonpath
 - JsonPointer
   * Specification: http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-08
   * Library: https://www.npmjs.com/package/jsonpointer
 - JsonQuery
   * Library: https://www.npmjs.com/package/json-query

The goal is to increase developer transparency and to provide a unified, semantic interface for working with related JSON data.

Aside from being all around simple, `json-rel` spares library developers from having to:

  1. decide between which reference specifications(s) to support in your projects
  2. write an interface for when more than one standard needs support
  3. bottleneck integrators of your library into a certain specificaton
  4. write a mechanism that provides a consistent return format (e.g. array vs. element)

## Installation

`npm install json-rel`

## Usage

This example shows how to use the main feature of `json-rel`, which is being able to provide any relationship or reference string to `$`, an "operator" which will automatically identify the correct specification to use based on the relation itself:

```javascript
import $ from 'json-rel'

const data = {
  foo: {
    bar: true
  }
}

let query   = $('foo.bar').use(data).get()   // true
let path    = $('$.foo.bar').use(data).get() // true
let pointer = $('/foo/bar').use(data).get()  // true
```

If you want to be slightly more concise:

```javascript
let query   = $('foo[bar]', data).get()  // true
let path    = $('$.foo.bar', data).get() // true
let pointer = $('/foo/bar', data).get()  // true
```

You may also, of course, access and use each specification individually:

```javascript
import query from 'json-rel'
import path from 'json-rel'
import pointer from 'json-rel'

let query1   = query('foo[bar]', data).get()   // true
let path2    = path('$.foo.bar', data).get()   // true
let pointer2 = pointer('/foo/bar', data).get() // true
```

You can also infer the specification directly from the relation itself via `which`:

```javascript
import which from 'json-rel'

which('foo[bar]')  // -> json-query
which('$.foo.bar') // -> json-path
which('/foo/bar')  // -> json-pointer
```