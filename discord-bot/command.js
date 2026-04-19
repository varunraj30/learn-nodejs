const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with pong",
  },
];

const rest = new REST({ version: "10" }).setToken("TOKEN");

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  //   In Oauth you will get CLIENT_ID

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
