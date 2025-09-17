esercizio di oggi: ex-express-blog-sql

repo: express-blog-sql

Esercizio,
Prendiamo le API precedentemente create per il vostro blog ed aggiungiamo la persistenza tramite la connessione a un DB

Milestone 1

Importiamo il db in allegato su MySQL Workbench,
Installiamo il client mysql2 con npm i mysql2 nell’app Express,
Creiamo un file di configurazione per connettere il database,
Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.,

Milestone 2

Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON,
Verifichiamo su Postman che la risposta sia corretta,

Milestone 3 

Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database,
Verifichiamo su Postman che la chiamata non dia errore e risponda 204,
Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso,

Milestone 4

Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON,
Verifichiamo su Postman che la risposta sia corretta,

Bonus:

Far sì che la SHOW restituisca il post comprensivo di tag, recuperandoli grazie alla relazione tra post e tags, esistente sul database



______________________________________________________________________________


PASSAGGI (ho già importato un esercizio precedente come scheletro, ovvero express-blog-api-crud):

0) importo il contenuto di express-blog-api-crud

1) importiamo mysql2 attraverso il comando da mettere nel terminal npm i mysql2

2) nella cartella data inseriamo il js per collegarci al database (in questo esercizio si chiama databasePosts)

3) inseriamo il seguente:

    //importo mysql2
    const mysql = require("mysql2");
    // creo la connessione al database
    //ATTENZIONE, IN PASSWORD INSERISCI LA PASSWORD CHE HAI MESSO NELLA TUA CONNECTION DEL DATABASE, ALTRIMENTI DOPO TI DARA UN'ERRORE, SE NON NE HAI MESSA UNA LASCIALA VUOTA
    const connessione = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",            
        database: "db_blog"
    })


    //instauro una connessione al database
    connessione.connect((err) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log("connesso con mysql!")
        }
    })
    //esportiamo la connessione creata
    module.exports = connessione;

    solitamente l'import del database deve essere sempre scritto così (cambia solo ad alcune eccezioni, ma di questo al momento non ci pensiamo), ma cosi facendo, all'execute di npm run watch, avremmo ancora (Server in ascolto sulla porta 3000), quindi non sappiamo se la connessione è avvenuta correttamente, se vogliamo vedere un risultato, dobbiamo eseguire una query, quindi

4) nel controllers/postsController andremmo a modificare questa riga:
    prima:
    const posts = require("../data/postsData.js");

    dopo:
    const posts = require("../data/databasePosts.js");

    cosi facendo noi adesso stiamo interagendo direttamente col database, e ti dovrebbe comparire questo nel terminal:

    - Server in ascolto sulla porta 3000
    - connesso con mysql!

5) sempre in postsController andiamo ad eseguire delle modifiche:

    INDEX

    1) in const index cancelliamo tutto il suo contenuto (ora non è più necessario siccome prenderemo tutto attraverso le query del database) 

    2) in const index (oramai vuoto di contenuto) inseriamo la definizione della query da eseguire con:

    const sql = "SELECT * FROM posts";

    3) controlliamo se la query inserita è stata eseguita con successo usando questo comando:

    posts.query(sql, (err, results) =>{
        if(err) 
            return res.status(500).json({error: "Errore durante la esecuzione della query: "+err});
        res.json(results);
    })

    4) ora su postman testiamo il risultato, utilizzando i tool esistenti già precedentemente in routers/posts.js (ci sono dei commenti di riferimento che mostrano come essere eseguiti su postman)
    
    se tutto va bene, inserendo http://localhost:3000/posts nel GET, ci ritroviamo su postman la lista dei posts!

    ____________________

    DESTROY

    1) in const destroy cancelliamo tutto il suo contenuto, e come prima cosa inseriamo il parametro:

    const { id } = req.params;

    questo parametro verra passato attraverso l'indirizzo che metteremo su postman

    2) instauriamo la connessione ed eseguiamo la query:

    const sql = "DELETE FROM posts WHERE id = ?";

    3) controlliamo se la query inserita è stata eseguita con successo usando questo comando:

    posts.query(sql, [id], (err) => {
        if(err)
            return res.status(500).json({ error: "errore nell'esecuzione della query: "+err});
        res.sendStatus(204);
    })

    4) ora su postman testiamo il risultato, utilizzando i tool esistenti già precedentemente in routers/posts.js (ci sono dei commenti di riferimento che mostrano come essere eseguiti su postman)
    
    se tutto va bene, inserendo ad esempio http://localhost:3000/posts/1 nel DELETE, se troviamo come risultato su postman 204 on content, allora la richiesta è avvenuta con successo!


    ____________________

    SHOW

    1) in const show cancelliamo tutto il suo contenuto e come prima cosa inseriamo il parametro:

    const { id } = req.params;

    2) instauriamo la connessione ed eseguiamo la query:

    const sql = "SELECT * FROM posts WHERE id = ?";

    3) controlliamo se la query inserita è stata eseguita con successo usando questo comando:

    posts.query(sql, [id], (err, results) => {
        if(err)
            return res.status(500).json({ error: "errore nell'esecuzione della query: "+err});
        res.json(results);
    })

    4) ora su postman testiamo il risultato, utilizzando i tool esistenti già precedentemente in routers/posts.js (ci sono dei commenti di riferimento che mostrano come essere eseguiti su postman)
    
    se tutto va bene, inserendo ad esempio http://localhost:3000/posts/1 nel GET, ci ritroviamo su postman la lista del singolo post!


