import { Command, Responder, ResponderType } from "#base";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder, SelectMenuDefaultValueType, StringSelectMenuBuilder } from "discord.js";

new Command({
    name: "verify",
    type: ApplicationCommandType.ChatInput,
    description: "Transforma o canal em um canal de verificação",
    async run(interaction) {
        const embed = createEmbed({
            title: ":white_check_mark: Verify your identity to enter the server (Verifique sua identidade para entrar no servidor)",
            color: "Green",
            description: brBuilder(
                ":flag_us: Verify your account with some questions to enter the MineSphere Host Discord server", 
                "To start the verification process just click the button down below",
                "",
                ":flag_br: Verifique sua conta com algumas perguntas para entrar no servidor do Discord da Host MineSphere", 
                "Para iniciar o processo de verificação apenas clique no botão abaixo"
            ),
        })
        const row = createRow(
            new ButtonBuilder({
                customId: "verify/start",
                emoji: "✨",
                label: "Start verification (Iniciar verificação)",
                style: ButtonStyle.Success
            })
        )
        interaction.channel?.bulkDelete(100).then(() => {
            interaction.channel?.send({
                embeds: [embed],
                components: [row]
            });
            const r = interaction.reply({ ephemeral, content: "Command executed sucefully!" });
            setTimeout(() => {
                r.then((v) => {
                    v.delete()
                })
            }, 10000)
        });
    }
})

new Responder({
    customId: "verify/start",
    type: ResponderType.Button,
    async run(interaction) {
        const embed = createEmbed({
            title: "Choose a language (Escolha uma língua)"
        })
        const row = createRow(
            new ButtonBuilder({
                customId: "verify/country/br",
                emoji: "🇧🇷",
                label: "Portuguese",
                style: ButtonStyle.Primary
            }),
            new ButtonBuilder({
                customId: "verify/country/en",
                emoji: "🇺🇸",
                label: "English",
                style: ButtonStyle.Primary
            })
        )
        if (interaction.replied) {
            interaction.editReply({embeds: [embed], components: [row]})
        } else {
            interaction.reply({embeds: [embed], components: [row]})
        }
    },
})

new Responder({
    customId: "verify/country/br",
    type: ResponderType.Button,
    async run(interaction) {
        const embed = createEmbed({
            title: "Qual sua faixa de idade?"
        })
        const row = createRow(
            new RoleSelectMenuBuilder({
                customId: "br/verify/question/1",
                default_values: [
                    {
                        id: "",
                        type: SelectMenuDefaultValueType.Role
                    }
                ]
            })
        )
        if (interaction.replied) {
            interaction.editReply({embeds: [embed], components: [row]})
        } else {
            interaction.reply({embeds: [embed], components: [row]})
        }
    },
})