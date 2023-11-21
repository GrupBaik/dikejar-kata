const express = require("express");
const PlayerController = require("../controllers/playerController");
const { mustLogin } = require("../middlewares/authentication");
const GameController = require("../controllers/gameController");
const { errorHandlers } = require("../middlewares/errorhandlers");
const router = express.Router();

router.post("/register", PlayerController.register);
router.get("/games", [mustLogin], GameController.getGames);
router.post("/games", [mustLogin], GameController.createGame);
router.get("/games/:gameId", [mustLogin], GameController.getGame);
router.get("/games/:gameId/start", [mustLogin], GameController.startGame);

router.use(errorHandlers);

module.exports = router;
