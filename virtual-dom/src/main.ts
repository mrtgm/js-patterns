import { h } from "./view";

console.log(
  h(
    "div",
    { id: "app" },
    h("button", { type: "button", id: "counter", onclick: () => {} }, "text")
  )
);
