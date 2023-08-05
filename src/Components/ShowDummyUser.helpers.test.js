import { fetchUser, handleClick } from "./ShowDummyUser.helpers";
import api from '../utils/api';

jest.mock('../utils/api.js');

describe('fetch user', () => {
  const setError = jest.fn();
  const setUser = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('call setUser when fetch is successful', async () => {
    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve({ id: 1, name: 'John Doe', email: 'john.doe@example.com' }),
    //   })
    // );

    api.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });

    await fetchUser({setError, setUser, currentId: 1});

    expect(setUser).toHaveBeenCalledWith({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
  });

  it('call setError when fetch is failed', async () => {
    // global.fetch = jest.fn(() => Promise.reject('fails'));

    api.mockResolvedValue(Promise.reject({}));

    await fetchUser({setError, setUser, currentId: 1});

    expect(setError).toHaveBeenCalledWith('Something went wrong');
  })
})

describe('handleClick', () => {
  const setCurrentId = jest.fn();
  const setError = jest.fn();
  const setUser = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('call setCurrentId with correct argument when currentId is less than 3', () => {
    handleClick({setError, setUser, setCurrentId, currentId: 1})();

    expect(setCurrentId).toHaveBeenCalledWith(2);
  });

  it('not calling setCurrentId and fetchUser when currentId is equal or greater than 3', () => {
    handleClick({setError, setUser, setCurrentId, currentId: 3})();

    expect(setCurrentId).not.toHaveBeenCalled();
  })
})