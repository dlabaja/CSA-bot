import {ApplicationContext, Dependency, getBaseApplicationContext} from "ironbean";

export abstract class Context {
    protected readonly _appContext: ApplicationContext;
    private _initialized: boolean;

    constructor() {
        this._appContext = getBaseApplicationContext();
    }

    public async initContext(): Promise<void> {
        if (this._initialized) {
            return;
        }
        setContext(this)
        await this.init();
        this._initialized = true;
    }
    
    protected abstract init(): Promise<void>;

    public getBean<T>(dependency: Dependency<T>) {
        return this._appContext.getBean<T>(dependency)
    }
}

let _context: Context | null = null;

export const context: Context = new Proxy({} as Context, {
    get(_, prop) {
        if (!_context) throw new Error("Context not initialized");
        const value = (_context as any)[prop];
        if (typeof value === "function") {
            return value.bind(_context);
        }
        return value;
    },
    set(_, prop, value) {
        if (!_context) throw new Error("Context not initialized");
        (_context as any)[prop] = value;
        return true;
    }
});

export async function initContext(ctx: Context) {
    await ctx.initContext()
}

function setContext(ctx: Context) {
    _context = ctx;
}