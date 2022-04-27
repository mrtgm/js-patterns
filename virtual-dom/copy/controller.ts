/**
 * const state = {
 *  count: 0
 * }
 * 
 * const actions = {
 *  countUp: (state) => {
 *    state += 1
 *  },
 *  setCount: (state, payload) => {
 *    state = payload
 *  }
 * }
 * 
 * const view = (state, actions) => h("div", null, children: [state.count])
 * 
 * const el = document.querySelctor("#app")
 * 
 * new App({
 *  el,
 *  view,
 *  state,
 *  actions
 * })
 */

import { VNode } from "./view";

const state = {
    count: 0
}

type State = typeof state;
type Actions<State> = { [action: string]: (state: State, ...data: any[]) => void }

interface AppConstructor {
    el: HTMLElement,
    view: (state: State, actions: Actions<State>) => VNode,
    state: State,
    actions: Actions<State>
}

//el に、現在の state と actions を渡して renderNode する
//dispatchAction で state を更新し、oldNode と newNode を比較して再レンダリングする

class App {
    private el: HTMLElement
    private state: State
    private view: (state: State, actions: Actions<State>) => VNode
    private actions: Actions<State>

    private oldNode: VNode | null = null;
    private newNode: VNode | null = null

    constructor(params: AppConstructor) {
        this.el = params.el
        this.state = params.state
        this.view = params.view
        this.actions = params.actions
    }

    dispatchActions() {

    }

    render() {
        this.newNode = this.view(this.state, this.actions);
    }
}
