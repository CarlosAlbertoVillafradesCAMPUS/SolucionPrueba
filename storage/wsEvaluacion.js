import evaluacion from "../API/evaluacion.js"

self.addEventListener("message", (e) => {
    Promise.resolve(evaluacion[`${e.data.function}`]((e.data.data) ? e.data.data : undefined)).then(res => postMessage(res))
})