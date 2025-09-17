import {REST, Routes} from "discord.js";
import {ConfigurationManager} from "../../singletons/configuration-manager";
import {SlashCommandsManager} from "../../singletons/slash-commands-manager";
import {ScriptContext} from "../../contexts/scriptContext";

export async function deployCommandsGlobal() {
    const context = await new ScriptContext().initContext();
    const configuration = context.getBean(ConfigurationManager);
    const commandsManager = context.getBean(SlashCommandsManager);

    const rest = new REST().setToken(configuration.token);
    try {
        console.log("Refreshing slash commands for GLOBAL");
        await rest.put(
            Routes.applicationCommands(configuration.clientId),
            { body: commandsManager.getCommandsDataJson() },
        );
        console.log("Refresh successful");
    }
    catch (error) {
        console.error(error);
    }
}

deployCommandsGlobal();