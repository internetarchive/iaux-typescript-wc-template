import { LitElement } from 'lit';

export interface IAAccountSettingsInterface extends LitElement {
  /**
   * set screenname in UserModel
   *
   * @param {Event} e
   * @memberof IAAccountSettingsInterface
   */
  setScreenname(e: Event): void;

  /**
   * set email in UserModel
   *
   * @param {Event} e
   * @memberof IAAccountSettingsInterface
   */
  setEmail(e: Event): void;

  /**
   * set password in UserModel
   *
   * @param {Event} e
   * @memberof IAAccountSettingsInterface
   */
  setPassword(e: Event): void;

  /**
   * set user loan history visiblility preferences
   *
   * @param {Event} e
   * @memberof IAAccountSettingsInterface
   */
  setBorrowHistory(e: Event): void;

  /**
   * set newsletter data selection in NewsLetterModel
   *
   * @param {Event} e
   * @memberof IAAccountSettingsInterface
   */
  setNewsletterData(e: Event): void;

  /**
   * get trimmed screenname
   *
   * @return {*}  {string}
   * @memberof IAAccountSettingsInterface
   */
  trimScreenname(): string;

  /**
   * validate the screenname and set error in ErrorModel
   *
   * @return {*}  {Promise<void>}
   * @memberof IAAccountSettingsInterface
   */
  validateScreenname(): Promise<void>;

  /**
   * validate the email and set error in ErrorModel
   *
   * @return {*}  {Promise<void>}
   * @memberof IAAccountSettingsInterface
   */
  validateEmail(): Promise<void>;

  /**
   * after validation, save the account setting
   *
   * @param {Event} e
   * @return {*}  {Promise<void>}
   * @memberof IAAccountSettingsInterface
   */
  saveAccountSettings(e: Event): Promise<void>;
}
