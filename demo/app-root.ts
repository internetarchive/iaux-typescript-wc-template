import { html, css, LitElement, customElement } from 'lit-element';
import '../src/your-webcomponent';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <your-webcomponent title="Hello">
        <div slot="my-slot">Some LightDOM Content</div>
      </your-webcomponent>
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
