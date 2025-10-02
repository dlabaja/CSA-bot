import dotenv from "dotenv";
import {component} from "ironbean";
import process from "node:process";
import config from "../../config.json"

@component
export class ConfigurationManager {
    private _token = "";
    private _clientId = "";
    private _testGuildId = "";
    private _regionRoleIds: number[] = []

    public init() {
        dotenv.config({ quiet: true });
        this._token = process.env.TOKEN || "";
        if (!this._token) {
            console.error("Bot token missing, provide one in the .env file");
            process.exit(1)
        }  
        this._clientId = config.CLIENT_ID || "";
        this._testGuildId = config.TEST_GUILD_ID || "";
        this._regionRoleIds = config.REGION_ROLE_IDS || [];
    }
    
    get token(): string {
        return this._token;
    }

    get clientId(): string {
        return this._clientId;
    }

    get testGuildId(): string {
        return this._testGuildId;
    }

    get regionRoleIds(): number[] {
        return this._regionRoleIds;
    }
}