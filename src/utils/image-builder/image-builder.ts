import {Canvas, createCanvas, Image, loadImage, CanvasRenderingContext2D, registerFont} from "canvas";
import {AttachmentBuilder} from "discord.js";
import sharp from "sharp";
import {PathManager} from "../../singletons/path-manager";

type MimeType = "image/png" | "image/jpeg" | "application/pdf"

export enum FontName {
    Arial = "Arial",
    Pacifico = "Pacifico"
}

export enum TextAlign {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}

export enum FontWeight {
    REGULAR = 400,
    SEMIBOLD = 600
}

export interface IText {
    text: string;
    fontSize: number;
    font?: FontName;
    fontWeight?: FontWeight;
    textAlign?: TextAlign;
    color?: string;
    x: number;
    y: number;
}

export interface IFixedSizeImage {
    w: number;
    h: number;
}

export interface IDynamicSizeImage {
    w?: never;
    h?: never;
}

export interface IImageBase {
    url: string;
    x: number;
    y: number;
    maxWidth?: number;
}

export type IImage = IImageBase & (IFixedSizeImage | IDynamicSizeImage);

registerFont(PathManager.getPath(__dirname, "./fonts/Pacifico-Regular.ttf"), { family: "Pacifico" });

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
    
    public addText(args: IText) {
        const {text, fontSize, fontWeight, textAlign, font, color, x, y} = args;
        this._ctx.font = `${fontWeight || FontWeight.REGULAR} ${fontSize}px ${font || "Arial"}`;
        this._ctx.textAlign = textAlign || "left"
        this._ctx.fillStyle = color || "#fff"
        this._ctx.fillText(text, x, y)
    }
    
    public async addImage(args: IImage) {
        const {url, w, h, y, x, maxWidth} = args;
        const image = await loadImage(url.endsWith(".png") ? url : await this._convertToPng(url))
        if (maxWidth) {
            const scale = Math.min(1, maxWidth / image.width);
            const width = image.width * scale;
            const height = image.height * scale;
            this._ctx.drawImage(image, x, y, width, height);
            return;
        }
        else if (!w || !h) {
            this._ctx.drawImage(image, x, y);
            return;
        }
        this._ctx.drawImage(image, x, y, w, h);
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
    
    private async _convertToPng(url: string) {
        const res = await fetch(url);
        const buffer = Buffer.from(await res.arrayBuffer());
        return await sharp(buffer).png().toBuffer();
    }
}