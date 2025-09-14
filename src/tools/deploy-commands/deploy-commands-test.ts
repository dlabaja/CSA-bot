import {REST, Routes} from "discord.js";
import {ConfigurationManager} from "../../singletons/configuration-manager";
import {SlashCommandsManager} from "../../singletons/slash-commands-manager";
import {context, initContext} from "../../contexts/context";
import {ScriptContext} from "../../contexts/scriptContext";

export async function deployCommandsTest() {
    await initContext(new ScriptContext());
    const configuration = context.getBean(ConfigurationManager);
    const commandsManager = context.getBean(SlashCommandsManager);
    
    const rest = new REST().setToken(configuration.token);
    try {
        console.log("Refreshing slash commands for TEST");
        await rest.put(
            Routes.applicationGuildCommands(configuration.clientId, configuration.testGuildId),
            { body: commandsManager.getCommandsDataJson() },
        );
        console.log("Refresh successful");
    } 
    catch (error) {
        console.error(error);
    }
}

deployCommandsTest();