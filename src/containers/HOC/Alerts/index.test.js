import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WithAlertsHOC as Component } from './index';

configure({
  adapter: new Adapter(),
});

// не важно какой компонент внутри
const TestComponent = () => (
  <p>1</p>
);

const HOCComponent = Component(TestComponent);

describe(`--- test ${Component.name} ---`, () => {
  it('should call enqueueSnackbar as many times as alerts.length', () => {
    const clearAlerts = jest.fn(() => {});
    const enqueueSnackbar = jest.fn(() => {});
    const alerts = new Array(parseInt(Math.random() * 50, 10) + 1);
    
    alerts.fill({
      message: 'test',
      variant: 'success',
    });
    
    const wrapper = shallow(<HOCComponent
      clearAlerts={clearAlerts}
      enqueueSnackbar={enqueueSnackbar}
      alerts={alerts}
    />);
    
    wrapper.setState({}); // didUpdate
    
    expect(clearAlerts.mock.calls.length).toBe(1);
    expect(enqueueSnackbar.mock.calls.length).toBe(alerts.length);
  });
  
  it('should not call enqueueSnackbar and clearAlerts', () => {
    const clearAlerts = jest.fn(() => {});
    const enqueueSnackbar = jest.fn(() => {});
    
    const wrapper = shallow(<HOCComponent
      clearAlerts={clearAlerts}
      enqueueSnackbar={enqueueSnackbar}
      alerts={[]}
    />);
    
    wrapper.setState({}); // didUpdate
    
    expect(clearAlerts.mock.calls.length).toBe(0);
    expect(enqueueSnackbar.mock.calls.length).toBe(0);
  });
  
  it('should return the same data as passing', () => {
    const clearAlerts = jest.fn(() => {});
    const enqueueSnackbar = jest.fn((message, variant) => {
      return {
        message,
        variant,
      };
    });
    const alerts = new Array(parseInt(Math.random() * 50, 10) + 1);
    
    alerts.fill({
      message: 'test',
      variant: 'success',
    });
    
    const wrapper = shallow(<HOCComponent
      clearAlerts={clearAlerts}
      enqueueSnackbar={enqueueSnackbar}
      alerts={alerts}
    />);
    
    wrapper.setState({}); // didUpdate
    
    alerts.forEach((_, i) => {
      expect(enqueueSnackbar.mock.calls[i][0]).toBe('test');
      expect(enqueueSnackbar.mock.calls[i][1]).toEqual({ variant: 'success' });
    });
  });
});
