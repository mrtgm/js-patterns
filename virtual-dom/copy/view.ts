/**
 * h("div", { id: "id", onclick="()=>"}, children: "text")
 * h("div", { class: "parent" }, h("div", { class: "child" }, children:"child"))
 * ->
 * { el:"div", attributes: { id: "id", onclick="" }, children: ["text"]}
 * { el:"div", attributes: { class: "parent" }, children: [{ el: ... }]}
 * ->
 * <div id="id">text</div> (addEventListner)
 * <div class="parent"><div class="child"></div></div>
 */

type Attributes = {
    [key: string]: string | Function
}
export type VNode = {
    nodeName: keyof HTMLElementTagNameMap,
    attributes: Attributes,
    children: NodeType[]
}

type NodeType = VNode | string | number

function h(nodeName: keyof HTMLElementTagNameMap, attributes: Attributes, ...children: NodeType[]){
    return {
        el: nodeName,
        attributes: attributes,
        children: children
    }
}

function renderNode(node: NodeType){
    if(!isVNode(node)){
        return document.createTextNode(node.toString())
    }
    
    const el = document.createElement(node.nodeName);
    setAttributes(el, node.attributes);
    for(const child of node.children){
        el.appendChild(renderNode(child))
    }
    return el
}

function isVNode(node: NodeType): node is VNode{
    return typeof node !== "string" && typeof node !== "number"
}

function setAttributes(el: HTMLElement, attributes: Attributes): void{
    for (const attribute in attributes){
        if(isEvent(attribute)){
            const eventName = attribute.substring(2) as keyof HTMLElementEventMap
            const event = attributes[attribute] as EventListener
            el.addEventListener(eventName, event);
            return
        }
        el.setAttribute(attribute, attributes[attribute] as string)
    }
}

function isEvent(attribute: string): boolean{
    return attribute.indexOf("on") > -1
}