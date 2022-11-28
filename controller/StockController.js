import Config from '../config';

const getItem = async () => {
  try {
    const res = await fetch(Config.API_URL + 'item', {
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

const getStockEntry = async company_id => {
  try {
    const res = await fetch(Config.API_URL + 'stock-entry/' + company_id, {
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

const postStockEntry = async formData => {
  try {
    const res = await fetch(Config.API_URL + 'stock-entry', {
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

export {getItem, getStockEntry, postStockEntry};
