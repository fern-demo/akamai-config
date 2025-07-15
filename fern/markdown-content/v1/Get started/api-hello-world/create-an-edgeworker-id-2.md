---
title: "Create an EdgeWorker ID"
slug: "create-an-edgeworker-id-2"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 05 2021 12:40:18 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Jan 06 2023 21:05:45 GMT+0000 (Coordinated Universal Time)"
---
Before you begin make sure you have an authentication token for the EdgeWorkers API. Your administrator can create an API client in Control Center for the EdgeWorkers service. Make sure you replace the `<access token>` with the <a href="https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials">OPEN APIs section</a> from your `.edgerc` file.

1. Verify that you have access to the `groupId` you want to use.

```shell
http --timeout=30 --auth-type edgegrid -a <section-name>: GET :/edgeworkers/v1/groups
```

> 📘 If you don't see the `groupId` you want to use or if you received an error the likely cause is that your access token does not have the proper permissions. For more information on Groups and Permissions see <a href="https://techdocs.akamai.com/iam/docs">Identity and Access Management help</a> or contact your <<COMPANY_NICKNAME>> Administrator.

2. Create a new EdgeWorker ID:

```shell
http --timeout=30 --auth-type edgegrid -a <section-name>: POST :/edgeworkers/v1/ids groupId=<groupId> name=<name> resourceTierId=<resourceTierId>
```

- Replace `<groupId>`  with the `groupId` for your Access Group.    

- Replace `<name>` with **Hello World**. 

- Replace `<resourceTierId>` with **200**. 

    You will use this name to select the EdgeWorker in the Property Manager behavior.

2. To verify the EdgeWorker Identifier was created, try issuing this API request. If you successfully created the EdgeWorker ID, you should see unique identifier in the list.

```shell
http --timeout=30 --auth-type edgegrid -a <section-name>: GET :/edgeworkers/v1/ids groupId=<groupId>
```

- Replace `<groupId>`  with the `groupId` for your Access Group.    

3. Next, follow these instructions to [add the EdgeWorkers behavior](doc:add-the-edgeworkers-behavior-2).
