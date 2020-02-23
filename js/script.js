const randomUser = "https://randomuser.me/api/?results=12";

function getJSON(url) {
    fetch(url)
    .then(response => response.json())
    .then(json => {
        const jsonData = json.results;
        console.log(jsonData);
        return jsonData;
    })
}

function cardAppendage() {
    for (let i = 0; i < 12; i++) {
        $("#gallery").append("<div class='card'></div>");
        const $newCard = document.createElement("div");
    }
}

getJSON(randomUser);
cardAppendage();
//console.log(getJSON(randomUser));
//console.log(getJSON("https://randomuser.me/api/?results=12"));

//The <div> was appending to $(".card) as text. I found this solution: https://stackoverflow.com/questions/40462236/jquery-appends-as-text-instead-of-html

for (let j = 0; j < 12; j++) {
    $(".card")
        .eq(j)
        .append("<div class='card-info-container'></div>");
    $(".card")
        .eq(j)
        .append("<div class='card-img-container'></div>");
    $(".card-img-container")
        .eq(j)
        .append(
            "<img class='card-img' src='https://placehold.it/90x90' alt='profile picture'>"
        );
    $(".card-info-container")
        .eq(j)
        .append("<h3 id='name' class='card-name cap'>first last</h3>");
    $(".card-info-container")
        .eq(j)
        .append("<p id='card_1' class='card-text'>email</p>");
    $(".card-info-container")
        .eq(j)
        .append("<p id='card_2' class='card-text cap'>city, state</p>");
}

async function personalData(data) {
    await console.log(data);
    //$("#name").text(data.name.first + " " + data.name.last);
    //$("#card_1").text(data.email);
    //$("#card_2").text(data.city + ", " + data.state);
    //$(".card-img").attr("src", data.thumbnail);
}
personalData(getJSON(randomUser)); 
