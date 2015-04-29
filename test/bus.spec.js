var Kefir, activate, deactivate, prop, ref, send, stream;

ref = require('./test-helpers'), stream = ref.stream, prop = ref.prop, send = ref.send, activate = ref.activate, deactivate = ref.deactivate, Kefir = ref.Kefir;

var kefirBus = require('../index');

describe('bus', function() {
  it('should return stream', function() {
    expect(kefirBus()).toBeStream();
  });
  it('should not be ended', function() {
    return expect(kefirBus()).toEmit([]);
  });
  it('should emit events', function() {
    var a;
    a = kefirBus();
    return expect(a).toEmit([
      1, 2, {
        error: -1
      },
      3, '<end>'
    ], function() {
      a.emit(1);
      a.emit(2);
      a.error(-1);
      a.emit(3);
      return a.end();
    });
  });
  it('should emit events via .emitEvent', function() {
    var a;
    a = kefirBus();
    return expect(a).toEmit([
      1, 2, {
        error: -1
      },
      3, '<end>'
    ], function() {
      a.emitEvent({
        type: 'value',
        value: 1,
        current: false
      });
      a.emitEvent({
        type: 'value',
        value: 2,
        current: true
      });
      a.emitEvent({
        type: 'error',
        value: -1,
        current: false
      });
      a.emitEvent({
        type: 'value',
        value: 3,
        current: false
      });
      return a.emitEvent({
        type: 'end',
        value: void 0,
        current: false
      });
    });
  });
  it('should return stream', function() {
    return expect(kefirBus()).toBeStream();
  });
  it('should activate sources', function() {
    var a, b, bus, c;
    a = stream();
    b = prop();
    c = stream();
    bus = kefirBus().plug(a).plug(b).plug(c);
    expect(bus).toActivate(a, b, c);
    bus.unplug(b);
    expect(bus).toActivate(a, c);
    return expect(bus).not.toActivate(b);
  });
  it('should deliver events from observables', function() {
    var a, b, bus, c;
    a = stream();
    b = send(prop(), [0]);
    c = stream();
    bus = kefirBus().plug(a).plug(b).plug(c);
    return expect(bus).toEmit([{
      current: 0
    }, 1, 2, 3, 4, 5, 6], function() {
      send(a, [1]);
      send(b, [2]);
      send(c, [3]);
      send(a, ['<end>']);
      send(b, [4, '<end>']);
      return send(c, [5, 6, '<end>']);
    });
  });
  it('should deliver currents from all source properties, but only to first subscriber on each activation', function() {
    var a, b, bus, c;
    a = send(prop(), [0]);
    b = send(prop(), [1]);
    c = send(prop(), [2]);
    bus = kefirBus().plug(a).plug(b).plug(c);
    expect(bus).toEmit([{
      current: 0
    }, {
      current: 1
    }, {
      current: 2
    }]);
    bus = kefirBus().plug(a).plug(b).plug(c);
    activate(bus);
    expect(bus).toEmit([]);
    bus = kefirBus().plug(a).plug(b).plug(c);
    activate(bus);
    deactivate(bus);
    return expect(bus).toEmit([{
      current: 0
    }, {
      current: 1
    }, {
      current: 2
    }]);
  });
  it('should not deliver events from removed sources', function() {
    var a, b, bus, c;
    a = stream();
    b = send(prop(), [0]);
    c = stream();
    bus = kefirBus().plug(a).plug(b).plug(c).unplug(b);
    return expect(bus).toEmit([1, 3, 5, 6], function() {
      send(a, [1]);
      send(b, [2]);
      send(c, [3]);
      send(a, ['<end>']);
      send(b, [4, '<end>']);
      return send(c, [5, 6, '<end>']);
    });
  });
  it('should correctly handle current values of new sub sources', function() {
    var b, bus, c;
    bus = kefirBus();
    b = send(prop(), [1]);
    c = send(prop(), [2]);
    return expect(bus).toEmit([1, 2], function() {
      bus.plug(b);
      return bus.plug(c);
    });
  });
  it('errors should flow', function() {
    var a, b, c, pool;
    a = stream();
    b = prop();
    c = stream();
    pool = kefirBus();
    pool.plug(a);
    expect(pool).errorsToFlow(a);
    pool.unplug(a);
    expect(pool).not.errorsToFlow(a);
    pool.plug(a);
    pool.plug(b);
    expect(pool).errorsToFlow(a);
    expect(pool).errorsToFlow(b);
    pool.unplug(b);
    expect(pool).not.errorsToFlow(b);
    pool.plug(c);
    return expect(pool).errorsToFlow(c);
  });
  return it('should deactivate sources on end', function() {
    var a, b, bus, c, i, j, len, len1, obs, ref1, ref2, results;
    a = stream();
    b = prop();
    c = stream();
    bus = kefirBus().plug(a).plug(b).plug(c);
    bus.onEnd(function() {});
    ref1 = [a, b, c];
    for (i = 0, len = ref1.length; i < len; i++) {
      obs = ref1[i];
      expect(obs).toBeActive();
    }
    bus.end();
    ref2 = [a, b, c];
    results = [];
    for (j = 0, len1 = ref2.length; j < len1; j++) {
      obs = ref2[j];
      results.push(expect(obs).not.toBeActive());
    }
    return results;
  });
});
