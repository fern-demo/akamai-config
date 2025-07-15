---
title: "November 22, 2022 — Increased resource tier limits"
slug: "november-22-2022-increased-resource-tier-limits"
type: ""
createdAt: "Tue Nov 22 2022 13:55:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
We updated the following [limits](doc:resource-tier-limitations) in the **Dynamic Compute** resource tier.

| Dynamic compute                                                                                   | Previous limit   | New limit        |
| :------------------------------------------------------------------------------------------------ | :--------------- | :--------------- |
| Maximum wall time during initialization                                                           | 200 milliseconds | 500 milliseconds |
| Maximum memory usage per event handler                                                            | 1.5 MB           | 2.5 MB           |
| Maximum CPU time per event handler                                                                | 10 milliseconds  | 20 millseconds   |
| Maximum wall time per event handler                                                               | 4 seconds        | 5.5 seconds      |
| Maximum number of HTTP sub-requests allowed from a parent request                                 | 2                | 4                |
| Maximum number of HTTP sub-requests allowed in parallel per request                               | 2                | 4                |
| Maximum wall time per HTTP sub-request                                                            | 4 seconds        | 5.5 seconds      |
| Maximum memory usage for responseProvider                                                         | 2 MB             | 4 MB             |
| Maximum CPU time for responseProvider                                                             | 100 milliseconds | 200 milliseconds |
| Maximum wall time for responseProvider                                                            | 4 seconds        | 8 seconds        |
| Maximum wall time per HTTP sub-request during the execution of the responseProvider event handler | 4 seconds        | 8 seconds        |

We updated the following [limits](doc:resource-tier-limitations) in the **Basic Compute** resource tier.

| Basic compute                                                                                         | Previous limit   | New limit        |
| :---------------------------------------------------------------------------------------------------- | :--------------- | :--------------- |
| Maximum CPU time per event handler                                                                    | 4 milliseconds   | 10 milliseconds  |
| Maximum wall time per event handler                                                                   | 200 milliseconds | 4 seconds        |
| Maximum number of HTTP sub-requests allowed from a parent request                                     | 0                | 2                |
| Maximum number of HTTP sub-requests allowed in parallel per request                                   | 0                | 2                |
| Maximum wall time per HTTP sub-request                                                                | 0                | 4 seconds        |
| Maximum response size per HTTP sub-request                                                            | 0                | 5 MB             |
| Maximum CPU time for responseProvider                                                                 | 4 milliseconds   | 100 milliseconds |
| Maximum wall time for responseProvider                                                                | 100 milliseconds | 4 seconds        |
| Maximum number of HTTP sub-requests allowed for responseProvider                                      | 0                | 50               |
| Maximum number of HTTP sub-requests allowed in parallel for responseProvider                          | 0                | 5                |
| Maximum wall time per HTTP sub-request during the execution of the responseProvider event handler     | 0                | 4 seconds        |
| Maximum response size per HTTP sub-request during the execution of the responseProvider event handler | 0                | 5 MB             |