import {autowired, component} from "ironbean";
import {ConfigurationManager} from "./configuration-manager";
import {Client, GatewayIntentBits} from "discord.js";

@component
export class BotManager {
    @autowired private _configuration: ConfigurationManager;
    private readonly _client: Client;
    
    constructor() {
        this._client = new Client({ intents: [GatewayIntentBits.Guilds] });
    }

    get client(): Client {
        return this._client;
    }

    public async login() {
        await this._client.login(this._configuration.token);
        console.log("Login successful")
    }
}