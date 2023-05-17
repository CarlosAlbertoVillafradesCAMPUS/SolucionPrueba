const headers =  new Headers({"Content-Type": "application/json"});
const puerto = 4001;

const PostSkill = async (data) => {
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    return await( await fetch(`http://localhost:${puerto}/skills`, config)).json()
}

const GetSkill = async () => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/skills`, config)).json()
}

const DeleteSkill = async (id) => {
    const config = {
        method: "DELETE",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/skills/${id}`, config)).json()
}

const FilterSkill = async (info) => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/skills?nombre_like=${info}`, config)).json()
}

export default {
    PostSkill,
    GetSkill,
    DeleteSkill,
    FilterSkill
}