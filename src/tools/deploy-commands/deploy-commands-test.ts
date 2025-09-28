import {REST, Routes} from "discord.js";
import {ConfigurationManager} from "../../singletons/configuration-manager";
import {SlashCommandsManager} from "../../singletons/slash-commands-manager";
import {ScriptContext} from "../../contexts/scriptContext";

export async function deployCommandsTest() {
    const context = await new ScriptContext().initContext();
    const configuration = context.getBean(ConfigurationManager);
    const commandsManager = context.getBean(SlashCommandsManager);
    
    const rest = new REST().setToken(configuration.token);
    try {
        console.log("Refreshing slash commands for TEST");
        const body = commandsManager.getCommandsDataJson();
        console.log(body)
        await rest.put(
            Routes.applicationGuildCommands(configuration.clientId, configuration.testGuildId),
            { body: body },
        );
        console.log("Refresh successful");
    } 
    catch (error) {
        console.error(error);
    }
}

deployCommandsTest();