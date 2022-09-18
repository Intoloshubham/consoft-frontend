import Config from '../config';

const payment = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'payment', {
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

export {payment};
