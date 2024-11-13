import { z } from "zod";

const envSchema = z.object({
    BOT_TOKEN: z.string({ description: "Discord Bot Token is required" }).min(1),
    MAIN_GUILD_ID: z.string({ description: "Main Guild ID is required" }).min(1),
    EN_TICKETS_CATEGORY_ID: z.string({ description: "En Tickets Category ID is required" }).min(1),
    BR_TICKETS_CATEGORY_ID: z.string({ description: "Br Tickets Category ID is required" }).min(1),
    EN_JOIN_CHANNEL_ID: z.string({ description: "En Join Channel ID is required" }).min(1),
    BR_JOIN_CHANNEL_ID: z.string({ description: "Br Join Channel ID is required" }).min(1),
    EN_QUIT_CHANNEL_ID: z.string({ description: "En Quit Channel ID is required" }).min(1),
    BR_QUIT_CHANNEL_ID: z.string({ description: "Br Quit Channel ID is required" }).min(1),
    VERIFICATION_CHANNEL_ID: z.string({ description: "Verification Channel ID is required" }).min(1)
    // Env vars...
});

type EnvSchema = z.infer<typeof envSchema>;

export { envSchema, type EnvSchema };