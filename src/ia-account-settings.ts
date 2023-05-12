/* eslint-disable */
import { html, css, LitElement, CSSResultGroup, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { AccountSettings } from './styles/account-settings';
import { MailingLists } from './config';
import { IAAccountSettingsInterface } from './ia-account-settings.interface';
import { UserModel, NewsLetterModel, ErrorModel } from './models';
import { BackendServiceHandler } from './services/backend-service';
import '@internetarchive/ia-activity-indicator/ia-activity-indicator';

import './components/ia-pic-uploader';
import './components/authentication-template';

@customElement('ia-account-settings')
export class IAAccountSettings
  extends LitElement
  implements IAAccountSettingsInterface
{
  /**
   * contains user information
   *
   * @type {UserModel}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) userData: UserModel = {};

  /**
   * contains newsletter selected data of current user
   *
   * @type {NewsLetterModel}
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) newsletterData: NewsLetterModel = {};

  /**
   * loan history visibility
   *
   * @memberof IAUXAccountSettings
   */
  @property({ type: String }) loanHistoryFlag = '';

  /**
   * contains error data for form fields
   *
   * @private
   * @type {ErrorModel}
   * @memberof IAUXAccountSettings
   */
  @state() private fieldsError: ErrorModel = {};

  /**
   * preview image on iaux-pic-uploader component
   *
   * @private
   * @memberof IAUXAccountSettings
   */
  @state() private previewImg =
    'https://i.ebayimg.com/images/g/LpwAAOSwhcJWF1UM/s-l500.jpg';

  /**
   * determine if need to show loading indicator on buttons
   * @private
   * @type {boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private showLoadingIndicator?: boolean;

  /**
   * determine if want to show authenticate page
   *
   * @private
   * @type {boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private lookingToAuth?: boolean = false;

  /**
   * open delete form
   *
   * @private
   * @type {boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private attemptToDelete?: boolean;

  /**
   * enable delete button when you make sure
   *
   * @private
   * @type {boolean}
   * @memberof IAUXAccountSettings
   */
  @state() private deleteButton?: boolean = true;

  updated(changed: PropertyValues) {
    if (changed.has('userData')) {
      this.showLoadingIndicator = false;
    }
  }

  render() {
    return html`
      <main id="maincontent">
        <div class="container">
          ${this.lookingToAuth
            ? this.verificationTemplate
            : this.settingsTemplate}
        </div>
      </main>
    `;
  }

  /** @inheritdoc */
  setScreenname(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userData.screenname = input.value;
    this.fieldsError.screenname = '';
  }

  /** @inheritdoc */
  setEmail(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userData.email = input.value;
    this.fieldsError.email = '';
  }

  /** @inheritdoc */
  setPassword(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userData.password = input.value;
    this.fieldsError.password = '';
  }

  /** @inheritdoc */
  setBorrowHistory(e: Event) {
    const input = e.target as HTMLInputElement;
    this.userData.borrowHistory = 'public';
    console.log(input.checked);
  }

  /** @inheritdoc */
  setNewsletterData(e: Event) {
    const input = e.target as HTMLInputElement;
    const fieldName = input.name;
    if (fieldName === 'mailing_lists_ml_best_of') {
      this.newsletterData.ml_best_of = true;
    } else if (fieldName === 'mailing_lists_ml_events') {
      this.newsletterData.ml_events = true;
    } else if (fieldName === 'mailing_lists_ml_donors') {
      this.newsletterData.ml_donors = true;
    }
  }

  /** @inheritdoc */
  trimScreenname() {
    return this.userData.screenname.replace('/s+/', ' ').trim();
  }

  /** @inheritdoc */
  async validateScreenname() {
    this.trimScreenname();

    if (this.userData.screenname === '') {
      this.fieldsError.screenname = 'Screen name can not be empty.';
    } else if (this.userData.screenname.match('/[\\\\"\']/')) {
      this.fieldsError.screenname = 'Invalid screen name';
    } else if (await !this.isScreennameAvailable()) {
      this.fieldsError.screenname =
        'This screen name is already being used by another user.';
    }
  }

  /** @inheritdoc */
  async validateEmail() {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (this.userData.email === '') {
      this.fieldsError.email = 'Email address can not be empty.';
    } else if (!this.userData.email.match(emailRegex)) {
      this.fieldsError.email =
        'Email address contains invalid characters and/or whitespace.';
    } else if (await !this.isEmailAvailable()) {
      this.fieldsError.email =
        'This email address is already being used by another user.';
    }
  }

  /** @inheritdoc */
  async validatePassword() {}

  /** @inheritdoc */
  async isEmailAvailable() {
    const response = await BackendServiceHandler({
      action: 'email-available',
      identifier: 'this.identifier',
    });

    return response;
  }

  /** @inheritdoc */
  async isScreennameAvailable() {
    const response = await BackendServiceHandler({
      action: 'screenname-available',
      identifier: 'this.identifier',
    });

    return response;
  }

  /**
   * handle to save user account settings
   *
   * @param {Event} event
   * @memberof IAUXAccountSettings
   */
  async saveAccountSettings(event: Event) {
    this.showLoadingIndicator = true;

    event.preventDefault();
    event.stopPropagation();

    // await this.validateScreenname();
    // await this.validateEmail();
    // await this.validatePassword();

    if (
      !this.fieldsError.email ||
      !this.fieldsError.screenname ||
      !this.fieldsError.password
    ) {
      console.log('something is wrong');

      const response = await BackendServiceHandler({
        action: 'save-account',
        identifier: 'this.identifier',
        userdata: this.userData,
        newsletterData: this.newsletterData,
      });
      console.log(response);

      setTimeout(() => {
        this.showLoadingIndicator = false;
      }, 2000);
    }
  }

  get verificationTemplate() {
    return html` <authentication-template
      authenticationType="ia"
      @ia-authenticated=${(e: Event) => {
        this.lookingToAuth = false;
      }}
    ></authentication-template>`;
  }

  get settingsTemplate() {
    return html`<div class="settings-template">
      <form name="account-settings" method="POST">
        <div class="form-element header">
          <h2>Account Settings</h2>
          <button class="${this.showLoadingIndicator ? 'pointer-none' : ''}">
            Cancel
          </button>
          <button
            id="save-button"
            class=${this.showLoadingIndicator ? 'pointer-none' : ''}
            type="button"
            @click=${this.saveAccountSettings}
          >
            ${this.showLoadingIndicator
              ? this.loadingIndicatorTemplate
              : 'Save Changes'}
          </button>
        </div>

        <div class="form-element">
          <label>Change profile picture</label>
          <ia-pic-uploader previewImg=${this.previewImg}></ia-pic-uploader>
        </div>

        <div class="form-element ">
          <label for="screenname">
            Change screenname <small>(will not change user id)</small>
          </label>
          <input
            type="text"
            class="form-control"
            id="screenname"
            name="screenname"
            value="${this.userData.screenname}"
            @input=${this.setScreenname}
          />
          <span class="error-field">${this.fieldsError.screenname}</span>
        </div>

        <div class="form-element">
          <label for="email">
            Change email <small>(verification will be required)</small>
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            value="${this.userData.email}"
            @input=${this.setEmail}
          />
          <span class="error-field">${this.fieldsError.email}</span>
        </div>

        <div class="form-element">
          <label for="password">
            Change Internet Archive / Open Library Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            autocomplete="new-password"
          />
          <span class="error-field">${this.fieldsError.password}</span>
        </div>

        <div class="form-element">
          <label>Set borrow histing</label>
          <input
            type="checkbox"
            id="borrow-history"
            name="borrow-history ${this.loanHistoryFlag}"
            .checked=${this.loanHistoryFlag == 'public' ? 'true' : ''}
            @click=${this.setBorrowHistory}
          />
          <label for="borrow-history"> Visible to the public</label>
        </div>

        <div class="form-element newsletter">
          <label>Newsletter subscriptions</label>
          <p>
            Stay up to date with what's happening at the Internet Archive by
            signing up for our free newsletters
          </p>
          ${this.mailingListsTemplate}
        </div>

        <div class="form-element">
          <label for="vehicle5"
            >Linked to third party accounts (e.g. Google)</label
          >
          ${this.linkedAccountTemplate}
        </div>

        <div
          class="form-element delete-link ${this.attemptToDelete ? 'hide' : ''}"
        >
          <a
            href="javascript:void(0)"
            style="color: #bb0505"
            @click=${(e: Event) => {
              this.attemptToDelete = true;
              window.scrollTo();
            }}
            >Delete Internet Archive / Open Library Account (require
            confirmation)
          </a>
        </div>

        ${this.attemptToDelete ? this.deleteAccountTemplate : ''}
      </form>

      ${this.userData.isAdmin ? this.adminFunctionsTemplate : ''};
    </div>`;
  }

  get mailingListsTemplate() {
    return MailingLists.map(list => {
      if (!list.public) return html``;

      return html`<input
          type="checkbox"
          id="${list.key}"
          name="mailing_lists_${list.key}"
          .checked=${this.newsletterData?.hasOwnProperty(list.key)}
          @click=${this.setNewsletterData}
        />
        <label for="${list.key}"> ${list.name}: ${list.short_desc}</label
        ><br /> `;
    });
  }

  get linkedAccountTemplate() {
    return html` <input
        name="linked-account"
        id="linked-account"
        type="radio"
      />
      <label for="linked-account"> Google Account</label>`;
  }

  get loadingIndicatorTemplate() {
    return html` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`;
  }

  get deleteAccountTemplate() {
    return html`
      <div class="form-element delete-account">
        <label>Delete Internet Archive / Open Library Account</label>
        <p>
          Items you've uploaded will remain on the internet archive. If you with
          to remove items,<br />
          please do so before delete your account.
        </p>
        <a
          href="https://help.archive.org/help/how-do-i-delete-my-account/"
          target="_blank"
          >Click here for instructions on removing your items.</a
        ><br />

        <input
          type="checkbox"
          id="delete-account"
          name=""
          @click=${() => {
            this.deleteButton = !this.deleteButton;
          }}
        />
        <label for="delete-account">
          I'm sure I want to delete my account.</label
        >

        <p for="borrow-history">This action cannot be reversed.</p>

        <button
          id="delete-button"
          class="delete-button ${this.showLoadingIndicator
            ? 'pointer-none'
            : ''}"
          type="button"
          .disabled=${this.deleteButton}
          @click=${async () => {
            this.showLoadingIndicator = true;

            const response = await BackendServiceHandler({
              action: 'delete-account',
              identifier: 'this.identifier',
            });
            console.log(response);
          }}
        >
          ${this.showLoadingIndicator
            ? this.loadingIndicatorTemplate
            : 'Delete account'}
        </button>
      </div>
    `;
  }

  get adminFunctionsTemplate() {
    return html`<div class="col-md-4">
      <div class="form-element admin-functions">
        <h2>
          You are an admin!
          <span class="iconochive-First" aria-hidden="true"></span
          ><span class="icon-label sr-only">First</span>
        </h2>
        <hr />
        <ul>
          <li>
            <a href="https://pi.archive.org/control/setadmin.php"
              >Grant or revoke administrator privileges</a
            >
          </li>
          <li>
            <a href="https://pi.archive.org/control/useradmin.php"
              >User Administration</a
            >
          </li>
          <li>
            <a href="/iathreads/forum-new.php">Make a new Forum</a>
          </li>
          <li>
            <a href="https://pi.archive.org/control/blockparty.php"
              >Block Party</a
            >
          </li>
        </ul>
      </div>

      <img
        src="https://soshace.com/wp-content/uploads/rcl-uploads/articles/2019/12/4915113.jpg"
        width="200"
      />
    </div>`;
  }

  static get styles(): CSSResultGroup {
    return [
      AccountSettings,
      css`
        :host {
          display: block;
          padding: 25px;
          color: var(--iaux-account-settings-text-color, #000);
          font-size: 1.4rem;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      `,
    ];
  }
}
