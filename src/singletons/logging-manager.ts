import {component} from "ironbean";
import {LogColor, LogType} from "../enums/logging.enum";
import * as fs from "node:fs";
import * as path from "node:path";
import {PathManager} from "./path-manager";

@component
export class LoggingManager {
    private readonly _startDate: Date;
    private readonly _filename: string;
    private _logBuffer: string[];
    
    constructor() {
        this._startDate = new Date();
        this._filename = `${this._getTimestamp(this._startDate)}.log`
        this._logBuffer = [];
    }
    
    public init(loggingMinutesInterval: number) {
        setInterval(async () => {
            await this.save()
        }, loggingMinutesInterval * 1000 * 60)
        process.on("SIGTERM", () => {
            this.saveSync();
            process.exit(0)
        });
        process.on("SIGINT", () => {
            this.saveSync();
            process.exit(0)
        });
        process.on("exit", () => {
            this.saveSync();
            process.exit(0)
        });
        process.on("uncaughtException", (error) => {
            console.error(error)
            this.saveSync();
            process.exit(1)
        });
        process.on("unhandledRejection", (reason) => {
            console.error(reason)
            this.saveSync();
            process.exit(1)
        });
    }
    
    private _getTimestamp(date: Date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    }
    
    private _getColorFromType = (type: LogType) => {
        switch (type) {
            case LogType.INFO:
                return LogColor.DEFAULT;
            case LogType.WARN:
                return LogColor.YELLOW;
            case LogType.ERROR:
                return LogColor.RED;
        }
    }
    
    private _formatMessage(msg: string, type: LogType, color: boolean) {
        const timestampPart = this._getTimestamp(new Date());
        const typePart = `${color ? this._getColorFromType(type) : ""}${type}${color ? LogColor.DEFAULT : ""}`
        return `[${timestampPart}][${typePart}] ${msg}`
    }
    
    private dataToString(data: never[]) {
        return data.map((d) => {
            if (typeof d === "object") {
                return JSON.stringify(d)
            }
            return d;
        }).join(" ")
    }
    
    public remapToConsole() {
        console.log = (...data: never[]) => {
            this.log(this.dataToString(data));
        };
        console.warn = (...data: never[]) => {
            this.warn(this.dataToString(data));
        };
        console.error = (...data: never[]) => {
            this.error(this.dataToString(data));
        };
    }
    
    public log(msg: string) {
        this._logBuffer.push(this._formatMessage(msg, LogType.INFO, false));
        process.stdout.write(this._formatMessage(msg, LogType.INFO, true) + "\n");
    }
    
    public warn(msg: string) {
        this._logBuffer.push(this._formatMessage(msg, LogType.WARN, false));
        process.stdout.write(this._formatMessage(msg, LogType.WARN, true) + "\n");
    }
    
    public error(msg: string) {
        this._logBuffer.push(this._formatMessage(msg, LogType.ERROR, false));
        process.stdout.write(this._formatMessage(msg, LogType.ERROR, true) + "\n");
    }
    
    public async save() {
        const buffer = this._logBuffer.join("\n") + "\n";
        this._logBuffer = [];
        await fs.promises.appendFile(path.join(PathManager.LOGS_PATH, this._filename), buffer);
    }
    
    public saveSync() {
        const buffer = this._logBuffer.join("\n") + "\n";
        this._logBuffer = [];
        fs.appendFileSync(path.join(PathManager.LOGS_PATH, this._filename), buffer)
    }
}