import Config from '../config';

const getUnits = async () => {
  try {
    const res = await fetch(`${Config.API_URL}unit`, {
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

export {getUnits};
