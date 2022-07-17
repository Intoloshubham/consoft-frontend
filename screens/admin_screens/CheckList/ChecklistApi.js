import Config from '../../../config'

// const Get_option_Update_data = async (project_id) => {

//     const resp = await fetch(`${Config.API_URL}project-team/${project_id}`)    
//     return resp;
// }

 
const Get_option_data = async () => {

    const getData = await fetch(`${Config.API_URL}checklist-option-type`)
    return getData 

}

export {Get_option_data }