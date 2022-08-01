import Config from '../config';

const postBoqNewAddItem = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'quantity-report-item', {
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

const getBoqItemsList = async () => {
  try {
    const res = await fetch(`${Config.API_URL}quantity-report-item`, {
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

const postBOQItem = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'manage-boq', {
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

const getBOQItems = async (company_id, project_id) => {
  try {
    const res = await fetch(
      `${Config.API_URL}manage-boq/` + company_id + '/' + project_id,
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

const updateBoqItem = async (id, item_id, formData) => {
  try {
    const res = await fetch(
      `${Config.API_URL}manage-boq/` + id + '/' + item_id,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  postBoqNewAddItem,
  getBoqItemsList,
  postBOQItem,
  getBOQItems,
  updateBoqItem,
};
