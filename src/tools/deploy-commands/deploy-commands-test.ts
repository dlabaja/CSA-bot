import {REST, Routes} from "discord.js";
import {botContext} from "../../contexts/botContext";
import {ConfigurationManager} from "../../singletons/configuration-manager";
import {SlashCommandsManager} from "../../singletons/slash-commands-manager";

export async function deployCommandsTest() {
    const context = await botContext.getAndInitContext();
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