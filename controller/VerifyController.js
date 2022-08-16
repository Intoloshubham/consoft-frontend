import Config from '../config';

const verifySubmitWorks = async id => {
  try {
    const res = await fetch(Config.API_URL + 'verify-submit-work/' + id, {
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

export {verifySubmitWorks};
