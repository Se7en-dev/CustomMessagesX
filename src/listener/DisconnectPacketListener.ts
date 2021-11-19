import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { config, defaultMessages } from "../CustomMessagesX";

const disconnectConfig: any = config.disconnection_messages;
const disconnectMessages: any = defaultMessages.disconnection_messages;

events.packetSend(MinecraftPacketIds.Disconnect).on(packet => {
    /* Used to match the kick with reason message */
    const kickMatch: RegExpMatchArray | null = packet.message.match(/^(%disconnect\.kicked\.reason) (.+)$/);
    const configKey: string = kickMatch ? disconnectMessages[kickMatch[1]]?.configKey : disconnectMessages[packet.message]?.configKey;
    if(configKey) {
        if(!disconnectConfig[configKey].enabled) {
            packet.skipMessage = true;
        } else if(disconnectConfig[configKey].custom) {
            packet.message = kickMatch ? disconnectConfig[configKey].message.replace(disconnectMessages[kickMatch[1]].params[0], kickMatch[2]) : disconnectConfig[configKey].message;
        }
    }
});
