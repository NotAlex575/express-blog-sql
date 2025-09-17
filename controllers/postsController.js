const posts = require("../data/databasePosts.js");

//index

const index = (req, res) => {
    //EXTRA: FILTER

    //esempio test middleware errorsHandler (per testare cancellare il commento sotto)
    //Pippo.length();

    
    //recupero il parametro inserito all'interno di postman (in questo caso recupero un nome inserito)
    const namePost = req.query.name;

    //Creiamo una variabile che inizialmente conterrà tutti i post presenti nell’array.
    let filteredPosts = posts;

    //vediamo se si trova il name nell'array di oggetti posts
    if(namePost){
        filteredPosts = posts.filter(post => post.name.toLocaleLowerCase().includes(namePost.toLocaleLowerCase()));
    }
    res.json(filteredPosts);
}

//show

const show = (req, res) => {
    //prendiamo l'id inserito su postman
    const id = parseInt(req.params.id);
    //troviamo l'id inserito su postman nei post dell'array
    const post = posts.find(item => item.id === id)
    //se l'id inserito su postman non è presente nei post dell'array, allora diamo un error 404
    if(!post){
        res.status(404).json({error: "404 not found", message: `Post con id ${id} non presente`});
    }
    //altrimenti vediamo il post con id inserito su postman
    else{
        res.json(post);
    }
}


//store

const create = (req,res) => {
    //nuovo id
    const newID = posts[posts.length - 1].id + 1;

    //recupero i dati in posts
    const {name, description} = req.body;

    //creo il nuovo oggetto
    const newPost = {
        id: newID,
        name,
        description
    }
    posts.push(newPost);

    res.send("Nuovo post creato! ");
    res.status(201).json(newPost);
    console.log(newPost);
}


//update

const update = (req,res) => {
    //prendiamo l'id inserito su postman
    const id = parseInt(req.params.id);
    //troviamo l'id inserito su postman nei post dell'array
    const post = posts.find(item => item.id === id);
    //se l'id inserito su postman non è presente nei post dell'array, allora diamo un error 404
    if(!post){
        res.status(404).json({error: "404 not found", message: `Post con id ${id} non presente`});
    }
    //altrimenti eliminiamo il post con id inserito su postman
    else{
        //recupero i dati in posts
        const {name, description} = req.body;

        post.name = name;
        post.description = description;

        res.status(201).json(posts);
    }
}


//delete

const destroy = (req,res) => {
    //prendiamo l'id inserito su postman
    const id = parseInt(req.params.id);
    //troviamo l'id inserito su postman nei post dell'array
    const post = posts.find(item => item.id === id);
    //se l'id inserito su postman non è presente nei post dell'array, allora diamo un error 404
    if(!post){
        res.status(404).json({error: "404 not found", message: `Post con id ${id} non presente`});
    }
    //altrimenti eliminiamo il post con id inserito su postman
    else{
        posts.splice(posts.indexOf(post), 1);
        res.sendStatus(204);
        console.log(posts);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};