import Config from '../config';

const getReport = async project_id => {
  try {
    const res = await fetch(Config.API_URL + 'report/' + project_id, {
      method: 'get',
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

export {getReport};
