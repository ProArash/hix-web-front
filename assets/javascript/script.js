var xValues = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه"];
var yValues = [55, 49, 44, 24, 32];
var barColors = ["#d8cee2", "#d8cee2", "#3C096C", "#d8cee2", "#d8cee2"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "آمار فروش محصولات توسط ربات"
    }
  }
});

// alert(window.screen.width)

const ulMenu = document.querySelector("#collapseList")
if (window.screen.width < "600") {
  ulMenu.classList.toggle("collapse")
} else {
  ulMenu.classList.remove("collapse")
}
