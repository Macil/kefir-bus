/* @flow */

import {Observable, Event} from 'kefir';

export interface Bus<V,E> extends Observable<V,E> {
  value(value: V): Bus<V,E>;
  event(event: Event<V|E>): Bus<V,E>;
  error(e: E): Bus<V,E>;
  end(): Bus<V,E>;

  emit(value: V): Bus<V,E>;
  emitEvent(event: Event<V|E>): Bus<V,E>;

  plug(s: Observable<V,E>): Bus<V,E>;
  unplug(s: Observable<V,E>): Bus<V,E>;
}

export default function kefirBus<V,E>(): Bus<V,E>;
