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
    showSkillsFilter(){
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
    showSkills(){
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
            this.showSkills()
            this.showSkillsFilter()
        })
    }
}
customElements.define(name, formModulo)