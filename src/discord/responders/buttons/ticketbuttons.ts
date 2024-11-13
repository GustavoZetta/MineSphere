import { Responder, ResponderType } from "#base";

new Responder({
    customId: "en/ticket/button/close",
    type: ResponderType.Button, cache: "cached",
    async run(interaction) {
        if (interaction.memberPermissions.has("BanMembers")) {
            interaction.channel?.send({ content: "Closing ticket in 5 seconds..."})
            interaction.reply({ ephemeral, content: "Closing ticket..."})
            setTimeout(() => {
                interaction.channel?.delete("Ticket fechado")
            }, 5000)
        } else {
            interaction.reply({content:"You does not have permission to do that!"})
        }
    },
});

new Responder({
    customId: "br/ticket/button/close",
    type: ResponderType.Button, cache: "cached",
    async run(interaction) {
        if (interaction.memberPermissions.has("BanMembers")) {
            interaction.channel?.send({ content: "Fechando ticket em 5 segundos..."})
            interaction.reply({ ephemeral, content: "Fechando ticket..."})
            setTimeout(() => {
                interaction.channel?.delete("Ticket fechado")
            }, 5000)
        } else {
            interaction.reply({content:"Você não possui permissão para executar esta ação!"})
        }
    },
});