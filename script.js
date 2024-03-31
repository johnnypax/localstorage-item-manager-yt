//Salvataggio
const salva = () =>{
    let varNome = document.getElementById("input-nome").value;
    let varDesc = document.getElementById("input-descrizione").value;
    let varPrez = document.getElementById("input-prezzo").value;
    let varQuan = document.getElementById("input-quantita").value;
    let varCate = document.getElementById("select-categoria").value;

    let oggetto = {
        nome: varNome,
        desc: varDesc,
        prez: varPrez,
        quan: varQuan,
        cate: varCate
    }
    
    let elenco = JSON.parse( localStorage.getItem("elenco_oggetti") );  //Prendo l'elenco attuale a cui aggiungerò l'elemento
    elenco.push(oggetto)                                                //Aggiungo l'elemento all'elenco pre-esistente
    localStorage.setItem("elenco_oggetti", JSON.stringify(elenco) )     //Salvataggio nuovo elenco a cui ho aggiunto l'oggetto

    document.getElementById("input-nome").value = "";
    document.getElementById("input-descrizione").value = "";
    document.getElementById("input-prezzo").value = "";
    document.getElementById("input-quantita").value = "";
    document.getElementById("select-categoria").value = "";

    stampa();
}

//Stampa elenco oggetti
const stampa = () => {
    let elenco = JSON.parse( localStorage.getItem("elenco_oggetti") );

    let contenuto = "";
    for(let [idx, item] of elenco.entries()){
        //Alt + 9 + 6 del blocco numeri
        contenuto += `
            <tr>
                <td>${idx + 1}</td>
                <td>${item.nome}</td>
                <td>${item.desc}</td>
                <td>${item.prez}</td>
                <td>${item.quan}</td>
                <td>${item.cate}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="elimina(${idx})">Elimina</button>
                </td>
            </tr>
        `                 
    }

    document.getElementById("corpo-tabella").innerHTML = contenuto;
}

const elimina = (indice) => {

    let elenco = JSON.parse( localStorage.getItem("elenco_oggetti") )
    elenco.splice(indice, 1)
    localStorage.setItem("elenco_oggetti", JSON.stringify(elenco) )

    stampa()
}


//MAIN
//Verificare l'esistenza del contenitore
let elencoLs = localStorage.getItem("elenco_oggetti");
if(!elencoLs)
    localStorage.setItem("elenco_oggetti", JSON.stringify( [] ))    //Se non esiste, creo la sequenza (array) vuota

stampa();