import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UserData from './UserData';

describe('UserData', () => {
  it('display user name and email', () => {
    render(<UserData user={{name: 'john', email: 'test@test.com'}} />);

    const userName = screen.getByRole('heading', {level: 1, name: 'john'});
    const email = screen.getByRole('heading', {level: 2});

    expect(userName).toBeInTheDocument();
    expect(email.textContent).toEqual('test@test.com');
  })
})