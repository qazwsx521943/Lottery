var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
// ⇧ Ignore Bootstrap plugin

let randomSel = [];

// Function

// Create One random number
let getRandom = () => {
  let i = Math.floor(Math.random() * 49 + 1);
  if (randomSel.every((num) => num != i)) {
    randomSel.push(i);
  } else {
    getRandom();
  }
};

// Create five random numbers
function fiveRandom() {
  for (let i = 0; i < 5; i++) {
    getRandom();
  }
  randomSel.sort((a, b) => a - b);
}

// reset lottery game
function newGame() {
  $("#input").html("");
  $("#playerInput")
    .children()
    .each(function (i, e) {
      $(e).val("");
    });
  $("#aBtn").text(function () {
    $(this).text("Show numbers");
  });
  randomSel = [];
  $("#results")
    .children()
    .each(function (index, element) {
      $(element).children().text("");
    })
    .hide();
  // clear submit button restriction
  $("#sub").attr("disabled", false).css("opacity", "");
}

// show results on HTML
function showNums() {
  let correct = []; // collect matched numbers into an array
  let error = [];
  let acc = 0; // count matched numbers
  let numArray = []; // collect player's numbers into an array
  let nums = document.querySelectorAll(".clicked");
  nums.forEach((x) => numArray.push(parseInt(x.textContent)));
  numArray.sort((a, b) => a - b);
  console.log(numArray);

  fiveRandom();

  // get matched numbers
  for (let i in numArray) {
    if (randomSel.includes(numArray[i])) {
      acc++;
      correct.push(numArray[i]);
    } else {
      error.push(numArray[i]);
    }
  }
  // jQuery change display

  // Bingo number
  correct.forEach((x) =>
    $("td")
      .eq(x - 1)
      .removeClass("clicked")
      .addClass("congrat")
  );
  // lost numbers

  $("#input").html(`Correct Numbers：${correct}<br/>
  TOTAL ${acc}`);
  $(this).attr("disabled", true).css("opacity", "0.6");
}

// select and change color
$("td").each(function (i, e) {
  $(e).click(() => $(this).toggleClass("clicked"));
});

// jQuery Eventhandlers
$("#sub").click(showNums);
$("#aBtn").click(function () {
  if (
    $(this).text(function (i, text) {
      return text === "Show numbers"
        ? "Hide numbers"
        : text === "Hide numbers"
        ? "Show numbers"
        : false;
    })
  )
    $("#results")
      .children()
      .each(function (index, element) {
        $(element).children().text(randomSel[index]);
      });
  $("#results").children().toggle();

  // $(this).next().toggle();
});
$("#reset").click(newGame);
