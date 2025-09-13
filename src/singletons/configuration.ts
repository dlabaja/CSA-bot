import * as dotenv from "dotenv";
import {component} from "ironbean";

@component
export class Configuration {
    public token = "";
    
    public init() {
        dotenv.config({ quiet: true });
        this.token = process.env.TOKEN || "";
    }
}