---
title: "Get started"
slug: "api-get-started"
excerpt: ""
hidden: false
createdAt: "Fri May 14 2021 19:02:31 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 06 2023 20:56:18 GMT+0000 (Coordinated Universal Time)"
---
To configure this API for the first time:

- Make sure EdgeWorkers is in your contract. You can find the list of products within your account in <Markdown src="../../snippets/PORTAL_NICKNAME.mdx" /> under **Contracts**. Contact your <Markdown src="../../snippets/COMPANY_NICKNAME.mdx" /> support team to enable EdgeWorkers if necessary.

- You need different permissions to access API functions. You can manage these permissions in <Markdown src="../../snippets/PORTAL_NICKNAME.mdx" />. Learn more about the [access control model](https://techdocs.akamai.com/iam/docs/about-access-control-model). See [Product limits](limitations.md) for a list of supported delivery products.

- Before you can use this API, you need to [Create authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

- To enable this API, select the API service named **EdgeWorkers**, and choose `READ-WRITE` as the access level.

- [Create a new EdgeWorker ID](ref:post-ids) to activate and manage your Hello World code bundle. You need to create an EdgeWorker ID before you can the EdgeWorkers behavior to a rule.

- Add a rule in Property Manager to enable the EdgeWorkers behavior. See [Add the EdgeWorkers behavior](add-the-edgeworkers-behavior.md).

The code examples in this API reference don't contain the required authentication code syntax you need to make API calls. For examples you can copy and paste, check out [Recipes](https://techdocs.akamai.com/edgeworkers/recipes). To learn how to apply authentication in a variety of programming languages when using Akamai APIs, see [Authenticate with EdgeGrid](https://techdocs.akamai.com/developer/docs/authenticate-with-edgegrid).

> 👍 Provide feedback or ask a question in the [developer community](https://community.akamai.com/customers/s/developer-community). You can also contact your <Markdown src="../../snippets/COMPANY_NICKNAME.mdx" /> account representative for support. We want to hear from you!

## Import the Edge Compute API Postman collection

You can import the API Postman collection with the click of a button. 

Postman offers a user-friendly UI that allows you to make API calls and set up automated workflows. Postman has the Akamai EdgeGrid authentication method built in, so you can easily authenticate and start using the EdgeCompute API Postman collection. 

For complete information about the supported API client tools refer to the [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation.

1. If you have not already installed Postman, visit the [Postman website](https://www.postman.com/) and install the applicable version for your system.

2. Click the **Run in Postman** button below to open Postman and import the EdgeCompute API Postman collection.

[<Frame>
  <img src="https://run.pstmn.io/button.svg" alt="Run in Postman"/>
</Frame>](https://god.gw.postman.com/run-collection/13085889-10b6ffa0-b947-4232-b70a-60bff7ef4d8e?action=collection%2Ffork&collection-url=entityId%3D13085889-10b6ffa0-b947-4232-b70a-60bff7ef4d8e%26entityType%3Dcollection%26workspaceId%3D74bbc495-bfd4-4528-9a71-325d746180c3#?env%5BAkamai%20%7C%20Edge%20Computing%5D=W3sia2V5IjoiaG9zdCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhY2Nlc3NfdG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY2xpZW50X3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImNsaWVudF9zZWNyZXQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYWNjb3VudFN3aXRjaEtleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdElkIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Imdyb3VwSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoicmVzb3VyY2VUaWVySWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZVdvcmtlck5hbWUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZVdvcmtlcklkIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InZlcnNpb24iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibmV0d29yayIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhY3RpdmF0aW9uSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoicmVwb3J0SWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZUtWX0NQQ29kZSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJuYW1lc3BhY2VOYW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InJldGVudGlvbkluU2Vjb25kcyIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ0b2tlbk5hbWUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidG9rZW5FeHBpcnkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZUtWX2dyb3VwSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZUtWX2l0ZW1JZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJyZXBvcnRfU3RhcnRUaW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InJlcG9ydF9FbmRUaW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Imhvc3RuYW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InByb3BlcnR5SWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoicHJvcGVydHlWZXJzaW9uIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InByb2R1Y3RJZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjcENvZGVOYW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImNwQ29kZSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJlZGdlSG9zdG5hbWUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5Ijoibm90ZXMiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZW1haWwiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

3. You can then make APIs call using the [EdgeWorkers Postman collection](https://www.postman.com/akamai/workspace/akamai-apis/folder/13085889-46f97ffe-b8b2-474e-a42d-f7949be21ac3).

> 👍 For instructions on how to apply authentication and make API calls with Postman refer to the [Akamai Developer Tools](https://techdocs.akamai.com/developer/docs/postman-make-api-calls) documentation.
