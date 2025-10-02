import {Canvas, createCanvas, Image, loadImage, CanvasRenderingContext2D} from "canvas";
import {AttachmentBuilder} from "discord.js";

type MimeType = "image/png" | "image/jpeg" | "application/pdf"

export enum FontName {
    Arial
}

export enum FontWeight {
    REGULAR = 400,
    SEMIBOLD = 600
}

export interface IImageText {
    text: string;
    fontSize: number;
    font?: FontName;
    fontWeight?: FontWeight;
    color?: string;
    x: number;
    y: number;
}

export class ImageBuilder {
    private _img: Image;
    private _canvas: Canvas;
    private _ctx: CanvasRenderingContext2D;
    
    public async load(path: string) {
        this._img = await loadImage(path);
        this._canvas = createCanvas(this._img.width, this._img.height);
        this._ctx = this._canvas.getContext("2d");
        
        this._ctx.drawImage(this._img, 0, 0);
    }
    
    public addText(args: IImageText) {
        const {text, fontSize, fontWeight, font, color, x, y} = args;
        this._ctx.font = `${fontWeight || FontWeight.REGULAR} ${fontSize}px ${font ? this._getFontName(font) : "Arial"}`;
        this._ctx.fillStyle = color || "#fff"
        this._ctx.fillText(text, x, y)
    }
    
    public toBuffer(mimeType: MimeType) {
        switch (mimeType) {
            case "image/png":
                return this._canvas.toBuffer("image/png");
            case "image/jpeg":
                return this._canvas.toBuffer("image/jpeg");
            case "application/pdf":
                return this._canvas.toBuffer("application/pdf");
        }
    }
    
    public toAttachment(mimeType: MimeType, filename: string) {
        return new AttachmentBuilder(this.toBuffer(mimeType), {name: filename})
    }
    
    private _getFontName(font: FontName) {
        switch (font) {
            case FontName.Arial:
                return "Arial"
        }
    }
}