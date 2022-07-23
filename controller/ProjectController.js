import Config from '../config';

const getProjects = async company_id => {
  try {
    const res = await fetch(Config.API_URL + 'projects/' + `${company_id}`, {
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

const getProjectType = async () => {
  try {
    const res = await fetch(Config.API_URL + 'project-type', {
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

const getProjectCategory = async () => {
  try {
    const res = await fetch(Config.API_URL + 'project-category', {
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

export {getProjects, getProjectType, getProjectCategory};
