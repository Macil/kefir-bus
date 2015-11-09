# kefirBus

Kefir 2.x deprecates buses for some good reasons, but some existing codebases
depend on buses a lot and don't want to silence all of Kefir's deprecation
notices. This module is an implementation of Kefir.Bus that passes all of
Kefir's older tests for Kefir.Bus.

Older code:

    var Kefir = require('kefir');
    var bus = Kefir.bus();

Now with this module:

    var Kefir = require('kefir');
    var kefirBus = require('kefir-bus');
    var bus = kefirBus();

See Kefir's [deprecated API docs](https://github.com/rpominov/kefir/blob/v2/deprecated-api-docs.md)
for information about Kefir buses.
