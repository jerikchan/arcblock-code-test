import { mount } from '@vue/test-utils';
import ArcButton from './ArcButton.vue';
import { describe, expect, test } from 'vitest';

describe('ArcButton.vue', () => {
  test('renders the correct style for type default', () => {
    const type = 'default';
    const wrapper = mount(ArcButton, {
      props: { type },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-indigo-500', 'hover:bg-indigo-400']));
  });

  test('renders the correct style for type radio', () => {
    const type = 'radio';
    const wrapper = mount(ArcButton, {
      props: { type },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-gray-500', 'hover:bg-gray-400']));
  });
});
