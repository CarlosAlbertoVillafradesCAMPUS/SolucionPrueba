import formRecluta from "./components/form-recluta/form-recluta.js";
import formTeam from "./components/form-team/form-team.js";
import formSkill from "./components/form-skill/form-skill.js";
import formModulo from "./components/form-modulo/form-modulo.js";
import formEvaluacion from "./components/form-evalua/form-evaluacion.js";

const btnRecluta = document.querySelector("#btn-reclutas");
btnRecluta.addEventListener("click", (e)=>{
    document.querySelector(".showInfo").innerHTML = `<form-recluta></form-recluta>`;
})

const btnTeam = document.querySelector("#btn-team");
btnTeam.addEventListener("click", (e)=>{
    document.querySelector(".showInfo").innerHTML = `<form-team></form-team>`;
})

const btnSkills = document.querySelector("#btn-skills");
btnSkills.addEventListener("click", (e)=>{
    document.querySelector(".showInfo").innerHTML = `<form-skill></form-skill>`;
})

const btnModulo = document.querySelector("#btn-modulo");
btnModulo.addEventListener("click", (e)=>{
    document.querySelector(".showInfo").innerHTML = `<form-modulo></form-modulo>`;
})

const btnEvaluacion = document.querySelector("#btn-evaluacion");
btnEvaluacion.addEventListener("click", (e)=>{
    document.querySelector(".showInfo").innerHTML = `<form-evaluacion></form-evaluacion>`;
})

