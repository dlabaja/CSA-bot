import {
    SlashCommandBooleanOption,
    SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandNumberOption,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
    SlashCommandUserOption
} from "discord.js";
import {SlashCommandOption, SlashCommand} from "../data/slash-command";
import {SlashCommandOptionType} from "../enums/slash-command-option-type.enum";

export class SlashCommandConverter {
    private _addStringOption(optionBuilder: SlashCommandStringOption, option: Extract<SlashCommandOption, { type: SlashCommandOptionType.STRING }>) {
        optionBuilder
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(!option.optional);
        if (option.choices) {
            optionBuilder.addChoices(option.choices)
        }
        return optionBuilder;
    }

    private _addIntegerOption(optionBuilder: SlashCommandIntegerOption, option: Extract<SlashCommandOption, { type: SlashCommandOptionType.INTEGER }>) {
        return optionBuilder
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(!option.optional);
    }

    private _addNumberOption(optionBuilder: SlashCommandNumberOption, option: Extract<SlashCommandOption, { type: SlashCommandOptionType.NUMBER }>) {
        return optionBuilder
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(!option.optional);
    }

    private _addBooleanOption(optionBuilder: SlashCommandBooleanOption, option: Extract<SlashCommandOption, { type: SlashCommandOptionType.BOOLEAN }>) {
        return optionBuilder
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(!option.optional);
    }

    private _addUserOption(optionBuilder: SlashCommandUserOption, option: Extract<SlashCommandOption, { type: SlashCommandOptionType.USER }>) {
        return optionBuilder
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(!option.optional);
    }
    
    private _addSubcommand(optionBuilder: SlashCommandSubcommandBuilder, option: Extract<SlashCommandOption, { type: SlashCommandOptionType.SUB_COMMAND }>) {
        optionBuilder
            .setName(option.name)
            .setDescription(option.description)
        if (option.options) {
            this._addOptions(optionBuilder, option.options)
        }
        return optionBuilder;
    }
    
    private _addOptions(builder: SlashCommandBuilder|SlashCommandSubcommandBuilder, options: SlashCommandOption[]) {
        options.forEach((option) => {
            switch (option.type) {
                case SlashCommandOptionType.STRING:
                    return builder.addStringOption(o => this._addStringOption(o, option))
                case SlashCommandOptionType.INTEGER:
                    return builder.addIntegerOption(o => this._addIntegerOption(o, option))
                case SlashCommandOptionType.NUMBER:
                    return builder.addNumberOption(o => this._addNumberOption(o, option))
                case SlashCommandOptionType.BOOLEAN:
                    return builder.addBooleanOption(o => this._addBooleanOption(o, option))
                case SlashCommandOptionType.USER:
                    return builder.addUserOption(o => this._addUserOption(o, option))
                case SlashCommandOptionType.SUB_COMMAND:
                    return !(builder instanceof SlashCommandSubcommandBuilder) ? builder.addSubcommand(o => this._addSubcommand(o, option)) : builder;
            }
        })
        
        return builder;
    }
    
    public toJson(command: SlashCommand) {
        const builder = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setNSFW(command.nsfw)
        if (command.permissions) {
            builder.setDefaultMemberPermissions(command.permissions.bitfield)
        }
        this._addOptions(builder, command.options);
        return builder.toJSON();
    }
}