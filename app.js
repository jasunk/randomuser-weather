
//mækker noen variabler
let profilePics = []
let names = []

let i = 0
let personI=0

//henter data fra API, results=10 sier at vi får 10 tilfeldig genererte personer
fetch("https://randomuser.me/api/?results=10")
    //.then kjøres etter dataen er ferdig hentet. Her (tror eg) vi gjør "responsen" om til json
    .then(response => response.json())

    //kjører funksjonen "behandleSvar med parameteren response. Dette gjør at jeg kan bruke dataen hentet inni funskjonen"
    .then(response => behandleSvar(response))

    //kjører spawnmessage funskjonen min
    .then(response => spawnMessage())

    //om det skulle "catches" noen errors, skal denne erroren printes i konsollen
    .catch(err => console.error(err));


    //Setter parameteren til navnet svar (dette er response hentet i fetch-funksjonen, bare med nytt navn)
function behandleSvar(svar){
    
    //kjører 10 ganger fordi eg har 10 resultater
    for (let i = 0; i < 10; i++) {
        //legger til url til en stor versjon av profilbilde til en tilfeldig generert person i en array
        profilePics.push(svar.results[i].picture.large)
        //legger til url til navnet til en tilfeldig generert person i en array
        names.push(svar.results[i].name.first)
    }
    //for å se hvordan du finner ulik data ville jeg sett på JSON-versjonen av svaret du får fra APIen, i dette tilfelle kan du se på https://randomuser.me/api/?results=10
    //OBS, bruk JSON-formatter

}

//arrays og logikk for å spawne inn en tilfeldig samtale, ikke API-relatert
let messages0= ["Hei", "Hei på deg din fjert", "BRO DU MESSER", "Nah broder, du er en fis no cap", "wallah, du må jække deg et par hakk", "fakkoff", "PASS SPRÅKET FOLKENS", "hvordan lage pepperkakedeig", "Du har mangel på hjerneceller"]
let messages1 = ["Noen som e keen på å møtes i morgen?", "Nah, har bokmarathon as", "Hah, du leser vel kattekrigerne elns du, din lille nerdetøs", "kommer fra personen som har lest mein kampf 13 ganger", "Du må lære å skille kunst fra kunstner", "Wallah", "for gale", "har ringt mine opps, du fjernes snart"]
let messages2 = ["Hvordan bli kvitt hemmorider", "Bruv, tror du har bommet litt på nettsted", "jeg er sulten på litt hemmorider, ngl", "Du trenger seriøst hjelp", "Ignore the haters, prøv det med karri på!", "Skadet folk as, skadet", "Hva er hemmorider?", "Smertefult, believe me", "send bilde da amigo"]
let samlingMelding = [messages0, messages1, messages2]
let messages = samlingMelding[parseInt(Math.random()*samlingMelding.length)]

let lastPersonI=0



//En vær-api som henter data for bergen PS: ikke tæsj keyen min, kan koste cash as

fetch("http://api.weatherapi.com/v1/current.json?key=f6b3929fc9384d8a975143144231701&q=Bergen&aqi=no")
    .then(response => response.json())
    .then(response => vær(response))
    .catch(err => console.error(err));



function vær(værData){
    //bruker værdataen til å lage et bilde med responsen => værdata som kilde for bilde, og samme for tekst
    document.querySelector("#weather").innerHTML = "<img src="+værData.current.condition.icon +">" + værData.current.condition.text
}
//igjen, sjekk ut JSON-struktur for APIen


let antallMeldinger=0

//denne kjøres etter første fetch
function spawnMessage(){

    if (antallMeldinger<messages.length){
        //spiller av en lyd hehe (obs, nettsiden må trykkes på før dette funker)
        let mySound = new Audio('notif.mp3')
        mySound.play()

    //lager masse elementer som senere skal spawnes inn
    let messageElement = document.createElement("div")
    let imageElement = document.createElement("img")
    let nameElement = document.createElement("div")
    let messageContent = document.createElement("div")

    //legger til klasser, og velger riktig data gjennom arraysene som vi tidligere fylte med data
    //unødvendig med arrays tbh, men funker fett for litt penere kode 
    messageElement.classList.add("message")
    imageElement.src=profilePics[personI]
    imageElement.classList.add("pic")
    nameElement.innerText = names[personI]
    nameElement.classList.add("name")
    
    //dette er ikke API-relatert, men henter en tilfeldig melding å skrive
    messageContent.innerText = messages[i]
    messageContent.classList.add("content")

    //spawner inn elementene under body
    document.body.appendChild(messageElement)
    messageElement.appendChild(imageElement)
    messageElement.appendChild(nameElement)
    messageElement.appendChild(messageContent)

    //logikk for å ikke spawne samme person 2 ganger på rad
    lastPersonI=personI
    personI = parseInt(Math.random()*9 )
    if (personI==lastPersonI){
        personI = parseInt(Math.random()*9 )
    }
    i++
    antallMeldinger++
    //spawner ny melding etter 1500 ms
    setTimeout(spawnMessage,1500)
    
    }
}


