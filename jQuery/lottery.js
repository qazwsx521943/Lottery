let randomSel = [];

// Function

// Create One random number
// let getRandom = () => {
//   let i = Math.floor(Math.random() * 49 + 1);
//   if (randomSel.every((num) => num != i)) {
//     randomSel.push(i);
//   } else {
//     getRandom();
//   }
// };
let getRandom = (arr) => {
  let i = Math.floor(Math.random() * 49 + 1);
  if (arr.every((num) => num != i)) {
    arr.push(i);
  } else {
    getRandom(arr);
  }
};

// Create five random numbers
function fiveRandom(arr) {
  for (let i = 0; i < 5; i++) {
    getRandom(arr);
  }
  arr.sort((a, b) => a - b);
}

// reset lottery game
function newGame() {
  $("#input").html("");
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
  // clean lottery clicked & answers
  $("td").each(function (i, e) {
    $(e).removeClass("clicked").removeClass("congrat");
  });
}

// show results on HTML
function showNums() {
  let correct = []; // collect matched numbers into an array
  let error = [];
  let acc = 0; // count matched numbers
  let numArray = []; // collect player's numbers into an array
  let nums = document.querySelectorAll(".clicked");
  if (nums.length > 5) return alert("Can't Pick Over 5 numbers!");
  nums.forEach((x) => numArray.push(parseInt(x.textContent)));
  numArray.sort((a, b) => a - b);
  console.log(numArray);

  fiveRandom(randomSel);

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

// Auto Pick 5 numbers
function autoPick() {
  let auto = [];
  fiveRandom(auto);
  $("td").each(function (i, e) {
    $("td").eq(auto[i]).addClass("clicked");
  });
}

// Clear all picked number
function clearAll() {
  $("td").each(function (i, e) {
    $(e).removeClass("clicked");
  });
}
// conditions status change⇩
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
});

$("#autoChoose").click(autoPick);
$("#clearAll").click(clearAll);
$("#reset").click(newGame);
