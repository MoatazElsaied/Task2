const router = require("express").Router()
const articlefun = require("../controller/user")
router.get("/addPost", articlefun.addPost)
router.post("/addPost", articlefun.addPostLogic)
router.get("/", articlefun.all)
router.get("/single/:id", articlefun.single)
router.get("/del/:id", articlefun.del)
module.exports=router