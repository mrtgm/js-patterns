export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  countUp(data) {
    this.dispatcher.emit("COUNT_UP", data);
  }
}
