// namespace
const app = {};

// letters and categories initialize
app.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
app.categories;

// global variables
app.categoriesLeft;
app.gameLive = false;
app.timer;
app.time = 120;
app.letterRolled = false;

// cache selectors
app.$roll = $('#roll');
app.$timerSet = $('#timer-set');
app.$countdown = $('#countdown');
app.$letter = $('#letter');
app.$category1 = $('#cat1');
app.$play = $('.play-wrap');
app.$reset = $('.reset');
app.$timerUp = $('.time-up');
app.$timerDown = $('.time-down');

// adding the time to the page
app.$countdown.text(app.time);

// generate a letter for the game
app.generateLetter = () => {
    if (app.gameLive === true) {
        app.gameStop();
        app.setTimer(app.time);
    }
    // retrieve a letter from the letters array
    let index = Math.floor(Math.random() * app.letters.length);
    let letterDisplayed = app.letters[index];
    // return the letter to the page
    app.$letter.text(letterDisplayed);
    // change letter rolled flag
    app.letterRolled = true;
}

// event listener for click to generate letter
app.$roll.on('click', function(){
    app.generateLetter();
});

// initialize the category array
app.initializeCategoryArray = () => {
    app.categories = ["Items found in the kitchen",
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
}

// check categories array for enough remaining categories
app.checkCategories = () => {
    app.categoriesLeft = 0;
    for (let i = 0; i < app.categories.length; i++) {
        if (app.categories[i] === false) {
            app.categoriesLeft++;
        }
    }
}

// set the timer
app.setTimer = (timeInput) => {
    app.gameLive = false;
    app.$countdown.text(timeInput);
}

// generate categories for the board
app.generateCategories = () => {
    app.checkCategories();
    for (let i = 0; i < 12; i++) {
        // error check for not enough categories left
        if (app.categoriesLeft > (app.categories.length - 12)) {
            // insert error message
            alert('There are no more categories left');
            break;
        }

        // generate random index for category
        let categoryIndex = Math.floor(Math.random() * app.categories.length);

        // error checking to generate a category
        while (app.categories[categoryIndex] === false) {
            let categoryIndex2 = Math.floor(Math.random() * app.categories.length);
            categoryIndex = categoryIndex2;
        }

        // display the category on the game board
        let category = app.categories[categoryIndex];
        let categoryId = 'cat' + (i + 1);
        $(`#${categoryId}`).text(category);

        // remove category from the array
        app.categories[categoryIndex] = false;
    }
    // reset the timer to the default 120 seconds
    app.setTimer(app.time);
}

// main game logic
app.startGame = () => {
    app.$play.on('click', function() {
        if (app.gameLive === false) {
            // logic to roll letter and categories
            if (app.letterRolled === false) {
                app.generateLetter();
            } else {
                app.letterRolled = false;
            } 
            app.generateCategories();
            // change the game state
            app.gameLive = true;
            // adjust the text on screen
            app.$play.html('<h2 id="play" class="play">Stop</h2>');
            
            // remove times-up class
            app.$countdown.removeClass('times-up');
            // set the time
            let timeLeft = app.time;
            // game timer and main game loop
            app.timer = setInterval(function() {
                // stop the timer if game state has been changed
                if (app.gameLive === false) {
                    app.gameStop();
                } else { // if the game is live
                    // if the time has run out
                    if (timeLeft <= 0) {
                        // adjust text on screen
                        app.$countdown.text("Time's Up!").addClass('times-up');
                        // stop game
                        app.gameStop();
                    } else { // if the game is still running
                        // decrement and update displayed time
                        timeLeft--;
                        app.$countdown.text(`${timeLeft}`);   
                    }                
                }
            }, 1000);
        } else {
            app.gameLive = false;
            app.$play.html('<h2 id="play" class="play">Play</h2>')
            app.setTimer(app.time);
        }
    })
}

// reset the game board
app.resetBoard = () => {
    app.$reset.on('click', function() {
        app.gameStop();
        app.$countdown.removeClass('times-up');
        app.setTimer(app.time);
        app.$letter.text('?');
    });
}

app.timeUp = () => {
    app.$timerUp.on('click', () => {
        app.time += 10;
        app.$countdown.text(app.time);
    })
}

app.timeDown = () => {
    app.$timerDown.on('click', () => {
        if (app.time > 10) {
            app.time -= 10;
            app.$countdown.text(app.time);
        }       
    })
}

// helper function to stop the game
app.gameStop = () => {
    app.gameLive = false;
    app.letterRolled = false;
    app.$play.html('<h2 id="play" class="play">Play</h2>');
    clearInterval(app.timer);
}

app.init = () => {
    app.resetBoard();
    app.initializeCategoryArray();
    app.startGame(app.time);
    app.timeUp();
    app.timeDown();
}

$(function() {
    app.init();
});