import Config from '../config';

const getUserRole = async () => {
  try {
    const res = await fetch(`${Config.API_URL}role`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {getUserRole};
