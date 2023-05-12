const headers =  new Headers({"Content-Type": "application/json"});
const puerto = 4001;

const PostRecluta = async (data) => {
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    return await( await fetch(`http://localhost:${puerto}/Reclutas`, config)).json()
}
const GetReclutas = async () => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/Reclutas`, config)).json()
}

const DeleteReclutas = async (id) => {
    const config = {
        method: "DELETE",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/Reclutas/${id}`, config)).json()
}

const FilterMeses = async (id) => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/Reclutas/?fechaIngreso_gte=2023-03-08`, config)).json()
}

export default {
    PostRecluta,
    GetReclutas,
    DeleteReclutas,
    FilterMeses
}