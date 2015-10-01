(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kefir'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('kefir'));
  } else {
    root.KefirBus = factory(root.Kefir);
  }
}(this, function (Kefir) {

var dummyPool = {plug: function() {}, unplug: function() {}};

return function kefirBus() {
  var ended = false;
  var pool = Kefir.pool();
  var emitter = null;

  var stream = Kefir.stream(function(_emitter) {
    function sub(event) {
      _emitter.emitEvent(event);
    }
    emitter = _emitter;

    if (ended) {
      _emitter.end();
    } else {
      pool.onAny(sub);
      return function() {
        emitter = null;
        pool.offAny(sub);
      };
    }
  });

  stream.emit = function(x) {
    if (emitter) emitter.emit(x);
    return this;
  };

  stream.error = function(err) {
    if (emitter) emitter.error(err);
    return this;
  };

  stream.emitEvent = function(event) {
    if (event.type === 'end') {
      this.end();
    } else {
      if (emitter) emitter.emitEvent(event);
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
    if (!ended) {
      ended = true;
      if (emitter) emitter.end();
      pool = dummyPool;
    }
    return this;
  };

  return stream.setName('bus');
};
}));
