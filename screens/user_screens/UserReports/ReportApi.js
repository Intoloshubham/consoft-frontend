
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

const edit_report_data = (Id) => {
    try {
        const res = fetch(`${process.env.REACT_APP_API_URL}edit-quantity-report/${Id}`)
        return res;
    } catch (error) {
        console.log(error);
    }
}

const delete_report_data = (Id) => {
    try {
        const res = fetch(`${process.env.REACT_APP_API_URL}delete-quantity-report/${Id}`)

        return res;
    } catch (error) {
        console.log(error);
    }
}

const Get_report_data = async (user_id, project_id, user_date) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}quantity-report/${user_id}/${project_id}/${user_date}/`)
        return res;
    } catch (error) {
        console.log(error)
    }

}

const check_quantity_item_exist = async (project_id,user_id) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}quantity-item-exist/${project_id}/${user_id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const update_quantity_data = async (Id, inputs) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}quantity-report/${Id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        })
        return res;


    } catch (error) {
        console.log(error)
    }
}

export { Get_Project_Team_Data, Get_Contractor_Data, Get_user_role, Insert_report_data, Get_report_data, edit_report_data, delete_report_data, check_quantity_item_exist, update_quantity_data }


