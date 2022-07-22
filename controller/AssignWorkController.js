import Config from "../config";

const getSubmitWorks = async (company_id) => {
    try {
        const res = await fetch(Config.API_URL+'submit-works/'+company_id,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
            },
        });
        const data = await res.json();
        return data;

    } catch (error) {
      console.log(error)
    }
}

export {getSubmitWorks}