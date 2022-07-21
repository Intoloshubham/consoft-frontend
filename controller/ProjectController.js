import Config from "../config";


const getProjectCategory = async () => {
    try {
        const res = await fetch(Config.API_URL+'project-category',{
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

const getProjects = async () => {
    try {
        const res = await fetch(Config.API_URL+'projects',{
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

    
export { getProjectCategory, getProjects }