import {component} from "ironbean";
import { PrismaClient } from "../generated/prisma";

@component
export class DatabaseManager {
    private readonly _db: PrismaClient
    
    constructor() {
        this._db = new PrismaClient()
    }

    get db(): PrismaClient {
        return this._db;
    }
}