import settings from "../../settings.json" with { type: "json" };
import { envSchema, type EnvSchema } from "./env.js";
import { brBuilder } from "@magicyan/discord";
import chalk from "chalk";
import log from "consola";

export * from "./error.js";
import "./global.js";

const obj = {
    BOT_TOKEN: "MTMwNjMwNjkwMTY0NTk4NzkyMg.GuMxTK.j10C7XRbuf95jZ7PhN9sBALikOOJejaJ_NQuNE",
    MAIN_GUILD_ID: "1291076072934211624",
    EN_TICKETS_CATEGORY_ID: "1306320256372965426",
    BR_TICKETS_CATEGORY_ID: "1306317275338506320",
    EN_JOIN_CHANNEL_ID: "1306202386905305088",
    BR_JOIN_CHANNEL_ID: "1291076073311965356",
    EN_QUIT_CHANNEL_ID: "1306202332694057010",
    BR_QUIT_CHANNEL_ID: "1291076073311965357",
    VERIFICATION_CHANNEL_ID: "1306348481870430268"
}

export { settings, log };   

const parseResult = envSchema.safeParse(obj);
if (!parseResult.success){
    for(const { message, path } of parseResult.error.errors){
        log.error({
            type: "ENV VAR",
            message: chalk.red(`${chalk.bold(path)} ${message}`)
        });
    }
    log.fatal(chalk.red(brBuilder(
        "Environment variables are undefined or the env file was not loaded.",
        "Make sure to run the bot using package.json scripts"
    )));
    process.exit(1);
}
process.env=Object({ ...obj, 
    ...parseResult.data 
});

log.success(chalk.hex(settings.colors.bravery)("Env vars loaded successfully!"));

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Readonly<EnvSchema> {}
    }
}
