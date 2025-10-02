import {execSync} from "child_process";

console.log("Installing dependencies...")
execSync("npm run install-deps", { stdio: "inherit" })

console.log("Migrating database...")
execSync("npm run prisma-migrate", { stdio: "inherit" })

console.log("Deploying commands...")
execSync("npm run deploy-commands--GLOBAL", { stdio: "inherit" })