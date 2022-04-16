/**
 * @fileoverview Simple EventEmiter
 *
 * @example
 * const EventEmitter = new EventEmitter()
 * EventEmitter.on('myFunc', function(){})
 * EventEmitter.emit('myFunc', data)
 * EventEmitter.off('myFunc')
 */

export default class EventEmitter {
  constructor() {
    this._handlers = {};
  }

  on(type, handler) {
    if (!this._handlers[type]) this._handlers[type] = [];
    this._handlers[type].push(handler);
  }

  off(type, handler) {
    if (!this._handlers[type]) return;
    const index = this._handlers[type].findIndex(handler);
    this._handlers[type].splice(index, 1);
  }

  emit(type, data) {
    if (!this._handlers[type]) return;
    const handlers = this._handlers[type];
    for (const handler of handlers) {
      handler.call(this, data);

      //関数内で呼ばれた this は strict だと undefined になる
      //クラス内での関数呼び出しはとりあえず bind しとけ、みたいなノリがあったのかな・・・
    }
  }
}
