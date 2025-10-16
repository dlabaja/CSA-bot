import {BaseSlashCommand} from "../base-slash-command";
import {ChatInputCommandInteraction} from "discord.js";
import {ImageGift} from "./gift/image-gift";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";
import {SlashCommandOptionType} from "../../../enums/slash-command-option-type.enum";

@RegisterSlashCommand({
    name: "image",
    description: "Generate an image",
    options: [
        {
            type: SlashCommandOptionType.SUB_COMMAND,
            name: "gift",
            description: "Kalousek would like to give you something",
            options: [{
                type: SlashCommandOptionType.STRING,
                name: "url",
                description: "Image of the url you want for Kalousek (must be .png)",
            }]
        },
    ]
})
export class Image extends BaseSlashCommand {
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        switch (interaction.options.getSubcommand()) {
            case "gift":
                return await new ImageGift().execute(interaction);
            default:
                await interaction.reply("Subcommand not found")
        }
    }
}