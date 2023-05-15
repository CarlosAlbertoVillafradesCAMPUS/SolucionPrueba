export let wsShow = {
    showTeams(arg){
        console.log(arg);
        let plantilla = "";
        arg.forEach((val,id) => {
            plantilla += `
            <option value="${val.id}">${val.nombre}</option>
            `
        });
        return plantilla
    },
    showSkill(arg){
        console.log(arg);
        let plantilla = "";
        arg.forEach((val,id) => {
            plantilla += `
            <input type="checkbox" name="id_skill" id="${val.id}" value="${val.id}">
            <label for="${val.id}">${val.nombre}</label>
            `
        });
        return plantilla
    },
    showSkillFilter(arg){
        console.log(arg);
        let plantilla = "";
        arg.forEach((val,id) => {
            plantilla += `
            <input type="checkbox" name="id_skills" id="${val.id}" value="${val.id}">
            <label for="${val.id}">${val.nombre}</label>
            `
        });
        return plantilla
    },
    showModulos(arg){
        console.log(arg);
        let plantilla = "";
        arg.forEach((val,id) => {
            plantilla += `
            <option value="${val.id}">${val.nombre}</option>
            `
        });
        return plantilla
    },
    showRegistroTeam(arg){
        console.log(arg);
        
        let plantilla = `
        <div>
        <h2>Registro de los Teams</h2>
        
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>TRAINER</th>
                    </tr>
                </thead>
                <tbody>
                ${arg.map((val,id) => {
                    let partPlantilla = `
                    <tr>
                        <td>${val.id}</td>
                        <td>${val.nombre}</td>
                        <td>${val.trainer}</td>
                        <td><button class="eliminar" id="${val.id}">Eliminar</button></td>
                    </tr>
                    `
                    return partPlantilla
                }).join("")}
                    
                    
                </tbody>
            </table>
        </div>
            `
        return plantilla
    },
    showRegistroReclutas(arg){
        console.log(arg);
        let plantilla = `
        <div>
        <h2 class="titleRegistro">Registro de los Reclutas</h2>
        
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>EDAD</th>
                        <th>EMAIL</th>
                        <th>DIRECCION</th>
                        <th>FECHA NACIMINETO</th>
                        <th>N°IDENTIFICACION</th>
                        <th>ID_TEAM</th>
                    </tr>
                </thead>
                <tbody>
                ${arg.map((val,id) => {
                    console.log(val.team);
                    let partPlantilla = `
                    <tr>
                        <td>${val.id}</td>
                        <td>${val.nameRecluta}</td>
                        <td>${val.edad}</td>
                        <td>${val.email}</td>
                        <td>${val.direccion}</td>
                        <td>${val.fechaNacimiento}</td>
                        <td>${val.numIdentificacion}</td>
                        <td>${(val.team) ?val.team.nombre :val.teamId}</td>
                        <td class="cont-eliminar"><button class="eliminar" id="${val.id}">Eliminar</button></td>
                    </tr>
                    `
                    return partPlantilla
                }).join("")}
                    
                    
                </tbody>
            </table>
        </div>
            `
        return plantilla
    },
    showRegistroSkill(arg){
        let plantilla = `
        <div>
        <h2>Registro de las Skills</h2>
        
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                    </tr>
                </thead>
                <tbody>
                ${arg.map((val,id) => {
                    let partPlantilla = `
                    <tr>
                        <td>${val.id}</td>
                        <td>${val.nombre}</td>
                        <td><button class="eliminar" id="${val.id}">Eliminar</button></td>
                    </tr>
                    `
                    return partPlantilla
                }).join("")}
                    
                    
                </tbody>
            </table>
        </div>
            `
        return plantilla
    },
    showRegistroModulo(arg){
        let plantilla = `
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
                                <p style="margin:0 3px; width:100%; heigth:100%">${valor}</p>`
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
        return plantilla
    },
}

self.addEventListener("message", (e) => {
    Promise.resolve(wsShow[`${e.data.function}`](e.data.data)).then(res => postMessage(res))
})
