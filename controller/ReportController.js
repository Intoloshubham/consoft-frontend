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

const getProjectAtGlance = async company_id => {
  try {
    const res = await fetch(
      Config.API_URL + 'projects-at-glance/' + company_id,
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

const postProjectReportPath = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'project-report-path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getProjectReportPath = async (company_id, project_id) => {
  try {
    const res = await fetch(
      Config.API_URL + 'project-report-path/' + company_id + '/' + project_id,
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

export {
  getReport,
  getManpower,
  getQuantity,
  getProjectAtGlance,
  postProjectReportPath,
  getProjectReportPath,
};
