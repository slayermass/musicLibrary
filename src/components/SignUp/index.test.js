import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUpForm } from './index';

configure({ adapter: new Adapter() });

describe('--- test signup ---',() => {
  it('should be equal to the snapshot', () => {
    const wrapper = shallow(<SignUpForm />);
    
    expect(wrapper).toMatchSnapshot();
  });
});
