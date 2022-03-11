import Game from "./entities/Game";
import Tag from "./entities/Tag";
import User from "./entities/User";
const { createConnection, Connection } = require("typeorm");

const connect = async () => {
  await createConnection({
    type: "postgres",
    synchronize: true,
    url: "root:julissa@localhost:5432/findmydm",
    entities: [__dirname + "/entities/*.ts"],
  });
};

const seed = async () => {
  await connect();
  const tags = [
    "Discord",
    "Late Night",
    "Adults Only",
    "Free To Play",
    "Pay To Play",
    "Open To New Players",
    "Beginner Friendly",
  ];

  const createdTags = await Promise.all(
    tags.map(async (tag) => {
      const createdTag = await Tag.create({ tag_name: tag }).save();
      return createdTag;
    })
  );

  const games = [
    {
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81oDVKvTxzL.jpg",
      game_name: "Curse of Strahd",
      game_type: "Campaign",
      genre: "Horror",
      description:
        "Unravel the mysteries of Ravenloft in this dread adventure for the world’s greatest roleplaying game Under raging storm clouds, the vampire Count Strahd von Zarovich stands silhouetted against the ancient walls of Castle Ravenloft. Rumbling thunder pounds the castle spires. The wind’s howling increases as he turns his gaze down toward the village of Barovia. A lightning flash rips through the darkness, but Strahd is gone. Only the howling of the wind fills the midnight air. The master of Castle Ravenloft is having guests for dinner—and you are invited.",
      tags: [createdTags[0], createdTags[1], createdTags[4]],
    },
    {
      imageUrl:
        "https://media.dnd.wizards.com/styles/product_image_left_scale/public/images/product/qwjuqh323.png",
      game_name: "Ghosts of Saltmarsh",
      game_type: "One Shot",
      genre: "Swashbuckling",
      description:
        "Nestled on the coast of the Azure Sea is Saltmarsh, a sleepy fishing village that sits on the precipice of destruction. Smugglers guide their ships to hidden coves, willing to slit the throat of anyone foolhardy enough to cross their path. Cruel sahuagin gather beneath the waves, plotting to sweep away coastal cities.",
      tags: [createdTags[6], createdTags[3]],
    },
    {
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51i75xCPRvL._SX218_BO1,204,203,200_QL40_ML2_.jpg",
      game_name: "Tomb of Annihilation",
      game_type: "Campaign",
      genre: "Horror",
      description:
        "The talk of the streets and taverns has all been about the so-called death curse: a wasting disease afflicting everyone who's ever been raised from the dead. Victims grow thinner and weaker each day, slowly but steadily sliding toward the death they once denied. When they finally succumb, they can't be raised—and neither can anyone else, regardless of whether they’ve ever received that miracle in the past. Temples and scholars of divine magic are at a loss to explain a curse that has affected the entire region, and possibly the entire world.",
      tags: [createdTags[1], createdTags[3]],
    },
    {
      imageUrl:
        "https://media.dnd.wizards.com/styles/product_image_left_scale/public/images/product/BdENOuKjMg.png",
      game_name: "Waterdeep: Dragon Heist",
      game_type: "Campaign",
      genre: "High Fantasy",
      description:
        "Welcome to Waterdeep Famed explorer Volothamp Geddarm needs you to complete a simple quest. Thus begins a mad romp through the wards of Waterdeep as you uncover a villainous plot involving some of the city's most influential figures. A grand urban caper awaits you. Pit your skill and bravado against villains the likes of which you've never faced before, and let the dragon hunt begin!",
      tags: [createdTags[3], createdTags[5]],
    },
    {
      imageUrl:
        "https://pbs.twimg.com/media/EVBMvW4UMAAqd7u?format=jpg&name=small",
      game_name: "Lost Mines of Phandelver",
      game_type: "Campaign",
      genre: "High Fantasy",
      description:
        "Based in and around the town of Phandalin, Lost Mines of Phandelver is a module for the fantasy tabletop RPG that sees players attempting to rescue two friends from a band of goblin kidnappers who are ambushing innocent civilians along the main road. ",
      tags: [createdTags[5], createdTags[0], createdTags[6]],
    },
    /*
    {
        imageUrl: ,
        game_name: "Storm King's Thunder", 
        game_type: ,
        genre: , 
        description: ,
        tags
    },
    {
        imageUrl: ,
        game_name:, 
        game_type: ,
        genre: , 
        description: ,
        tags
    },
    {
        imageUrl: ,
        game_name:, 
        game_type: ,
        genre: , 
        description: ,
        tags
    },
    {
        imageUrl: ,
        game_name:, 
        game_type: ,
        genre: , 
        description: ,
        tags
    },
    {
        imageUrl: ,
        game_name:, 
        game_type: ,
        genre: , 
        description: ,
        tags
    }, 
    */
  ];

  const createdGames = await Promise.all(
    games.map(async (game) => {
      const createdGame = await Game.create(game).save();
      return createdGame;
    })
  );

  const users = [
    { username: "julesrules", password: "password" },
    { username: "bozo123", password: "12345" },
    { username: "alice123", password: "6789" },
  ];

  const createdUsers = await Promise.all(users.map(async(user) => {
    const createdUser = await User.create(user).save();
    return createdUser;
  }));

  console.log("Created Users = ", createdUsers);
};

seed();
