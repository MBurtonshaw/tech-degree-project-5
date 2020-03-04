const randomUser = "https://randomuser.me/api/?results=12&nat=us";
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

//Function to format birthdays
function regEx(date) {
    //RegExp function to limit string to one set of numbers + - + set of numbers + - + set of numbers
    let expression = /(\d+)(-)(\d+)(-)(\d+)/;
    //Using .replace method to take the values between the "-"s and rearrange them, adding "/"s to replace the "-"s
    let newString = date.replace(expression, "$3" + "/" + "$5" + "/" + "$1");
    //Returning the string that's been reformatted to 00/00/0000 and has now cut off the extra data on the end, beyond 0-8
    return newString.substr(0, 8);
}

//Invoked within the getJSON() function; this function is to format the data, looping through to create and append divs with placeholders, etc. for each person, and to give the data somewhere to be displayed
//Ran into some trouble at one point; the <div> was appending to $(".card) as text. I found the eq() solution: https://stackoverflow.com/questions/40462236/jquery-appends-as-text-instead-of-html
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

//Invoked within the getJSON() function; selects certain data to replace the placeholders used in cardAppendage() function
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

//////////////////////////////////////////////////This works if you click the div.card, but not if you click the img or anything else//////
////////////No image being appended here, or in the .card click event/////////////////////////////////////////////////////////////
function modalData(data, e) {
    for (let m = 0; m < data.length; m++) {
        if (e.target === $(".card")[m]) {
            const name = $("#name.modal-name");
            const email = name.next();
            const city = email.next();
            const phone = city.next().next();
            const address = phone.next();
            const birthday = address.next();
            $(".modal-img").attr("src", data[m].picture.large);
            name.text(data[m].name.first + " " + data[m].name.last);
            email.text(data[m].email);
            city.text(data[m].location.city);
            phone.text(data[m].phone);
            address.text(
                data[m].location.street.number +
                    " " +
                    data[m].location.street.name +
                    " " +
                    data[m].location.city +
                    ", " +
                    data[m].location.state +
                    " " +
                    data[m].location.postcode
            );
            birthday.text("Birthday: " + regEx(data[m].dob.date));
        }
    }
}

//Calling on function
getJSON(randomUser);
//cardAppendage();

//I found this article very helpful when it came to setting up the modal:
//https://www.w3schools.com/howto/howto_css_modals.asp
//This is a click event set on .card that when clicked, the whole modal window pops up with placeholders
$(".card").click(e => {
    $("body").append("<div class='modal-container'></div>");
    $(".modal-container").append("<div class='modal'></div>");
    $(".modal").append(
        "<button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>"
    );
    $(".modal").append(
        "<img class='modal-img' src='https://placehold.it/125x125' alt='profile picture'>"
    );
    $(".modal").append("<div class='modal-info-container'></div>");
    $(".modal-info-container").append(
        "<img class='modal-img' src='https://placehold.it/125x125' alt='profile picture>'"
    );
    $(".modal-info-container").append(
        "<h3 id='name' class='modal-name cap'>name</h3>"
    );
    $(".modal-info-container").append("<p class='modal-text'>email</p>");
    $(".modal-info-container").append("<p class='modal-text cap'>city</p>");
    $(".modal-info-container").append("<hr>");
    $(".modal-info-container").append(
        "<p class='modal-text'>(555) 555-5555</p>"
    );
    $(".modal-info-container").append(
        "<p class='modal-text'>123 Portland Ave., Portland, OR 97204</p>"
    );
    $(".modal-info-container").append(
        "<p class='modal-text'>Birthday: 10/21/2015</p>"
    );
    $(".modal-container").append("<div class='modal-btn-container'>");
    $(".modal-btn-container").append(
        "<button type='button' id='modal-prev' class='modal-prev btn'>Prev</button>"
    );
    $(".modal-btn-container").append(
        "<button type='button' id='modal-next' class='modal-next btn'>Next</button>"
    );
    //This is calling upon the function created above with userArray to append the api data to the corresponding card's placeholders
    modalData(userArray, e);
    //This is a click event for the "X" button to remove the modal window
    $("#modal-close-btn").click(() => {
        $(".modal-container").remove();

        /*$("window").click((e) => {
        if(e.target === $(".modal")) {
    console.log("eh?");*/
    });
});
