import React from 'react';
import { shallow } from 'enzyme';
import { CompanionArea } from '../../../src/components/CompanionArea';
import CompanionWindow from '../../../src/containers/CompanionWindow';

/** */
function createWrapper(props) {
  return shallow(
    <CompanionArea
      windowId="abc123"
      companionWindows={[
        { position: 'right', id: 'foo' },
        { position: 'right', id: 'baz' },
      ]}
      {...props}
    />,
  );
}

describe('CompanionArea', () => {
  it('should render all <CompanionWindow>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionWindow).length).toBe(2);
  });

  it('should pass correct props to the <CompanionWindow> components', () => {
    const wrapper = createWrapper();
    const props = wrapper.find(CompanionWindow).at(0).props();
    expect(props.id).toBe('foo');
    expect(props.windowId).toBe('abc123');
  });
});