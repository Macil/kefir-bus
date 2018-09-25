# kefirBus

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/kefir-bus/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/kefir-bus.svg?style=flat)](https://www.npmjs.com/package/kefir-bus) [![CircleCI Status](https://circleci.com/gh/Macil/kefir-bus.svg?style=shield)](https://circleci.com/gh/Macil/kefir-bus) [![Greenkeeper badge](https://badges.greenkeeper.io/Macil/kefir-bus.svg)](https://greenkeeper.io/)

Kefir 3.0 removed `Kefir.bus` from the core project, so now it's up to 3rd
party modules to implement them. This module is an implementation of Kefir.Bus
that passes all of Kefir's older tests for Kefir.Bus.

Older code:

```js
var Kefir = require('kefir');
var bus = Kefir.bus();
```

Now with this module:

```js
var Kefir = require('kefir');
var kefirBus = require('kefir-bus');
var bus = kefirBus();
```

See Kefir's [deprecated API docs](https://github.com/kefirjs/kefir/blob/v2/deprecated-api-docs.md#kefirbus)
for information about Kefir buses.

Most code that uses Buses can be done in a better and more idiomatic way with
Kefir. Try to investigate alternatives before you use a bus! Consider the
following code:

```js
// BAD CODE EXAMPLE!
var bus = kefirBus();

setInterval(function() {
  bus.emit(null);
}, 1000);

bus.take(5).onValue(function() {
  console.log('beep'); // runs 5 times
});
```

This code never stops the interval timer! It will continue to emit nulls into
the bus for eternity, even though no one is receiving the values. Unsubscribing
from a bus can't send any unsubscription notification to to the producer
calling the emit method.

Kefir itself has functions that provide streams which automatically stop
producing values as soon they are unsubscribed from. The following code does
not suffer from the problem of the previous example:

```js
Kefir.interval(1000).take(5).onValue(function() {
  console.log('beep'); // runs 5 times
});
```

## Types

Both [TypeScript](https://www.typescriptlang.org/) and
[Flow](https://flowtype.org/) type definitions for this module are included!
The type definitions won't require any configuration to use.
