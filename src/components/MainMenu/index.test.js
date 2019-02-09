import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MainMenuComponent as component } from './index';

configure({ adapter: new Adapter() });

describe(`--- test ${component.name} ---`,() => {
  it('should be equal to the snapshot', () => {
    const wrapper = shallow(<component />);
    
    expect(wrapper).toMatchSnapshot();
  });
});
