import Config from '../config';

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

const postProjectCategory = async categoryData => {
  try {
    const res = await fetch(Config.API_URL + 'project-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

const postProjectType = async typeData => {
  try {
    const res = await fetch(Config.API_URL + 'project-type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getProjectCategoryById = async id => {
  try {
    const res = await fetch(Config.API_URL + 'project-category' + id, {
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


const updateProjectCategory = async (id, categoryData) => {
  try {
    const res = await fetch(Config.API_URL + 'project-category/' + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProjectType = async (id, typeData) => {
  try {
    const res = await fetch(Config.API_URL + 'project-type/' + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteProjectCategory = async id => {
  try {
    const res = await fetch(Config.API_URL + 'project-category/' + id, {
      method: 'delete',
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

const deleteProjectType = async id => {
  try {
    const res = await fetch(Config.API_URL + 'project-Type/' + id, {
      method: 'delete',
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

export {
  getProjectCategory,
  getProjectType,
  postProjectCategory,
  postProjectType,
  getProjectCategoryById,
  updateProjectCategory,
  deleteProjectCategory,
  updateProjectType,
  deleteProjectType,
};
