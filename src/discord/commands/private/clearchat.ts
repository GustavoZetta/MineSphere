import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "clearchat",
    description: "Limpa o chat",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        interaction.channel?.bulkDelete(100).then(() => {
            const r = interaction.reply({ ephemeral, content: "Comando executado com sucesso!" });
            setTimeout(() => {
                r.then((v) => {
                    v.delete()
                })
            }, 10000)
        });
    },
});

