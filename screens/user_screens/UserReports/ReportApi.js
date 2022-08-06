
import Config from '../../../config'


const Get_Project_Team_Data = async (project_id) => {

    const resp = await fetch(`${Config.API_URL}project-team/${project_id}`)    
    return resp;
}

 
const Get_Contractor_Data = async (project_id) => {

    const getData = await fetch(`${Config.API_URL}project-by-contractor/${project_id}`)
    return getData 

}


const Get_user_role=async ()=>{
    const res=await fetch(`${Config.API_URL}role`)
    return res;
}


export { Get_Project_Team_Data, Get_Contractor_Data,Get_user_role }


