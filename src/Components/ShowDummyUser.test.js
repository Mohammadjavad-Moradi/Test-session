import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import api from '../utils/api';

import ShowDummyUser from './ShowDummyUser';

jest.mock('../utils/api.js');

describe('ShowDummyUser', () => {
  it('display initial state of "no user" then show user data after successful fetch', async () => {
    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve({ id: 1, name: 'John Doe', email: 'john.doe@example.com' }),
    //   })
    // );

    api.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    
    render(<ShowDummyUser />);

    const noUser = screen.getByRole('heading', {name: /no user/i});

    expect(noUser).toBeInTheDocument();

    await waitFor(async () => {
      const userName = await screen.findByRole('heading', {level: 1, name: /John Doe/i});
  
      expect(userName).toBeInTheDocument();
    })

    await waitFor(async () => {
      const userEmail = await screen.findByRole('heading', {level: 2, name: /john.doe@example.com/i});
      expect(userEmail).toBeInTheDocument();
    })
  })

  it('display error message when fetch data failed', async () => {
    // global.fetch = jest.fn(() => Promise.reject('fails'));
    api.mockResolvedValue(Promise.reject({}));

    render(<ShowDummyUser />);

    await waitFor(async () => {
      const errorMessage = screen.getByRole('heading', {name: /Something went wrong/i});

      expect(errorMessage).toBeInTheDocument();
    })
  })

  it('display "no any other user remains" instead of button after 2 click on button', async () => {
    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve({ id: 1, name: 'John Doe', email: 'john.doe@example.com' }),
    //   })
    // );
    api.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });

    render(<ShowDummyUser />);

    const button = screen.getByRole('button', {name: /Get user/i});
    userEvent.click(button);
    userEvent.click(button);

    await waitFor(async () => {
      const noUserPhrase = await screen.findByText('no any other user remains');

      expect(noUserPhrase).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  })
})