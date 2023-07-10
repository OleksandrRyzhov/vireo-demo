function menuInit() {
    const iconMenu = document.querySelector(".icon-menu");
    const footerLogo = document.querySelector(".footer__logo");
    const footerSocials = document.querySelector(".footer__socials");
    if (footerSocials && footerLogo) {
        footerLogo.style.width = getComputedStyle(footerSocials).width;
        getComputedStyle(footerSocials).width.onchange = () => {
            footerLogo.style.width = getComputedStyle(footerSocials).width;
        };
    }
    if (iconMenu) {
        document.addEventListener("click", function (e) {
            if (e.target.closest(".icon-menu")) {
                document.documentElement.classList.toggle("lock");
                document.documentElement.classList.toggle("menu-open");
            }
            if (document.documentElement.classList.contains("menu-open")) {
                iconMenu.setAttribute("aria-label", "Close the menu");
                iconMenu.setAttribute("title", "Close the menu");
                if (
                    !e.target.closest(".menu__body") &&
                    !e.target.closest(".icon-menu") &&
                    !e.target.closest(".header")
                ) {
                    document.documentElement.classList.remove("lock");
                    document.documentElement.classList.remove("menu-open");
                }
            } else {
                iconMenu.setAttribute("aria-label", "Open the menu");
                iconMenu.setAttribute("title", "Open the menu");
            }
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            document.documentElement.classList.remove("lock");
            document.documentElement.classList.remove("menu-open");
        }
    });

    const header = document.querySelector(".header");

    const linksHref = document.querySelectorAll("a[href]");
    if (linksHref.length > 0) {
        linksHref.forEach((link) => {
            link.addEventListener("click", onLinkClick);
        });
        function onLinkClick(e) {
            const href = e.target.getAttribute("href");
            if (href === "#") e.preventDefault();
            if (href === null || href[0] !== "#" || href === "#") return;
            e.preventDefault();
            const gotoBlock = document.querySelector(href.replace("#", "."));
            const gotoBlockValue =
                gotoBlock.getBoundingClientRect().top +
                scrollY -
                header.offsetHeight;

            if (document.documentElement.classList.contains("menu-open")) {
                document.documentElement.classList.remove("lock");
                document.documentElement.classList.remove("menu-open");
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });
            e.preventDefault();
        }
    }

    let lastScroll = 0;
    const defaultOffset = 0;
    const scrollPosition = () =>
        window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains("hide");

    window.addEventListener("scroll", () => {
        // scroll down
        if (
            scrollPosition() > lastScroll &&
            !containHide() &&
            scrollPosition() > defaultOffset
        )
            header.classList.add("hide");
        // scroll up
        else if (scrollPosition() < lastScroll && containHide())
            header.classList.remove("hide");

        lastScroll = scrollPosition();
    });

    const pageMain = document.querySelector("main");
    if (pageMain) {
        changePageMainChildMargin();
        window.matchMedia("(max-width: 767px)").onchange = () => {
            changePageMainChildMargin();
        };
        window.matchMedia("(max-width: 1024px)").onchange = () => {
            changePageMainChildMargin();
        };
    }
    function changePageMainChildMargin() {
        pageMain.children[0].style.marginTop = getComputedStyle(header).height;
    }
}
