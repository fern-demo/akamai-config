---
title: "2 Known issues"
slug: "known-issues-1"
excerpt: ""
hidden: true
createdAt: "Fri Feb 25 2022 17:14:54 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Apr 04 2024 19:48:28 GMT+0000 (Coordinated Universal Time)"
---
### Site Failover and responseProvider built-in variable

When you include the `responseProvider` debug Pragma header, `akamai-x-ew-debug-rp` in the request, the **AK_EDGEWORKERS_RP_STATUS** built-in variable:

- Returns an inaccurate status. 
- Indicates success, even on a failure. 
- Prevents the [Site Failover](doc:site-failover) behavior from responding to an EdgeWorkers failover accurately.

To resolve this issue you need to remove the `akamai-x-ew-debug-rp` Pragma header when testing Site Failover. 

### Application Load Balancer and Site Failover

To set the failover host to the true incoming URL you need to add the **AK_HOST** built-in variable before it is modified by [Application Load Balancer](https://techdocs.akamai.com/cloudlets/docs/gs-app-load-balancer-cloudlet). 

### Variable propagation to onClientResponse

Cache hierarchy metadata variables set with `request.setVariable()` in `onOriginResponse` do not propagate to `onClientResponse`.

Cache hierarchy categorizes the bytes served to the client by the forward server type that sent them. 

### cacheKey modifications and Phased Release Cloudlet

When the [Phased Release Cloudlet](https://techdocs.akamai.com/cloudlets/docs/what-is-phased-release) is included in a request, [cacheKey modifications](doc:cachekey-object) are not applied.

If both Phased Release and EdgeWorkers are working on the same request the last behavior in the property (from a top-to-bottom perspective) controls the forward path and forward origin routing. This is expected behavior.

### EdgeWorkers cannot be invoked from within a Conditional Origin rule

The EdgeWorkers behavior must be placed before Conditional Origin behaviors in Property Manager rules.

> 📘 An EdgeWorkers function can be used to select a [Conditional Origin](https://techdocs.akamai.com/cloudlets/docs/about-conditional-origins) using [`request.route()`](doc:request-object#route) within the `onClientRequest` event handler.

## Set the EdgeWorkers behavior to off to stop EdgeWorkers from executing if it was set to on in an earlier rule

The EdgeWorkers behavior is executed when and where it is enabled in a rule. This is unlike other Akamai behaviors where the last setting in the last rule of a property determines if the behavior is executed.

Some use cases take advantage of “last setting wins” for behaviors. For example, you can create properties that switch behaviors on and off depending on certain conditions. You can re-create this functionality with the EdgeWorkers behavior by adding a compound match or a PM variable to a rule. 

### Use a compound match

You can use a compound match to determine when to execute the EdgeWorkers behavior. To do this, add a path match to your Property Manager rule. 

if path match and not query match:  
    set EdgeWorker behavior to on

### Use a Property Manager variable

You can create a Property Manager variable and use it to turn the EdgeWorkers behavior on and off.

1. Use the property manager instructructions to define a variable. In this example the variable is named PMUSER_ENABLE_EDGEWORKER.

2. Assign a value of ON and OFF to this variable.

3. In this example we used a path match and set the variable to ON.

   You can use any match condition that is available for you to use and will help you achieve your use case.

4. Then create a query match and set the variable to OFF.

   ```
   This example shows how you can use the variable in a rule:
   ```

   if path match:  
      set EdgeWorker behavior to on  
   if query match (forces disable of EW):  
      set EdgeWorker behavior to off

result => no EdgeWorker execution  
Here’s another example of how you can use this variable to enable or disable the EdgeWorkers behavior in a rule using the PMUSER variable:

if path match:  
    set same variable as above PMUSER_ENABLE_EDGEWORKER = true  
if query match (forces disable of EW):  
    set same variable as above PMUSER_ENABLE_EDGEWORKER = false

if PMUSER_ENABLE_EDGEWORKER = true  
    set EdgeWorker behavior to on

result => no EdgeWorker execution
