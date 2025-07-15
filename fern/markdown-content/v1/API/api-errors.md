---
title: "Errors"
slug: "api-errors"
excerpt: ""
hidden: false
createdAt: "Fri May 14 2021 19:04:49 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 06 2023 20:56:18 GMT+0000 (Coordinated Universal Time)"
---
This section details the API's response object format and range of HTTP error responses. If an error occurs, this API responds with JSON objects that provide information you can use to debug the problem.

```json
{
    "type": "/edgeworkers/error-types/edgeworkers-invalid-argument",
    "title": "Invalid Argument.",
    "detail": "Invalid tarball provided",
    "instance": "/devpops-api/error-instances/1fb2b105-e976-4e28-ba26-fa649a0d86ff",
    "status": 400
}
```

For details on information contained in the error responses, refer to [Error response syntax](https://techdocs.akamai.com/developer/docs/error-responses).

> 📘 EdgeWorker bundle errors
> 
> For information on error-handling in your JavaScript-based EdgeWorker bundles, see [Error codes](doc:error-codes).
