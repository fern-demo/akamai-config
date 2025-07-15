---
title: "EdgeWorkers API"
slug: "edgeworkers-api-1"
excerpt: ""
hidden: true
createdAt: "Thu Oct 28 2021 15:43:15 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 06 2023 20:56:18 GMT+0000 (Coordinated Universal Time)"
---
You can use the EdgeWorkers service to run JavaScript at the edge of the Internet to dynamically manage web traffic. You can use the EdgeWorkers API to deploy custom code on thousands of edge servers and apply logic that creates powerful web experiences.

Use the EdgeWorkers service to:

- Redirect requests based on geography, device, and user-agent.

- Apply conditional logic to filter requests and construct responses.

- Customize error responses to improve web experiences, even when the origin is down.

- Add or remove debug information from HTTP responses.

# API Summary

See the API's various operations for details on their request parameters and response data.

| Operation                                                    | Method | Endpoint                                                 |
| :----------------------------------------------------------- | :----- | :------------------------------------------------------- |
| Groups                                                       |        |                                                          |
| [List permission groups](ref:get-groups)                     | GET    | `/​groups`                                               |
| [Get a permission group](ref:get-group)                      | GET    | `/​groups/​{groupId}`                                    |
| Resource tiers                                               |        |                                                          |
| [List resource tiers](ref:get-resource-tiers)                | GET    | `/​resource-tiers`                                       |
| EdgeWorkers                                                  |        |                                                          |
| [List EdgeWorker IDs](ref:get-ids)                           | GET    | `/​ids`                                                  |
| [Create a new EdgeWorker ID](ref:post-ids)                   | POST   | `/​ids`                                                  |
| [Get an EdgeWorker ID](ref:get-id)                           | GET    | `/​ids/​{edgeWorkerId}`                                  |
| [Update an EdgeWorker ID](ref:put-id)                        | PUT    | `/​ids/​{edgeWorkerId}`                                  |
| [Delete an EdgeWorker ID](ref:delete-id)                     | DELETE | `/​ids/​{edgeWorkerId}`                                  |
| [Clone an EdgeWorker ID](ref:post-id-clone)                  | POST   | `/​ids/​{edgeWorkerId}/​clone`                           |
| [Get the resource tier](ref:get-id-resource-tier)            | GET    | `/​ids/​{edgeWorkerId}/​resource-tier`                   |
| Versions                                                     |        |                                                          |
| [List versions](ref:get-versions)                            | GET    | `/​ids/​{edgeWorkerId}/​versions`                        |
| [Create a new version](ref:post-versions)                    | POST   | `/​ids/​{edgeWorkerId}/​versions`                        |
| [Get version details](ref:get-version)                       | GET    | `/​ids/​{edgeWorkerId}/​versions/​{version}`             |
| [Delete version](ref:delete-version)                         | DELETE | `/​ids/​{edgeWorkerId}/​versions/​{version}`             |
| [Download an EdgeWorker bundle](ref:get-version-content)     | GET    | `/​ids/​{edgeWorkerId}/​versions/​{version}/​content`    |
| Activations                                                  |        |                                                          |
| [List activations](ref:get-activations-1)                    | GET    | `/​ids/​{edgeWorkerId}/​activations`                     |
| [Activate an EdgeWorker version](ref:post-activations-1)     | POST   | `/​ids/​{edgeWorkerId}/​activations`                     |
| [Get an activation](ref:get-activation-1)                    | GET    | `/​ids/​{edgeWorkerId}/​activations/​{activationId}`     |
| Deactivations                                                |        |                                                          |
| [List deactivations](ref:get-deactivations-1)                | GET    | `/​ids/​{edgeWorkerId}/​deactivations`                   |
| [Deactivate an EdgeWorker version](ref:post-deactivations-1) | POST   | `/​ids/​{edgeWorkerId}/​deactivations`                   |
| [Get a deactivation](ref:get-deactivation-1)                 | GET    | `/​ids/​{edgeWorkerId}/​deactivations/​{deactivationId}` |
| Properties                                                   |        |                                                          |
| [List properties](ref:get-properties)                        | GET    | `/​ids/​{edgeWorkerId}/​properties`                      |
| Validations                                                  |        |                                                          |
| [Validate an EdgeWorkers code bundle](ref:post-validations)  | POST   | `/​validations`                                          |
| Contracts                                                    |        |                                                          |
| [List contract IDs](ref:get-contracts)                       | GET    | `/​contracts`                                            |
| Reports                                                      |        |                                                          |
| [List reports](ref:get-reports)                              | GET    | `/​reports`                                              |
| [Get an EdgeWorker report](ref:get-report)                   | GET    | `/​reports/​{reportId}`                                  |
| Secure Token                                                 |        |                                                          |
| [Create a secure token](ref:post-secure-token)               | POST   | `/​secure-token`                                         |
| [Get a secure token](ref:get-secure-token)                   | GET    | `/​secure-token/​{propertyId}`                           |

# Import the EdgeCompute API Postman collection

You can import the API Postman collection with the click of a button. 

Postman offers a user-friendly UI that allows you to make API calls and set up automated workflows. Postman has the Akamai EdgeGrid authentication method built in, so you can easily authenticate and start using the EdgeCompute API Postman collection. 

1. If you have not already installed Postman, visit the [Postman website](https://www.postman.com/) and install the applicable version for your system.

2. Click the **Run in Postman** button below to open Postman and import the EdgeCompute API Postman collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/13085889-10b6ffa0-b947-4232-b70a-60bff7ef4d8e?action=collection%2Ffork&collection-url=entityId%3D13085889-10b6ffa0-b947-4232-b70a-60bff7ef4d8e%26entityType%3Dcollection%26workspaceId%3D74bbc495-bfd4-4528-9a71-325d746180c3#?env%5BAkamai%20%7C%20Edge%20Computing%5D=W3sia2V5IjoiaG9zdCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhY2Nlc3NfdG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY2xpZW50X3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImNsaWVudF9zZWNyZXQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYWNjb3VudFN3aXRjaEtleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdElkIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Imdyb3VwSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoicmVzb3VyY2VUaWVySWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZVdvcmtlck5hbWUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZVdvcmtlcklkIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InZlcnNpb24iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibmV0d29yayIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhY3RpdmF0aW9uSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoicmVwb3J0SWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZUtWX0NQQ29kZSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJuYW1lc3BhY2VOYW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InJldGVudGlvbkluU2Vjb25kcyIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ0b2tlbk5hbWUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidG9rZW5FeHBpcnkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZUtWX2dyb3VwSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZWRnZUtWX2l0ZW1JZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJyZXBvcnRfU3RhcnRUaW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InJlcG9ydF9FbmRUaW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Imhvc3RuYW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InByb3BlcnR5SWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoicHJvcGVydHlWZXJzaW9uIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InByb2R1Y3RJZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjcENvZGVOYW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImNwQ29kZSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJlZGdlSG9zdG5hbWUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5Ijoibm90ZXMiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZW1haWwiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

For more information you can refer to the [Get Started with APIs](https://developer.akamai.com/api/getting-started#postman) documentation.

> 👍 For more information you can refer to the [Get Started with APIs](https://developer.akamai.com/api/getting-started#postman) documentation.
