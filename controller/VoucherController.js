import Config from '../config';

const getVoucher = async (company_id, date) => {
  try {
    const res = await fetch(
      Config.API_URL + 'voucher/' + company_id + '/' + date,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {getVoucher};
