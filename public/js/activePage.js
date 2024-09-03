document.addEventListener("DOMContentLoaded", function() {
    const activePage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    //console.log('Current path:', activePage);  // Log current path

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        //console.log('Link path:', linkPath);  // Log each link's path

        if (linkPath === activePage) {
            link.classList.add('active');
           // console.log("succesfully added")
        } else {
           // console.log('No match for:', linkPath);
        }
    });
});
