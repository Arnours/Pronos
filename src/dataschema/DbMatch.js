import mongoose, { Schema } from "mongoose";

const DbMatchSchema = mongoose.Schema({
    team1: String,
    team2 : String,
    teamscore1 : Number,
    teamscore2 : Number,
})

const DbMatch = mongoose.model("Match", DbMatchSchema);

export {DbMatch, DbMatchSchema}