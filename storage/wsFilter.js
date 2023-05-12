export let wsFilter = {
    FilterMeses(arg){

        let reclutas = arg.filter(recluta => ((new Date(recluta.fechaIngreso).getTime() - new Date().getTime())/(1000*60*60*24))  < 60 );
        console.log(reclutas);
      /*   let plantilla = `
        <div>
        <h2>Registro de los Modulos</h2>
        
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>ID_SKILLS</th>
                    </tr>
                </thead>
                <tbody>
                ${arg.map((val,id) => {
                    let partPlantilla = `
                    <tr>
                        <td>${val.id}</td>
                        <td>${val.nombre}</td>
                        <td style="display:flex">${val.id_skill.map((valor,id) => {
                                let skills = `
                                <p style="margin:0 3px">${valor}</p>`
                                return skills
                        }).join("")}</td>
                        <td><button class="eliminar" id="${val.id}">Eliminar</button></td>
                    </tr>
                    `
                    return partPlantilla
                }).join("")}
                    
                    
                </tbody>
            </table>
        </div>
            `
        return plantilla */
    },
}

self.addEventListener("message", (e) => {
    Promise.resolve(wsFilter[`${e.data.function}`](e.data.data)).then(res => postMessage(res))
})
