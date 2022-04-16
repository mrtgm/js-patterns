import EventEmitter from "./EventEmitter";

export default class Store extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.count = 0;
    this.dispatcher = dispatcher;
    this.dispatcher.on("COUNT_UP", this.setCount.bind(this));
    //ここでは、this をバインドしないと呼び出し元で this が失われる可能性あるのでわかる
  }

  getCount() {
    return this.count;
  }

  setCount(data) {
    console.log(this);
    if (this.count === data) return;
    this.count = data;
    this.emit("CHANGE"); //store 自身の eventEmitter でやってるからか
  }
}
