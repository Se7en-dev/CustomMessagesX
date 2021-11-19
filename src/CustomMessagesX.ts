/*
          _____                    _
  ___  __|___  |__ _ __         __| | _____   __
 / __|/ _ \ / / _ \ '_ \ _____ / _` |/ _ \ \ / /
 \__ \  __// /  __/ | | |_____| (_| |  __/\ V /
 |___/\___/_/ \___|_| |_|      \__,_|\___| \_/

  CustomMessagesX - A BDSX plugin allowing you to customize or disable various messages

 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import * as YAML from "yaml";
import { events } from "bdsx/event";

if(!existsSync(`${__dirname}/../resources/defaultMessages.json`)) {
    console.error("[CustomMessagesX] Error : default messages file not found !".red);
}
if(!existsSync(`${__dirname}/../resources/config.yml`)) {
    console.error("[CustomMessagesX] Error : config file not found !".red);
}
if(!existsSync(`${__dirname}/../resources/players.json`)) {
    writeFileSync(`${__dirname}/../resources/players.json`, JSON.stringify([]));
    console.info("[CustomMessagesX] players.json file created.".green);
}

export const config: any = YAML.parse(readFileSync(`${__dirname}/../resources/config.yml`).toString());
export const defaultMessages: any = JSON.parse(readFileSync(`${__dirname}/../resources/defaultMessages.json`).toString());

import(`${__dirname}/utils/Utils`);

events.serverOpen.on(() => {
    import(`${__dirname}/listener/TextPacketListener`);
    import(`${__dirname}/listener/DisconnectPacketListener`);
    import(`${__dirname}/listener/MotdListener`);
    import(`${__dirname}/listener/PlayerJoinListener`);
});
