module.exports = kefirBus;

var util = require('util');
var Kefir = require('kefir');

var dummyPool = {plug: function() {}, unplug: function() {}};

function kefirBus() {
  var ended = false;
  var pool = Kefir.pool();
  var endemitter = null;

  function endnow() {
    ended = true;
    if (endemitter) {
      endemitter();
    }
    pool = dummyPool;
  }

  var stream = Kefir.stream(function(emitter) {
    function sub(event) {
      emitter.emitEvent(event);
    }
    endemitter = function() {
      emitter.end();
    };

    if (ended) {
      endnow();
    } else {
      pool.onAny(sub);
      return function() {
        pool.offAny(sub);
        endemitter = null;
      };
    }
  });

  stream.emit = function(x) {
    pool.plug(Kefir.stream(function(emitter) {
      emitter.emit(x);
      emitter.end();
    }));
    return this;
  };

  stream.error = function(err) {
    pool.plug(Kefir.stream(function(emitter) {
      emitter.error(err);
      emitter.end();
    }));
    return this;
  };

  stream.emitEvent = function(event) {
    if (event.type === 'end') {
      this.end();
    } else {
      pool.plug(Kefir.stream(function(emitter) {
        emitter.emitEvent(event);
        emitter.end();
      }));
    }
    return this;
  };

  stream.plug = function(s) {
    pool.plug(s);
    return this;
  };

  stream.unplug = function(s) {
    pool.unplug(s);
    return this;
  };

  stream.end = function() {
    endnow();
    return this;
  };

  return stream;
}
