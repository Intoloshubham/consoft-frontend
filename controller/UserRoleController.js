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

const roleByUser = async (role_id) => {
  try {
      const res = await fetch(Config.API_URL + 'role-by-users/'+role_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
}

export {getUserRole, roleByUser};
