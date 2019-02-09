import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WithAuthorizationComponent } from './withAuthorization';

configure({ adapter: new Adapter() });

describe('--- testing hoc authentication ---', () => {
  it('redirect to index', () => {
    const mockFirebase = {
      auth: {
        onAuthStateChanged: (f) => {
          f();
        }
      }
    };
    
    const mockHistory = {
      push: jest.fn()
    };

    shallow(<WithAuthorizationComponent firebase={mockFirebase} history={mockHistory} location={{ pathname: '' }} />);
    expect(mockHistory.push.mock.calls.length).toEqual(1); // вызывается редирект
  });
  
  it('pass further', () => {
    const mockFirebase = {
      auth: {
        onAuthStateChanged: (f) => {
          f({ authUser: { test: 1 } });
        }
      }
    };
  
    // пользователь есть - идет дальше
    shallow(<WithAuthorizationComponent firebase={mockFirebase} listener={() => {}} location={{ pathname: '' }} />);
  });
});
