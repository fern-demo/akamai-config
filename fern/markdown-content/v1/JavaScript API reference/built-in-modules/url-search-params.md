---
title: "url-search-params"
slug: "url-search-params"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 13:25:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Jun 26 2021 23:30:25 GMT+0000 (Coordinated Universal Time)"
---
Use this module in your EdgeWorker code bundles to assist in query string parsing. The `URLSearchParams()` constructor creates and returns a new [URLSearchParams object](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams).

```javascript
import URLSearchParams from 'url-search-params';  
export function onClientRequest(request) {
  var params = new URLSearchParams(request.query);
  if (params.get('key1')) {
    request.respondWith(200, {}, '');
  } else {
    request.respondWith(418, {}, '');
  }
}
```
