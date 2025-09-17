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


