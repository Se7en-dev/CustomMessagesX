import { events } from "bdsx/event";
import { config } from "../CustomMessagesX";
import { broadcastMessage, isPlayerNew } from "../utils/Utils";

const joinConfig: any = config.text_messages.player_joined;

/**
 * Listener for player join event.
 *
 * we are obligated to use a different listener for player join,
 * since no message is sent when the player is the first to join the server.
 */
events.playerJoin.on(event => {
    if(joinConfig.enabled) {
        if(joinConfig.custom) {
            if(isPlayerNew(event.player.getName()) && joinConfig.first_join.enabled) {
                broadcastMessage(joinConfig.first_join.message.replace("{player}", event.player.getName()), joinConfig.type, joinConfig.needs_translation);
            } else broadcastMessage(joinConfig.message.replace("{player}", event.player.getName()), joinConfig.type, joinConfig.needs_translation);
        } else broadcastMessage("§e%multiplayer.player.joined", joinConfig.type, joinConfig.needs_translation);
    }
});