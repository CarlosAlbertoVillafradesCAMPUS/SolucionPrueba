const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");
export default class formTeam extends HTMLElement{
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
        ? this.eliminarTeam(e)
        : undefined
    }
    handleEvent(e){
        (e.type === "submit")
        ?this.agregarTeam(e) 
        :this.mostrarTeam(e)
    }

    volverForm(){
        this.fidelset.style.display = "block"
        this.containerRegistro.style.display = "none"
    }

    search(e){
        let valueInput = e.target.value;
        if(e.target.value == ""){
            this.mostrarTeam()
        }else{
            const wsTeam = new Worker("storage/wsTeam.js", {type:"module"})
        wsTeam.postMessage({function:"FilterTeam", data: valueInput})

        wsTeam.addEventListener("message", (evento) => {
            console.log(evento.data);
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroTeam", data: evento.data})
            wsShow.addEventListener("message", (event) => {
                this.resgistro = this.shadowRoot.querySelector(".registro");
                this.resgistro.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsTeam.terminate()
        })
        }
        
    }
    eliminarTeam(e){
        let option = confirm(`¿Estas seguro que deseas eliminar este Team?`)
        if(option == true){
            let id = e.target.id
        console.log(id);
        const wsTeam = new Worker("storage/wsTeam.js", {type:"module"});
       wsTeam.postMessage({function:"DeleteTeam", data: id})
       wsTeam.addEventListener("message", (e) => {
        wsTeam.terminate()
        alert("Team Eliminado exitosamente")
       })
        }
        
    }
    mostrarTeam(e){
        const wsTeam = new Worker("storage/wsTeam.js", {type:"module"})
        wsTeam.postMessage({function:"GetTeams"})

        wsTeam.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroTeam", data: e.data})
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
            wsTeam.terminate()
        })
    }
    agregarTeam(e){
        e.preventDefault()
        const dataForm = Object.fromEntries(new FormData(e.target))
        console.log(dataForm);
        const wsTeam = new Worker("storage/wsTeam.js", {type:"module"})
        wsTeam.postMessage({function:"PostTeam", data: dataForm})

        wsTeam.addEventListener("message", (e) => {
            wsTeam.terminate()
        })
    }
    connectedCallback(){
        Promise.resolve(formTeam.component()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myFormulario = this.shadowRoot.querySelector("#formularioTeams");
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
customElements.define(name, formTeam)