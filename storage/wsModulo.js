import modulo from "../API/modulo.js"

self.addEventListener("message", (e) => {
    Promise.resolve(modulo[`${e.data.function}`]((e.data.data) ? e.data.data : undefined)).then(res => postMessage(res))
})