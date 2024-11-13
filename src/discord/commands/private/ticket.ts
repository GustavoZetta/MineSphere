import { Command, Responder, ResponderType } from "#base";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, ChannelType, StringSelectMenuBuilder } from "discord.js";

const rowbr = createRow(
    new ButtonBuilder({
        customId: "br/ticket/button/close",
        label: "Fechar ticket", 
        emoji: "🚫",
        style: ButtonStyle.Secondary
    })
);
const rowen = createRow(
    new ButtonBuilder({
        customId: "en/ticket/button/close",
        label: "Close ticket", 
        emoji: "🚫",
        style: ButtonStyle.Secondary
    })
);

new Command({
    name: "ticketbr",
    description: "Transforma o canal em um canal de ticket",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const embed = createEmbed({
            title: ":identification_card: Central de Atendimento",
            color: "White",
            description: brBuilder(
                "Aqui é onde você vem quando há algum problema relacionado ao servidor!",
                " ", 
                "Horário de atendimento:"
            ),
            fields: [
                { name: "Seg. a Sex.:", value: "14:00 até 18:00", inline: false },
                { name: "Sáb. e Dom.:", value: "7:00 até 21:00", inline: false },
            ],
        })
        const row = createRow(
            new StringSelectMenuBuilder({
                customId: "br/ticket/select/reason",
                placeholder: "Selecione uma categoria...",
                options: [
                    {
                        emoji: "📞",
                        label: "Suporte Geral",
                        value: "📞",
                        description: "Suporte Generalizado sobre o servidor",
                    },
                    {
                        emoji: "💰",
                        label: "Suporte Financeiro",
                        value: "💰",
                        description: "Suporte sobre as finanças",
                    },
                    {
                        emoji: "✅",
                        label: "Dúvidas",
                        value: "✅",
                        description: "Resolva suas dúvidas",
                    },
                    {
                        emoji: "🚫",
                        label: "Denúncias",
                        value: "🚫",
                        description: "Denúncie alguém que infrigiu as regras do servidor",
                    },
                ],
            })
        )
        interaction.channel?.bulkDelete(100).then(() => {
            interaction.channel?.send({
                embeds: [embed],
                components: [row],
            });
            const r = interaction.reply({ ephemeral, content: "Comando executado com sucesso!" });
            setTimeout(() => {
                r.then((v) => {
                    v.delete()
                })
            }, 10000)
        });
    }
})

new Command({
    name: "ticketus",
    description: "Transform the channel in a ticket channel",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const embed = createEmbed({
            title: ":identification_card: Support Center",
            color: "White",
            description: brBuilder(
                "This is where you come when there is a server-related issue!", 
                " ", 
                "Service hours:"
            ),
            fields: [
                { name: "Mon. to Sex.:", value: "14:00 to 18:00", inline: false },
                { name: "Sat. and Sun.:", value: "7:00 to 21:00", inline: false },
            ],
        })
        const row = createRow(
            new StringSelectMenuBuilder({
                customId: "en/ticket/select/reason",
                placeholder: "Select a category...",
                options: [
                    {
                        emoji: "📞",
                        label: "General Support",
                        value: "📞",
                        description: "General support about the server",
                    },
                    {
                        emoji: "💰",
                        label: "Financial Support",
                        value: "💰",
                        description: "Support about financial",
                    },
                    {
                        emoji: "✅",
                        label: "Doubts",
                        value: "✅",
                        description: "Solve your doubts",
                    },
                    {
                        emoji: "🚫",
                        label: "Reports",
                        value: "🚫",
                        description: "Report someone who broke the server rules",
                    },
                ],
            })
        )
        interaction.channel?.bulkDelete(100).then(() => {
            interaction.channel?.send({
                embeds: [embed],
                components: [row],
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
    customId: "en/ticket/select/reason",
    type: ResponderType.StringSelect,
    async run(interaction) {
        if (!interaction.guild) {
            return;
        }
        const channel = await interaction.guild.channels.fetch(process.env.EN_TICKETS_CATEGORY_ID)
        if (!channel || channel.type !== ChannelType.GuildCategory) {
            return;
        }
        const embed = createEmbed({
            title: `Ticket - ${interaction.user.displayName}`,
            color: "White",
            description: brBuilder(
                `Your ticket has been created, ${interaction.user.displayName}`, 
                "Type down why you opened this ticket and attach any files that you may need to explain.",
                " "
            ),
            footer: {
                text: "Please do not rush our team or keep tagging frequently!"
            },
            timestamp: new Date()
        });
        interaction.guild.channels.create({
            name: `${interaction.values[0]}・ticket-${interaction.user.username}`, 
            parent: channel,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: `${interaction.guildId}`,
                    deny: ["ViewChannel"]
                },
                {
                    id: `${interaction.user.id}`,
                    allow: ["ViewChannel", "SendMessages", "AttachFiles"]
                }
            ]
        }).then((canal) => {
            canal.send({content: `<@&1291076073110376564> & <@${interaction.user.id}>`, embeds: [embed], components: [rowen]})
            interaction.reply({ephemeral, content:`Ticket created! <#${canal.id}>`})
        })
    }
})
new Responder({
    customId: "br/ticket/select/reason",
    type: ResponderType.StringSelect,
    async run(interaction) {
        if (!interaction.guild) {
            return;
        }
        const channel = await interaction.guild.channels.fetch(process.env.BR_TICKETS_CATEGORY_ID)
        if (!channel || channel.type !== ChannelType.GuildCategory) {
            return;
        }
        const embed = createEmbed({
            title: `Ticket - ${interaction.user.displayName}`,
            color: "White",
            description: brBuilder(
                `Seu ticket foi criado, ${interaction.user.displayName}`, 
                "Escreva abaixo por que você abriu este ticket e envie quaisquer arquivos que precise para explicar.",
                " "
            ),
            footer: {
                text: "Por favor, não apresse nossa equipe ou fique marcando a staff toda hora!"
            },
            timestamp: new Date()
        });
        interaction.guild.channels.create({
            name: `${interaction.values[0]}・ticket-${interaction.user.username}`, 
            parent: channel,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: `${interaction.guildId}`,
                    deny: ["ViewChannel"]
                },
                {
                    id: `${interaction.user.id}`,
                    allow: ["ViewChannel", "SendMessages", "AttachFiles"]
                }
            ]
        }).then((canal) => {
            canal.send({content: `<@&1291076073110376564> & <@${interaction.user.id}>`, embeds: [embed], components: [rowbr]})
            interaction.reply({ephemeral, content:`Ticket criado! <#${canal.id}>`})
        })
    }
})

