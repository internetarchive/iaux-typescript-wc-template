var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {html, css, LitElement, property, customElement} from "../../_snowpack/pkg/lit-element.js";
export let YourWebComponent = class extends LitElement {
  constructor() {
    super(...arguments);
    this.title = "Hey there";
    this.counter = 5;
  }
  __increment() {
    this.counter += 1;
  }
  render() {
    return html`
      <h2>${this.title}, Number: ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
      <slot name="my-slot"> </slot>
    `;
  }
};
YourWebComponent.styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--your-webcomponent-text-color, #000);
    }
  `;
__decorate([
  property({type: String})
], YourWebComponent.prototype, "title", 2);
__decorate([
  property({type: Number})
], YourWebComponent.prototype, "counter", 2);
YourWebComponent = __decorate([
  customElement("your-webcomponent")
], YourWebComponent);
