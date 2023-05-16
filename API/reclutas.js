const headers =  new Headers({"Content-Type": "application/json"});
const puerto = 4001;

const PostRecluta = async (data) => {
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    return await( await fetch(`http://localhost:${puerto}/reclutas`, config)).json()
}
const GetReclutas = async () => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/reclutas?_expand=team`, config)).json()
}

const DeleteReclutas = async (id) => {
    const config = {
        method: "DELETE",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/reclutas/${id}`, config)).json()
}

const FilterMeses = async (id) => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/reclutas/?fechaIngreso_gte=2023-03-08`, config)).json()
}

const FilterReclutas = async (info) => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/reclutas?nameRecluta_like=${info}`, config)).json()
}


export default {
    PostRecluta,
    GetReclutas,
    DeleteReclutas,
    FilterMeses,
    FilterReclutas
}