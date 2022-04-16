import { useState } from "react";
import ActionCreator from "./ActionCreator";
import EventEmitter from "./EventEmitter";
import Store from "./Store";

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

function App() {
  const [count, setCount] = useState(store.getCount());
  const tick = () => action.countUp(count + 1);

  store.on("CHANGE", () => {
    setCount(store.getCount());
  });

  return (
    <div className="App">
      {count}
      <button onClick={() => tick()}> Count Up </button>
    </div>
  );
}

export default App;
