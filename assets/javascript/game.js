var game = {
    target: 0,
    gemValues: [],
    MIN_TARGET_VALUE: 19,
    MAX_TARGET_VALUE: 120,
    MAX_GEM_VALUE: 12,
    MIN_GEM_VALUE: 1,
    NUM_GEMS: 4,
    current_score: 0,
    isUserWon: false,
    reset: function () {
        this.target = Math.floor(Math.random() * (this.MAX_TARGET_VALUE - this.MIN_TARGET_VALUE) + 1) + this.MIN_TARGET_VALUE;//generate random number between GAME_MIN_TARGET_VALUE AND GAME_MAX_TARGET_VALUE inclusive
        this.initGemValues();
        this.current_score = 0;
        this.isUserWon = false;
    },
    initGemValues() {
        //give the four gems random unique values between 1-12 inlusive
        //initialize an array with numbers 1-12
        var number_array = [];
        for (var i = this.MIN_GEM_VALUE; i < this.MAX_GEM_VALUE + 1; i++) {
            number_array[i - 1] = i;//e.g. number_array[0]=1, number_array[11]=12
        }
        //for every gem
        for (var i = 0; i < this.NUM_GEMS; i++) {
            //-pick a random number from the array
            var index = Math.floor(Math.random() * number_array.length);
            //-assign it to the gem then 
            this.gemValues[i] = number_array[index];
            //-remove the number from the array so it wouldn't be assigned to another gem
            number_array.splice(index, 1);
        }
    },
    clickGem: function (gemIndex) {//returns true if game ended, false if not
        //add the gem value to score
        this.current_score += this.gemValues[gemIndex];
        //if the score greater than the target
        if (this.current_score > this.target) {
            //-set the user won flag to false
            this.isUserWon = false;
            losses++;
            //-return true to indicate that game ended
            return true;//game ended
        } else if (this.current_score === this.target) {
            //-set the user won flag to true
            this.isUserWon = true;
            wins++;
            //-return true to indicate that game ended
            return true;//game ended
        } else {//score still less than target
            return false;//game hasn't ended yet
        }



    }
}
var wins = 0;
var losses = 0;
var isGameEnded = false;
$(document).ready(function () {
    game.reset();
    $("#gem_0").click(function () {
        clickGem(0);
        console.log("gem 0 clicked");
    });
    $("#gem_1").click(function () {
        clickGem(1);
        console.log("gem 1 clicked");
    });
    $("#gem_2").click(function () {
        clickGem(2);
        console.log("gem 2 clicked");
    });
    $("#gem_3").click(function () {
        clickGem(3);
        console.log("gem 3 clicked");
    });
    updateDisplay();
});









function clickGem(gemIndex) {
    isGameEnded = game.clickGem(gemIndex);
    if (isGameEnded) {
        updateDisplay();
        game.reset();//Start a new game
        isGameEnded = false;
    }
    updateDisplay();
}
function updateDisplay() {
    if (isGameEnded) {
        if (game.isUserWon) {
            $('#result').text("You Won!!!");
        } else {
            $('#result').text("You Lost!!!");
        }
    }
    $('#target_score').text(game.target);
    $('#wins_lbl').text(wins);
    $('#losses_lbl').text(losses);
    $('#current_score').text(game.current_score);

}