import { events } from "bdsx/event";
import { config } from "../CustomMessagesX";
import { serverInstance } from "bdsx/bds/server";

const motdConfig: any = config.motd;
let messageId: number = 0;
let intervalId: NodeJS.Timeout;

/**
 * Sets custom MOTD messages.
 */
if(motdConfig.custom) {
    if(motdConfig.refresh_interval) {
        intervalId = setInterval(() => {
            if(motdConfig.random_order) messageId = Math.floor(Math.random() * motdConfig.messages.length);
            serverInstance.setMotd(motdConfig.messages[messageId]);
            if(!motdConfig.random_order) {
                messageId++;
                if(messageId === motdConfig.messages.length) messageId = 0;
            }
        }, motdConfig.refresh_interval * 1000);
    } else serverInstance.setMotd(motdConfig.messages[0]);
}


events.serverClose.on(() => {
    if(intervalId) clearInterval(intervalId);
});