import { html, fixture, expect } from '@open-wc/testing';

import { TypescriptTemplate } from '../src/typescript-template';
import '../typescript-template';

describe('TypescriptTemplate', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<TypescriptTemplate>(
      html`<typescript-template></typescript-template>`
    );

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<TypescriptTemplate>(
      html`<typescript-template></typescript-template>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<TypescriptTemplate>(
      html`<typescript-template title="attribute title"></typescript-template>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<TypescriptTemplate>(
      html`<typescript-template></typescript-template>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
