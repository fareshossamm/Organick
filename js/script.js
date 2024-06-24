$(document).ready(function () {
    // Close the navbar collapse when close icon is clicked
    $('.close-icon').on('click', function () {
        $('#navbarNav').removeClass('show');
    });

    // Close the navbar collapse when a nav-link is clicked (optional)
    $('.navbar-nav link').on('click', function () {
        $('#navbarNav').removeClass('show');
    });
});