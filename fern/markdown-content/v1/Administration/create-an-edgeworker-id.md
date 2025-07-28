---
title: "Create an EdgeWorker ID"
slug: "create-an-edgeworker-id"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 18:58:32 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Aug 24 2022 14:14:48 GMT+0000 (Coordinated Universal Time)"
---
You can use the EdgeWorkers Management application to create a unique identifier, name, and select a resource tier for your EdgeWorkers code.

An EdgeWorker ID is required to enable the EdgeWorkers behavior in your <Markdown src="../../snippets/COMPANY_NICKNAME.mdx" /> property configuration.

> 📘 You can also use the [EdgeWorkers API](https://techdocs.akamai.com/edgeworkers/reference/api) to create an EdgeWorker ID.

1. Log in to Control Center.

2. Go to <Markdown src="../../snippets/PORTAL_ICON_ROOT.mdx" /> <Markdown src="../../snippets/CHAR_MENU_DELIMITER.mdx" /> **CDN** <Markdown src="../../snippets/CHAR_MENU_DELIMITER.mdx" /> **EdgeWorkers**.

3. Click **Create EdgeWorker ID**.

   A unique identifier is auto-generated and cannot be edited.

4. Enter a name for the EdgeWorker ID.

   Your EdgeWorker name can be 1 to 64 characters long, and contain only alphanumeric (0-9, a-z, A-Z), period (.), space ( ), and hashtag (#) characters.

   You can edit the EdgeWorker name. You can also create more than one EdgeWorker with the same name. We recommend using a naming convention that will help organize and label your EdgeWorkers.

5. Select a Group Association.

   You can only select a group that you have permission to access. For more information about the EdgeWorkers permission model see [Manage access to EdgeWorkers](manage-access-to-edgeworkers.md).

6. Select a Contract ID to list the available resource tiers under the contract.

> 📘 The Contract ID field only appears if you have more than one contract ID associated with your account.

7. Select a resource tier.

   EdgeWorkers resource tiers currently include  and **Dynamic Compute** and **Basic Compute**. To select a resource tier the associated product entitlement must be available on your customer contract.

   The limits for each resource tier are different. You can view the limits for the selected resource tier in the details section or you can view the [Resource tier limitations](resource-tier-limitations.md)  section.

> 👍 Each resource tier has a different billing rate. Please contact your account representative for more information. See the [Resource tiers](select-a-resource-tier.md) section for more information including details about which use cases are supported for each resource tier.
