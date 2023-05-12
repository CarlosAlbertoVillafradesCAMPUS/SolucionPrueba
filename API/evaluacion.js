const headers =  new Headers({"Content-Type": "application/json"});
const puerto = 4001;

const PostEvaluacion = async (data) => {
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    return await( await fetch(`http://localhost:${puerto}/evaluacion`, config)).json()
}

const GetEvaluacion = async () => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/evaluacion`, config)).json()
}

export default {
    PostEvaluacion,
    GetEvaluacion
}