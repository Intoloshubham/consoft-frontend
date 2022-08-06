
import Config from '../../../config'


const Get_Project_Team_Data = async (project_id) => {

    const resp = await fetch(`${process.env.REACT_APP_API_URL}project-team/${project_id}`)
    return resp;
}


const Get_Contractor_Data = async (project_id) => {

    const getData = await fetch(`${process.env.REACT_APP_API_URL}project-by-contractor/${project_id}`)
    return getData

}
 

const Get_user_role = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}role`)
    return res;
} 

const Insert_report_data = async (report_post_data, CONST_FIELD) => {

    try {
        const res = fetch(`${process.env.REACT_APP_API_URL}report/${CONST_FIELD.QUANTITY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(report_post_data)
        })
        return res;
    } catch (error) {
        console.log(error);
    }

}

const edit_report_data=(Id)=>{
    try {
           const res=fetch(`${process.env.REACT_APP_API_URL}quantity-report/${Id}`)
           return res;
    } catch (error) {
         
    }
}

const delete_report_data=(Id)=>{
    try {
           const res=fetch(`${process.env.REACT_APP_API_URL}quantity-report/${Id}`)
           return res;
    } catch (error) {
         
    }
}

const Get_report_data = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}quantity-report`)
    return res;
}

export { Get_Project_Team_Data, Get_Contractor_Data, Get_user_role, Insert_report_data,Get_report_data,edit_report_data,delete_report_data }


