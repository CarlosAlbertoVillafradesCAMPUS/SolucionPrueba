const headers =  new Headers({"Content-Type": "application/json"});
const puerto = 4001;

const PostTeam = async (data) => {
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    return await( await fetch(`http://localhost:${puerto}/teams`, config)).json()
}

const GetTeams = async () => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/teams`, config)).json()
}

const DeleteTeam = async (id) => {
    const config = {
        method: "DELETE",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/teams/${id}`, config)).json()
}
const FilterTeam = async (info) => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/teams?nombre_like=${info}`, config)).json()
}

export default {
    PostTeam,
    GetTeams,
    DeleteTeam,
    FilterTeam
}