import mongoose from "mongoose";

const DbTeamSchema = mongoose.Schema({
    name : {
        type: String,
        default:false
    },
    country : {
        type: String,
        default:false
    },
    Town : {
        type: String,
        default:false
    },
})

const DbTeam = mongoose.model("Team", DbTeamSchema);

export {DbTeam, DbTeamSchema}