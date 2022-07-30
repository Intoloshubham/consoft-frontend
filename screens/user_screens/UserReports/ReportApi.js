
import Config from '../../../config'


const Get_Project_Team_Data = async (project_id) => {

    const resp = await fetch(`${Config.API_URL}project-team/${project_id}`)
    return resp;
}


const Get_Contractor_Data = async (project_id) => {

    const getData = await fetch(`${Config.API_URL}project-by-contractor/${project_id}`)
    return getData

}


const Get_user_role = async () => {
    const res = await fetch(`${Config.API_URL}role`)
    return res;
}

const Insert_report_data = async (report_post_data, CONST_FIELD) => {

    try {
        fetch(`${Config.API_URL}report/${CONST_FIELD.Quantity}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(report_post_data)
        })
            .then((response) => response.json())
            .then(data => {
                // console.log("post data..")
                console.log(data)
                // setPostContData(data)
                if (data.status == '200') {
                    //   setContractorName('')
                    //   setContractorPhone('')
                    // Get_Contractor_Data()
                }
                // showToast();
            })
    } catch (error) {
        console.log(error);
    }



}

export { Get_Project_Team_Data, Get_Contractor_Data, Get_user_role, Insert_report_data }


