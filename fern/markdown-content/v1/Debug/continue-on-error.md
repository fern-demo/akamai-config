---
title: "Continue on error"
slug: "continue-on-error"
excerpt: ""
hidden: true
createdAt: "Thu Jan 16 2025 18:36:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 16 2025 18:56:26 GMT+0000 (Coordinated Universal Time)"
---
Use this **Error Handling** option to send a request to the configured origin even if an EdgeWorkers event handler, except `responseProvider`, fails. If `responseProvider` fails, the request returns an HTTP 500 Internal Server Error to the client.
