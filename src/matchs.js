import { DbMatch } from "./models/DbMatch"

export const getMatchs = async () => {
    const matchs = await DbMatch.find()

    return matchs.map((match) => ({
        _id:match._id,
        team1:match.team1,
        team2:match.team2,
        teamscore1:match.teamscore1,
        teamscore2:match.teamscore2,
    }))
}

export const getMatch = async (id) => {
    return await DbMatch.findOne( {_id:id})
}

export const createMatch = async (match) => {
    const myDbMatch = new DbMatch(match)
    console.log(myDbMatch);
    await myDbMatch.save()
    return true
}