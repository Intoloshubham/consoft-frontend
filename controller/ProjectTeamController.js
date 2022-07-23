import Config from "../config";

const getProjectTeam = async (project_id) => {
    try {
        const res = await fetch(Config.API_URL + 'project-team/'+project_id, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}

const saveProjectTeam = async (teamData) => {
    try {
        const res = await fetch(Config.API_URL + 'project-team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(teamData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}

const deleteProjectTeam = async (project_id, user_id) => {
    try {
        const res = await fetch(Config.API_URL + 'project-team/' + project_id + '/' + user_id, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}


export { getProjectTeam, saveProjectTeam, deleteProjectTeam }