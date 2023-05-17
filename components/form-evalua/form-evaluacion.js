const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");
export default class formEvaluacion extends HTMLElement{
    static async component(){
        return await( await fetch(pathName.replace(".js", ".html"))).text()
    }
    constructor(){
        super();
        this.attachShadow({mode: "open"});
       
    } 
    handleFilter(e){
        if(e.type === "click"){
            this.volverForm();
       }else{
           undefined
       }
   }
   handleEliminar(e){
    (e.type === "click")
    ? this.eliminarEvaluacion(e)
    : undefined
}

    handleEvent(e){
        (e.type === "submit")
        ? this.agregarEvaluacion(e)
        : this.mostrarEvaluaion()
    }

    volverForm(){
        this.fidelset.style.display = "block"
        this.containerRegistro.style.display = "none"
    }
    eliminarEvaluacion(e){
        let option = confirm(`¿Estas seguro que deseas eliminar esta evaluacion?`)
        if(option == true){
            let id = e.target.id
        console.log(id);
        const wsEvaluacion = new Worker("storage/wsEvaluacion.js", {type:"module"});
       wsEvaluacion.postMessage({function:"DeleteEvaluacion", data: id})
       wsEvaluacion.addEventListener("message", (e) => {
        wsEvaluacion.terminate()
        alert("evaluacion Eliminada exitosamente")
       })
        }
        
    }
    showModulos(){
        const wsModulo = new Worker("storage/wsModulo.js", {type:"module"})
        wsModulo.postMessage({function:"GetModulo"})

        wsModulo.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showModulos", data: e.data})
            wsShow.addEventListener("message", (event) => {
                console.log(event.data);
                this.selectSkill = this.shadowRoot.querySelector("#containerModulos");
                this.selectSkill.innerHTML = event.data
                wsShow.terminate();
                
            })
            wsModulo.terminate()
        })
        
    }
    mostrarEvaluaion(){
        const wsEvaluacion = new Worker("storage/wsEvaluacion.js", {type:"module"})
        wsEvaluacion.postMessage({function:"GetEvaluacion"})

        wsEvaluacion.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroEvaluacion", data: e.data})
            wsShow.addEventListener("message", (event) => {
                this.fidelset = this.shadowRoot.querySelector("fieldset");
                this.fidelset.style.display = "none"
                this.containerRegistro = this.shadowRoot.querySelector(".containerRegistro");
                this.containerRegistro.style.display = "block"
                this.resgistroTeams = this.shadowRoot.querySelector(".registro");
                this.resgistroTeams.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsEvaluacion.terminate()
        })
    }
    agregarEvaluacion(e){
        e.preventDefault()
        const dataForm = Object.fromEntries(new FormData(e.target))
        console.log(dataForm);
        const wsEvaluacion = new Worker("storage/wsEvaluacion.js", {type:"module"})
        wsEvaluacion.postMessage({function:"PostEvaluacion", data: dataForm})

        wsEvaluacion.addEventListener("message", (e) => {
            wsEvaluacion.terminate()
        })
    }
    connectedCallback(){
        Promise.resolve(formEvaluacion.component()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myFormulario = this.shadowRoot.querySelector("#formularioEvaluacion");
            this.myFormulario.addEventListener("submit", this.handleEvent.bind(this));
            this.btnRegistro = this.shadowRoot.querySelector("#btnRegistro");
            this.btnRegistro.addEventListener("click", this.handleEvent.bind(this))
            this.btnVolver = this.shadowRoot.querySelector(".btnVolver");
            this.btnVolver.addEventListener("click", this.handleFilter.bind(this) )
            this.showModulos()
        })
    }
}
customElements.define(name, formEvaluacion)