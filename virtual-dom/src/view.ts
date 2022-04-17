type NodeType = VNode | string | number;
type Attributes = { [key: string]: string | Function };

export interface View<State, Actions> {
  (state: State, actions: Actions): VNode;
}

/**
 * 仮想DOM
 */
export interface VNode {
  nodeName: keyof HTMLElementTagNameMap;
  attributes: Attributes;
  children: NodeType[];
}

/**
 * 仮想DOMを作成する
 */
export function h(nodeName: keyof HTMLElementTagNameMap, attributes: Attributes, ...children: NodeType[]): VNode {
  return { nodeName, attributes, children };
}
