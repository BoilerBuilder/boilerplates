import { describe, it, expect, beforeEach } from 'vitest';

import { _counter } from '../src/_counter';

describe('_counter', () => {
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    buttonElement = document.createElement('button');
    document.getElementById('app')?.appendChild(buttonElement);
  });

  it('should initialize the count to 0', () => {
    _counter(buttonElement);
    expect(buttonElement.textContent).toBe('count is 0');
  });

  it('should increment the count when the element is clicked', () => {
    _counter(buttonElement);
    buttonElement.click();
    expect(buttonElement.textContent).toBe('count is 1');
  });

  it('should increment the count multiple times when the element is clicked multiple times', () => {
    _counter(buttonElement);
    buttonElement.click();
    buttonElement.click();
    buttonElement.click();
    expect(buttonElement.textContent).toBe('count is 3');
  });
});
