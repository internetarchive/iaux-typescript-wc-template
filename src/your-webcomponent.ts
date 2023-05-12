import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('your-webcomponent')
export class YourWebComponent extends LitElement {
  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) counter = 5;

  private increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h2>${this.title}, Number: ${this.counter}!</h2>
      <button @click=${this.increment}>increment</button>
      <slot name="my-slot"> </slot>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--your-webcomponent-text-color, #000);
    }
  `;
}
