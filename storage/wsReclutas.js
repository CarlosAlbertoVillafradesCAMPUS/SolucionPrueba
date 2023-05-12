import reclutas from "../API/reclutas.js"

self.addEventListener("message", (e) => {
    Promise.resolve(reclutas[`${e.data.function}`]((e.data.data) ? e.data.data : undefined)).then(res => postMessage(res))
})