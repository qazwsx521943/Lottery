var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
// ⇧ Bootstrap plugin
let randomSel = [];

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
}

function showNums() {
  let numArray = [];
  let nums = document.querySelectorAll("input");
  nums.forEach((x) => numArray.push(x.value));
  fiveRandom();
}

$("#sub").click(showNums);
$("#reset").click(function () {
  randomSel = [];
});
