import { html } from 'lit';
import { afterEach, describe, expect, it, vi } from 'vitest';

import '../src/your-webcomponent';
import type { YourWebComponent } from '../src/your-webcomponent';
import { fixture } from './fixture';

/**
 * Examples of mocking with Vitest's built-in `vi` helpers, using this
 * template's component. Delete this file when you scaffold your own component.
 *
 * For mocking an imported module (rather than a function or method), see
 * `vi.mock()`: https://vitest.dev/api/vi.html#vi-mock
 */
describe('Vitest mocking examples', () => {
  // Restore any spies created with vi.spyOn() so they don't leak between tests.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('vi.fn(): a mock function records how it was called', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`,
    );

    // A mock function stands in for a real listener and captures its calls.
    const onIncrement = vi.fn<(e: Event) => void>();
    el.addEventListener('counterIncremented', onIncrement);

    el.shadowRoot!.querySelector('button')!.click();

    expect(onIncrement).toHaveBeenCalledOnce();
    // Inspect the argument the listener received.
    const event = onIncrement.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({ newCount: 6 });
  });

  it('vi.spyOn(): wrap a real method to assert how it was called', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`,
    );

    // A spy wraps the real method; it still runs unless you replace it below.
    const dispatchSpy = vi.spyOn(el, 'dispatchEvent');

    el.shadowRoot!.querySelector('button')!.click();

    expect(dispatchSpy).toHaveBeenCalledOnce();
    expect(dispatchSpy.mock.calls[0][0]).toBeInstanceOf(CustomEvent);
  });

  it('mockImplementation(): replace a method to control a code path', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`,
    );

    // Replace the method's behavior entirely — here, swallow the dispatch.
    const dispatchSpy = vi
      .spyOn(el, 'dispatchEvent')
      .mockImplementation(() => true);

    el.shadowRoot!.querySelector('button')!.click();

    // The click still incremented the counter, but no event actually fired.
    expect(el.counter).toBe(6);
    expect(dispatchSpy).toHaveBeenCalledOnce();
  });
});
