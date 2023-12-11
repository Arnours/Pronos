import express from "express"
import { initializeFfManager } from "./featureFlag.js"
import { tagRecipeDifficulty } from "./difficultyTagger.js"
import { DbRecipe } from "./DbRecipe.js"
import { DbMatch } from "./dataschema/DbMatch.js"
//import { DbTeam } from "./dataschema/DbTeam.js"

const isEnabled = await initializeFfManager()

export async function createApp() {
    const app = express()
    app.use(express.urlencoded({ extended: true }))

    app.set("view engine", "ejs")
    app.set("views", "./src/views")

    app.get("/home", async (req, res) => {
        let recipes = await DbRecipe.find()
        recipes = recipes.map((recipe) => ({
            _id:recipe._id,
            name:recipe.name,
            difficulty: tagRecipeDifficulty(recipe)
        }))
        //const showLoginButton = await isEnabled('login_button')
        //res.render("home", { recipes , showLoginButton })
        res.render("home", { recipes })
    })

    app.get("/matchs", async (req, res) => {
        // findone
        let matchs = await DbMatch.find()
        matchs = matchs.map((match) => ({
            _id:match._id,
            team1:match.team1,
            team2:match.team2,
            teamscore1:match.teamscore1,
            teamscore2:match.teamscore2,
        }))
        // const showLoginButton = await isEnabled('login_button')
        // res.render("match", { matchs , showLoginButton })
        res.render("matchs", { matchs })
    })
    app.get("/match/:_id", async (req, res) => {
        // findone
        let match = await DbMatch.findOne( {_id:req.params._id})
        // match = match.map((match) => ({
        //     _id:match._id,
        //     team1:match.team1,
        //     team2:match.team2,
        //     teamscore1:match.teamscore1,
        //     teamscore2:match.teamscore2,
        // }))
        // const showLoginButton = await isEnabled('login_button')
        // res.render("match", { matchs , showLoginButton })
        res.render("match", { match })
    })


    app.post("/recipe", async (req, res) => {
        const recipe = req.body
        const dbRecipe = new DbRecipe(recipe)
        await dbRecipe.save()
        res.redirect("/home")
    })

    app.post("/match", async (req, res) => {
        const match = req.body
        console.log(match);
        const myDbMatch = new DbMatch(match)
        console.log(myDbMatch);
        await myDbMatch.save()
        res.redirect("/match")
    })



    return app
}