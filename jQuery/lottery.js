var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
// ⇧ Ignore Bootstrap plugin

let randomSel = [];

// Function

// random number function
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

function newGame() {
  $("#input").html("");
  $("#aBtn").next().hide();
  randomSel = [];
  $("#sub").attr("disabled", false);
  $("#sub").css("opacity", "");
}

function showNums() {
  let correct = [];
  let acc = 0;
  let numArray = [];
  let nums = document.querySelectorAll("input");
  nums.forEach((x) => numArray.push(parseInt(x.value)));
  numArray.sort((a, b) => a - b);
  fiveRandom();

  for (let i in numArray) {
    if (randomSel.includes(numArray[i])) {
      acc++;
      correct.push(numArray[i]);
    }
  }

  $("#input").html(`您猜對的數字有：${correct}<br/>
  總計${acc}個`);
  $(this).attr("disabled", true);
  $(this).css({
    opacity: 0.6,
  });
}

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
    $(this).next().text(`莊家的數字：${randomSel}`);
  $(this).next().toggle();
});
$("#reset").click(newGame);
