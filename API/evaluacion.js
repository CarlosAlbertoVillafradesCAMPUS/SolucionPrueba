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
    let dataEvaluacionReclutas = await( await fetch(`http://localhost:${puerto}/evaluacion?_expand=recluta`, config)).json()
    let dataEvaluacionModulo = await( await fetch(`http://localhost:${puerto}/evaluacion?_expand=moduloSkill`, config)).json()

    for (let i = 0; i < dataEvaluacionReclutas.length; i++) {
        dataEvaluacionReclutas[i].moduloSkill = dataEvaluacionModulo[i].moduloSkill;   
    }
    
    return dataEvaluacionReclutas;
}
const DeleteEvaluacion = async (id) => {
    const config = {
        method: "DELETE",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/evaluacion/${id}`, config)).json()
}
const FilterEvaluacion = async (info) => {
    const config = {
        method: "GET",
        headers: headers,
    }
    return await( await fetch(`http://localhost:${puerto}/evaluacion?nota_like=${info}`, config)).json()
}

export default {
    PostEvaluacion,
    GetEvaluacion,
    DeleteEvaluacion,
    FilterEvaluacion
}