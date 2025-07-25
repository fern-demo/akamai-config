---
title: "POBV - JavaScript error handling (COPY)"
slug: "javascript-error-handling-copy"
excerpt: ""
hidden: true
createdAt: "Thu May 09 2024 18:39:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 09 2024 11:17:44 GMT+0000 (Coordinated Universal Time)"
---
When writing the JavaScript code for your EdgeWorkers functions consider the areas where errors are likely to occur. You should try to configure fallback options to handle these potential errors inside of the JavaScript code.

> 📘 Errors not caught in JavaScript can be detected in Property Manager and handled through Site Failover behaviors. See [Configure Site Failover](site-failover.md) for more information.

# Try/catch blocks

You can write try/catch blocks in your JavaScript code to handle exceptions and catch runtime errors.  When an error occurs in the "try" block, the code in the "catch" block will log the error and can perform the appropriate logic to handle the error.  These errors are also caught in the logs and can help future troubleshooting efforts.

```javascript
export function onClientRequest (request) {
  try {
    // ...
    // Code that might fail
    // ...
  } catch(error) {
    logger.error (error.toString())
    // ...
    // Error handling logic
    // ...
  }
}

```

# Rejected promises

Handling errors in asynchronous code is different.  Errors in asynchronous code implemented through promises will result in a rejected promise rather than a catchable runtime error.  The code below shows how to use the `then()` and `catch()` methods to handle both a successfully resolved promise and a rejected promise.

```javascript
export function onClientRequest (request) {
  var response = httpRequest('https://www.example.com/')
    .then ((response) => {
      // Action to take on successful completion of HTTP request
    log.info('handling example.com response');
    })
    .catch ((error) => {
      logger.error(error.toString());
      // Action to take on unsuccessful completion of HTTP request
    });
}
```

# Async/Await

The code for handling [rejected promises](javascript-error-handling.md#rejected-promises) is driven by the [JavaScript specifications](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). 

In many cases, you can use the async/await pattern to simplify this code.  Async/await is syntactic sugar. It lets you catch errors in the more familiar try/catch syntax by using the Async/await pattern in an awaited promise. 

For more information you can review this [async/await tutorial](https://javascript.info/async-await).  

The code below is functionally equivalent to the previous [rejected promises](javascript-error-handling.md#rejected-promises) example. Internally, the JavaScript runtime creates the necessary handlers to execute code when the promise returned by `httpRequest()` function is resolved or rejected.

```javascript
export async function onClientRequest (request) {
  try {
    var response = await httpRequest('https://www.example.com/');
    // Action to take on successful completion of HTTP request
    log.info('handling example.com response');

  } catch(error) {
    logger.error(error.toString());
    // Action to take on unsuccessful completion of HTTP request
  }
}
```

> 👍 As a best practice you should only use try/catch to catch errors that you expect to handle in your JavaScript code. If you catch errors without properly handling the error, you will prevent the error from propagating.  Thus you will prevent further error handling logic from being able to address the error.
