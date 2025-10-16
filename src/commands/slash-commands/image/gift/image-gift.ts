import {ChatInputCommandInteraction} from "discord.js";
import {ImageBuilder} from "../../../../utils/image-builder/image-builder";
import {PathManager} from "../../../../singletons/path-manager";

export class ImageGift {
    public async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const img = await this._generateImg(interaction);
        if (!img) {
            await interaction.editReply({
                content: "Invalid url (is it png?)"
            });
            return;
        }
        const attachment = img.toAttachment("image/png", "gift.png");
        
        await interaction.editReply({
            content: "Kalousek would like to give you something",
            files: [attachment]
        })
    }

    private async _generateImg(interaction: ChatInputCommandInteraction) {
        const img = new ImageBuilder();
        await img.load(PathManager.getPath(__dirname, "./kalousek.png"));
        const url = this._processImageUrl(interaction.options.get("url")?.value?.toString() || "");
        
        if (!url) {
            return null;
        }
        
        await img.addImage({
            url: url.toString(),
            x: 370,
            y: 312,
            h: 300,
            maxWidth: 500,
            centerX: true
        });

        return img;
    }
    
    private _processImageUrl(url: string) {
        try {
            return new URL(url);
        } catch {
            return null;
        }
    }
}