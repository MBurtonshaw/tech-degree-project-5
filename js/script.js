const randomUser = "https://randomuser.me/api/?results=12";
let userArray = [];

//This function fetches the JSON data, stores it in the userArray[], and also calls the personalData function to display the data on-screen, as well as the cardAppendage() function to append divs, etc. for formatting the data
function getJSON(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            const jsonData = json.results;
            userArray = [...jsonData];
            personalData(userArray);
        })
        .then(cardAppendage());
}

//Invoked in getJSON() function; this function is to format the data, looping through to create and append divs with placeholders, etc. for each person, and to give the data somewhere to be displayed
//Ran into some trouble at one point; the <div> was appending to $(".card) as text. I found this solution: https://stackoverflow.com/questions/40462236/jquery-appends-as-text-instead-of-html
function cardAppendage() {
    for (let i = 0; i < 12; i++) {
        $("#gallery").append("<div class='card'></div>");
        $(".card")
            .eq(i)
            .append("<div class='card-img-container'></div>");
        $(".card")
            .eq(i)
            .append("<div class='card-info-container'></div>");
        $(".card-img-container")
            .eq(i)
            .append(
                "<img class='card-img' src='https://placehold.it/90x90' alt='profile picture'>"
            );
        $(".card-info-container")
            .eq(i)
            .append("<h3 id='name' class='card-name cap'>first last</h3>");
        $(".card-info-container")
            .eq(i)
            .append("<p class='card-text'>email</p>");
        $(".card-info-container")
            .eq(i)
            .append("<p class='card-text cap'>city, state</p>");
    }
}

//Called within the getJSON() function; selects certain data to replace the placeholders used in cardAppendage() function
function personalData(data) {
    for (let k = 0; k < data.length; k++) {
        $(".card-name")
            .eq(k)
            .text(data[k].name.first + " " + data[k].name.last);
        $(".card-img")
            .eq(k)
            .attr("src", data[k].picture.large);
        $("h3")
            .next()
            .eq(k)
            .text(data[k].email);
        $("p")
            .next()
            .eq(k)
            .text(data[k].location.city);
    }
}

//Calling on function
getJSON(randomUser);
