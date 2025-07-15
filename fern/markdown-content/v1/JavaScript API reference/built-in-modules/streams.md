---
title: "streams"
slug: "streams"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 12:16:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 08 2022 00:45:35 GMT+0000 (Coordinated Universal Time)"
---
The streams built-in module is available to use in your EdgeWorkers code bundles. It exports implementations of ByteLengthQueuingStrategy, CountQueuingStrategy, ReadableStream, TransformStream, and WritableStream, as described in the [WhatWG stream specification](https://streams.spec.whatwg.org/).

```javascript
import { createResponse } from 'create-response';
import { httpRequest } from 'http-request';
import { ReadableStream, WritableStream } from 'streams';
import { TextEncoderStream, TextDecoderStream } from 'text-encode-transform';
class UppercaseStream {
  constructor () {
    let readController = null;
    this.readable = new ReadableStream({
      start (controller) {
        readController = controller;
      }
    });
    this.writable = new WritableStream({
      write (text) {
        readController.enqueue(text.toUpperCase());
      },
      close (controller) {
        readController.close();
      }
    });
  }
}
export async function responseProvider (request) {
  const response = await httpRequest('http://example.com/javascripts/jquery-3.3.1.min.js');
  return createResponse(
    response.status,
    {},
    response.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new UppercaseStream())
      .pipeThrough(new TextEncoderStream())
  );
}
```
