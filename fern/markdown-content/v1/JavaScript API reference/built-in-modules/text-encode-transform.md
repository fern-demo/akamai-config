---
title: "text-encode-transform"
slug: "text-encode-transform"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 12:17:23 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 08 2022 00:44:42 GMT+0000 (Coordinated Universal Time)"
---
The text-encode-transform built-in module is available to use in your EdgeWorkers code bundles. It exports implementations of TextEncoderStream and TextDecoderStream, as described in the  <a href="https://encoding.spec.whatwg.org/" target="_blank">WhatWG encoding specification</a>.

```javascript
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
import { TextEncoderStream, TextDecoderStream } from 'text-encode-transform';
export function responseProvider (request) {
  return httpRequest(`${request.scheme}://${request.host}${request.url}`).then(response => {
    return createResponse(
      response.status,
      response.headers,
      response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new TextEncoderStream())
    );
  });
}
```
