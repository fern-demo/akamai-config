---
title: "Troubleshooting"
slug: "troubleshooting"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 13:53:19 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Jun 26 2021 22:51:33 GMT+0000 (Coordinated Universal Time)"
---
### How do I debug EdgeWorkers?

We offer various tools to help you debug EdgeWorkers such as, [Enhanced debug headers](enable-enhanced-debug-headers.md), [Sandbox CLI](akamai-cli.md#sandbox-cli), and [JavaScript logging](enable-javascript-logging.md).

### Can I validate my EdgeWorkers code bundle before uploading it? 

Yes, there is a validation service built into the EdgeWorkers code bundle upload process (via UI, API, or CLI). This validation service attempts to ensure you are uploading valid JavaScript that will run successfully. 

### Will upload fail if the bundle contains bad syntax or it doesn't compile?

The validation service does not check for logical or run time errors.

### What happens if my EdgeWorkers function fails after I deploy it to production?

The request will fail and you'll get a 500 response. You can however, configure one of the supported failover actions to for example, perform a redirect to a different location or by-pass the failed EdgeWorkers function. As a best practice you should add the [Site Failover](site-failover.md)  behavior to your property and set up one of the supported actions.
