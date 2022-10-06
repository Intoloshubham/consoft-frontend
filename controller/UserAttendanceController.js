import Config from '../config';

const getUserAttendance = async company_id => {
  try {
    const res = await fetch(Config.API_URL + 'attendance/' + company_id, {
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

export {getUserAttendance};
