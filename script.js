//initializes correct cards to zero
var correctCards = 0;
$(init);

function init() {
  // Hides the congrats message
  $("#successMessage").hide();
  $("#successMessage").css({
    left: "580px",
    top: "250px",
    width: 0,
    height: 0
  });

  // Resets the game and correct cards to zero
  correctCards = 0;
  $("#cardPile").html("");
  $("#cardSlots").html("");

  // Creates row of randomly shuffled cards
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numbers.sort(function () {
    return Math.random() - 0.5;
  });

  for (var i = 0; i < 10; i++) {
    $("<div>" + numbers[i] + "</div>")
      .data("number", numbers[i])
      .attr("id", "card" + numbers[i])
      .appendTo("#cardPile")
      .draggable({
        containment: "#content",
        stack: "#cardPile div",
        cursor: "move",
        revert: true
      });
  }

  // Array for numbers/words to be assigned to card slots
  var words = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
  ];
  //appends Words array to Card Slots for labeling
  //Card slots are droppable on lower slots
  for (i = 1; i <= 10; i++) {
    $("<div>" + words[i - 1] + "</div>")
      .data("number", i)
      .appendTo("#cardSlots")
      .droppable({
        accept: "#cardPile div",
        hoverClass: "hovered",
        drop: handleCardDrop
      });
  }
  // variable holds card/slot data for drop target
  function handleCardDrop(event, ui) {
    var slotNumber = $(this).data("number");
    var cardNumber = ui.draggable.data("number");

    //Card in correct slot changes slot background
    // draggable disabled if correct
    if (slotNumber == cardNumber) {
      ui.draggable.addClass("correct");
      ui.draggable.draggable("disable");
      $(this).droppable("disable");
      ui.draggable.position({ of: $(this), my: "left top", at: "left top" });
      ui.draggable.draggable("option", "revert", false);
      correctCards++;
    }

    // All Correct/reset game

    if (correctCards == 10) {
      $("#successMessage").show();
      $("#successMessage").animate({
        left: "380px",
        top: "200px",
        width: "400px",
        height: "100px",
        opacity: 1
      });
    }
  }
}