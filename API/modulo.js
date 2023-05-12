const headers =  new Headers({"Content-Type": "application/json"});
const puerto = 4001;

const PostModulo = async (data) => {
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    return await( await fetch(`http://localhost:${puerto}/moduloSkill`, config)).json()
}

const GetModulo = async () => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/moduloSkill`, config)).json()
}

const DeleteModulo = async (id) => {
    const config = {
        method: "DELETE",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/moduloSkill/${id}`, config)).json()
}

export default {
    PostModulo,
    GetModulo,
    DeleteModulo
}