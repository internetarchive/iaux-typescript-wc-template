import { html, css, LitElement } from 'https://offshoot.ux.archive.org/lit.js';
import { customElement } from 'https://offshoot.ux.archive.org/lit/decorators.js';
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

  static styles = css`
    :host {
      display: block;
    }
  `;
}
