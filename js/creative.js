(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

// Emission calculator *** Load only after the DOM is ready ***
var population = 5500000;
var decimalPoints = 6;

// Target values
var target = 28520000;
var max = 56078050;
var divider = 365 * 24 * 60 * 60 * 2; // year in half seconds
var shard = max / divider;
var targetShard = target / divider;
var startOfCurrentYear = new Date(new Date().getFullYear().toString());
var interval = 500; // milliseconds

// Elements
var total = document.getElementById("totalEmissions");
var percent = document.getElementById("percent");
var perPerson = document.getElementById("emissionsPerPerson");
var perPersonPercent = document.getElementById("emissionsPerPersonPercent");
var totalDept = document.getElementById("totalDept");
var deptPerPerson = document.getElementById("deptPerPerson");

function updateLargeNumber(element, value) {
	element.innerHTML = Math.floor(value);
}

function updateSmallNumber(element, value) {
	element.innerHTML = (value).toFixed(decimalPoints);
}

var timer = setInterval(update, interval);
function update() {
	var today = new Date();
	var timeSinceYear = today.getTime() - startOfCurrentYear.getTime();
	var shardsUntilNow = timeSinceYear / interval;

	var totalEmissions = shard * shardsUntilNow;
	updateLargeNumber(total, totalEmissions);
	updateSmallNumber(perPerson, (totalEmissions / population));

	var targetValue = targetShard * shardsUntilNow;
	var dept = -1 * (targetValue - totalEmissions);
	updateLargeNumber(totalDept, dept);
	updateSmallNumber(deptPerPerson, dept / population);
	percent.innerHTML = ((1 - targetValue / totalEmissions) * 100).toFixed(2);
}

