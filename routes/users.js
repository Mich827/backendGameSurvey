var express = require("express");
var router = express.Router();
//const uid2 = require("uid2");
//const bcrypt = require("bcrypt");
const User = require("../models/users");
//const Game = require("../models/games");

//route for post a new user with new game
router.post("/register", async (req, res) => {
  try {
    const { username, email, type, support, frequence, favorite } = req.body;
    //if user exist
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.json({ result: false, error: "user already exist" });
    }

    //user
    const newUser = new User({
      username,
      email,
      type,
      support,
      frequence,
      favorite,
    });

    await newUser.save();
    res.json({ user: newUser });
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});

//route get alluser
router.get("/", (req, res) => {
  User.find().then((data) => {
    res.json({ allusers: data });
  });
});
//route for get one user by username
router.get("/:username", async (req, res) => {
  try {
    const username = req.query.username;

    // Rechercher l'utilisateur par son nom d'utilisateur
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
});
// Route pour récupérer les utilisateurs par type
router.get("/users/:type", async (req, res) => {
  const { type } = req.query;
  try {
    const users = await User.findOne({ type });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
