---
title: "Feb 9, 2023 — New arrayBuffer method and notes improvements"
slug: "new-arraybuffer-method-and-notes-improvements"
type: ""
createdAt: "Thu Feb 09 2023 18:15:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
The Request Object now includes the [`arrayBuffer()`](doc:request-object#arraybuffer) method. It returns a promise that resolves to an arrayBuffer containing the bytes of the request.

You can now add a note when using the [EdgeWorkers Management API](ref:api) to activate, deactivate, and roll back an EdgeWorker version.