const Router = require("express");
const userRouter = require("./user.js");
const tableRouter = require("./table.js");
const forumRouter = require("./forum.js");
const emailRouter = require("./email.js");

const router = Router();

router.use(userRouter);
router.use(tableRouter);
router.use(forumRouter);
router.use(emailRouter);

module.exports = router;
