---
title: "Rate and resource limiting"
slug: "resource-limiting"
excerpt: ""
hidden: false
createdAt: "Fri May 14 2021 19:03:05 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Dec 20 2024 18:13:44 GMT+0000 (Coordinated Universal Time)"
---
EdgeWorkers imposes various limits on the number of activations, EdgeWorker IDs, and versions you can deploy. In some cases, you may have the option to override these limits. Contact your Akamai representative for more information.

You can also run the [List limits](ref:get-limits) operation to see the limits EdgeWorkers imposes on the number of activations, EdgeWorkers IDs, and versions you can deploy. If you exceed these limits, you will receive a [429](ref:429) error response.

Various responses include HTTP headers that provide details on your current limits:

- Custom headers suffixed `*-Limit` report on the overall limit.

- Corresponding headers suffixed `*-Remaining` tell you how many items you have left to deploy.

- For rate-limited activations, an additional `*-Reset` header lets you know when the current `*-Remaining` value rises to the original `*-Limit` value.

EdgeWorkers imposes these limits: 

| Limit                                                       | Default value | Description                                                               |
| :---------------------------------------------------------- | :------------ | :------------------------------------------------------------------------ |
| `X-Limit-Ew-Id-Per-Account-Limit`                           | 200           | Maximum number of EdgeWorker IDs per account.                             |
| `X-RateLimit-Ew-Id-Per-Minute-Limit`                        | 10            | Maximum number of EdgeWorker IDs each minute per account.                 |
| `X-RateLimit-Ew-Id-Per-Day-Limit`                           | 50            | Maximum number of EdgeWorker IDs each day per account.                    |
| `X-Limit-Version-Per-Ew-Id-Limit`                           | 1000          | Maximum number of versions per EdgeWorker ID.                             |
| `X-RateLimit-Version-Per-Minute-Limit`                      | 20            | Maximum number of EdgeWorker versions each minute per account.            |
| `X-RateLimit-Activation-Per-Network-Per-Minute-Limit`       | 20            | Maximum number of activations each minute on a network per account.       |
| `X-RateLimit-Activation-Per-Day-Limit`                      | 500           | Maximum number of activations each day per account.                       |
| `X-RateLimit-Deactivation-Per-Network-Per-Minute-Limit`     | 5             | Maximum number of deactivations each minute on a network per account.     |
| `X-RateLimit-Deactivation-Per-Day-Limit`                    | 50            | Maximum number of deactivations each day per account.                     |
| `X-RateLimit-Logging-Override-Per-Network-Per-Minute-Limit` | 20            | Maximum number of logging overrides each minute on a network per account. |
| `X-RateLimit-Logging-Override-Per-Day-Limit`                | 500           | Maximum number of logging overrides each day per account.                 |
| `X-Limit-Dependency-Tree-Height-Per-Revision-Limit`         | 5             | Maximum dependency tree height from the root node of an active revision.  |
| `X-Limit-Direct-Dependency-Imported-Per-Version-Limit`      | 5             | Maximum direct dependencies that can be imported by a parent version.     |
| `X-Limit-Imported-Active-Version-Per-Active-revision-limit` | 5             | Number of times an active version can be imported by an active revision.  |
| `X-Limit-Transitive-Dependency-Per-Revision-Limit`          | 30            | Maximum transitive dependencies per revision.                             |
