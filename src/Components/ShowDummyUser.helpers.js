import api from '../utils/api';

export const fetchUser = async ({setUser, setError, currentId}) => {
  try {
    const res = await api(`https://jsonplaceholder.typicode.com/users/${currentId}`);

    setUser(res);
  } catch (error) {
    setError('Something went wrong');
  }
};

export const handleClick = ({setError, setUser, setCurrentId, currentId}) => () => {
  if(currentId < 3) {
    fetchUser({setError, setUser, currentId: currentId + 1});
    setCurrentId(currentId + 1);
  }
}