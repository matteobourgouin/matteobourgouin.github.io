document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".video-card");
    let activeIframe = null;
    let originalSrc = "";

    cards.forEach(function (card) {

        const button = card.querySelector(".video-button");
        const iframe = card.querySelector(".video-iframe");

        if (!button || !iframe) return;

        const iframeSrc = iframe.src;

        button.addEventListener("click", function (event) {
            event.preventDefault();

            // Close any previously opened video
            if (activeIframe && activeIframe !== iframe) {
                activeIframe.style.display = "none";
                activeIframe.src = originalSrc;
            }

            // Open this video
            activeIframe = iframe;
            originalSrc = iframeSrc;

            iframe.style.display = "block";
            document.body.style.setProperty(
                "--before-display", "block"
            );
        });
    });

    document.addEventListener("click", function (event) {

        if (!activeIframe) return;

        const clickedButton = event.target.closest(".video-button");

        if (
            !activeIframe.contains(event.target) &&
            !clickedButton
        ) {
            activeIframe.style.display = "none";
            activeIframe.src = originalSrc;

            document.body.style.setProperty(
                "--before-display", "none"
            );

            activeIframe = null;
            originalSrc = "";
        }
    });

});