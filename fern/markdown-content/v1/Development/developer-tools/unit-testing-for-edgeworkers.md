---
title: "Unit testing for EdgeWorkers"
slug: "unit-testing-for-edgeworkers"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 09 2021 15:39:12 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Sep 29 2023 19:09:48 GMT+0000 (Coordinated Universal Time)"
---
Unit testing can help you find bugs. Finding and fixing bugs early in the development cycle will improve the quality of your code and make the testing phase easier. It can also reduce the risk of regression. 

A unit test runs code over each segment of your program, checking the input and output. These tests allow developers to check individual areas of a program to see where and why errors are occurring.

Akamai provides unit testing frameworks for EdgeWorkers to help you with this process. 

The [repository](https://github.com/akamai/edgeworkers-unittest) provides a set of mocks for the testing frameworks below:

- [Jest](https://github.com/akamai/edgeworkers-unittest/tree/main/jest)
- [Mocha](https://github.com/akamai/edgeworkers-unittest/tree/main/mocha)

For detailed instructions on how to set up a suite of unit tests with Jest and Mocha, refer to the [Getting started guide for EdgeWorkers Unit Testing framework](https://github.com/akamai/edgeworkers-unittest).
