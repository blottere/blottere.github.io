//-------------------------------------
// Header Shrinking
//-------------------------------------

$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('header').addClass('shrink');
    } else {
        $('header').removeClass('shrink');
    }
});

//-------------------------------------
// Anim on Scroll
//-------------------------------------

new AnimOnScroll(document.getElementById('grid'), {
    minDuration: 0.4,
    maxDuration: 0.7,
    viewportFactor: 0.2
});

//-------------------------------------
// MatchMedia Stuff
//-------------------------------------

if (matchMedia) {
    var mq = window.matchMedia("(max-width: 700px)");
    console.log(window.innerWidth);
    mq.addListener(widthchange);
    widthchange(mq);
}
// media query change
function widthchange(mq) {
    var ul = $('#list');
    ul.children().each(function(i, li) {
        ul.prepend(li)
    });
}

$(document).ready(function() {
    if (window.innerWidth > 700) {
        widthchange(mq);
    };
});
