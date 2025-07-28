---
title: "Create an EdgeWorker ID"
slug: "create-an-edgeworker-id-1"
excerpt: ""
hidden: false
createdAt: "Mon Jul 05 2021 12:22:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 18 2024 19:29:15 GMT+0000 (Coordinated Universal Time)"
---
Use the EdgeWorkers Management application to generate a unique identifier, enter a name, and select a resource tier for your EdgeWorkers code.

1. Log in to <Markdown src="../../../snippets/PORTAL_NICKNAME.mdx" />.

2. Go to <Markdown src="../../../snippets/PORTAL_ICON_ROOT.mdx" /> <Markdown src="../../../snippets/CHAR_MENU_DELIMITER.mdx" /> **CDN** <Markdown src="../../../snippets/CHAR_MENU_DELIMITER.mdx" /> **EdgeWorkers**.

3. Click **Create EdgeWorker ID**.

   You cannot edit this auto-generated, unique identifier.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/create-edgeworker-id-v1.png" alt="Create EdgeWorkers ID"/>
</Frame>

4. Enter **Hello World** as the name for the EdgeWorkers function.

5. Select a Group Association.

   You can select only a group that you have permission to access.

6. Select a Contract ID to associate with the EdgeWorker ID.  
   The available resource tiers are filtered based on the contract ID you select.

> 📘 The Contract ID field only appears if you have more than one contract ID associated with your account.

7. Select a resource tier.

   EdgeWorkers resource tiers currently include  and **Dynamic Compute**, **Enterprise Compute**, and **Basic Compute**. 

   The limits for each resource tier are different. You can view the limits for the selected resource tier in the details section or you can view the [Resource tier limitations](resource-tier-limitations.md) section.

> 👍 Each resource tier has a different billing rate. Please contact your account representative for more information. See the [resource tiers](select-a-resource-tier.md) section for more information including details about which use cases are supported for each resource tier.

4. Click **Create EdgeWorker ID**.

5. Next, follow these instructions to [add the EdgeWorkers behavior](add-the-edgeworker-behavior-1.md).
