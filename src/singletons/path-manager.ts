import * as path from "node:path";

export class PathManager {
    public static ROOT_PATH = path.join(__dirname, "..", "..");
    public static LOGS_PATH = path.join(PathManager.ROOT_PATH, "logs")
}