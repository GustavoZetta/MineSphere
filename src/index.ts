import { bootstrapApp } from "#base";

const obj = {
    MAIN_GUILD_ID: "1291076072934211624"
}

const { MAIN_GUILD_ID } = process.env;

bootstrapApp({ 
    workdir: import.meta.dirname,
    commands: {
        guilds: [MAIN_GUILD_ID]
    }
});

