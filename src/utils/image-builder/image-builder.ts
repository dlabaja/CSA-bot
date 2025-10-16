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

export interface IImage {
    url: string;
    x: number;
    y: number;
    w?: number;
    h?: number;
    centerX?: boolean;
    maxWidth?: number;
    maxHeight?: number;
}

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
    
    public async addImage(args: IImage): Promise<void> {
        const {url, w, h, y, x, centerX, maxWidth, maxHeight} = args;
        const image = await loadImage(url.endsWith(".png") ? url : await this._convertToPng(url));
        if (w && h) {
            const _w = Math.min(w, maxWidth || w)
            const _h = Math.min(h, maxHeight || h)
            const _x = centerX ? x - (_w / 2) : x;
            return this._ctx.drawImage(image, _x, y, _w, _h);
        }
        else if (w) {
            const _w = Math.min(w, maxWidth || w)
            const scale = _w / image.width;
            const _h = Math.min(image.height * scale, maxHeight || image.height * scale)
            const _x = centerX ? x - (_w / 2) : x;
            return this._ctx.drawImage(image, _x, y, _w, _h);
        }
        else if (h) {
            const _h = Math.min(h, maxHeight || h)
            const scale = _h / image.height;
            const _w = Math.min(image.width * scale, maxWidth || image.width * scale);
            const _x = centerX ? x - (_w / 2) : x;
            return this._ctx.drawImage(image, _x, y, _w, _h);
        }
        const _x = centerX ? x - (image.width / 2) : x;
        this._ctx.drawImage(image, _x, y);
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