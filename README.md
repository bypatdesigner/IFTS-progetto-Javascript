# 💸 Dashboard Spese Personali

## 📌 Descrizione del progetto

Questo progetto consiste nello sviluppo di una **dashboard web per la gestione delle spese personali**, realizzata come **single page application** utilizzando HTML, CSS, Bootstrap e JavaScript.

L’obiettivo è permettere all’utente di:

* inserire nuove spese
* visualizzarle dinamicamente
* modificarle ed eliminarle
* monitorare il totale e il numero delle spese

Tutte le operazioni avvengono **senza ricaricare la pagina**, tramite manipolazione del DOM.

---

## 🎯 Obiettivi raggiunti

Durante lo sviluppo ho implementato tutte le funzionalità richieste dalla traccia:

* Inserimento di una spesa tramite form
* Validazione dei campi
* Visualizzazione dinamica delle spese
* Eliminazione di una spesa
* Modifica tramite modale Bootstrap
* Riepilogo automatico (totale + numero spese)
* Filtro per categoria
* Ricerca per descrizione

---

## 🧠 Logica di funzionamento

Le spese vengono gestite tramite un array JavaScript:

```js
let expenses = [];
```

Ogni spesa è un oggetto con questa struttura:

```js
{
  id: Date.now(),
  description: "Spesa",
  amount: 50,
  category: "Cibo",
  date: "2026-04-16"
}
```

### 🔄 Aggiornamento della UI

Ogni volta che viene effettuata un’azione (aggiunta, modifica, eliminazione):

1. viene aggiornato l’array `expenses`
2. i dati vengono salvati nel `localStorage`
3. viene eseguito il rendering completo della lista
4. viene aggiornato il riepilogo

Questo approccio garantisce che l’interfaccia sia sempre sincronizzata con i dati.

---

## 💾 Gestione dei dati

Per mantenere i dati anche dopo il refresh della pagina, ho utilizzato il **localStorage**:

```js
localStorage.setItem("expenses", JSON.stringify(expenses));
```

Al caricamento della pagina:

```js
const data = localStorage.getItem("expenses");
if (data) expenses = JSON.parse(data);
```

---

## 🔍 Filtri e ricerca

Le spese possono essere filtrate e cercate in tempo reale:

* filtro per categoria
* ricerca per descrizione (case insensitive)
* ordinamento per importo o data

Il filtraggio avviene prima del rendering della lista.

---

## 🧩 Manipolazione del DOM

Il contenuto della tabella viene generato dinamicamente:

```js
const row = document.createElement("tr");
row.innerHTML = `...`;
list.appendChild(row);
```

Ogni modifica ai dati comporta un aggiornamento completo della UI.

---

## 🎨 Interfaccia grafica

Per la UI ho utilizzato:

* Bootstrap 5.3 per layout e componenti
* CSS personalizzato per:

  * colori
  * spaziature
  * hover
  * evidenziazione dei valori importanti

I valori principali (es. totale spese) sono evidenziati in blu per migliorare la leggibilità.

---

## ⚠️ Validazione

Prima di inserire una spesa verifico che:

* tutti i campi siano compilati
* l’importo sia un numero maggiore di 0

In caso di errore viene mostrato un messaggio tramite modale.

---

## ✏️ Modifica e cancellazione

* **Modifica:** tramite modale Bootstrap con precompilazione dei dati
* **Eliminazione:** rimozione dall’array e aggiornamento immediato della UI

---

## 📁 Struttura del progetto

```
expense-dashboard/
│
├── index.html
├── style.css
├── script.js
└── img/
    └── logo.png
```

---

## 🛠️ Tecnologie utilizzate

* HTML5 (struttura semantica)
* CSS3 (custom properties e styling)
* Bootstrap 5.3
* JavaScript (eventi e DOM manipulation)
* localStorage (persistenza dati)
* Git (versionamento)

---

## 📈 Miglioramenti possibili

* aggiunta di grafici (es. Chart.js)
* esportazione dati
* gestione utenti
* versione mobile più avanzata
* refactoring del codice in moduli

---

## 👩‍💻 Considerazioni finali

Questo progetto mi ha permesso di applicare in modo pratico:

* la gestione degli eventi in JavaScript
* la manipolazione del DOM
* la sincronizzazione tra dati e interfaccia
* la progettazione di una UI semplice ma funzionale

Ho cercato di mantenere il codice chiaro e leggibile, separando logica e presentazione.

---

