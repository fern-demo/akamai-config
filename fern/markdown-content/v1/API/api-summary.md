---
title: "API summary"
slug: "api-summary"
excerpt: ""
hidden: false
createdAt: "Tue Dec 14 2021 19:33:12 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Aug 30 2024 11:52:25 GMT+0000 (Coordinated Universal Time)"
---
<!--
This file lists the API's operations, and should publish here:
https://techdocs.akamai.com/edgeworkers/reference/api-summary
Tech writers, you update the API summary when updating API doc:
https://techdocs.akamai.com/internal-ux-writing/docs/swag-tool-pub#publish-api-doc-to-readme
-->

<style>
/* Widen table to width of page */
.markdown-body.ng-non-bindable,
.rm-Article header,
.rm-Article header+div.markdown-body { width: 135% }
</style>

See the API's various operations for details on their request parameters and response data.

You can also run this API with a Postman collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/13085889-10b6ffa0-b947-4232-b70a-60bff7ef4d8e)

| Operation                                                                                           | Method   | Endpoint                                                 |
| :-------------------------------------------------------------------------------------------------- | :------- | :------------------------------------------------------- |
| Contracts                                                                                           |          |                                                          |
| [List contract IDs](ref:get-contracts)                                                              | `GET`    | `/contracts`                                             |
| EdgeWorkers customer log delivery                                                                   |          |                                                          |
| [List logging overrides](ref:get-overrides)                                                         | `GET`    | `/ids/​{edgeWorkerId}/​loggings`                         |
| [Create a new logging override](ref:post-override)                                                  | `POST`   | `/ids/​{edgeWorkerId}/​loggings`                         |
| [Get logging override status](ref:get-override)                                                     | `GET`    | `/ids/​{edgeWorkerId}/​loggings/​{loggingId}`            |
| Groups                                                                                              |          |                                                          |
| [List permission groups](ref:get-groups)                                                            | `GET`    | `/groups`                                                |
| [Get a permission group](ref:get-group)                                                             | `GET`    | `/groups/​{groupId}`                                     |
| EdgeWorker IDs                                                                                      |          |                                                          |
| [List EdgeWorker IDs](ref:get-ids)                                                                  | `GET`    | `/ids`                                                   |
| [Create a new EdgeWorker ID](ref:post-ids)                                                          | `POST`   | `/ids`                                                   |
| [Delete an EdgeWorker ID](ref:delete-id)                                                            | `DELETE` | `/ids/​{edgeWorkerId}`                                   |
| [Get an EdgeWorker ID](ref:get-id)                                                                  | `GET`    | `/ids/​{edgeWorkerId}`                                   |
| [Update an EdgeWorker ID](ref:put-id)                                                               | `PUT`    | `/ids/​{edgeWorkerId}`                                   |
| [List activations](ref:get-activations)                                                             | `GET`    | `/ids/​{edgeWorkerId}/​activations`                      |
| [Activate an EdgeWorker version](ref:post-activations)                                              | `POST`   | `/ids/​{edgeWorkerId}/​activations`                      |
| [Roll back to the previous active EdgeWorker version](ref:post-rollback-to-previous-active-version) | `POST`   | `/ids/​{edgeWorkerId}/​activations/​rollback`            |
| [Cancel an activation](ref:delete-activation)                                                       | `DELETE` | `/ids/​{edgeWorkerId}/​activations/​{activationId}`      |
| [Get an activation](ref:get-activation)                                                             | `GET`    | `/ids/​{edgeWorkerId}/​activations/​{activationId}`      |
| [Clone an EdgeWorker ID](ref:post-id-clone)                                                         | `POST`   | `/ids/​{edgeWorkerId}/​clone`                            |
| [List deactivations](ref:get-deactivations)                                                         | `GET`    | `/ids/​{edgeWorkerId}/​deactivations`                    |
| [Deactivate an EdgeWorker version](ref:post-deactivations)                                          | `POST`   | `/ids/​{edgeWorkerId}/​deactivations`                    |
| [Get a deactivation](ref:get-deactivation)                                                          | `GET`    | `/ids/​{edgeWorkerId}/​deactivations/​{deactivationId}`  |
| [List properties](ref:get-properties)                                                               | `GET`    | `/ids/​{edgeWorkerId}/​properties`                       |
| [Get the resource tier](ref:get-id-resource-tier)                                                   | `GET`    | `/ids/​{edgeWorkerId}/​resource-tier`                    |
| [List revisions](ref:get-revisions)                                                                 | `GET`    | `/ids/​{edgeWorkerId}/​revisions`                        |
| [List revision activations](ref:get-revision-activations)                                           | `GET`    | `/ids/​{edgeWorkerId}/​revisions/​activations`           |
| [Activate a fallback revision](ref:post-revision-activations)                                       | `POST`   | `/ids/​{edgeWorkerId}/​revisions/​activations`           |
| [Get a revision](ref:get-revision)                                                                  | `GET`    | `/ids/​{edgeWorkerId}/​revisions/​{revisionId}`          |
| [Get a revision BOM](ref:get-revision-bom)                                                          | `GET`    | `/ids/​{edgeWorkerId}/​revisions/​{revisionId}/​bom`     |
| [Compare revisions](ref:post-revision-compare)                                                      | `POST`   | `/ids/​{edgeWorkerId}/​revisions/​{revisionId}/​compare` |
| [Download the combined code bundle](ref:get-revision-content)                                       | `GET`    | `/ids/​{edgeWorkerId}/​revisions/​{revisionId}/​content` |
| [Pin an active revision](ref:post-revision-pin)                                                     | `POST`   | `/ids/​{edgeWorkerId}/​revisions/​{revisionId}/​pin`     |
| [Unpin an active revision](ref:post-revision-unpin)                                                 | `POST`   | `/ids/​{edgeWorkerId}/​revisions/​{revisionId}/​unpin`   |
| [List versions](ref:get-versions)                                                                   | `GET`    | `/ids/​{edgeWorkerId}/​versions`                         |
| [Create a new version](ref:post-versions)                                                           | `POST`   | `/ids/​{edgeWorkerId}/​versions`                         |
| [Delete version](ref:delete-version)                                                                | `DELETE` | `/ids/​{edgeWorkerId}/​versions/​{version}`              |
| [Get version details](ref:get-version)                                                              | `GET`    | `/ids/​{edgeWorkerId}/​versions/​{version}`              |
| [Download an EdgeWorkers code bundle](ref:get-version-content)                                      | `GET`    | `/ids/​{edgeWorkerId}/​versions/​{version}/​content`     |
| Limits                                                                                              |          |                                                          |
| [List limits](ref:get-limits)                                                                       | `GET`    | `/limits`                                                |
| Reports                                                                                             |          |                                                          |
| [List reports](ref:get-reports)                                                                     | `GET`    | `/reports`                                               |
| [Get an EdgeWorker report](ref:get-report)                                                          | `GET`    | `/reports/​{reportId}`                                   |
| Resource tiers                                                                                      |          |                                                          |
| [List resource tiers](ref:get-resource-tiers)                                                       | `GET`    | `/resource-tiers`                                        |
| Secure Token                                                                                        |          |                                                          |
| [Create a secure token](ref:post-secure-token)                                                      | `POST`   | `/secure-token`                                          |
| **Deprecated** [Get a secure token](ref:get-secure-token)                                           | `GET`    | `/secure-token/​{propertyId}`                            |
| Validations                                                                                         |          |                                                          |
| [Validate an EdgeWorkers code bundle](ref:post-validations)                                         | `POST`   | `/validations`                                           |
