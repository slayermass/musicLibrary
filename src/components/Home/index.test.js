import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomeComponent } from './index';

configure({ adapter: new Adapter() });

describe('--- test main ---', () => {
  it('should be equal to the snapshot', () => {
    const wrapper = shallow(<HomeComponent />);
    
    expect(wrapper).toMatchSnapshot();
  });
});
