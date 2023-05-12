const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");
export default class formRecluta extends HTMLElement{
    static async component(){
        return await( await fetch(pathName.replace(".js", ".html"))).text()
    }
    constructor(){
        super();
        this.attachShadow({mode: "open"});
       
    } 
    handleFilter(e){
        (e.type === "click")
        ? this.filtrarMeses(e)
        : this.filtrarTeam(e)
    }
    handleEliminar(e){
        (e.type === "click")
        ? this.eliminarRecluta(e)
        : undefined
    }
    handleEvent(e){
        (e.type === "submit")
        ?this.agregarRecluta(e) 
        :this.mostrarRecluta()
    }
    filtrarTeam(e){
        let team = e.target.value
        const wsReclutas = new Worker("storage/wsReclutas.js", {type:"module"})
        wsReclutas.postMessage({function:"GetReclutas"})

        wsReclutas.addEventListener("message", (evento) => {
            let new_data = evento.data.filter(recluta => recluta.id_team == team)
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroReclutas", data: new_data})
            wsShow.addEventListener("message", (event) => {
                this.resgistro = this.shadowRoot.querySelector(".registro");
                this.resgistro.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsReclutas.terminate()
        })
    }

    filtrarMeses(e){
        const wsReclutas = new Worker("storage/wsReclutas.js", {type:"module"})
        wsReclutas.postMessage({function:"FilterMeses"})

        wsReclutas.addEventListener("message", (evento) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroReclutas", data: evento.data})
            wsShow.addEventListener("message", (event) => {
                this.resgistro = this.shadowRoot.querySelector(".registro");
                this.resgistro.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsReclutas.terminate()
        })
    }

    eliminarRecluta(e){
        let option = confirm(`¿Estas seguro que deseas eliminar este Recluta?`)
        if(option == true){
            let id = e.target.id
            console.log(id);
            const wsReclutas = new Worker("storage/wsReclutas.js", {type:"module"});
           wsReclutas.postMessage({function:"DeleteReclutas", data: id})
           wsReclutas.addEventListener("message", (e) => {
            wsReclutas.terminate()
            alert("Recluta Eliminado exitosamente")
           })
        }
        
       
    }
    mostrarRecluta(e){
        const wsReclutas = new Worker("storage/wsReclutas.js", {type:"module"})
        wsReclutas.postMessage({function:"GetReclutas"})

        wsReclutas.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showRegistroReclutas", data: e.data})
            wsShow.addEventListener("message", (event) => {
                this.resgistroTeams = this.shadowRoot.querySelector(".registro");
                this.resgistroTeams.innerHTML = event.data
                wsShow.terminate();
                this.eliminar = this.shadowRoot.querySelectorAll(".eliminar");
                this.eliminar.forEach((val,id) => {
                
                    val.addEventListener("click", this.handleEliminar.bind(this))
                })
                
            })
            wsReclutas.terminate()
        })
    }
    showTeams(){
        const wsTeam = new Worker("storage/wsTeam.js", {type:"module"})
        wsTeam.postMessage({function:"GetTeams"})

        wsTeam.addEventListener("message", (e) => {
            const wsShow = new Worker("storage/wsShow.js", {type:"module"});
            wsShow.postMessage({function:"showTeams", data: e.data})
            wsShow.addEventListener("message", (event) => {
                this.selectTeam = this.shadowRoot.querySelector("#optionTeam");
                this.selectTeamFilter = this.shadowRoot.querySelector("#selectTeamFilter");
                this.selectTeam.innerHTML = event.data;
                this.selectTeamFilter.innerHTML = event.data
                wsShow.terminate()
            })
            wsTeam.terminate()
        })
        
    }
    agregarRecluta(e){
        e.preventDefault()
        const dataForm = Object.fromEntries(new FormData(e.target))
        console.log(dataForm);
        const wsReclutas = new Worker("storage/wsReclutas.js", {type:"module"})
        wsReclutas.postMessage({function:"PostRecluta", data: dataForm})

        wsReclutas.addEventListener("message", (e) => {
            wsReclutas.terminate()
        })
    }
    connectedCallback(){
        Promise.resolve(formRecluta.component()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myFormulario = this.shadowRoot.querySelector("#formularioReclutas");
            this.myFormulario.addEventListener("submit", this.handleEvent.bind(this));
            this.btnRegistro = this.shadowRoot.querySelector("#btnRegistro");
            this.btnRegistro.addEventListener("click", this.handleEvent.bind(this));
            this.btnMayorMeses = this.shadowRoot.querySelector("#mayorMeses");
            this.btnMayorMeses.addEventListener("click", this.handleFilter.bind(this));
            this.selectTeamFilter = this.shadowRoot.querySelector("#selectTeamFilter");
            this.selectTeamFilter.addEventListener("change", this.handleFilter.bind(this));
            this.showTeams()
        })
    }
}
customElements.define(name, formRecluta)