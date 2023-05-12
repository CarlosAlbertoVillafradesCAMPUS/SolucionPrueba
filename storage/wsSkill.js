import skills from "../API/skills.js"

self.addEventListener("message", (e) => {
    Promise.resolve(skills[`${e.data.function}`]((e.data.data) ? e.data.data : undefined)).then(res => postMessage(res))
})