import teams from "../API/teams.js"

self.addEventListener("message", (e) => {
    Promise.resolve(teams[`${e.data.function}`]((e.data.data) ? e.data.data : undefined)).then(res => postMessage(res))
})