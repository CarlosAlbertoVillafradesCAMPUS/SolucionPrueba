const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");
export default class formModulo extends HTMLElement{
    static async component(){
        return await( await fetch(pathName.replace(".js", ".html"))).text()
    }
    constructor(){
        super();
        this.attachShadow({mode: "open"});
       
    } 
    handleFilter(e){
        if(e.type === "input"){
           this.search(e)
       }else{
           this.volverForm();
       }
   }

    handleEliminar(e){
        (e.type === "click")
        ? this.eliminarModulo(e)
        : undefined
    }
    handleEvent(e){
        (e.type === "submit")
        ?this.agregarModulo(e) 
        :this.mostrarModulo(e)
    }

    volverForm(){
        this.fidelset.style.display = "block"
        this.containerRegistro.style.display = "none"
    }

    search(e){
        let valueInput = e.target.value;
        if(e.target.value == ""){
            this.mostrarModulo()
        }else{
            const wsModulo = new Worker("storage/wsModulo.js", {type:"module"})
        wsModulo.postMessage({function:"FilterModulo", data: valueInput})

        wsModulo.addEventListener("message", (evento) => {
            console.log(evento.data);
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroModulo", data: evento.data})
            wsShow.addEventListener("message", (event) => {
                this.resgistro = this.shadowRoot.querySelector(".registro");
                this.resgistro.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsModulo.terminate()
        })
        }
        
    }

    /* filtrarSkills(e){
        this.skills = this.shadowRoot.querySelectorAll("input[name='id_skills']:checked");
        let arraySkills = [];
        
        const wsModulo = new Worker("storage/wsModulo.js", {type:"module"})
        wsModulo.postMessage({function:"GetModulo"})

        
        wsModulo.addEventListener("message", (evento) => {
            evento.data.forEach((val,id) => {
                this.skills.forEach((valor,id) =>{
                    (val.id_skill.includes(valor.id))
                    ? arraySkills.push(valor)
                    : undefined
                    
                })
            })
            console.log(arraySkills);
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroModulo", data: arraySkills})
            wsShow.addEventListener("message", (event) => {
                this.resgistroModulos = this.shadowRoot.querySelector(".registro");
                this.resgistroModulos.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsModulo.terminate()
        })
    } */
    eliminarModulo(e){
        let option = confirm(`¿Estas seguro que deseas eliminar este Modulo?`)
        if(option == true){
            let id = e.target.id
        console.log(id);
        const wsModulo = new Worker("storage/wsModulo.js", {type:"module"});
       wsModulo.postMessage({function:"DeleteModulo", data: id})
       wsModulo.addEventListener("message", (e) => {
        wsModulo.terminate()
        alert("Modulo Eliminado exitosamente")
       })
        }
        
    }
    mostrarModulo(e){
        const wsModulo = new Worker("storage/wsModulo.js", {type:"module"})
        wsModulo.postMessage({function:"GetModulo"})

        wsModulo.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroModulo", data: e.data})
            wsShow.addEventListener("message", (event) => {
                this.fidelset = this.shadowRoot.querySelector("fieldset");
                this.fidelset.style.display = "none"
                this.containerRegistro = this.shadowRoot.querySelector(".containerRegistro");
                this.containerRegistro.style.display = "block"
                this.resgistroModulos = this.shadowRoot.querySelector(".registro");
                this.resgistroModulos.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsModulo.terminate()
        })
    }
    SkillsFilter(){
        const wsSkill = new Worker("storage/wsSkill.js", {type:"module"})
        wsSkill.postMessage({function:"GetSkill"})

        wsSkill.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showSkillFilter", data: e.data})
            wsShow.addEventListener("message", (event) => {
                console.log(event.data);
                this.selectSkillFilter = this.shadowRoot.querySelector("#selectSkillFilter");
                this.selectSkillFilter.innerHTML = event.data
                wsShow.terminate();
                
            })
            wsSkill.terminate()
        })
        
    }
    Skills(){
        const wsSkill = new Worker("storage/wsSkill.js", {type:"module"})
        wsSkill.postMessage({function:"GetSkill"})

        wsSkill.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showSkill", data: e.data})
            wsShow.addEventListener("message", (event) => {
                console.log(event.data);
                this.selectSkill = this.shadowRoot.querySelector("#containerSkills");
                this.selectSkillFilter = this.shadowRoot.querySelector("#selectSkillFilter");
                this.selectSkillFilter.innerHTML = event.data
                this.selectSkill.innerHTML = event.data
                wsShow.terminate();
                
            })
            wsSkill.terminate()
        })
        
    }
    agregarModulo(e){
        e.preventDefault()
        this.skills = this.shadowRoot.querySelectorAll("input[name='id_skill']:checked");
        let arraySkills = []
        this.skills.forEach((val,id) => {
            arraySkills.push(val.id)
        })
        const dataForm = Object.fromEntries(new FormData(e.target))
        dataForm.id_skill = arraySkills
        console.log(dataForm);
        const wsModulo = new Worker("storage/wsModulo.js", {type:"module"})
        wsModulo.postMessage({function:"PostModulo", data: dataForm})

        wsModulo.addEventListener("message", (e) => {
            wsModulo.terminate()
        })
    }
    connectedCallback(){
        Promise.resolve(formModulo.component()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myFormulario = this.shadowRoot.querySelector("#formularioModulo");
            this.myFormulario.addEventListener("submit", this.handleEvent.bind(this));
            this.btnRegistro = this.shadowRoot.querySelector("#btnRegistro");
            this.btnRegistro.addEventListener("click", this.handleEvent.bind(this))
            this.buscador = this.shadowRoot.querySelector("#buscador");
            this.buscador.addEventListener("input", this.handleFilter.bind(this));
            this.btnVolver = this.shadowRoot.querySelector(".btnVolver");
            this.btnVolver.addEventListener("click", this.handleFilter.bind(this) )
            this.Skills()
            this.SkillsFilter()
        })
    }
}
customElements.define(name, formModulo)