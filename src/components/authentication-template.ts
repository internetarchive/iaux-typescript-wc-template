/* eslint-disable */
import { html, css, LitElement, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { AccountSettings } from '../styles/account-settings';
import { ServiceResponseModel } from '../models';
import { BackendServiceHandler } from '../services/backend-service';

import '@internetarchive/ia-activity-indicator/ia-activity-indicator';

@customElement('authentication-template')
export class AuthenticationTemplate extends LitElement {
  @property({ type: String }) authenticationType?: string;
  @property({ type: String }) previewImg = '';

  @state() private showLoadingIndicator?: boolean;

  async authenticationIAPassword() {
    const response = (await BackendServiceHandler({
      action: 'authentication-password',
      identifier: 'this.identifier',
    })) as ServiceResponseModel;

    if (response.status) console.log(response);

    this.dispatchEvent(
      new CustomEvent('ia-authenticated', {
        detail: { hi: 'hello' },
      })
    );
  }

  render() {
    console.log(this.authenticationType);
    return html`
      <div class="authentication-template">
        <form name="authentication-settings" method="POST">
          <div class="form-element">
            <h2>Account Settings</h2>
          </div>
          ${
            this.authenticationType === 'ia'
              ? this.iaPasswordVerification
              : this.googleVerification
          } 
        </form>
      </div
    `;
  }

  get iaPasswordVerification() {
    return html`
      <p>
        Please authentication your password again to change protected settings.
      </p>
      <div class="form-element">
        <label for="password">Internet Archive password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          value=""
        />
        <a href="#">Forgot password?</a>
        <span class="error-field"></span>
      </div>
      <div class="form-element">
        <button
          id="save-button"
          class=${this.showLoadingIndicator ? 'pointer-none' : ''}
          type="button"
          @click=${() => {
            this.authenticationIAPassword();
          }}
        >
          ${this.showLoadingIndicator
            ? html` <ia-activity-indicator
                mode="processing"
                class="go-button-loading-icon"
              ></ia-activity-indicator>`
            : 'Verify password'}
        </button>
      </div>
    `;
  }

  get googleVerification() {
    return html`
      <p>Please sign in again to change protected settings.</p>
      <div class="form-element">
        <img src="https://archive.org/images/google_signin.svg" />
        <a href="#">Prefer to use your Internet Archive password?</a>
      </div>
    `;
  }

  /**
   * CSS
   */
  static get styles(): CSSResultGroup {
    return [AccountSettings, css``];
  }
}
