// Declaring the game counter
var timesClicked = 0;
// Declaring the letters to roll
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var categories;

// Purpose: to generate a letter for next game
function generateLetter(eId) {
    var letIndex = Math.floor(Math.random() * letters.length);
    var letter = letters[letIndex];
    document.getElementById(eId).innerHTML = letter;
    setTimer(120);
}

// Purpose: to reset the game board
function reset() {
    document.getElementById("letter").innerHTML = "?";
    for (var i = 1; i <= 12; i++) {
        var eId = "cat" + i;
        document.getElementById(eId).innerHTML = "CATEGORY";
    }
    initializeCategoryArray();
    setTimer(120);
    timerStop = true;
}

// Purpose: to reset all of the category options to pick from
function initializeCategoryArray() {
    categories = ["Items found in the kitchen",
        "Item found in the backyard",
        "Word that ends in 'n'",
        "Musicians",
        "TV Shows",
        "Movies",
        "Video Games",
        "Junk food",
        "Fast food items",
        "City names",
        "A type of drink",
        "Pizza toppings",
        "Insect",
        "Animals",
        "Something you drive",
        "Sea creatures",
        "A girls name",
        "A boys name",
        "Somewhere you spend money",
        "Countries",
        "Birds",
        "Fish",
        "Farm Animals",
        "Pets",
        "Colors",
        "Artists",
        "Types of art",
        "Medical terms",
        "Office items",
        "Areas of study",
        "Clothing items",
        "Kids TV Shows",
        "Male actors",
        "Female actors",
        "Comedy movies",
        "Sport teams",
        "Sport terms",
        "Athletes",
        "Olympic/Paralympic sports",
        "Water sports",
        "Breakfast foods",
        "Chinese food",
        "Dairy products",
        "Spices/Herbs",
        "Flowers",
        "Plants",
        "Trees",
        "Things made of wood",
        "Vegetables and fruits",
        "Capital cities",
        "Lakes",
        "Politicians",
        "War terms",
        "Holidays",
        "Christmas songs",
        "TV or movie characters",
        "Pieces of furniture",
        "House decorations",
        "Kitchen appliances",
        "Music terms",
        "Genres of music",
        "Authors",
        "Classic books",
        "Characters from books",
        "Mythology terms/creatures",
        "Something Greek",
        "Something Italian",
        "Something Spanish",
        "Something Canadian",
        "Something American",
        "Female singers",
        "Male singers",
        "Love songs",
        "Musical intruments",
        "Songs with a name in the title",
        "Band names",
        "Pop stars",
        "Chemicals",
        "Drug names",
        "Gems",
        "Metals",
        "Types of rock",
        "Weather terms",
        "Tech companies",
        "Company names",
        "Food companies",
        "Restaurant names",
        "Things that are cold",
        "Things that are hot",
        "Things that are flat",
        "Things that are square",
        "Things that are round",
        "Brands that are a part of regular speech",
        "Things in the medicine cabinet",
        "Things in a park",
        "Things made of glass",
        "Things made of plastic",
        "Things made of metal",
        "Things that are yellow",
        "Things that are blue",
        "Things that are red",
        "Things that are sticky",
        "Things that are scary",
        "Futuristic inventions",
        "Things that are expensive",
        "Things that are cheap",
        "Things found at a circus",
        "Things that burn",
        "Things that are fragile",
        "Things that are big",
        "Things that are small",
        "Things that have spots or stripes",
        "Things that have wheels",
        "Car terms",
        "Things that smell bad",
        "Things that smell good",
        "Tools",
        "Renovation terms",
        "Board games",
        "Hobbies",
        "Things found in a bar",
        "Toys",
        "Airplane or airport terms",
        "Travel terms",
        "Diet terms",
        "Product names",
        "Beers",
        "Wine terms",
        "Offensive words",
        "Items found in a purse/wallet",
        "Vacation spots",
        "Terms of Measurement",
        "Honeymoon spots",
        "Computer programs",
        "Card games",
        "Things you shouldn't touch",
        "Pizza toppings",
        "Terms of endearment",
        "Nicknames",
        "Seafood",
        "Awards",
        "Menu items",
        "Exercise terms",
        "Winter terms",
        "U.S. Cities",
        "Animals with tails",
        "Things homemade",
        "States"
    ];
    return categories;
}

// To keep track off how long the category array is
var numCategoriesLeft;

// Purpose: to generate the 12 categories for the game
function generateCategories() {
    checkCategories();
    for (var i = 0; i < 12; i++) {
        if (numCategoriesLeft > (categories.length - 12)) {
            alert("No more available categories!");
            break;
        }
        var catIndex = Math.floor(Math.random() * categories.length);
        while (categories[catIndex] === false) {
            var catIndex2 = Math.floor(Math.random() * categories.length);
            catIndex = catIndex2;
        }
        var category = categories[catIndex];
        var catId = "cat" + (i + 1);
        document.getElementById(catId).innerHTML = category;
        categories[catIndex] = false;
    }
    setTimer(120);
}

// Purpose: to check if there are enough categories to run another game
function checkCategories() {
    numCategoriesLeft = 0;
    for (var i = 0; i < categories.length; i++) {
        if (categories[i] === false) {
            numCategoriesLeft++;
        }
    }
}

// timerStop tells JS if the game timer should stop
var timerStop = false;

// Purpose: to reset the countdown to the default
function setTimer(timeLeft) {
    document.getElementById("countdown").innerHTML = timeLeft;
    timerStop = true;
    document.getElementById("timer-set").innerHTML = "Set";
    document.getElementById("play-stop").innerHTML = "Play";
}

// Purpose: this is the main game logic while the game is running
function startGame(timeLeft) {
    timesClicked++;
    if (document.getElementById("letter").innerHTML === "?") {
        generateLetter('letter');
    }
    if (document.getElementById("cat1").innerHTML === "CATEGORY") {
        generateCategories();
    } else if (document.getElementById("cat1").innerHTML === "DONE!") {
        generateLetter('letter');
    }
    if (timesClicked % 2 === 0) {
        setTimer(120);
    } else {
        generateCategories();
        document.getElementById("timer-set").innerHTML = "Stop";
        document.getElementById("play-stop").innerHTML = "Stop";
        timerStop = false;
        var timer = setInterval(function() {
            if (timerStop === true) {
                clearInterval(timer);
                timeLeft = 120;
            }
            if (timeLeft === 0) {
                document.getElementById("countdown").innerHTML = timeLeft;
                timerStop = true;
                document.getElementById("countdown").innerHTML = "Finished!";
                for (var i = 0; i < 12; i++) {
                   var catId = "cat" + (i + 1);
                   document.getElementById(catId).innerHTML = "DONE!";
                }
                var i = 0;
                do {
                    var playerId = "player" + (i + 1) + "Name";
                    var currentPlayer = document.getElementById(playerId);
                    if (currentPlayer.classList.contains("hide")) {
                        break;
                    }
                    var playerName = currentPlayer.innerHTML;
                    var newScore = Number(prompt("Enter " + playerName + "'s score:"));
                    var scoreId = "player" + (i + 1) + "Score";
                    var prevScore = Number(document.getElementById(scoreId).innerHTML);
                    playerList[i].score = (newScore + prevScore);
                    document.getElementById(scoreId).innerHTML = playerList[i].score;
                    i++;
                } while (i < playerCount);
                clearInterval(timer);
            } else {
                document.getElementById("countdown").innerHTML = timeLeft;
            }
            if (timerStop === true) {
                setTimer(120);
            }
        timeLeft -= 1;
        }, 1000);
    }
}