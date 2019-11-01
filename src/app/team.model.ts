export class Team {
    "id" : Number
    "name" : string
    "link" : string
    "venue" : Venue       
    "abbreviation" : string
    "teamName" : string
    "locationName" : string
    "firstYearOfPlay" : string
    "division" : Division    
    "conference" : Conference  
    "franchise" : Franchise   
    "shortName" : string
    "officialSiteUrl" : string
    "franchiseId" : Number
    "active" : boolean
}

export class Roster{
    "person" : Person
    "jerseyNumber" : string
    "position" : Position
}

export class Person{
    "id" : Number
    "fullName" : string
    "link" : string
}

export class Position{
    "code" : string
    "name" : string
    "type" : string
    "abbreviation" : string
}

export class Venue {
    "name" : string
    "link" : string
    "city" : string
    "timeZone" : []
}

export class Timezone {
    "id" : string
    "offset" : Number
    "tz" : string
}

export class Division{
    "id" : Number
    "name" : string
    "link" : string
}

export class Conference {
    "id" : Number
    "name" : string
    "link" : string
}

export class Franchise{
    "franchiseId" : Number
    "teamName" : string
    "link" : string
}

export class Draft{
    "draftYear": number
    "rounds": Round[]
}

export class Round{
    "roundNumber": number
    "round": string
    "picks": Pick[]
}

export class Pick{
    "year": 2017
    "round": string
    "pickOverall": number
    "pickInRound": string
    "team": DraftTeam
    "prospect": Prospect
}

export class DraftTeam{
    "id": number
    "name": string
    "link": string
}

export class Prospect{
    "id": number
    "fullName": string
    "link": string
}

export class Prospects{
    "id" : number
    "fullName" : string
    "link" : string
    "firstName" : string
    "lastName" : string
    "birthDate" : string
    "birthCountry" : string
    "height" : string
    "weight" : number
    "shootsCatches" : string
    "primaryPosition" : PrimaryPosition
    "draftStatus" : string
    "prospectCategory" : ProspectCategory
    "amateurTeam" : AmateurTeam
    "amateurLeague" : amateurLeague
    "ranks" : any
}

export class PrimaryPosition{
    "code" : string
    "name" : string
    "type" : string
    "abbreviation" : string
}

export class ProspectCategory{
    "id" : number
    "shortName" : string
    "name" : string
}

export class AmateurTeam{  
    "name" : string
    "link" : string
}

export class amateurLeague{
    "name" : string
    "link" : string
}

export class Player{
    "id" : number
    "fullName" : string
    "link" : string
    "firstName" : string
    "lastName" : string
    "primaryNumber" : string
    "birthDate" : string
    "currentAge" : string
    "birthCity" : string
    "birthStateProvince" : string
    "birthCountry" : string
    "nationality" : string
    "height" : string
    "weight" : string
    "active" : boolean
    "alternateCaptain" : boolean
    "captain" : boolean
    "rookie" : boolean
    "shootsCatches" : string
    "rosterStatus" : string
    "currentTeam" : DraftTeam
    "primaryPosition" : PrimaryPosition
}

export class Stats {
    "timeOnIce" : string
    "assists" : number
    "goals" : number
    "pim" : number
    "shots" : number
    "games" : number
    "hits" : number
    "powerPlayGoals" : number
    "powerPlayPoints" : number
    "powerPlayTimeOnIce" : string
    "evenTimeOnIce" : string
    "penaltyMinutes" : string
    "faceOffPct" : number
    "shotPct" : number
    "gameWinningGoals" : number
    "overTimeGoals" : number
    "shortHandedGoals" : number
    "shortHandedPoints" : number
    "shortHandedTimeOnIce" : string
    "blocked" : number
    "plusMinus" : number
    "points" : number
    "shifts" : number
    "timeOnIcePerGame" : string
    "evenTimeOnIcePerGame" : string
    "shortHandedTimeOnIcePerGame" : string
    "powerPlayTimeOnIcePerGame" : string
  }