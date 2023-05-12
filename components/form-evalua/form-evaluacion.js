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

    handleEvent(e){
        (e.type === "submit")
        ? this.agregarEvaluacion(e)
        : undefined
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
            this.showModulos()
        })
    }
}
customElements.define(name, formEvaluacion)