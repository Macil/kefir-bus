# kefirBus

[![Circle CI](https://circleci.com/gh/AgentME/kefir-bus.svg?style=shield)](https://circleci.com/gh/AgentME/kefir-bus)
[![npm version](https://badge.fury.io/js/kefir-bus.svg)](https://badge.fury.io/js/kefir-bus)

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

See Kefir's [deprecated API docs](https://github.com/rpominov/kefir/blob/v2/deprecated-api-docs.md#kefirbus)
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

[Flow](https://flowtype.org/) type declarations for this module are included!
If you are using Flow, they won't require any configuration to use.
