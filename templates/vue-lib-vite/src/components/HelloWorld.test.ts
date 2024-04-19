import { render, fireEvent } from '@testing-library/vue';

import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld', () => {
  it('renders properly', () => {
    const msg = 'Hello Vitest';
    const { getByText } = render(HelloWorld, { props: { msg } });
    getByText(msg);
  });

  it('increments count on button click', async () => {
    const { getByText } = render(HelloWorld);
    const button = getByText('count is 0');
    await fireEvent.click(button);
    getByText('count is 1');
  });
});
