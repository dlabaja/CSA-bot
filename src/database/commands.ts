import {ISlashCommand} from "../data/slash-command";
import {PingCommand} from "../commands/ping";
import {HelpCommand} from "../commands/help";

export const commands: ISlashCommand[] = [
    {
        name: "ping",
        description: "Replies with Pong!",
        callback: async (interaction) => await PingCommand(interaction)
    },
    {
        name: "help",
        description: "Lists all commands",
        callback: async (interaction) => await HelpCommand(interaction)
    }
] 