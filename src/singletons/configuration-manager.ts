import dotenv from "dotenv";
import {component} from "ironbean";
import process from "node:process";

@component
export class ConfigurationManager {
    private _token = "";
    private _clientId = "";
    private _testGuildId = "";

    get token(): string {
        return this._token;
    }

    get clientId(): string {
        return this._clientId;
    }

    get testGuildId(): string {
        return this._testGuildId;
    }

    public init() {
        dotenv.config({ quiet: true });
        this._token = process.env.TOKEN || "";
        this._clientId = process.env.CLIENT_ID || "";
        this._testGuildId = process.env.TEST_GUILD_ID || "";
    }
}