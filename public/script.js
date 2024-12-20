var $j = jQuery.noConflict();

$j(document).ready(function(){
    $j(window).scroll(function() {
        if (this.scrollY > 20){
            $j('.navbar').addClass("sticky");
        }else{
            $j('.navbar').removeClass("sticky");
        }
    });
    $j('.scroll-up-btn').click(function() {
        $j('html').animate({scrollTop: 0});
        $j('html').css("scrollBehavior", "auto");
    });
    $j('.navbar .menu li a').click(function(){
        $j('html').css("scrollBehavior", "smooth");
    });
    $j('.menu-btn').click(function(){
        $j('.navbar .menu').toggleClass("active");
        $j('.menu-btn i').toggleClass("active");
    });

    var Typed = new Typed(".typing" , {
        Strings: ["Musician", "Developer", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    console.log(Typed);
    
    $j('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1, 
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});



function downloadCV() {
    try {
        // Show the loading spinner
        document.getElementById('loading-spinner').style.display = 'block';

        // Set a timeout to hide the spinner after 4 seconds
        setTimeout(function() {
            document.getElementById('loading-spinner').style.display = 'none';

            // After hiding the spinner, show the download completion message
            document.getElementById('download-message').style.display = 'block';

            // Hide the download completion message after 3 seconds
            setTimeout(function() {
                document.getElementById('download-message').style.display = 'none';
            }, 3000); // 3 seconds

        }, 3000); // 4 seconds

        // Fetch the CV (you can keep this logic to actually download the file)
        fetch('/CV/Mpho_Rakgope_CV.pdf')
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('CV not found');
                }
            })
            .then(blob => {
                // Create a temporary link to download the file
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'Mpho_Rakgope_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading CV:', error);
                // Hide the spinner in case of an error
                document.getElementById('loading-spinner').style.display = 'none';

                // Optionally, display an error message to the user
                alert('An error occurred while downloading the CV. Please try again later.');
            });

    } catch (error) {
        console.error('Unexpected error:', error);
        // Hide the spinner in case of an unexpected error
        document.getElementById('loading-spinner').style.display = 'none';

        // Optionally, display an error message to the user
        alert('An unexpected error occurred. Please try again later.');
    }
}

// Add this to your script.js
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
});