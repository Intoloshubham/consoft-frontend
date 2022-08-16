import Config from '../config';

const getUnits = async () => {
  try {
    const res = await fetch(`${Config.API_URL}unit`, {
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

const postunits = async unitdata => {
  try {
    const res = await fetch(Config.API_URL + 'unit', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unitdata),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const unitdalete = async id => {
  // console.log('object', id);
  try {
    const res = await fetch(Config.API_URL + 'unit/' + id, {
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

const updateunitname = async (unitid, updateunitdata) => {
  try {
    const res = await fetch(`${Config.API_URL}unit/` + unitid, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateunitdata),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {getUnits,postunits,unitdalete,updateunitname};
