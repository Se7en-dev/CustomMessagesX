import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { config, defaultMessages } from "../CustomMessagesX";
import { TextPacket } from "bdsx/bds/packets";
import { parseTextPacketType } from "../utils/Utils";
import { CANCEL } from "bdsx/common";

const textConfig: any = config.text_messages;
const textMessages: any = defaultMessages.text_messages;

/**
 * Listens for text packets sending.
 */
events.packetSend(MinecraftPacketIds.Text).on(packet => {
    if(packet.type === TextPacket.Types.Translate) {
        let configKey: string = textMessages[packet.message]?.configKey;
        if(configKey) {
            /* Cancel the message if needed (e.g: player join) */
            if(configKey === "CANCEL") return CANCEL;
            /* Cancel the message if desired */
            if(!textConfig[configKey].enabled) {
                return CANCEL;
            } else if(textConfig[configKey].custom) {
                packet.needsTranslation = textConfig[configKey].needs_translation;
                if(!packet.needsTranslation) {
                    const paramList: string[] | null = textMessages[packet.message]?.params;
                    packet.message = textConfig[configKey].message;
                    if(paramList) {
                        packet.params.toArray().forEach((param, index) => {
                            packet.message = packet.message.replace(paramList[index], param);
                        });
                    }
                }
            } else packet.needsTranslation = true;
            packet.type = parseTextPacketType(textConfig[configKey].type, packet.needsTranslation);
        }
    }
});
