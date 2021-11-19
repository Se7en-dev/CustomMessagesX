import { readFileSync, writeFileSync } from "fs";
import { events } from "bdsx/event";
import { serverInstance } from "bdsx/bds/server";
import { TextPacket } from "bdsx/bds/packets";

let knownPlayers: string[] = [];


events.serverOpen.on(() => {
    knownPlayers = JSON.parse(readFileSync(`${__dirname}/../../resources/players.json`).toString());
});

events.serverClose.on(() => {
    writeFileSync(`${__dirname}/../../resources/players.json`, JSON.stringify(knownPlayers));
});

/**
 * Returns whether a player is new, and adds them to the list of known players.
 *
 * @param playerName - the name of the player
 */
export function isPlayerNew(playerName: string): boolean {
    const isNew = !knownPlayers.includes(playerName);
    if(isNew) knownPlayers.push(playerName);
    return isNew;
}

/**
 * Sends a message to all players.
 *
 * @param message - message to send
 * @param type - message type
 * @param needsTranslation - whether the message needs to be translated
 */
export function broadcastMessage(message: string, type: string, needsTranslation: boolean): void {
    const pk = TextPacket.create();
    pk.message = message;
    pk.needsTranslation = needsTranslation;
    pk.type = parseTextPacketType(type, needsTranslation);
    serverInstance.minecraft.getLevel().getPlayers().forEach(player => {
        pk.sendTo(player.getNetworkIdentifier());
    });
    pk.dispose();
}

/**
 * Converts config message types to valid TextPacket types
 *
 * @param type - message type
 * @param needsTranslation - whether the message needs to be translated
 */
export function parseTextPacketType(type: string, needsTranslation: boolean): TextPacket.Types {
    switch(type) {
        case "message":
            return needsTranslation ? TextPacket.Types.Translate : TextPacket.Types.Raw;
        case "popup":
            return TextPacket.Types.Popup;
        case "jukebox_popup":
            return TextPacket.Types.JukeboxPopup;
        case "tip":
            return TextPacket.Types.Tip;
        default:
            return needsTranslation ? TextPacket.Types.Translate : TextPacket.Types.Raw;
    }
}