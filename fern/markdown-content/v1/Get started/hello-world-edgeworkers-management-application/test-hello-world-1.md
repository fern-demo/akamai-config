---
title: "Test Hello World"
slug: "test-hello-world-1"
excerpt: ""
hidden: false
createdAt: "Mon Jul 05 2021 12:27:38 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Nov 17 2023 18:23:40 GMT+0000 (Coordinated Universal Time)"
---
During the testing process you can use these resources and tips and to help you troubleshoot:

- To handle exceptions cleanly write `try` and `catch` blocks in your JavaScript code. 
- Refer to the [Limitations](doc:limitations) section for information about what you should keep in mind when designing your EdgeWorkers functions. You can also review a list of the currently supported delivery products.
- Use [Site Failover](doc:site-failover)  to define what action to take in the event that an EdgeWorkers function fails.
- Note that currently EdgeWorkers functions are supported on the both Enhanced TLS and Standard TLS networks. 

1. Use this curl request, resolved to staging, to exercise the Hello World EdgeWorker.

   For instructions on how to resolve an IP address refer to the [Getting Started for HTTPS Properties](https://techdocs.akamai.com/property-mgr/docs/serve-content-over-https) documentation.

```curl
curl https://[your website name]/helloworld --connect-to ::[akamai staging name]
```

- Replace [akamai staging name] with the staging Edge hostname of your website. The staging Edge hostname uses the **.edgekey-staging.net** domain.

2. The curl request should produce this HTML output:

```html
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 70
Date: Wed, 20 Nov 2019 17:09:17 GMT
Connection: keep-alive
X-Hello-World: From Akamai EdgeWorkers

<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>
```
