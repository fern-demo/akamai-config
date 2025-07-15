---
title: "Configure Site Failover"
slug: "site-failover"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 19:22:37 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Dec 14 2023 15:10:51 GMT+0000 (Coordinated Universal Time)"
---
You should use the [Site Failover Property Manager behavior](https://techdocs.akamai.com/property-mgr/docs/site-failover) to define what logic to execute in the event that an EdgeWorkers function fails.

Programming errors, unexpected input from end-users, changes in documents returned from `htmlRequest()`, and timeouts can cause an EdgeWorkers function to fail. You can intercept these errors and any others by using one of these supported failover actions:

- Redirect to a different location by specifying a redirect action. This action sends the end user to alternate content with an end user facing Location change - this is best suited for full HTML page requests.

- Use an alternate origin and path so the end user remains on the original URL.

- Display a 500 error to the end user.

- Use **EdgeWorkers Execution Status** in a match condition.

- [Retry the failed EdgeWorkers request](doc:site-failover#retry-the-request) and continue processing the delivery property metadata.

- By-pass the failed EdgeWorkers function and serve the same URL.  Support is required to implement this Failover action. Contact your account team or send an email to [edgeworkers@akamai.com](mailto:edgeworkers@akamai.com) for more information. 

> 👍 EdgeWorkers failures caused by a coding issue throw a JavaScript error. Where possible, [catch errors](doc:javascript-error-handling) in your JavaScript code and execute alternative logic.

> 📘 When testing Site Failover you need to remove the `akamai-x-ew-debug-rp` Pragma header. For more information refer to the [known issue](doc:known-issues#site-failover-and-responseprovider-built-in-variable).

# Detect an EdgeWorkers failure

These steps describe how to use a Property Manager match condition to detect an EdgeWorkers failover. You can then define which Failover action to take when the rule detects a failure. 

By default a match condition detects errors that occur when executing `onClientRequest`, `onClientResponse`, `onOriginRequest`, and `onOriginResponse`.  It does not currently detect errors from `responseProvider`.

The following Property Manager logic detects errors from all event handlers.

 ![Failover to static content](https://techdocs.akamai.com/edgeworkers/img/property-manager-logic-v1.png)

1. Create a rule with a match condition that enables the **PMUSER_RP_STATUS** variable when the **Metadata Stage** is **client-response**.

> 👍 The Site Failover rules need to appear after the EdgeWorkers behavior. If you add them before the EdgeWorkers behavior the Site Failover logic will not execute.

 ![Failover to static content](https://techdocs.akamai.com/edgeworkers/img/is-client-response-v1.png)

2. Create a child rule to the **Is client-response** rule. 
3. Add a match condition that enables the **PMUSER_RP_ERROR** variable when the **PMUSER_RP_STATUS** is not empty AND is not \*success\* or \*unimplementedHandler\*.

> 📘 You can also add \*unknownEdgeWorker\* to the list of variable values. This prevents Site Failover from triggering when your configuration includes a deactivated EdgeWorker ID.
> 
> For more information about the variable values you can use in a match condition,  refer to the [Execution status report](doc:manage-report-data#execution-status-report) description.

4. You also need to enable wildcards for this rule. To do this, click the gear icon in the match condition and select the **Wildcards in value**  check box from the **Additional Options** window and uncheck the **case-sensitive value **check box. 

  If you don't see the gear icon, hover your mouse over the match condition.

  ![Failover to static content](https://techdocs.akamai.com/edgeworkers/img/rp-status-v1.png)

5. Add another child rule to the **Is client-response** rule.  Add a match condition that enables the **Site Failover** behavior when the EdgeWorkers Execution status is **Failure** OR the **PMUSER_RP_ERROR** is **true**.

  ![Failover to static content](https://techdocs.akamai.com/edgeworkers/img/on-ew-error-v1.png)

# Invoke failover

You can define the appropriate logic to execute when an EdgeWorkers failure is detected. This section documents three common failover options. For more information refer to the [Site Failover Property Manager behavior](https://techdocs.akamai.com/property-mgr/docs/site-failover) documentation.

## Retry the request

The example in the previous section shows how to use Site Failover to retry the request to the original host and path. 

This will re-execute the request and invoke the EdgeWorkers function again. Retrying the request can be useful when you are experiencing occasional EdgeWorkers errors due to resource limits. Often, a retry will be successful even though the first attempt exceeded a CPU limit, memory limit, or timeout.

## Failover to static content

When an EdgeWorkers function fails you can serve alternate content from NetStorage.

 ![Failover to static content](https://techdocs.akamai.com/edgeworkers/img/failover-to-static-content-v2.png)

In some cases, existing failover logic may also detect EdgeWorkers errors and interfere with attempts to implement EdgeWorkers-specific failover.  In particular, the match condition for Origin Timeout errors is known to match on some types of EdgeWorkers errors.

## Failover to a different location

You can also forward the request to an alternate location to execute the origin logic when an EdgeWorkers failure occurs.

 ![EdgeWorkers failover check](https://techdocs.akamai.com/edgeworkers/img/edgeworkers-failover-check-v1.jpg)

 ![EdgeWorkers site failover](https://techdocs.akamai.com/edgeworkers/img/edgeworkers-site-failover-v1.jpg)
