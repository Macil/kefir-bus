## 2.2.1 (2016-09-13)

* Made [Flow](https://flow.org/) type definitions more accurate.

## 2.2.0 (2016-08-29)

* Added .value and .event methods to match new Kefir emitter methods.
* Added [Flow](https://flow.org/) type definitions.

## 2.1.0 (2016-02-25)

* Bind Bus methods to instance so they may be called directly without a `this` parameter [#4](https://github.com/Macil/kefir-bus/pull/4)

## 2.0.0 (2015-10-01)

### Breaking Changes
* Updated peerDependencies to require Kefir v3 [#1](https://github.com/Macil/kefir-bus/pull/1)

## 1.0.4 (2015-08-04)

* Fixed exception being thrown if Bus.end() was called during dispatch of end event.

## 1.0.3 (2015-06-23)

* Fixed bug caused when bus was subscribed to while it was ending.

## 1.0.2 (2015-05-07)

* Don't buffer up events while bus is inactive. Makes kefir-bus better match original Kefir behavior.

## 1.0.1 (2015-05-04)

* Minor memory improvement: remove references to listeners on end.

## 1.0.0 (2015-04-28)

Initial release.
