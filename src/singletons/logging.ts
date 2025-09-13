import {component} from "ironbean";
import {LogColor, LogType} from "../enums/logging.enum";
import * as fs from "node:fs";
import * as path from "node:path";
import {PathManager} from "./path-manager";

@component
export class Logging {
    private readonly _startDate: Date;
    private readonly _filename: string;
    private _logBuffer: string[];
    
    constructor() {
        this._startDate = new Date();
        this._filename = `${this.getTimestamp(this._startDate)}.log`
        this._logBuffer = [];
    }
    
    public init(loggingMinutesInterval: number) {
        setInterval(() => {
            this.save()
        }, loggingMinutesInterval)
    }
    
    private getTimestamp(date: Date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    }
    
    private getColorFromType = (type: LogType) => {
        switch (type) {
            case LogType.INFO:
                return LogColor.DEFAULT;
            case LogType.WARN:
                return LogColor.YELLOW;
            case LogType.ERROR:
                return LogColor.RED;
        }
    }
    
    private formatMessage(msg: string, type: LogType, color: boolean) {
        const timestampPart = this.getTimestamp(new Date());
        const typePart = `${color ? this.getColorFromType(type) : ""}${type}${color ? LogColor.DEFAULT : ""}`
        return `[${timestampPart}][${typePart}] ${msg}`
    }
    
    public remapToConsole() {
        console.log = (msg?: any, ...optional: any[]) => {
            this.log([msg, ...optional].join(" "));
        };
        console.warn = (msg?: any, ...optional: any[]) => {
            this.warn([msg, ...optional].join(" "));
        };
        console.error = (msg?: any, ...optional: any[]) => {
            this.error([msg, ...optional].join(" "));
        };
    }
    
    public log(msg: string) {
        this._logBuffer.push(this.formatMessage(msg, LogType.INFO, false));
        process.stdout.write(this.formatMessage(msg, LogType.INFO, true) + "\n");
    }
    
    public warn(msg: string) {
        this._logBuffer.push(this.formatMessage(msg, LogType.WARN, false));
        process.stdout.write(this.formatMessage(msg, LogType.WARN, true) + "\n");
    }
    
    public error(msg: string) {
        this._logBuffer.push(this.formatMessage(msg, LogType.ERROR, false));
        process.stdout.write(this.formatMessage(msg, LogType.ERROR, true) + "\n");
    }
    
    public async save() {
        const buffer = this._logBuffer.join("\n");
        this._logBuffer = [];
        await fs.promises.appendFile(path.join(PathManager.LOGS_PATH, this._filename), buffer);
    }
}