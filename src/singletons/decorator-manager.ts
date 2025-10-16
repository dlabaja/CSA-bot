import { Project } from "ts-morph";
import {ClientEvent} from "../decorators/client-event-decorator";
import {RegisterSlashCommand} from "../decorators/register-slash-command";
import {component} from "ironbean";

export const decorators: string[] = [ClientEvent.name, RegisterSlashCommand.name]

interface IDecorator {
    name: string;
    className: string;
}

@component
export class DecoratorManager {
    private _decorators: IDecorator[];

    constructor() {
        this._decorators = [];
    }

    public async init() {
        await new Promise((resolve) => {
            const project = new Project({tsConfigFilePath: "./tsconfig.json"});
            project.getSourceFiles().forEach((sourceFile) => {
                sourceFile.getClasses().forEach(cls => {
                    cls.getDecorators().forEach(decorator => {
                        const decoratorName = decorator.getName();
                        if (!decorators.includes(decoratorName)) {
                            return;
                        }
                        const className = cls.getName();
                        this._decorators.push({
                            name: decoratorName,
                            className: className || ""
                        })
                        import(sourceFile.getFilePath()).then(mod => {
                            const Cls = mod[className as keyof typeof mod];
                            Cls;
                        }).catch(console.error);
                    })
                })
            })
            console.log(`Decorator Manager: Successfully started ${this._decorators.length} decorators.`)
            resolve({})
        })
    }
}