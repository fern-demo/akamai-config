---
title: "About EdgeWorkers developer tools"
slug: "about-edgeworkers-developer-tools"
excerpt: ""
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Wed Nov 10 2021 00:22:28 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 11 2021 19:12:57 GMT+0000 (Coordinated Universal Time)"
---
In this section you'll find information about the developer tools that you can use to design, build, deploy, and test your EdgeWorkers functions.
| Developer tool | Description | Phase of development |
| --- | --- | --- |
| Built-in code bundle editor | Edit your EdgeWorkers code bundles in the EdgeWorkers Management application. Avoid having to set up an integrated development environment or use a command line interface. |  |
| API | You can use the EdgeWorkers service to run JavaScript at the edge of the Internet to dynamically manage web traffic. You can use the EdgeWorkers API to deploy custom code on thousands of edge servers and apply logic that creates powerful web experiences. |  |
| CLI | Configure EdgeWorkers directly from the command line. You can install ready-to-use product packages or build your own custom solutions to manage from CLI. | Once you install the EdgeWorkers CLI package you can<br/><br/>- Install VSCode and IntelliJ EdgeWorkers extensions<br/>- Install Sandbox<br/>- Use npm to create an EdgeWorkers project |
| IDE extensions for VS Code and IntelliJ | Use an integrated development environment (IDE) for JavaScript development. Extensions are add-ons that let you customize and enhance your experience in an IDE. You can add new features or integrate existing tools to increase your productivity and customize your workflow. Extensions also provide a quick, simple way for you to work your “inner loop” process of coding, building, and testing directly when using an IDE. | use for JavaScript development |
| npm package manager | npm is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. | use at development<br/><br/>You can use TypeScript<br/>Add Jest/Mocha mocks to the project to support unit testing |
| TypeScript |  | use at development |
| Jest/Mocha IDE extension | Unit testing can help you find bugs. Finding and fixing bugs early in the development cycle will improve the quality of your code and make the testing phase easier. It can also reduce the risk of regression.<br/><br/>A unit test runs code over each segment of your program, checking the input and output. These tests allow developers to check individual areas of a program to see where and why errors are occurring. | Testing |
| Sandbox | Use Sandbox to create an isolated development environment to test your EdgeWorkers functions locally before deploying to the content delivery network.<br/><br/>You can deploy to sandbox using the CLI, the Jest, or Mocha or the IDE extension.<br/><br/>Sandbox are lets you deploy :<br/><br/>_ the deployment takes just a couple seconds<br/>_ the developer can test against origins running on their own laptop/desktop | Testing |
