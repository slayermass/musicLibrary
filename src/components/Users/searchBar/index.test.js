import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory } from 'history';
import queryString from 'query-string';
import { SearchBarComponent as Component } from './index';

configure({ adapter: new Adapter() });

const mockId = '15';
const mockName = 'ivan';
const mockEmail = 'y@y.ru';
const mockPhone = '8800';
const mockRole = 'merchant';

const history = createMemoryHistory('/users');

const mockRoles = {
  merchant: { name: 'Мерчант' }
};

describe(`--- test ${Component.name} ---`, () => {
  it('should be equal to the snapshot', () => {
    const wrapper = shallow(<Component
      location={{
        search: ''
      }}
      onSearch={() => {}}
      roles={mockRoles}
      history={{}}
    />);
    
    expect(wrapper).toMatchSnapshot();
  });
  
  it('test initial get parameters to state', () => {
    const query = new URLSearchParams({});

    query.set('id', mockId);
    query.set('name', mockName);
    query.set('email', mockEmail);
    query.set('phone', mockPhone);
    query.set('role', mockRole);

    const mockCallback = jest.fn(() => {});

    const wrapper = shallow(<Component
      location={{
        search: query.toString()
      }}
      onSearch={mockCallback}
      roles={mockRoles}
      history={history}
    />);

    expect(wrapper.state().id).toEqual(mockId);
    expect(wrapper.state().name).toEqual(mockName);
    expect(wrapper.state().email).toEqual(mockEmail);
    expect(wrapper.state().phone).toEqual(mockPhone);
    expect(wrapper.state().role).toEqual(mockRole);
  });
  
  it('test simulate input fields change', () => {
    const mockCallback = jest.fn(() => {});
    
    const wrapper = shallow(<Component
      location={{
        search: ''
      }}
      onSearch={mockCallback}
      roles={mockRoles}
      history={history}
    />);
    
    wrapper.find('#idInput').simulate('change', { target: { value: mockId } });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(wrapper.state().id).toEqual(mockId);
  
    wrapper.find('#nameInput').simulate('change', { target: { value: mockName } });
    expect(mockCallback.mock.calls.length).toBe(3);
    expect(wrapper.state().name).toEqual(mockName);
  
    wrapper.find('#emailInput').simulate('change', { target: { value: mockEmail } });
    expect(mockCallback.mock.calls.length).toBe(4);
    expect(wrapper.state().email).toEqual(mockEmail);
  
    wrapper.find('#phoneInput').simulate('change', { target: { value: mockPhone } });
    expect(mockCallback.mock.calls.length).toBe(5);
    expect(wrapper.state().phone).toEqual(mockPhone);
    
    wrapper.find('#roleInput').simulate('change', { target: { value: mockRole } });
    expect(mockCallback.mock.calls.length).toBe(6);
    expect(wrapper.state().role).toEqual(mockRole);
  
    // test mock values in url
    const searchParams = queryString.parse(history.location.search);
    expect(searchParams.id).toEqual(mockId);
    expect(searchParams.name).toEqual(mockName);
    expect(searchParams.email).toEqual(mockEmail);
    expect(searchParams.phone).toEqual(mockPhone);
    expect(searchParams.role).toEqual(mockRole);
  });
});
