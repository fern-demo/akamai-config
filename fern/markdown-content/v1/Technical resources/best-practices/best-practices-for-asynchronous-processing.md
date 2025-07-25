---
title: "Asynchronous processing"
slug: "best-practices-for-asynchronous-processing"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Aug 12 2021 13:36:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Sep 29 2021 18:10:04 GMT+0000 (Coordinated Universal Time)"
---
Before we get into the best practices let's review how the EdgeWorkers platform handles simultaneous processing.

JavaScript is inherently a single-threaded execution environment. The EdgeWorkers platform has multiple execution environments, also known as contexts, to serve multiple requests simultaneously.

Only one of these environments can serve a specific request at a time. You might, however, want to write code that executes in an asynchronous manner.  When making an HTTPS request from EdgeWorkers, you should avoid tying up the thread while waiting for a response. Instead, the code should continue to execute, either for the current request or a different request, while waiting for the HTTPS response.  

To accomplish this, EdgeWorkers JavaScript code passes the job of making an HTTPS request to the underlying platform. EdgeWorkers does this by providing a callback function for the platform to invoke when the HTTPS response is available. You can also use callbacks to write more efficient code with techniques such as making multiple HTTPS requests in [parallel](best-practices-for-performance.md#parallelise-sub-requests).

## About promises

In JavaScript, you can use promises to manage the execution of asynchronous code. Instead of waiting for a long-running process to return the value, JavaScript code can immediately return a promise object while the task is completing asynchronously. The promise object represents the current state of the task, "promising" to supply the final value at some point in the future. Once the asynchronous task completes successfully, the promise's `then()` callback is invoked.

Within EdgeWorkers, you can use promises when making any outbound HTTP sub-request. Promises make HTTP sub-requests asynchronously, allowing code execution to continue. The `httpRequest()` function returns a promise that resolves when the HTTP response headers are available.

For example, the following EdgeWorkers code calls the `httpRequest()` function on line six. The `httpRequest()` function immediately returns a promise, and the execution of `onClientRequest` continues, adding a `then()` handler.  The `httpRequestCompleted()` function is only invoked when the HTTP response is available.

```javascript
function httpRequestCompleted(response) {
  logger.log("response completed.  Status: %s", response.status)
}

export function onClientRequest(request) {
  var responsePromise = httpRequest('https://www.example.com');
  responsePromise.then(httpRequestCompleted);
  logger.log("continuing processing");
}
```

Since the `httpRequestCompleted` function will not be called until the promise, created by `httpRequest` is resolved, the "continuing processing" log line will be generated first, followed later by the "response completed..." log statement. However, the `onClientRequest` function would already have completed prior to "response completed..." being logged.  Thus you would not see this log statement in your debug output.

How can we force EdgeWorkers to wait for the log line to generate before completing? We can return our own promise from the `onClientRequest` function. The EdgeWorkers platform can consume a promise from an event handler. The platform will wait for the promise to resolve before considering the event handler to be complete. A wall timeout error will occur if the promise is not resolved prior to the 4 second EdgeWorkers wall time [limit](resource-tier-limitations.md).

Luckily, you don't need to create our own promise in this case. The object returned from `.then()` is another promise that resolves after the callback method has completed processing.  Therefore, you can return the promise created by the `.then()` function as shown in the code sample below.

```javascript
function httpRequestCompleted(response) {
  logger.log("response completed.  Status: %s", response.status)
}

export function onClientRequest(request) {
  var responsePromise = httpRequest('https://www.example.com');
  var reqCompletedPromise = responsePromise.then(httpRequestCompleted);
  logger.log("continuing processing");
  return reqCompletedPromise;
}
```

## How HTTP request handlers use promises in a response

An important detail of asynchronously handling HTTP requests is that the promise returned by `httpRequest()` is resolved once the response headers are available. However, the body of the response may not be available yet. In the previous examples, we do not wait for the response body before continuing processing.

If the body is not yet available you need to create another promise. The `.text()` and `.json()` methods on the response object return a promise that resolves when the body is available. Both `.text()` and `.json()` are similar, with the key difference being that `.text()` will resolve to a string containing the response body, where `.json()` will resolve to an object generated from parsing the body content from JSON. (There's also the ability to retrieve the response body as a stream.)

The code example below shows how we can wait to receive the response body before continuing.  

```javascript
function httpRequest1() {
  var responseTextPromise = httpRequest('https://www.example.com/request1')
.then((response) => response.text());
  return responseTextPromise;
}

function httpRequest2() {
  var responseTextPromise = httpRequest('https://www.example.com/request2')
.then((response) => response.text());
  return responseTextPromise;
}

function httpRequest3() {
  var responseTextPromise = httpRequest('https://www.example.com/request3')
.then((response) => response.text());
  return responseTextPromise;
}

function createClientResponse() {
  return createResponse(200, {}, "<html><body>Hello World</body></html>");
}

export function responseProvider(request) {
  var examplePromise = httpRequest1
.then(httpRequest2)
.then(httpRequest3)
.then(createClientResponse)
  return examplePromise;
}
```

The [arrow syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) used in `(response) => response.text()` is shorthand to create an inline function. In this case, the function is taking one parameter, named `response`, and returning the result from `response.text()`.

# Best practices

Use these best practices to maximize the benefits of asynchronous processing in your custom JavaScript code.

The code samples in this section use EdgeWorkers to show how you can use promises in JavaScript. The fundamentals of promises are not specific to EdgeWorkers. If you're interested in learning more there are many guides available including [Javascript.info](https://javascript.info/promise-basics) and [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Perform multiple actions in sequence

You can use promise "chaining" to build a series of operations with each waiting until the previous one completes to start. The example below makes three HTTP requests. The previous request must complete before starting the next request.  Because each `then()` callback handler function returns a promise, the next handler in the chain will not execute until the previous promise is resolved. Once the third request is complete, the end user receives a client response and `responseProvider` returns the promise.

```javascript
function httpRequest1() {
  var responsePromise = httpRequest('https://www.example.com/request1');
  return responsePromise;
}

function httpRequest2() {
  var responsePromise = httpRequest('https://www.example.com/request2');
  return responsePromise;
}

function httpRequest3() {
  var responsePromise = httpRequest('https://www.example.com/request3');
  return responsePromise;
}

function createClientResponse() {
  return createResponse(200, {}, "<html><body>Hello World</body></html>");
}

export function responseProvider(request) {
  var examplePromise = httpRequest1
	.then(httpRequest2)
	.then(httpRequest3)
	.then(createClientResponse)
  return examplePromise;
}
```

## Use Async/Await

To provide a more natural syntax when working with promises, JavaScript added the "async" and "await" keywords.

Let's look at these one at a time starting with "async".  The first change you'll see when using "async" is that async ensures that a function always returns a promise. Instead of having to create a Promise, such as through using `Promise.resolve()`, we can simply return the value and the promise will be implicitly created.

In effect, the following two code examples are equivalent. The first example explicitly creates a promise and resolves it with the object returned by `createResponse()`. In the next example, the async keyword results in JavaScript implicitly creating the Promise around our returned object.

```javascript
function responseProvider(request) {
  return Promise.resolve(createResponse(200, {}, "hello world"));
}
async function responseProvider(request) {
  return createResponse(200, {}, "hello world")
}
```

The second change of note when using "async" is that it enables the use of the "await" keyword. The "await" keyword instructs JavaScript to wait on the result of a promise before continuing processing in the current function. Internally to the JavaScript engine, it is equivalent to placing the remainder of the JavaScript method into a `then()` handler. The examples below show the power of using async/await.  The top example using async/wait is a much more natural syntax than the second example with manual promise chaining. 

```javascript
export async function responseProvider(request) {
  var responseText = ""

  var exampleRequest1 = await httpRequest('https://www.example.com/request1');
  var text1 = await exampleRequest1.text();
  responseText += text1;

  var exampleRequest2 = await httpRequest('https://www.example.com/request2');
  var text2 = await exampleRequest2.text();
  responseText += text2;

  var exampleRequest3 = await httpRequest('https://www.example.com/request3');
  var text3 = await exampleRequest3.text();
  responseText += text3;

  return createResponse(
	200,
	{},
	responseText
  );
}
export function responseProvider(request) {
  var responseText = ""

  var responsePromise =
	httpRequest('https://www.example.com/request1')
  	.then((response1) => response1.text())
  	.then((text1) => responseText += text1)
  	.then(() => httpRequest('https://www.example.com/request2'))
  	.then((response2) => response2.text())
  	.then((text2) => responseText += text2)
  	.then(() => httpRequest('https://www.example.com/request3'))
  	.then((response3) => response3.text())
  	.then((text3) => responseText += text3)
  	.then(()=>createResponse(
    	200,
    	{},
    	responseText
  	));

  return responsePromise;
}
```

## Handle rejected promises

Promises support error handling through the concept of a "rejected" promise.

A promise can be in one of three states:

- **Pending**. Until the final value is known, the promise is pending.
- **Fulfilled**. Once the operation completes successfully, the promise is fulfilled with the final value.
- **Rejected**. If an error occurs during processing, the promise is rejected with the error.

There are a couple different ways you can handle rejected promises.  

The first involves the `then()`, `catch()`, and `finally()` functions. The `then()` function takes a second callback function as a parameter. It  executes when the promise is rejected, as shown in the next example. If the the promise returned by `httpRequest()` is rejected (for example, if the request times out), the `httpRequestError()` method is called.

```javascript
function httpRequestSuccess(response) {
  logger.log("response completed successfully.  Status: %s", response.status)
}

function httpRequestError(error) {
  logger.log("response errored: %s", error)
}

export function onClientRequest(request) {
  var responsePromise = httpRequest('https://www.example.com')
	.then(httpRequestSuccess, httpRequestError);

  return responsePromise;
}
```

Alternatively, you can use the `.catch()` method to define the callback for a rejected promise.

```javascript
function httpRequestSuccess(response) {
  logger.log("response completed successfully.  Status: %s", response.status)
}

function httpRequestError(error) {
  logger.log("response errored: %s", error)
}

export function onClientRequest(request) {
  var responsePromise = httpRequest('https://www.example.com')
	.then(httpRequestSuccess)
	.catch(httpRequestError);

  return responsePromise;
}
```

And for code that should run regardless of success or failure, you can use the `finally()` method.

```javascript
function httpRequestSuccess(response) {
  logger.log("response completed successfully.  Status: %s", response.status)
}

function httpRequestError(error) {
  logger.log("response errored: %s", error)
}

function alwaysExecutes(error) {
  logger.log("done processing")
}

export function onClientRequest(request) {
  var responsePromise = httpRequest('https://www.example.com')
	.then(httpRequestSuccess)
	.catch(httpRequestError)
	.finally(alwaysExecutes);

  return responsePromise;
}
```

If you are using the async/await syntax, you can use a standard try/catch/finally block to handle errors that occur while waiting for result of a promise. The example below is equivalent to the previous example, but uses the async/await syntax to enable the more natural try/catch/finally syntax.

```javascript
export async function onClientRequest(request) {
  try {
	var response = await httpRequest('https://www.example.com');
	logger.log("response completed successfully.  Status: %s", response.status)
  } catch (error) {
	logger.log("response errored: %s", error)
  } finally {
	logger.log("done processing")
  }
}
```
