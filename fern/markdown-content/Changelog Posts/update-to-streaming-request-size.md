---
title: "June 16, 2023 — Update to streaming request size"
slug: "update-to-streaming-request-size"
type: ""
createdAt: "Fri Jun 16 2023 18:25:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
We've increased the maximum streaming request size back to its original value of 1 MB when `request.body` is called in the `responseProvider` event handler.