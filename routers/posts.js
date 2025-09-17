const express = require("express");
const router = express.Router();

const postController = require("../controllers/postsController.js")

//index
router.get("/", postController.index);
//scriviamo per testare su postman con il GET: http://localhost:3000/posts
//scriviamo per testare su postman con il GET + uso del filter: http://localhost:3000/posts?name=post3

//show
router.get("/:id", postController.show);
//scriviamo per testare su postman con il GET: http://localhost:3000/posts/1

//create
router.post("/", postController.create);
//scriviamo per testare su postman con il POST: http://localhost:3000/posts

//update
router.put("/:id", postController.update);
//scriviamo per testare su postman con il PUT: http://localhost:3000/posts/1

//delete
router.delete("/:id", postController.destroy);
//scriviamo per testare su postman con il DELETE: http://localhost:3000/posts/1

module.exports = router;