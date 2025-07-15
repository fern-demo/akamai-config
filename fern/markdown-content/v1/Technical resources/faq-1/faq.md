---
title: "General questions"
slug: "faq"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri May 14 2021 12:20:29 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 26 2022 12:14:34 GMT+0000 (Coordinated Universal Time)"
---
Find answers to commonly asked questions about EdgeWorkers.

### What is serverless computing?

Serverless computing, also known as Functions-as-a-Service (FaaS), is a zero-management computing environment. It allows developers to deploy and execute event driven logic and contextual data without worrying about the underlying infrastructure. Serverless environments typically exist within Centralized or Edge Clouds as managed services.

Serverless computing:

- Shifts operational responsibilities to the cloud or edge vendor, eliminating infrastructure maintenance tasks.

- Autoscales natively to avoid building out capacity in advance.

- Frees developers to focus on building and running applications and services without thinking about servers.

### What's included in <<COMPANY_NICKNAME>>'s serverless offering?

<<COMPANY_NICKNAME>>'s Serverless product line includes EdgeWorkers, EdgeKV, and DevTools.

- **EdgeWorkers** is the world's most distributed edge serverless platform offering:

  - **Just Code**: Write JavaScript code and quickly deploy to all <<COMPANY_NICKNAME>>'s secure edge servers.

  - **Every Edge Server as a Compute Node**: The Chrome V8 engine is deployed to every secure edge server, moving code execution closest to the end user and device.

  - **Integration with CDN traffic flow**: Execute business logic at different event-points of the traffic flow to improve latency, increase cacheability, and eliminate trips to origin.

- **<a href="https://techdocs.akamai.com/edgekv/docs">EdgeKV</a>** is a globally distributed key/value store providing:

  - **Read at Cache Speed**: Tight integration into <<COMPANY_NICKNAME>>'s global edge network to globally to support use cases that need to read data quickly and frequently.

  - **High Availability**: Distributed edge nodes provide high resilience to failure, by storing data across a wide geographic area.

  - **Local Data Processing**: Bring data close to the business logic where it is created and used.

- **[Developer Tools](doc:dev-environment-tutorial) ** that we've curated to increase developer velocity to enable:

  - **Fast Iterative Development**: Use EdgeWorkers Typescript support, IDE, and <<COMPANY_NICKNAME>> Sandbox, to develop, test code locally, quickly, and iteratively.

  - **Automated CI/CD integration**: Integrate into test and deploy pipelines using the EdgeWorkers CLI or APIs.

  - **Debugging and Monitoring**: Self service debugging and monitoring capabilities to troubleshoot issues.
