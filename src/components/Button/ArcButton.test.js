// @vitest-environment happy-dom

import { mount } from '@vue/test-utils';
import ArcButton from './ArcButton.vue';
import { describe, expect, test } from 'vitest';

describe('ArcButton.vue', () => {
  test('renders the correct style for default', () => {
    const type = 'default';
    const wrapper = mount(ArcButton, {
      props: { type },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-indigo-500', 'hover:bg-indigo-400']));
  });
});
