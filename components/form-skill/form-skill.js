const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");
export default class formSkill extends HTMLElement{
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
        ? this.eliminarSkill(e)
        : undefined
    }
    handleEvent(e){
        (e.type === "submit")
        ?this.agregarSkill(e) 
        :this.mostrarSkill(e)
    }

    volverForm(){
        this.fidelset.style.display = "block"
        this.containerRegistro.style.display = "none"
    }

    search(e){
        let valueInput = e.target.value;
        if(e.target.value == ""){
            this.mostrarSkill()
        }else{
            const wsSkill = new Worker("storage/wsSkill.js", {type:"module"})
        wsSkill.postMessage({function:"FilterSkill", data: valueInput})

        wsSkill.addEventListener("message", (evento) => {
            console.log(evento.data);
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroSkill", data: evento.data})
            wsShow.addEventListener("message", (event) => {
                this.resgistro = this.shadowRoot.querySelector(".registro");
                this.resgistro.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsSkill.terminate()
        })
        }
        
    }
    eliminarSkill(e){
        let option = confirm(`¿Estas seguro que deseas eliminar esta Skill?`)
        if(option == true){
            let id = e.target.id
        console.log(id);
        const wsSkill = new Worker("storage/wsSkill.js", {type:"module"});
       wsSkill.postMessage({function:"DeleteSkill", data: id})
       wsSkill.addEventListener("message", (e) => {
        wsSkill.terminate()
        alert(`Skill eliminada con exito!!`)
       })
        }
        
    }
    mostrarSkill(e){
        const wsSkill = new Worker("storage/wsSkill.js", {type:"module"})
        wsSkill.postMessage({function:"GetSkill"})

        wsSkill.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroSkill", data: e.data})
            wsShow.addEventListener("message", (event) => {
                this.fidelset = this.shadowRoot.querySelector("fieldset");
                this.fidelset.style.display = "none"
                this.containerRegistro = this.shadowRoot.querySelector(".containerRegistro");
                this.containerRegistro.style.display = "block"
                this.resgistroSwsSkills = this.shadowRoot.querySelector(".registro");
                this.resgistroSwsSkills.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsSkill.terminate()
        })
    }

    agregarSkill(e){
        e.preventDefault()
        const dataForm = Object.fromEntries(new FormData(e.target))
        console.log(dataForm);
        const wsSkill = new Worker("storage/wsSkill.js", {type:"module"})
        wsSkill.postMessage({function:"PostSkill", data: dataForm})

        wsSkill.addEventListener("message", (e) => {
            wsSkill.terminate()
        })
    }
    connectedCallback(){
        Promise.resolve(formSkill.component()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myFormulario = this.shadowRoot.querySelector("#formularioSkill");
            this.myFormulario.addEventListener("submit", this.handleEvent.bind(this));
            this.btnRegistro = this.shadowRoot.querySelector("#btnRegistro");
            this.btnRegistro.addEventListener("click", this.handleEvent.bind(this))
            this.buscador = this.shadowRoot.querySelector("#buscador");
            this.buscador.addEventListener("input", this.handleFilter.bind(this));
            this.btnVolver = this.shadowRoot.querySelector(".btnVolver");
            this.btnVolver.addEventListener("click", this.handleFilter.bind(this) )
        })
    }
}
customElements.define(name, formSkill)