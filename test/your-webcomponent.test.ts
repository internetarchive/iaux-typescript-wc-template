import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import axe from 'axe-core';

import { fixture } from './fixture';
import type { YourWebComponent } from '../src/your-webcomponent';
import '../src/your-webcomponent';

describe('YourWebComponent', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`,
    );

    expect(el.title).toBe('Hey there');
    expect(el.counter).toBe(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`,
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).toBe(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent title="attribute title"></your-webcomponent>`,
    );

    expect(el.title).toBe('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`,
    );

    const results = await axe.run(el);
    expect(results.violations).toEqual([]);
  });
});
