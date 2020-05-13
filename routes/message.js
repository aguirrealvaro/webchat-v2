const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");
const Relation = require("../models/Relation");
const auth = require("./verifyToken");
//const { Op } = require('sequelize');

router.post("/", auth, async (req, res) => {
  const origin = req.user.id;
  const { destiny, content } = req.body;

  const originExists = await User.findOne({ where: { id: origin } });
  if (!originExists)
    return res.status(400).json({ errors: "Invalid user origin" });

  const destinyExists = await User.findOne({ where: { id: destiny } });
  if (!destinyExists)
    return res.status(400).json({ errors: "Invalid user destiny" });

  if (origin === destiny)
    return res.status(400).json({ errors: "You cant send a msg yourself" });

  if (!content) return res.status(400).json({ errors: "Empty text" });

  try {
    const newMessage = await Message.create(
      { origin, destiny, content },
      {
        fields: ["origin", "destiny", "content"],
      }
    );

    //set lastmessage to origin relation
    const relationsOrigin = await Relation.findOne({
      where: {
        origin,
        destiny,
      },
    });
    await relationsOrigin.update(
      {
        lastmessage: newMessage.id,
        unseencount: relationsOrigin.unseencount + 1,
      },
      { fields: ["lastmessage"] }
    );

    //set lastmessage and plus one to unseencount destiny relation
    const relationDestiny = await Relation.findOne({
      where: {
        origin: req.body.destiny,
        destiny: req.user.id,
      },
    });
    relationDestiny.update(
      {
        unseencount: relationDestiny.unseencount + 1,
        lastmessage: newMessage.id,
      },
      { fields: ["lastmessage", "unseencount"] }
    );

    res.status(200).json({
      newMessage,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/chat/:id_destiny", auth, async (req, res) => {
  const destinyExists = await User.findOne({
    where: { id: req.params.id_destiny },
  });
  if (!destinyExists)
    return res.status(400).json({ errors: "Invalid user destiny" });

  if (req.params.id_destiny.toString() === req.user.id.toString())
    return res.status(400).json({ errors: "Cant get your own chat" });

  const sentMessages = await Message.findAll({
    where: {
      origin: req.user.id,
      destiny: req.params.id_destiny,
    },
    include: [
      { model: User, as: "infoOrigin" },
      { model: User, as: "infoDestiny" },
    ],
  });
  const recievedMessages = await Message.findAll({
    where: {
      origin: req.params.id_destiny,
      destiny: req.user.id,
    },
    include: [
      { model: User, as: "infoOrigin" },
      { model: User, as: "infoDestiny" },
    ],
  });
  const chat = sentMessages.concat(recievedMessages);
  chat.sort((a, b) => {
    if (a.created_at > b.created_at) return 1;
    if (a.created_at < b.created_at) return -1;
    return 0;
  });
  res.json({ chat });
});

router.get("/", async (req, res) => {
  const messages = await Message.findAll({
    where: {
      id: 1,
    },
    include: [
      { model: User, as: "infoOrigin" },
      { model: User, as: "infoDestiny" },
    ],
  });
  res.send(messages);
});

router.put("/mark-as-read/:id_destiny", auth, async (req, res) => {
  const relation = await Relation.findOne({
    where: {
      origin: req.user.id,
      destiny: req.params.id_destiny,
    },
  });
  await relation.update({ unseencount: 0 }, { fields: ["unseencount"] });
  res.send({ relation });
});

module.exports = router;
