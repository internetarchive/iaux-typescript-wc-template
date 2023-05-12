// import { html, fixture, expect } from '@open-wc/testing';

// import type { IAUXAccountSettings } from '../src/iaux-account-settings';
// import '../src/iaux-account-settings';

// describe('IAUXAccountSettings', () => {
//   it('has a default title "Hey there" and counter 5', async () => {
//     const el = await fixture<IAUXAccountSettings>(
//       html`<iaux-account-settings></iaux-account-settings>`
//     );

//     expect(el.title).to.equal('Hey there');
//     expect(el.counter).to.equal(5);
//   });

//   it('increases the counter on button click', async () => {
//     const el = await fixture<IAUXAccountSettings>(
//       html`<iaux-account-settings></iaux-account-settings>`
//     );
//     el.shadowRoot!.querySelector('button')!.click();

//     expect(el.counter).to.equal(6);
//   });

//   it('can override the title via attribute', async () => {
//     const el = await fixture<IAUXAccountSettings>(
//       html`<iaux-account-settings title="attribute title"></iaux-account-settings>`
//     );

//     expect(el.title).to.equal('attribute title');
//   });

//   it('passes the a11y audit', async () => {
//     const el = await fixture<IAUXAccountSettings>(
//       html`<iaux-account-settings></iaux-account-settings>`
//     );

//     await expect(el).shadowDom.to.be.accessible();
//   });
// });
