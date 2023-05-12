/* eslint-disable */
import { LitElement } from 'lit';
import { state } from 'lit/decorators';
// import { property } from "lit/decorators";

// import ActionsHandlerService from "./fetch";
export interface Results {
  status: boolean;
  error: string;
  body: string;
}
export default class IAFieldValidator {
  private email = '';

  private screenname = '';

  private password = '';

  private result!: Results;

  constructor(fields: any) {
    console.log(fields);
    this.email = fields?.email;
    this.screenname = fields.screenname;
    this.password = fields.password;

    // this.result.status = true;
  }

  emailValidation() {
    console.log(this.result);
    // this.result.status = true;

    // this.email = value;
    if (this.email === '') {
      // this.emailError = 'cant be empty';
      this.result.error = 'cant be empty';
    } else if (
      this.email?.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      this.result.error =
        '1Email address contains invalid characters and/or whitespace.';
    } else {
      // this.isEmailAvailable();
    }

    if (this.result.error) {
      this.result.status = false;
      return this.result;
    }

    // if (this.emailError) {
    //   return { status: false, error: this.emailError };
    // }
  }

  async authenticationScreenname() {
    this.trimScreenname();

    const error = '';
    if (this.screenname === '') {
      // this.screennameError = 'cant be empty';
    } else if (this.screenname.match('/[\\\\"\']/')) {
      // this.screennameError = 'invalid screen name';
    } else {
      // this.isScreennameAvailable();
    }
    console.log(error);
  }

  trimScreenname() {
    return this.screenname.replace('/s+/', ' ').trim();
  }

  isEmailAvailable() {
    throw new Error('Method not implemented.');
  }
}
