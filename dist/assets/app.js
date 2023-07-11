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
function formInit() {
    let forms = document.querySelectorAll(".form");
    let formBtn = document.querySelectorAll(".form__btn");

    if (forms.length === 0) return;
    customizeSelects("select");

    function customizeSelects(selectClass) {
        //Получаем все "select" по селектору
        const selects = document.querySelectorAll(selectClass);
        //переборка по полученным "select"
        for (let i = 0; i < selects.length; i++) {
            const select = selects[i];
            //получаем все "option" внутри "select"
            const options = select.querySelectorAll("option");

            //создаем кастомный "select"
            const cSelect = document.createElement("div");
            const cSelectList = document.createElement("div");
            const cSelectCurrent = document.createElement("div");

            //задем классы и атрибуты кастомному "select"
            cSelect.className = "custom-select";
            cSelectList.className = "custom-select__list custom-scrollbar";
            cSelectCurrent.className = "custom-select__current";
            cSelectCurrent.setAttribute("tabindex", "0");
            //создаем вложенность созданных элементов
            cSelect.append(cSelectCurrent, cSelectList);

            //добавляем кастоный "select" сразу после оргинального "select"
            select.after(cSelect);

            //получаем список и значения "option" из "select", затем создаём кастомный "option" для кастоного "select"
            const createCustomDom = (x, y) => {
                let selectItems = "";
                for (var i = 0; i < options.length; i++) {
                    selectItems += `<div class="custom-select__item" data-value="${options[i].value}"><span class="points">${options[i].text}</span></div>`;
                }
                cSelectList.innerHTML = selectItems;
                x(), y();
            };

            //присваиваем текстовое первое значение "option" в кастомном "select"
            const currentTextValue = () => {
                cSelectCurrent.innerHTML = `<span class="points">${cSelectList.children[0].textContent}</span>`;
            };

            //получаем и задаем значения text/value
            const currentValue = () => {
                const items = cSelectList.children;
                for (var el = 0; el < items.length; el++) {
                    let selectValue = items[el].getAttribute("data-value");
                    let selectText = `<span class="points">${items[el].textContent}</span>`;
                    if (items[el].textContent === cSelectCurrent.textContent) {
                        items[el].classList.add("active");
                    }
                    items[el].addEventListener("click", () => {
                        cSelect.classList.remove("custom-select--show");
                        cSelectCurrent.innerHTML = selectText;
                        select.value = selectValue;
                        for (let o = 0; o < items.length; o++) {
                            if (
                                items[o].textContent ===
                                cSelectCurrent.textContent
                            ) {
                                for (let j = 0; j < items.length; j++) {
                                    items[j].classList.remove("active");
                                    items[j].classList.remove("focus");
                                }
                                items[o].classList.add("active");
                            }
                        }
                    });
                    if (document.hasFocus() && cSelectCurrent) {
                        const optionItems = document.querySelectorAll(
                            ".custom-select__item"
                        );
                        cSelectCurrent.addEventListener("keydown", (e) => {
                            if (
                                cSelect.classList.contains(
                                    "custom-select--show"
                                )
                            ) {
                                if (e.key === " " || e.key === "Enter") {
                                    e.preventDefault();
                                    for (
                                        let o = 0;
                                        o < optionItems.length;
                                        o++
                                    ) {
                                        if (
                                            optionItems[o].classList.contains(
                                                "focus"
                                            )
                                        ) {
                                            for (
                                                let j = 0;
                                                j < optionItems.length;
                                                j++
                                            ) {
                                                optionItems[j].classList.remove(
                                                    "active"
                                                );
                                            }
                                            optionItems[o].classList.add(
                                                "active"
                                            );
                                            cSelectCurrent.innerHTML = `<span class="points">${optionItems[o].textContent}</span>`;
                                            select.value =
                                                optionItems[o].getAttribute(
                                                    "data-value"
                                                );
                                            optionItems[o].classList.remove(
                                                "focus"
                                            );
                                        }
                                        cSelect.classList.remove(
                                            "custom-select--show"
                                        );
                                    }
                                }
                                if (
                                    e.key === "ArrowUp" ||
                                    e.key === "ArrowDown"
                                ) {
                                    e.preventDefault();
                                    for (
                                        let o = 0;
                                        o < optionItems.length;
                                        o++
                                    ) {
                                        if (
                                            optionItems[o].classList.contains(
                                                "focus"
                                            )
                                        ) {
                                            cSelectCurrent.addEventListener(
                                                "keyup",
                                                (e) => {
                                                    if (o > 0) {
                                                        if (
                                                            e.key === "ArrowUp"
                                                        ) {
                                                            for (
                                                                let j = 0;
                                                                j <
                                                                optionItems.length;
                                                                j++
                                                            ) {
                                                                if (
                                                                    optionItems[
                                                                        j
                                                                    ].classList.contains(
                                                                        "focus"
                                                                    )
                                                                ) {
                                                                    optionItems[
                                                                        j
                                                                    ].classList.remove(
                                                                        "focus"
                                                                    );
                                                                }
                                                            }
                                                            return optionItems[
                                                                o - 1
                                                            ].classList.add(
                                                                "focus"
                                                            );
                                                        }
                                                    } else if (o === 0) {
                                                        if (
                                                            e.key === "ArrowUp"
                                                        ) {
                                                            return;
                                                        }
                                                    }
                                                    if (
                                                        o <
                                                        optionItems.length - 1
                                                    ) {
                                                        if (
                                                            e.key ===
                                                            "ArrowDown"
                                                        ) {
                                                            for (
                                                                let j = 0;
                                                                j <
                                                                optionItems.length;
                                                                j++
                                                            ) {
                                                                if (
                                                                    optionItems[
                                                                        j
                                                                    ].classList.contains(
                                                                        "focus"
                                                                    )
                                                                ) {
                                                                    optionItems[
                                                                        j
                                                                    ].classList.remove(
                                                                        "focus"
                                                                    );
                                                                }
                                                            }
                                                            return optionItems[
                                                                o + 1
                                                            ].classList.add(
                                                                "focus"
                                                            );
                                                        }
                                                    } else if (
                                                        o ===
                                                        optionItems.length - 1
                                                    ) {
                                                        if (
                                                            e.key ===
                                                            "ArrowDown"
                                                        ) {
                                                            return;
                                                        }
                                                    }
                                                }
                                            );
                                        }
                                    }
                                }
                                if (e.key === "Tab") {
                                    e.preventDefault();
                                }
                                if (e.key === "Escape") {
                                    cSelect.classList.remove(
                                        "custom-select--show"
                                    );
                                    for (
                                        let o = 0;
                                        o < optionItems.length;
                                        o++
                                    ) {
                                        optionItems[o].classList.remove(
                                            "focus"
                                        );
                                    }
                                }
                            } else if (
                                !cSelect.classList.contains(
                                    "custom-select--show"
                                )
                            ) {
                                let selectItem = cSelectCurrent;
                                if (e.key === " ") {
                                    e.preventDefault();
                                    for (
                                        let o = 0;
                                        o < optionItems.length;
                                        o++
                                    ) {
                                        if (
                                            optionItems[o].textContent ===
                                            selectItem.textContent
                                        ) {
                                            optionItems[o].classList.add(
                                                "focus"
                                            );
                                        }
                                        cSelect.classList.add(
                                            "custom-select--show"
                                        );
                                    }
                                }
                                if (
                                    e.key === "ArrowUp" ||
                                    e.key === "ArrowDown"
                                ) {
                                    e.preventDefault();
                                    for (
                                        let o = 0;
                                        o < optionItems.length;
                                        o++
                                    ) {
                                        if (
                                            optionItems[o].textContent ===
                                            selectItem.textContent
                                        ) {
                                            optionItems[o].classList.add(
                                                "focus"
                                            );
                                        }
                                        cSelect.classList.add(
                                            "custom-select--show"
                                        );
                                    }
                                }
                            }
                        });
                    }
                }
            };

            const toggleClass = () => {
                const optionItems = document.querySelectorAll(
                    ".custom-select__item"
                );
                const selectItem = document.querySelector(
                    ".custom-select__current"
                );

                cSelect.classList.toggle("custom-select--show");
                for (let o = 0; o < optionItems.length; o++) {
                    optionItems[o].classList.remove("focus");
                    if (
                        cSelect.classList.contains("custom-select--show") &&
                        optionItems[o].textContent === selectItem.textContent
                    ) {
                        optionItems[o].classList.add("focus");
                    }
                }
            };

            const desctopFn = () => {
                cSelectCurrent.addEventListener("click", toggleClass);
            };
            const mobileFn = () => {
                cSelectCurrent.addEventListener("click", toggleClass);
                for (let j = 0; j < selects.length; j++) {
                    let mobileSelect = selects[j];
                    mobileSelect.addEventListener("change", () => {
                        mobileSelect.nextElementSibling.querySelector(
                            ".custom-select__current"
                        ).textContent = mobileSelect.value;
                    });
                }
            };

            createCustomDom(currentTextValue, currentValue);

            document.addEventListener("mouseup", (e) => {
                if (!cSelect.contains(e.target)) {
                    cSelect.classList.remove("custom-select--show");
                    const items = cSelectList.children;
                    for (var el = 0; el < items.length; el++) {
                        items[el].classList.remove("focus");
                    }
                }
            });

            if (cSelectList.children.length > 0) {
                for (let i = 0; i < cSelectList.children.length; i++) {
                    if (cSelectList.children[i].textContent === "+1") {
                        cSelectList.children[i].classList.add("usa");
                    }
                }
                if (cSelectCurrent.textContent === "+1") {
                    cSelectCurrent.classList.add("usa");
                }
            }

            detectmob(mobileFn, desctopFn);
            function detectmob(x, y) {
                if (
                    navigator.userAgent.match(/Android/i) ||
                    navigator.userAgent.match(/webOS/i) ||
                    navigator.userAgent.match(/iPhone/i) ||
                    navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/iPod/i) ||
                    navigator.userAgent.match(/BlackBerry/i) ||
                    navigator.userAgent.match(/Windows Phone/i)
                ) {
                    x();
                } else {
                    y();
                }
            }
        }
    }
}
