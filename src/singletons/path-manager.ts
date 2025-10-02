import path from "node:path";
import {component} from "ironbean";
import fs from "node:fs";

@component
export class PathManager {
    public static ROOT_PATH = path.join(__dirname, "..", "..");
    public static LOGS_PATH = path.join(PathManager.ROOT_PATH, "logs")
    public static DB_PATH = path.join(PathManager.ROOT_PATH, "database")
    
    public async init() {
        await this.createFolderIfMissing(PathManager.LOGS_PATH)
        await this.createFolderIfMissing(PathManager.DB_PATH)
    }
    
    public static getPath(dirname: string, relativePath: string) {
        return path.join(dirname, relativePath)
    }
    
    private async createFolderIfMissing(dirPath: string) {
        await fs.promises.mkdir(dirPath, { recursive: true });
    }
}