import path from "node:path";
import {component} from "ironbean";
import fs from "node:fs";

@component
export class PathManager {
    public static ROOT_PATH = path.join(__dirname, "..", "..");
    public static LOGS_PATH = path.join(PathManager.ROOT_PATH, "logs")
    
    public async init() {
        await this.createFolderIfMissing(PathManager.LOGS_PATH)
    }
    
    private async createFolderIfMissing(dirPath: string) {
        await fs.promises.mkdir(dirPath, { recursive: true });
    }
}