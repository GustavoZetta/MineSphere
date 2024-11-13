
import { Event } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";

new Event({
    name: "UserAdd",
    event: "guildMemberAdd",
    async run(event) {
        event.roles.add("1306341021319299172")
        event.guild?.channels.fetch(process.env.EN_JOIN_CHANNEL_ID).then((canal) => {
            const embed = createEmbed({
                title: `Welcome, ${event.user.displayName}`,
                description: brBuilder(
                    "Be welcome to the MineSphere Host!",
                    "Your new minecraft host provider!"
                ),
                color: "Green",
                fields: [
                    {
                        name: "See our rules here:",
                        value: "<#1306202438067294238>",
                        inline: true
                    },
                    {
                        name: "See our pricing here:",
                        value: "<#1306201934952136794>",
                        inline: true
                    },
                ] 
            })
            if (canal?.isTextBased() || canal?.isSendable() || canal?.isDMBased()) {
                canal.send({ content: `<@${event.user.id}>`, embeds: [embed]})
            }
        })
        event.guild?.channels.fetch(process.env.BR_JOIN_CHANNEL_ID).then((canal) => {
            const embed = createEmbed({
                title: `Bem vindo, ${event.user.displayName}`,
                description: brBuilder(
                    "Seja bem-vindo a MineSphere Host!",
                    "Sua nova provedora de hosts de minecraft!"
                ),
                color: "Green",
                fields: [
                    {
                        name: "Veja as nossas regras aqui:",
                        value: "<#1291076073311965355>",
                        inline: true
                    },
                    {
                        name: "Veja nossos preços aqui:",
                        value: "<#1291076073437528131>",
                        inline: true
                    }
                ] 
            })
            if (canal?.isTextBased() || canal?.isSendable() || canal?.isDMBased()) {
                canal.send({ content: `<@${event.user.id}>`, embeds: [embed]})
            }
        })
    }
});

new Event({
    name: "UserRemoved",
    event: "guildMemberRemove",
    async run(event) {
        event.guild?.channels.fetch(process.env.EN_QUIT_CHANNEL_ID).then((canal) => {
            const embed = createEmbed({
                title: `Goodbye, ${event.user.displayName} 😭`,
                color: "Red",
                description: brBuilder(
                    "We are sorry if we didn't provide your needed services! 😭",
                    "Maybe you will come back later!"
                )
            })
            if (canal?.isTextBased() || canal?.isSendable() || canal?.isDMBased()) {
                canal.send({ content: `<@${event.user.id}>`, embeds: [embed]})
            }
        })
        event.guild?.channels.fetch(process.env.BR_JOIN_CHANNEL_ID).then((canal) => {
            const embed = createEmbed({
                title: `Até mais, ${event.user.displayName} 😭`,
                color: "Red",
                description: brBuilder(
                    "Nos desculpe se não te entregamos os seus serviços necessários! 😭",
                    "Talvez você volte depois!"
                ),
            })
            if (canal?.isTextBased() || canal?.isSendable() || canal?.isDMBased()) {
                canal.send({ content: `<@${event.user.id}>`, embeds: [embed]})
            }
        })
    }
});