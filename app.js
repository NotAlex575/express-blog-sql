const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

//body parser json per recuperare le informazioni
//dal body di una richiesta su postman
app.use(express.json());


const postsRouter = require("./routers/posts.js");
const errorsHandler = require("./middlewares/errorsHandler.js");
const notFound = require("./middlewares/notFound.js");

app.get("/", (req,res) => {
    res.send("Benvenuto nell'app dei posts!");
})

app.use("/posts", postsRouter);

//utilizzo globalmente il middleware errorsHandler
app.use(errorsHandler);
//utilizzo globalmente il middleware notFound         
app.use(notFound);

//esempio utilità di notFound: inserisci questa route in basso su postman (GET)
//http://localhost:3000/pippo
//qui darà come risposta "pagina non trovata"

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
})