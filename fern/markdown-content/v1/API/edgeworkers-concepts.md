---
title: "EdgeWorkers concepts"
slug: "edgeworkers-concepts"
excerpt: ""
hidden: true
createdAt: "Tue Sep 07 2021 13:22:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 06 2023 20:56:18 GMT+0000 (Coordinated Universal Time)"
---
Here are some terms and concepts that will help you understand how to use this API:

- **ID**: The EdgeWorkers API generates a unique `edgeWorkerId`, a numeric identifier that enables you to activate and manage your EdgeWorkers code bundles.

- **Group**: Each account features a hierarchy of groups, which control access to properties and EdgeWorkers capabilities. Using either Control Center or the [Identity Management: User Administration API](https://developer.akamai.com/api/core_features/identity_management_user_admin/v2.html), account administrators can assign properties to specific groups, each with its own set of users and accompanying roles. Your access to any given property depends on the role set for you in its group. You need a group’s `groupId` to access some of EdgeWorkers API operations.

- **Contract ID**: Each account features one or more contracts, each of which has a fixed term of service during which specified Akamai products and modules are active. You need the contract ID to list the available resources tiers for a specific contract.

- **Version**: A unique string value that enables you to track revision history for an `edgeWorkerId`. Each `version` refers to the contents of a specific EdgeWorkers code bundle.

- **Activation**: An EdgeWorker version can be activated on the <<COMPANY_NICKNAME>> staging or production network. Only one EdgeWorker version can be active on the staging network and only one can be active on the production network. When the activation process is complete, the previously activated version becomes inactive. An inactive version can be re-activated.

- **Deactivation**: Before you can delete an EdgeWorker version you need to deactivate it. When you delete an EdgeWorker version it is permanently removed from the EdgeWorker ID. It also deletes the activation and deactivation history of the version. You can only delete a deactivated EdgeWorker version. Active or activating versions cannot be deleted.

- **EdgeWorker code bundle**: A collection of files including `main.js`, the JavaScript source that contains event handler functions, and `bundle.json` packaged together in a compressed `.tgz` file. See [EdgeWorkers code bundle format](doc:code-bundle-format) for details.

- **Secure token**: A random secret key you can use to create an EdgeWorkers authentication token to [enable enhanced debug headers](doc:enable-enhanced-debug-headers) for EdgeWorkers.

- **Reports**: Contain insights about the performance and execution status of your EdgeWorkers. Reports can also help monitor the health of an EdgeWorkers function and provide information about whether it is operating within the defined [limits](doc:limitations). The available reports include, overview, execution time, execution status, and memory usage.

- **Resource tier**: A collection of consumption limits for your EdgeWorkers functions. You need to select a resource tier, either Dynamic Compute or Basic Compute, when you [create an EdgeWorker ID](doc:create-an-edgeworker-id).
