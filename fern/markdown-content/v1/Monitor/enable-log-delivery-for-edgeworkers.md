---
title: "Log Delivery Service"
slug: "enable-log-delivery-for-edgeworkers"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon May 24 2021 00:03:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 07 2023 19:41:42 GMT+0000 (Coordinated Universal Time)"
---
You can integrate EdgeWorkers logging data into the Log Delivery Service. This will help provide visibility into EdgeWorkers status and failure over the specified period of time.

Before you begin, refer to the [Log Delivery Service documentation](https://techdocs.akamai.com/log-delivery/docs) for instructions on how to create a log delivery configuration.

The Log Delivery Service allows up to 128 characters in the log output. Any text after 128 characters is truncated.

1. Click **Add rule** to add a new Rule to your property.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/log-delivery-add-rule-v1.png" alt="Image"/>
</Frame>

2. Enter a name for the rule and click **Insert Rule**.

3. Click **Add Match** in the new rule and select **Metadata Stage** as the match criteria and **client-done** as the scope.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/log-delivery-criteria-v1.png" alt="Add match"/>
</Frame>

4. Click **Add Behavior** to add the **Log Custom Details** behavior to the rule.

> 📘 The criteria populates the **Custom Log** field in the **Log Custom Details** behavior.

5. Enable the **Include Custom Log Field** option.

6. Add the built-in EdgeWorkers variables to the **Custom Log Field** you want to include in the Log Delivery Service output.

- **AK_EDGEWORKERS_FAILURE**.  Add this variable to log information about the failure status and details when an EdgeWorkers error occurs.

- **AK_EDGEWORKERS_STATUS**. Add this variable to log information about the execution status of the onClientRequest, onOriginRequest, On OriginResponse, and onClientResponse event handlers.

- **AK_EDGEWORKERS_RP_STATUS**. Add this variable to log information about the execution of the responseProvider event handler.

> 📘 The Log Delivery Service allows up to 128 characters in the log output. Any text after 128 characters is truncated.
