---
title: "Product interoperability"
slug: "product-interoperability"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 13:52:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Feb 13 2024 21:07:59 GMT+0000 (Coordinated Universal Time)"
---
### Can EdgeWorkers interact with metadata variables?

Yes, EdgeWorkers can read and write to PMUSER\_ variables in the delivery property. See [getVariable](request-object.md#getvariable) and [setVariable](request-object.md#setvariable) for more information.

### What product data does EdgeWorkers have access to?

EdgeWorkers has access to EdgeScape (stored in the request's [User Location Object](user-location-object.md)) and Device Characteristics (stored in the requests's [Device Object](device-object.md)).

### Does EdgeWorkers replace Edge Side Includes (ESI)?

At some point, yes as we believe EdgeWorkers will offer a modernized approach to response and API orchestration use cases. At the current time, however, there are no firm plans to end of sale or discontinue ESI or Dynamic Content Assembly (DCA).

### How do I execute EdgeWorkers from an ESI fragment?

To execute EdgeWorkers from an ESI fragment, you need to add the  `PMUSER_ENABLE_EW_ESI_FRAG` [user-defined variable](https://techdocs.akamai.com/property-mgr/docs/user-defined-vars) to your rule and set it to `true`. The name of the variable must be UPPERCASE.

> 📘 The user-defined variable is only required if you are using the enhanced TLS network delivery method. When using the Standard TLS delivery method you do not need to add the user-defined variable.
