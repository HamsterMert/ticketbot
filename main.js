const { AoiClient } = require("aoi.js");
const settings = require("./settings.json");

const client = new AoiClient({
    token: settings.token, 
    prefix: settings.prefix,
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage", "onInteractionCreate"],
    database: {
        type: "aoi.db",
        db: require("@aoijs/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
});



client.status({
    name: "🎈 HamsterMert | TicketBot",
    type: "Playing",
},{
    name: "✨ !yardım",
    type: "Playing",
})

client.readyCommand({
    code: `
    $wait[3]
    $log[$userDisplayName[$clientID] aktif.]
    `
})

client.variables({
    ticketAuthor: "",
    ticketID: "",
})


client.loadCommands("./commands");