import Config from "../config";

const postchecklistitems = async   => {
    try {
      const res = await fetch(Config.API_URL + '', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export {
    postchecklistitems
}

