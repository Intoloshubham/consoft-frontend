
import Config from '../../../config'


const Get_Project_Team_Data = async (project_id) => {

    const resp = await fetch(`${process.env.API_URL}project-team/${project_id}`)
    return resp;
}


const Get_Contractor_Data = async (project_id) => {

    const getData = await fetch(`${process.env.API_URL}project-by-contractor/${project_id}`)
    return getData

}


const Get_user_role = async () => {
    const res = await fetch(`${process.env.API_URL}role`)
    return res;
}

const Insert_report_data = async (report_post_data, CONST_FIELD) => {

    try {
        const res = fetch(`${process.env.API_URL}report/${CONST_FIELD.QUANTITY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(report_post_data)
        })
        return res;
    } catch (error) {
        console.log(error);
    }

}

const insert_manpower_report = async (manpower_post_data, Id) => {

    try {
        const res = fetch(`${process.env.API_URL}mapower-report/${CONST_FIELD.QUANTITY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(manpower_post_data)
        })
        return res;
    } catch (error) {
        console.log(error)
    }
}

const insert_stock_data = (quality_post_data) => {


    try {
        const res = fetch(`${process.env.API_URL}stock-entry/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quality_post_data)
        })
        // const data = await res.json();
        return res;
    } catch (error) {
        console.log(error);
    }

}


const insert_new_category = (new_categ_post) => {
    try {
        const res = fetch(`${process.env.API_URL}manpower-category/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_categ_post)
        })
        return res;
    } catch (error) {
        console.log(error)
    }
}
const insert_new_sub_category = (new_subCateg_post) => {
    try {
        const res = fetch(`${process.env.API_URL}manpower-sub-category/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_subCateg_post)
        })
        return res;
    } catch (error) {
        console.log(error)
    }
}

const get_new_category = (Id) => {
    try {
        const res = fetch(`${process.env.API_URL}manpower-category/${Id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}
const get_new_sub_category = (Id) => {
    try {
        const res = fetch(`${process.env.API_URL}manpower-sub-category/${Id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const get_stock_data = async () => {
    try {
        const res = fetch(`${process.env.API_URL}stock-entry/`)
        return res;
    } catch (error) {
        console.log(error)
    }
}


const edit_report_data = (Id) => {
    try {
        const res = fetch(`${process.env.API_URL}edit-quantity-report/${Id}`)
        return res;
    } catch (error) {
        console.log(error);
    }
}

const delete_report_data = (Id) => {
    try {
        const res = fetch(`${process.env.API_URL}delete-quantity-report/${Id}`)

        return res;
    } catch (error) {
        console.log(error);
    }
}

const Get_report_data = async (user_id, project_id, user_date) => {
    try {
        const res = await fetch(`${process.env.API_URL}quantity-report/${user_id}/${project_id}/${user_date}/`)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }

}


const get_quality_type = async () => {
    try {
        const res = await fetch(`${process.env.API_URL}quality-type`)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const check_quantity_item_exist = async (project_id, user_id) => {
    try {
        const res = await fetch(`${process.env.API_URL}quantity-item-exist/${project_id}/${user_id}`)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const update_quantity_data = async (Id, inputs) => {
    try {
        const res = await fetch(`${process.env.API_URL}quantity-report/${Id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        })
        const data = await res.json();
        return data;


    } catch (error) {
        console.log(error)
    }
}

const get_stock_item_name = async () => {
    try {
        const res = await fetch(`${process.env.API_URL}item`)
        const data = await res.json();
        return data;
    } catch (error) {

    }
}

export {
    Get_Project_Team_Data, Get_Contractor_Data, Get_user_role, Insert_report_data, Get_report_data, edit_report_data,
    delete_report_data, check_quantity_item_exist, update_quantity_data, get_quality_type, get_new_sub_category,
    get_stock_item_name, insert_stock_data, get_stock_data, insert_new_category, get_new_category, insert_new_sub_category,
    insert_manpower_report
}


