interface BaseConfig {
    titles: string[]
}

const Game:BaseConfig = {
    titles:["Highlight","Lowlight","TFC Activity","Findings","Output"]
}

const Ent: BaseConfig = {
    titles:["Highlight","Lowlight","External Blockers, Major Risks, and Challenges","Findings","TFC and other Activities"]
}

export const teamConfig:{[key: string]: BaseConfig} = {
    "GAME":Game,
    "ENT":Ent
}