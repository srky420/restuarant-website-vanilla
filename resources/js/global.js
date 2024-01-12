$('document').ready(() => {
    // Nav collapse/show
    $('.burger').click((e) => {
        $('.nav-list').toggleClass('nav-show');
    })

    // Goto top
    $('#top-btn').click(() => window.scrollTo(0, 0));

});

// Show/hide goto top btn
$(window).scroll(() => {
    if ($(window).scrollTop() > $(document).height() / 3) {
        $('.goto-top').addClass('show-btn');
    }
    else {
        $('.goto-top').removeClass('show-btn');
    }
});

 