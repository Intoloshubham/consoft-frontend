import Config from '../config';

const getReport = async (project_id,user_id)=> {
  try {
    const res = await fetch(Config.API_URL + 'report/' + project_id + '/'+ user_id , {
    // const res = await fetch(Config.API_URL + 'report/' + project_id , {
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

const getManpower = async report_id => {
  try {
    const res = await fetch(
      Config.API_URL + 'manpower-report-by-report-id/' + report_id,
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
    return error;
  }
};

const getQuantity = async report_id => {
  try {
    const res = await fetch(
      Config.API_URL + 'quantity-report-by-report-id/' + report_id,
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
    return error;
  }
};

export {getReport, getManpower, getQuantity};
