---
title: "Create an EdgeWorker ID"
slug: "create-an-edgeworker-id-3"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 05 2021 12:48:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Feb 19 2022 18:46:42 GMT+0000 (Coordinated Universal Time)"
---
Before you begin make sure you have an authentication token for the EdgeWorkers API. Your administrator can create an API client in Control Center for the EdgeWorkers service. Make sure you replace the `<access token>` with the <a href="https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials">OPEN APIs section</a> from your `.edgerc` file.

Go to [Akamai CLI for EdgeWorkers](https://github.com/akamai/cli-edgeworkers) for an overview of commands you can use to manage your EdgeWorkers.

1. Use this command to verify that you have access to the groupId you want to use. 

   For more information on Groups and Permissions see [Identity and Access Management documentation](https://techdocs.akamai.com/iam/docs).

```shell
akamai edgeworkers list-groups [options] [group-identifier]
```

> 📘 If you don't see the groupId you want to use or if you received an error the likely cause is that your access token does not have the proper permissions. For more information on Groups and Permissions see [Identity and Access Management documentation](https://techdocs.akamai.com/iam/docs) or your <<COMPANY_NICKNAME>> Administrator.

2. Use this command to create a new EdgeWorker ID.

```shell
akamai edgeworkers register <group-identifier> <edgeworker-name>
```

- Replace `<group-identifier>`  with the groupID for your Access Group.

- Replace `<edgeworker-name>` with **Hello World**. 

    You will use this name to select the EdgeWorker in the Property Manager behavior.

3. Next, you'll be prompted to enter a contract id.

4. Use this command to select a contract id.

```shell
[1] M-SAMPLECONTRACT1
[0] CANCEL

Please select from the above contract ids [1/0]: 1
You have selected M-SAMPLECONTRACT1
```

5. Select a resource tier available on the contract you selected in the previous step.

```shell
Resource Tiers
1. Resource Tier 100 Basic Compute

Maximum CPU time during initialization: 30 MILLISECOND
Maximum wall time during initialization: 100 MILLISECOND
Maximum memory usage per event handler: 1572864 BYTE
Maximum CPU time per event handler: 4 MILLISECOND
Maximum wall time per event handler: 100 MILLISECOND
Maximum number of HTTP sub-requests allowed from a parent request: 0 COUNT
Maximum number of HTTP sub-requests allowed in parallel per request: 0 COUNT
Maximum wall time per HTTP sub-request: 0 MILLISECOND
Maximum response size per HTTP sub-request: 0 BYTE
Maximum memory usage for responseProvider: 2097152 BYTE
Maximum CPU time for responseProvider: 4 MILLISECOND
Maximum wall time for responseProvider: 100 MILLISECOND
Maximum number of HTTP sub-requests allowed for responseProvider: 0 COUNT
Maximum number of HTTP sub-requests allowed in parallel for responseProvider: 0 COUNT
Maximum wall time for HTTP sub-requests during the execution of the responseProvider event handler: 1000 MILLISECOND
Maximum response size for HTTP sub-requests during the execution of the responseProvider event handler: 1048576 BYTE

2. Resource Tier 200 Dynamic Compute

Maximum CPU time during initialization: 30 MILLISECOND
Maximum wall time during initialization: 100 MILLISECOND
Maximum memory usage per event handler: 1572864 BYTE
Maximum CPU time per event handler: 10 MILLISECOND
Maximum wall time per event handler: 4000 MILLISECOND
Maximum number of HTTP sub-requests allowed from a parent request: 1 COUNT
Maximum number of HTTP sub-requests allowed in parallel per request: 1 COUNT
Maximum wall time per HTTP sub-request: 1000 MILLISECOND
Maximum response size per HTTP sub-request: 5242880 BYTE
Maximum memory usage for responseProvider: 2097152 BYTE
Maximum CPU time for responseProvider: 100 MILLISECOND
Maximum wall time for responseProvider: 4000 MILLISECOND
Maximum number of HTTP sub-requests allowed for responseProvider: 50 COUNT
Maximum number of HTTP sub-requests allowed in parallel for responseProvider: 5 COUNT
Maximum wall time for HTTP sub-requests during the execution of the responseProvider event handler: 1000 MILLISECOND
Maximum response size for HTTP sub-requests during the execution of the responseProvider event handler: 5242880 BYTE


[1] 100
[2] 200
[0] CANCEL

Please select from the above resource tier ids [1, 2, 0]: 1
```

5. Use this command to verify that the EdgeWorker Identifier was created successfully:

```shell
akamai edgeworkers list-ids <edgeworker-identifier>
```

- Replace `<edgeworker-identifier>` with the ID of your Hello World EdgeWorker.  

If you successfully created the EdgeWorker ID, you should see the identifier for your Hello World EdgeWorker in the list. 

6. Next, follow these instructions to [add the EdgeWorkers behavior](doc:add-the-edgeworkers-behavior-2).
