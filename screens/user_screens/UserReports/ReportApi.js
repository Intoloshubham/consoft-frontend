
import Config from '../../../config'

const Get_Project_Team_Data = async (project_id) => {

    const resp = await fetch(`${Config.API_URL}project-team/${project_id}`)    
    return resp;
}

 
const Get_Contractor_Data = async () => {

    const getData = await fetch(`${Config.API_URL}user-contractor`)
    return getData 

}

export { Get_Project_Team_Data, Get_Contractor_Data }


