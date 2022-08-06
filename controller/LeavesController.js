import Config from '../config';

const getUserLeaves = async () => {
  try {
    const res = await fetch('http://192.168.1.99:8000/api/' + 'leaves', {
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

export {getUserLeaves};
