import Config from '../config';

const getContractors = async () => {
  try {
    const res = await fetch(Config.API_URL + 'contractor', {
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

const postContractors = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'contractor', {
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

const deleteContractors = async id => {
  try {
    const res = await fetch(Config.API_URL + 'contractor/' + id, {
      method: 'delete',
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

export {getContractors, postContractors, deleteContractors};
