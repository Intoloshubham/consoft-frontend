import Config from '../config';

const getUserLeaves = async () => {
  try {
    const res = await fetch(Config.API_URL + 'leaves', {
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

const postUserLeaves = async (id, formData) => {
  try {
    const res = await fetch(Config.API_URL + 'approve-leaves/' + id, {
      method: 'put',
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

export {getUserLeaves, postUserLeaves};
