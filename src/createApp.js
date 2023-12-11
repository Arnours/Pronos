import express from "express"
import { initializeFfManager } from "./featureFlag.js"
import { createMatch, getMatch, getMatchs } from "./matchs.js"
//import { DbTeam } from "./dataschema/DbTeam.js"

const isEnabled = await initializeFfManager()

export async function createApp() {
    const app = express()
    app.use(express.urlencoded({ extended: true }))

    app.set("view engine", "ejs")
    app.set("views", "./src/views")

    app.get("/matchs", async (req, res) => {
        const matchs = await getMatchs()
        res.render("matchs", { matchs: matchs })
    })

    app.get("/match/:id", async (req, res) => {
        // findone
        const {id} = req.params
        const match = getMatch(id)
        res.render("match", { match })
    })

    app.post("/match", async (req, res) => {
        const match = req.body
        const ok = createMatch(match)
        res.redirect("/match")
    })

    return app
}