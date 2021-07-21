import { html, LitElement, customElement } from 'lit-element';
import '../src/your-webcomponent';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <your-webcomponent title="Hello">
        <div slot="my-slot">Some slotted content</div>
      </your-webcomponent>
    `;
  }
}
