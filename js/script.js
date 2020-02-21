const randomUser = "https://randomuser.me/api/?results=12";

function $getJSON() { 
    $.ajax({
    url: randomUser,
    dataType: "json",
    success: data => {
        const results = data.results;
        const resultsArray = [results];
        //console.log(results);
        results.map(person => { 
            $("#gallery").append("<div class='card'></div>");
        })           
    }             
})
};

$getJSON();

const cardDivs = document.getElementsByClassName("card");
console.log(cardDivs);

for (let i = 0; i < cardDivs.length; i++) {
    console.log('anything');
}

    /*$(".card-img-container")[i].append("<img class='card-img' src='https://placehold.it/90x90' alt='profile picture'>");
    $(".card").append("<div class='card-info-container'></div>");
    $(".card-info-container").append("<h3 id='name' class='card-name cap'>first last</h3>");
    $(".card-info-container").append("<p id='card_1' class='card-text'>email</p>");
    $(".card-info-container").append("<p id='card_2' class='card-text cap'>city, state</p>");
    $("#name").text(person.name.first + " " + person.name.last);
    $("#card_1").text(person.email);
    $("#card_2").text(person.location.city + ", " + person.location.state);
    $(".card-img").attr("src", person.picture.thumbnail);  */


