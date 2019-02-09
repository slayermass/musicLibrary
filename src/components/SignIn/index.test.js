import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignInForm } from './index';

configure({ adapter: new Adapter() });

describe('--- test signin ---',() => {
  it('should be equal to the snapshot', () => {
    const wrapper = shallow(<SignInForm />);
    
    expect(wrapper).toMatchSnapshot();
  });
});
