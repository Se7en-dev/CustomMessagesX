<div style="text-align:center"><img src="./resources/custommessagesx.png" alt="logo" width="512"/></div>

# CustomMessagesX - A BDSX plugin

CustomMessagesX is a BDSX plugin that allows you to customize or disable various in-game messages !

---

## Features



##### MOTD

- Custom MOTD messages

- Dynamic messages

- Random order feature



##### Disconnection

- Custom disconnection messages
  
  - Whitelist
  
  - Full server
  
  - Outdated client
  
  - Outdated server
  
  - Kick
  
  - & more to come !

- Possibility to disable messages !



##### Text messages

- Customizable text messages
  
  - Player join
  
  - Player first join ! (welcome message)
  
  - Player left
  
  - & more to come !

- Possibility to customize messages type (for each message) !
  
  - message
  
  - popup
  
  - jukebox popup
  
  - tip

- Possibility to disable messages !



### Feel free to open an issue if you want to suggest more messages to add !

You can also implement your own messages by associating their translation key in [`defaultMessages.json`](./resources/defaultMessages.json) with a configuration key that you create in [`config.yml`](./resources/config.yml). (follow the syntax of other messages)

---

## Installation

#### Installing as an npm module

run this command in your bdsx directory :

```shell
npm i @bdsx/custommessagesx
```

You can also use bdsx's `plugin-manager`



#### Installing as a standalone plugin

clone the repository in your `plugins` directory :

```git
git clone https://github.com/Se7en-dev/CustomMessagesX.git
```

or download and extract the zip file from the most recent [Release](https://github.com/Se7en-dev/CustomMessagesX/releases)

*note : If you clone the repository it is best to rename the directory to `custommessagesx` (so it matches the plugin name in `package.json`)*

##### Configure the plugin to your liking and enjoy !

## Configuration

You can configure everything within [config.yml](./resources/config.yml)

If you have installed the plugin as an npm module, the configuration file can be found here :

```
[bdsx directory]/node_modules/@bdsx/custommessagesx/resources/config.yml
```

If you have installed the plugin as a standalone plugin, the configuration file can be found here :

```
[bdsx directory]/plugins/custommessagesx/resources/config.yml
```

**Every configuration key is commented and explained !**

---

### Credits

This plugin was inspired by the PocketMine-MP plugin [CustomAlerts](https://github.com/EvolSoft/CustomAlerts)

This plugin is licensed under??**GNU General Public License v3.0**



Thank you for using my plugin ! If you have any questions add me on Discord : `Se7en#1712`
