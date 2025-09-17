//richiamiamo il collegamento col database per poi dopo eseguire le query
const posts = require("../data/databasePosts.js");
//IN routers/posts.js TROVI TUTTI I MODI DI ESEGUIRE QUESTI CONTROLLERS

//index

const index = (req, res) => {
    //definizione della query da eseguire
    const sql = "SELECT * FROM posts";

    //controlliamo se la query inserita è stata eseguita con successo
    posts.query(sql, (err, results) =>{
        if(err) 
            return res.status(500).json({error: "Errore durante la esecuzione della query: "+err});
        res.json(results);
    })
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
    const { id } = req.params;
    //definizione della query da eseguire
    const sql = "DELETE FROM posts WHERE id = ?";
    //controlliamo se la query inserita è stata eseguita con successo
    posts.query(sql, [id], (err) => {
        if(err)
            return res.status(500).json({ error: "errore nell'esecuzione della query: "+err});
        res.sendStatus(204);
    })

}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};