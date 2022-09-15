import Config from '../config';

const getUserRole = async company_id => {
  try {
    const res = await fetch(`${Config.API_URL}role/` + company_id, {
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

const roleByUser = async role_id => {
  try {
    const res = await fetch(Config.API_URL + 'role-by-users/' + role_id, {
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
};

const getUsers = async company_id => {
  try {
    const res = await fetch(Config.API_URL + 'users/' + company_id, {
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

const postUserRole = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'role', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {getUserRole, roleByUser, getUsers, postUserRole};
