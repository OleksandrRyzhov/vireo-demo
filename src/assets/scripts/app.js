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
//==============================================================================================================================================
function formInit() {
    let forms = document.querySelectorAll(".form");

    if (forms.length === 0) return;

    let formBtns = document.querySelectorAll(".form__btn");

    /*
    const allCountries = [
        ["Afghanistan (افغانستان)", "af", "./assets/img/flags/af.svg", "93"],
        ["Albania (Shqipëri)", "al", "./assets/img/flags/al.svg", "355"],
        ["Algeria (الجزائر)", "dz", "./assets/img/flags/dz.svg", "213"],
        ["American Samoa", "as", "./assets/img/flags/as.svg", "1", 5, ["684"]],
        ["Andorra", "ad", "./assets/img/flags/ad.svg", "376"],
        ["Angola", "ao", "./assets/img/flags/ao.svg", "244"],
        ["Anguilla", "ai", "./assets/img/flags/ai.svg", "1", 6, ["264"]],
        [
            "Antigua and Barbuda",
            "ag",
            "./assets/img/flags/ag.svg",
            "1",
            7,
            ["268"],
        ],
        ["Argentina", "ar", "./assets/img/flags/ar.svg", "54"],
        ["Armenia (Հայաստան)", "am", "./assets/img/flags/am.svg", "374"],
        ["Aruba", "aw", "./assets/img/flags/aw.svg", "297"],
        ["Ascension Island", "ac", "./assets/img/flags/ac.svg", "247"],
        ["Australia", "au", "./assets/img/flags/au.svg", "61", 0],
        ["Austria (Österreich)", "at", "./assets/img/flags/at.svg", "43"],
        ["Azerbaijan (Azərbaycan)", "az", "./assets/img/flags/az.svg", "994"],
        ["Bahamas", "bs", "./assets/img/flags/bs.svg", "1", 8, ["242"]],
        ["Bahrain (البحرين)", "bh", "./assets/img/flags/bh.svg", "973"],
        ["Bangladesh (বাংলাদেশ)", "bd", "./assets/img/flags/bd.svg", "880"],
        ["Barbados", "bb", "./assets/img/flags/bb.svg", "1", 9, ["246"]],
        ["Belarus (Беларусь)", "by", "./assets/img/flags/by.svg", "375"],
        ["Belgium (België)", "be", "./assets/img/flags/be.svg", "32"],
        ["Belize", "bz", "./assets/img/flags/bz.svg", "501"],
        ["Benin (Bénin)", "bj", "./assets/img/flags/bj.svg", "229"],
        ["Bermuda", "bm", "./assets/img/flags/bm.svg", "1", 10, ["441"]],
        ["Bhutan (འབྲུག)", "bt", "./assets/img/flags/bt.svg", "975"],
        ["Bolivia", "bo", "./assets/img/flags/bo.svg", "591"],
        [
            "Bosnia and Herzegovina (Босна и Херцеговина)",
            "ba",
            "./assets/img/flags/ba.svg",
            "387",
        ],
        ["Botswana", "bw", "./assets/img/flags/bw.svg", "267"],
        ["Brazil (Brasil)", "br", "./assets/img/flags/br.svg", "55"],
        [
            "British Indian Ocean Territory",
            "io",
            "./assets/img/flags/io.svg",
            "246",
        ],
        [
            "British Virgin Islands",
            "vg",
            "./assets/img/flags/vg.svg",
            "1",
            11,
            ["284"],
        ],
        ["Brunei", "bn", "./assets/img/flags/bn.svg", "673"],
        ["Bulgaria (България)", "bg", "./assets/img/flags/bg.svg", "359"],
        ["Burkina Faso", "bf", "./assets/img/flags/bf.svg", "226"],
        ["Burundi (Uburundi)", "bi", "./assets/img/flags/bi.svg", "257"],
        ["Cambodia (កម្ពុជា)", "kh", "./assets/img/flags/kh.svg", "855"],
        ["Cameroon (Cameroun)", "cm", "./assets/img/flags/cm.svg", "237"],
        [
            "Canada",
            "ca",
            "./assets/img/flags/ca.svg",
            "1",
            1,
            [
                "204",
                "226",
                "236",
                "249",
                "250",
                "263",
                "289",
                "306",
                "343",
                "354",
                "365",
                "367",
                "368",
                "382",
                "387",
                "403",
                "416",
                "418",
                "428",
                "431",
                "437",
                "438",
                "450",
                "584",
                "468",
                "474",
                "506",
                "514",
                "519",
                "548",
                "579",
                "581",
                "584",
                "587",
                "604",
                "613",
                "639",
                "647",
                "672",
                "683",
                "705",
                "709",
                "742",
                "753",
                "778",
                "780",
                "782",
                "807",
                "819",
                "825",
                "867",
                "873",
                "902",
                "905",
            ],
        ],
        ["Cape Verde (Kabu Verdi)", "cv", "./assets/img/flags/cv.svg", "238"],
        [
            "Caribbean Netherlands",
            "bq",
            "./assets/img/flags/bq.svg",
            "599",
            1,
            ["3", "4", "7"],
        ],
        ["Cayman Islands", "ky", "./assets/img/flags/ky.svg", "1", 12, ["345"]],
        [
            "Central African Republic (République centrafricaine)",
            "cf",
            "./assets/img/flags/cf.svg",
            "236",
        ],
        ["Chad (Tchad)", "td", "./assets/img/flags/td.svg", "235"],
        ["Chile", "cl", "./assets/img/flags/cl.svg", "56"],
        ["China (中国)", "cn", "./assets/img/flags/cn.svg", "86"],
        [
            "Christmas Island",
            "cx",
            "./assets/img/flags/cx.svg",
            "61",
            2,
            ["89164"],
        ],
        [
            "Cocos (Keeling) Islands",
            "cc",
            "./assets/img/flags/cc.svg",
            "61",
            1,
            ["89162"],
        ],
        ["Colombia", "co", "./assets/img/flags/co.svg", "57"],
        ["Comoros (جزر القمر)", "km", "./assets/img/flags/km.svg", "269"],
        [
            "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
            "cd",
            "./assets/img/flags/cd.svg",
            "243",
        ],
        [
            "Congo (Republic) (Congo-Brazzaville)",
            "cg",
            "./assets/img/flags/cg.svg",
            "242",
        ],
        ["Cook Islands", "ck", "./assets/img/flags/ck.svg", "682"],
        ["Costa Rica", "cr", "./assets/img/flags/cr.svg", "506"],
        ["Côte d’Ivoire", "ci", "./assets/img/flags/ci.svg", "225"],
        ["Croatia (Hrvatska)", "hr", "./assets/img/flags/hr.svg", "385"],
        ["Cuba", "cu", "./assets/img/flags/cu.svg", "53"],
        ["Curaçao", "cw", "./assets/img/flags/cw.svg", "599", 0],
        ["Cyprus (Κύπρος)", "cy", "./assets/img/flags/cy.svg", "357"],
        [
            "Czech Republic (Česká republika)",
            "cz",
            "./assets/img/flags/cz.svg",
            "420",
        ],
        ["Denmark (Danmark)", "dk", "./assets/img/flags/dk.svg", "45"],
        ["Djibouti", "dj", "./assets/img/flags/dj.svg", "253"],
        ["Dominica", "dm", "./assets/img/flags/dm.svg", "1", 13, ["767"]],
        [
            "Dominican Republic (República Dominicana)",
            "do",
            "./assets/img/flags/do.svg",
            "1",
            2,
            ["809", "829", "849"],
        ],
        ["Ecuador", "ec", "./assets/img/flags/ec.svg", "593"],
        ["Egypt (مصر)", "eg", "./assets/img/flags/eg.svg", "20"],
        ["El Salvador", "sv", "./assets/img/flags/sv.svg", "503"],
        [
            "Equatorial Guinea (Guinea Ecuatorial)",
            "gq",
            "./assets/img/flags/gq.svg",
            "240",
        ],
        ["Eritrea", "er", "./assets/img/flags/er.svg", "291"],
        ["Estonia (Eesti)", "ee", "./assets/img/flags/ee.svg", "372"],
        ["Eswatini", "sz", "./assets/img/flags/sz.svg", "268"],
        ["Ethiopia", "et", "./assets/img/flags/et.svg", "251"],
        [
            "Falkland Islands (Islas Malvinas)",
            "fk",
            "./assets/img/flags/fk.svg",
            "500",
        ],
        ["Faroe Islands (Føroyar)", "fo", "./assets/img/flags/fo.svg", "298"],
        ["Fiji", "fj", "./assets/img/flags/fj.svg", "679"],
        ["Finland (Suomi)", "fi", "./assets/img/flags/fi.svg", "358", 0],
        ["France", "fr", "./assets/img/flags/fr.svg", "33"],
        [
            "French Guiana (Guyane française)",
            "gf",
            "./assets/img/flags/gf.svg",
            "594",
        ],
        [
            "French Polynesia (Polynésie française)",
            "pf",
            "./assets/img/flags/pf.svg",
            "689",
        ],
        ["Gabon", "ga", "./assets/img/flags/ga.svg", "241"],
        ["Gambia", "gm", "./assets/img/flags/gm.svg", "220"],
        ["Georgia (საქართველო)", "ge", "./assets/img/flags/ge.svg", "995"],
        ["Germany (Deutschland)", "de", "./assets/img/flags/de.svg", "49"],
        ["Ghana (Gaana)", "gh", "./assets/img/flags/gh.svg", "233"],
        ["Gibraltar", "gi", "./assets/img/flags/gi.svg", "350"],
        ["Greece (Ελλάδα)", "gr", "./assets/img/flags/gr.svg", "30"],
        [
            "Greenland (Kalaallit Nunaat)",
            "gl",
            "./assets/img/flags/gl.svg",
            "299",
        ],
        ["Grenada", "gd", "./assets/img/flags/gd.svg", "1", 14, ["473"]],
        ["Guadeloupe", "gp", "./assets/img/flags/gp.svg", "590", 0],
        ["Guam", "gu", "./assets/img/flags/gu.svg", "1", 15, ["671"]],
        ["Guatemala", "gt", "./assets/img/flags/gt.svg", "502"],
        [
            "Guernsey",
            "gg",
            "./assets/img/flags/gg.svg",
            "44",
            1,
            ["1481", "7781", "7839", "7911"],
        ],
        ["Guinea (Guinée)", "gn", "./assets/img/flags/gn.svg", "224"],
        [
            "Guinea-Bissau (Guiné Bissau)",
            "gw",
            "./assets/img/flags/gw.svg",
            "245",
        ],
        ["Guyana", "gy", "./assets/img/flags/gy.svg", "592"],
        ["Haiti", "ht", "./assets/img/flags/ht.svg", "509"],
        ["Honduras", "hn", "./assets/img/flags/hn.svg", "504"],
        ["Hong Kong (香港)", "hk", "./assets/img/flags/hk.svg", "852"],
        ["Hungary (Magyarország)", "hu", "./assets/img/flags/hu.svg", "36"],
        ["Iceland (Ísland)", "is", "./assets/img/flags/is.svg", "354"],
        ["India (भारत)", "in", "./assets/img/flags/in.svg", "91"],
        ["Indonesia", "id", "./assets/img/flags/id.svg", "62"],
        ["Iran (ایران)", "ir", "./assets/img/flags/ir.svg", "98"],
        ["Iraq (العراق)", "iq", "./assets/img/flags/iq.svg", "964"],
        ["Ireland", "ie", "./assets/img/flags/ie.svg", "353"],
        [
            "Isle of Man",
            "im",
            "./assets/img/flags/im.svg",
            "44",
            2,
            ["1624", "74576", "7524", "7924", "7624"],
        ],
        ["Israel (ישראל)", "il", "./assets/img/flags/il.svg", "972"],
        ["Italy (Italia)", "it", "./assets/img/flags/it.svg", "39", 0],
        ["Jamaica", "jm", "./assets/img/flags/jm.svg", "1", 4, ["876", "658"]],
        ["Japan (日本)", "jp", "./assets/img/flags/jp.svg", "81"],
        [
            "Jersey",
            "je",
            "./assets/img/flags/je.svg",
            "44",
            3,
            ["1534", "7509", "7700", "7797", "7829", "7937"],
        ],
        ["Jordan (الأردن)", "jo", "./assets/img/flags/jo.svg", "962"],
        [
            "Kazakhstan (Казахстан)",
            "kz",
            "./assets/img/flags/kz.svg",
            "7",
            1,
            ["33", "7"],
        ],
        ["Kenya", "ke", "./assets/img/flags/ke.svg", "254"],
        ["Kiribati", "ki", "./assets/img/flags/ki.svg", "686"],
        ["Kosovo", "xk", "./assets/img/flags/xk.svg", "383"],
        ["Kuwait (الكويت)", "kw", "./assets/img/flags/kw.svg", "965"],
        ["Kyrgyzstan (Кыргызстан)", "kg", "./assets/img/flags/kg.svg", "996"],
        ["Laos (ລາວ)", "la", "./assets/img/flags/la.svg", "856"],
        ["Latvia (Latvija)", "lv", "./assets/img/flags/lv.svg", "371"],
        ["Lebanon (لبنان)", "lb", "./assets/img/flags/lb.svg", "961"],
        ["Lesotho", "ls", "./assets/img/flags/ls.svg", "266"],
        ["Liberia", "lr", "./assets/img/flags/lr.svg", "231"],
        ["Libya (ليبيا)", "ly", "./assets/img/flags/ly.svg", "218"],
        ["Liechtenstein", "li", "./assets/img/flags/li.svg", "423"],
        ["Lithuania (Lietuva)", "lt", "./assets/img/flags/lt.svg", "370"],
        ["Luxembourg", "lu", "./assets/img/flags/lu.svg", "352"],
        ["Macau (澳門)", "mo", "./assets/img/flags/mo.svg", "853"],
        ["Madagascar (Madagasikara)", "mg", "./assets/img/flags/mg.svg", "261"],
        ["Malawi", "mw", "./assets/img/flags/mw.svg", "265"],
        ["Malaysia", "my", "./assets/img/flags/my.svg", "60"],
        ["Maldives", "mv", "./assets/img/flags/mv.svg", "960"],
        ["Mali", "ml", "./assets/img/flags/ml.svg", "223"],
        ["Malta", "mt", "./assets/img/flags/mt.svg", "356"],
        ["Marshall Islands", "mh", "./assets/img/flags/mh.svg", "692"],
        ["Martinique", "mq", "./assets/img/flags/mq.svg", "596"],
        ["Mauritania (موريتانيا)", "mr", "./assets/img/flags/mr.svg", "222"],
        ["Mauritius (Moris)", "mu", "./assets/img/flags/mu.svg", "230"],
        [
            "Mayotte",
            "yt",
            "./assets/img/flags/yt.svg",
            "262",
            1,
            ["269", "639"],
        ],
        ["Mexico (México)", "mx", "./assets/img/flags/mx.svg", "52"],
        ["Micronesia", "fm", "./assets/img/flags/fm.svg", "691"],
        [
            "Moldova (Republica Moldova)",
            "md",
            "./assets/img/flags/md.svg",
            "373",
        ],
        ["Monaco", "mc", "./assets/img/flags/mc.svg", "377"],
        ["Mongolia (Монгол)", "mn", "./assets/img/flags/mn.svg", "976"],
        ["Montenegro (Crna Gora)", "me", "./assets/img/flags/me.svg", "382"],
        ["Montserrat", "ms", "./assets/img/flags/ms.svg", "1", 16, ["664"]],
        ["Morocco (المغرب)", "ma", "./assets/img/flags/ma.svg", "212", 0],
        ["Mozambique (Moçambique)", "mz", "./assets/img/flags/mz.svg", "258"],
        ["Myanmar (Burma) (မြန်မာ)", "mm", "./assets/img/flags/mm.svg", "95"],
        ["Namibia (Namibië)", "na", "./assets/img/flags/na.svg", "264"],
        ["Nauru", "nr", "./assets/img/flags/nr.svg", "674"],
        ["Nepal (नेपाल)", "np", "./assets/img/flags/np.svg", "977"],
        ["Netherlands (Nederland)", "nl", "./assets/img/flags/nl.svg", "31"],
        [
            "New Caledonia (Nouvelle-Calédonie)",
            "nc",
            "./assets/img/flags/nc.svg",
            "687",
        ],
        ["New Zealand", "nz", "./assets/img/flags/nz.svg", "64"],
        ["Nicaragua", "ni", "./assets/img/flags/ni.svg", "505"],
        ["Niger (Nijar)", "ne", "./assets/img/flags/ne.svg", "227"],
        ["Nigeria", "ng", "./assets/img/flags/ng.svg", "234"],
        ["Niue", "nu", "./assets/img/flags/nu.svg", "683"],
        ["Norfolk Island", "nf", "./assets/img/flags/nf.svg", "672"],
        [
            "North Korea (조선 민주주의 인민 공화국)",
            "kp",
            "./assets/img/flags/kp.svg",
            "850",
        ],
        [
            "North Macedonia (Северна Македонија)",
            "mk",
            "./assets/img/flags/mk.svg",
            "389",
        ],
        [
            "Northern Mariana Islands",
            "mp",
            "./assets/img/flags/mp.svg",
            "1",
            17,
            ["670"],
        ],
        ["Norway (Norge)", "no", "./assets/img/flags/no.svg", "47", 0],
        ["Oman (عُمان)", "om", "./assets/img/flags/om.svg", "968"],
        ["Pakistan (پاکستان)", "pk", "./assets/img/flags/pk.svg", "92"],
        ["Palau", "pw", "./assets/img/flags/pw.svg", "680"],
        ["Palestine (فلسطين)", "ps", "./assets/img/flags/ps.svg", "970"],
        ["Panama (Panamá)", "pa", "./assets/img/flags/pa.svg", "507"],
        ["Papua New Guinea", "pg", "./assets/img/flags/pg.svg", "675"],
        ["Paraguay", "py", "./assets/img/flags/py.svg", "595"],
        ["Peru (Perú)", "pe", "./assets/img/flags/pe.svg", "51"],
        ["Philippines", "ph", "./assets/img/flags/ph.svg", "63"],
        ["Poland (Polska)", "pl", "./assets/img/flags/pl.svg", "48"],
        ["Portugal", "pt", "./assets/img/flags/pt.svg", "351"],
        [
            "Puerto Rico",
            "pr",
            "./assets/img/flags/pr.svg",
            "1",
            3,
            ["787", "939"],
        ],
        ["Qatar (قطر)", "qa", "./assets/img/flags/qa.svg", "974"],
        ["Réunion (La Réunion)", "re", "./assets/img/flags/re.svg", "262", 0],
        ["Romania (România)", "ro", "./assets/img/flags/ro.svg", "40"],
        ["Russia (Россия)", "ru", "./assets/img/flags/ru.svg", "7", 0],
        ["Rwanda", "rw", "./assets/img/flags/rw.svg", "250"],
        ["Saint Barthélemy", "bl", "./assets/img/flags/bl.svg", "590", 1],
        ["Saint Helena", "sh", "./assets/img/flags/sh.svg", "290"],
        [
            "Saint Kitts and Nevis",
            "kn",
            "./assets/img/flags/kn.svg",
            "1",
            18,
            ["869"],
        ],
        ["Saint Lucia", "lc", "./assets/img/flags/lc.svg", "1", 19, ["758"]],
        [
            "Saint Martin (Saint-Martin (partie française))",
            "mf",
            "./assets/img/flags/mf.svg",
            "590",
            2,
        ],
        [
            "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
            "pm",
            "./assets/img/flags/pm.svg",
            "508",
        ],
        [
            "Saint Vincent and the Grenadines",
            "vc",
            "./assets/img/flags/vc.svg",
            "1",
            20,
            ["784"],
        ],
        ["Samoa", "ws", "./assets/img/flags/ws.svg", "685"],
        ["San Marino", "sm", "./assets/img/flags/sm.svg", "378"],
        [
            "São Tomé and Príncipe (São Tomé e Príncipe)",
            "st",
            "./assets/img/flags/st.svg",
            "239",
        ],
        [
            "Saudi Arabia (المملكة العربية السعودية)",
            "sa",
            "./assets/img/flags/sa.svg",
            "966",
        ],
        ["Senegal (Sénégal)", "sn", "./assets/img/flags/sn.svg", "221"],
        ["Serbia (Србија)", "rs", "./assets/img/flags/rs.svg", "381"],
        ["Seychelles", "sc", "./assets/img/flags/sc.svg", "248"],
        ["Sierra Leone", "sl", "./assets/img/flags/sl.svg", "232"],
        ["Singapore", "sg", "./assets/img/flags/sg.svg", "65"],
        ["Sint Maarten", "sx", "./assets/img/flags/sx.svg", "1", 21, ["721"]],
        ["Slovakia (Slovensko)", "sk", "./assets/img/flags/sk.svg", "421"],
        ["Slovenia (Slovenija)", "si", "./assets/img/flags/si.svg", "386"],
        ["Solomon Islands", "sb", "./assets/img/flags/sb.svg", "677"],
        ["Somalia (Soomaaliya)", "so", "./assets/img/flags/so.svg", "252"],
        ["South Africa", "za", "./assets/img/flags/za.svg", "27"],
        ["South Korea (대한민국)", "kr", "./assets/img/flags/kr.svg", "82"],
        [
            "South Sudan (جنوب السودان)",
            "ss",
            "./assets/img/flags/ss.svg",
            "211",
        ],
        ["Spain (España)", "es", "./assets/img/flags/es.svg", "34"],
        ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "./assets/img/flags/lk.svg", "94"],
        ["Sudan (السودان)", "sd", "./assets/img/flags/sd.svg", "249"],
        ["Suriname", "sr", "./assets/img/flags/sr.svg", "597"],
        [
            "Svalbard and Jan Mayen",
            "sj",
            "./assets/img/flags/sj.svg",
            "47",
            1,
            ["79"],
        ],
        ["Sweden (Sverige)", "se", "./assets/img/flags/se.svg", "46"],
        ["Switzerland (Schweiz)", "ch", "./assets/img/flags/ch.svg", "41"],
        ["Syria (سوريا)", "sy", "./assets/img/flags/sy.svg", "963"],
        ["Taiwan (台灣)", "tw", "./assets/img/flags/tw.svg", "886"],
        ["Tajikistan", "tj", "./assets/img/flags/tj.svg", "992"],
        ["Tanzania", "tz", "./assets/img/flags/tz.svg", "255"],
        ["Thailand (ไทย)", "th", "./assets/img/flags/th.svg", "66"],
        ["Timor-Leste", "tl", "./assets/img/flags/tl.svg", "670"],
        ["Togo", "tg", "./assets/img/flags/tg.svg", "228"],
        ["Tokelau", "tk", "./assets/img/flags/tk.svg", "690"],
        ["Tonga", "to", "./assets/img/flags/to.svg", "676"],
        [
            "Trinidad and Tobago",
            "tt",
            "./assets/img/flags/tt.svg",
            "1",
            22,
            ["868"],
        ],
        ["Tunisia (تونس)", "tn", "./assets/img/flags/tn.svg", "216"],
        ["Turkey (Türkiye)", "tr", "./assets/img/flags/tr.svg", "90"],
        ["Turkmenistan", "tm", "./assets/img/flags/tm.svg", "993"],
        [
            "Turks and Caicos Islands",
            "tc",
            "./assets/img/flags/tc.svg",
            "1",
            23,
            ["649"],
        ],
        ["Tuvalu", "tv", "./assets/img/flags/tv.svg", "688"],
        [
            "U.S. Virgin Islands",
            "vi",
            "./assets/img/flags/vi.svg",
            "1",
            24,
            ["340"],
        ],
        ["Uganda", "ug", "./assets/img/flags/ug.svg", "256"],
        ["Ukraine (Україна)", "ua", "./assets/img/flags/ua.svg", "380"],
        [
            "United Arab Emirates (الإمارات العربية المتحدة)",
            "ae",
            "./assets/img/flags/ae.svg",
            "971",
        ],
        ["United Kingdom", "gb", "./assets/img/flags/gb.svg", "44", 0],
        ["United States", "us", "./assets/img/flags/us.svg", "1", 0],
        ["Uruguay", "uy", "./assets/img/flags/uy.svg", "598"],
        ["Uzbekistan (Oʻzbekiston)", "uz", "./assets/img/flags/uz.svg", "998"],
        ["Vanuatu", "vu", "./assets/img/flags/vu.svg", "678"],
        [
            "Vatican City (Città del Vaticano)",
            "va",
            "./assets/img/flags/va.svg",
            "39",
            1,
            ["06698"],
        ],
        ["Venezuela", "ve", "./assets/img/flags/ve.svg", "58"],
        ["Vietnam (Việt Nam)", "vn", "./assets/img/flags/vn.svg", "84"],
        [
            "Wallis and Futuna (Wallis-et-Futuna)",
            "wf",
            "./assets/img/flags/wf.svg",
            "681",
        ],
        [
            "Western Sahara (الصحراء الغربية)",
            "eh",
            "./assets/img/flags/eh.svg",
            "212",
            1,
            ["5288", "5289"],
        ],
        ["Yemen (اليمن)", "ye", "./assets/img/flags/ye.svg", "967"],
        ["Zambia", "zm", "./assets/img/flags/zm.svg", "260"],
        ["Zimbabwe", "zw", "./assets/img/flags/zw.svg", "263"],
        ["Åland Islands", "ax", "./assets/img/flags/ax.svg", "358", 1, ["18"]],
    ];
    for (let i = 0; i < allCountries.length; i++) {
        let c = allCountries[i];
        allCountries[i] = {
            name: c[0],
            iso2: c[1],
            flag: c[2],
            dialCode: c[3],
            priority: c[4] || 0,
            areaCodes: c[5] || null,
        };
    }
    const countryCodeSelect = document.getElementById("countryCode");
    if (countryCodeSelect) {
        let selectOptions;
        allCountries.forEach((country) => {
            if (country.iso2 === "us") {
                selectOptions = `<option value="${
                    country.name + ": +" + country.dialCode
                }" data-country_flag="${country.flag}" data-dial_code="${
                    country.dialCode
                }" data-country_code="${country.iso2}" data-country_name="${
                    country.name
                }">${"+" + country.dialCode}</option>`;
            }
        });
        for (let i = 0; i < allCountries.length; i++) {
            if (allCountries[i].iso2 !== "us") {
                selectOptions += `<option value="${
                    allCountries[i].name + ": +" + allCountries[i].dialCode
                }" data-country_flag="${
                    allCountries[i].flag
                }" data-dial_code="${
                    allCountries[i].dialCode
                }" data-country_code="${
                    allCountries[i].iso2
                }" data-country_name="${allCountries[i].name}">${
                    "+" + allCountries[i].dialCode
                }</option>`;
            }
        }
        countryCodeSelect.innerHTML = selectOptions;
    }
    */
    customizeSelects("select");
    //==============================================================================================================================================
    function customizeSelects(selectClass) {
        const selects = document.querySelectorAll(selectClass);

        for (let i = 0; i < selects.length; i++) {
            const select = selects[i];

            const options = select.querySelectorAll("option");

            const cSelect = document.createElement("div");
            const cSelectList = document.createElement("div");
            const cSelectCurrent = document.createElement("div");

            cSelect.className = "custom-select";
            cSelectList.className = "custom-select__list custom-scrollbar";
            cSelectCurrent.className = "custom-select__current";
            cSelectCurrent.setAttribute("tabindex", "0");

            cSelect.append(cSelectCurrent, cSelectList);

            select.after(cSelect);

            const createCustomDom = (x, y) => {
                let selectItems = "";
                for (let i = 0; i < options.length; i++) {
                    if (options[i].dataset.country_flag) {
                        selectItems += `<div class="custom-select__item" data-value="${options[i].value}" data-country_flag_url="${options[i].dataset.country_flag}" style="--img-url: url('${options[i].dataset.country_flag}')" data-dial_code="${options[i].dataset.dial_code}" data-country_code="${options[i].dataset.country_code}"><span>${options[i].dataset.country_name}</span><span class="points">${options[i].text}</span></div>`;
                    } else {
                        selectItems += `<div class="custom-select__item" data-value="${options[i].value}"><span class="points">${options[i].text}</span></div>`;
                    }
                }
                cSelectList.innerHTML = selectItems;
                x(), y();
            };

            const currentTextValue = () => {
                if (cSelectList.children[0].dataset.country_flag_url) {
                    cSelectCurrent.style = `--img-url: url('${cSelectList.children[0].dataset.country_flag_url}')`;
                    cSelectCurrent.dataset.value =
                        cSelectList.children[0].dataset.value;
                    cSelectCurrent.textContent =
                        "+" + cSelectList.children[0].dataset.dial_code;
                } else {
                    cSelectCurrent.innerHTML = `<span class="points">${cSelectList.children[0].textContent}</span>`;
                }
            };

            const currentValue = () => {
                const items = cSelectList.children;
                for (let el = 0; el < items.length; el++) {
                    let selectValue, selectText;
                    if (items[el].dataset.country_flag_url) {
                        selectValue = items[el].getAttribute("data-value");
                        selectText = "+" + items[el].dataset.dial_code;
                    } else {
                        selectValue = items[el].getAttribute("data-value");
                        selectText = `<span class="points">${items[el].textContent}</span>`;
                    }
                    if (
                        items[el].dataset.value === cSelectCurrent.dataset.value
                    ) {
                        items[el].classList.add("active");
                    } else if (
                        items[el].textContent === cSelectCurrent.textContent
                    ) {
                        items[el].classList.add("active");
                    }
                    items[el].addEventListener("click", () => {
                        cSelect.classList.remove("custom-select--show");
                        if (items[el].dataset.country_flag_url) {
                            cSelectCurrent.style = `--img-url: url('${items[el].dataset.country_flag_url}')`;
                            cSelectCurrent.dataset.value =
                                items[el].dataset.value;
                        }
                        cSelectCurrent.innerHTML = selectText;
                        select.value = selectValue;
                        for (let o = 0; o < items.length; o++) {
                            if (
                                items[o].dataset.value ===
                                cSelectCurrent.dataset.value
                            ) {
                                for (let j = 0; j < items.length; j++) {
                                    items[j].classList.remove("active");
                                    items[j].classList.remove("focus");
                                }
                                items[o].classList.add("active");
                            } else if (
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
                    for (let el = 0; el < items.length; el++) {
                        items[el].classList.remove("focus");
                    }
                }
            });

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
    // form fields
    const nameInput = document.querySelector("#customerName");
    const emailInput = document.querySelector("#customerEmail");
    const phoneInput = document.querySelector("#phone");

    // form fields validate
    function formAddError(input) {
        input.parentElement.classList.add("error");
        input.classList.add("error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("error");
        input.classList.remove("error");
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
            input.value
        );
    }
    if (nameInput) {
        nameInput.addEventListener("input", function () {
            if (nameInput.value.match(/[\d=+?/\\|*!$#@%^&()_~",<>\[\]{};:]/g)) {
                nameInput.value = nameInput.value.replace(
                    /[\d=+?/\\|*!$#@%^&()_~",<>\[\]{};:]/g,
                    ""
                );
            }
            if (nameInput.value.match(/^[\s]/g)) {
                nameInput.value = nameInput.value.replace(/^[\s]/g, "");
            }
        });
        nameInput.addEventListener("blur", () => {
            if (nameInput.value.length > 0) {
                if (nameInput.value.replace(/[\s]/g, "").length < 2) {
                    formAddError(nameInput);
                } else if (nameInput.value.replace(/[\s]/g, "").length >= 2) {
                    formRemoveError(nameInput);
                }
                nameInput.value = nameInput.value.replace(/\s{2,1000}/g, " ");
            }
        });
    }
    if (emailInput) {
        emailInput.addEventListener("blur", () => {
            if (emailInput.value.length > 0) {
                if (emailTest(emailInput)) {
                    formAddError(emailInput);
                } else if (emailInput.value.length >= 6) {
                    formRemoveError(emailInput);
                }
            }
        });
    }
    for (let i = 0; i < forms.length; i++) {
        formBtns[i].addEventListener("click", function (e) {
            e.preventDefault();
            let error = formValidate(forms[i]);

            if (error === 0) {
                formSend(forms[i]);
            }
        });
    }
    function formValidate(form) {
        const inputs = form.querySelectorAll("input");
        let error = 0;
        inputs.forEach((input) => {
            if (input.value.length < 1) {
                formAddError(input);
                error++;
            } else if (input.classList.contains("error")) {
                formAddError(input);
                error++;
            }
        });

        return error;
        //==============================================================================================================================================
    }
    function serialize(form) {
        let items = form.querySelectorAll("select, input, textarea");
        let SelectedDialCode = form.querySelector(".iti__selected-dial-code");
        let str = "";
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let name = item.name;
            let value = item.value;
            let separator = i === 0 ? "" : "&";
            if (value) {
                if (name === "Customer_phone") {
                    value = SelectedDialCode.textContent + " " + value;
                }
                str += separator + name + "=" + value;
            }
        }
        return str;
    }
    function formSend(form) {
        let data = serialize(form);
        //==============================================================================================================================================

        console.log(data);

        //==============================================================================================================================================
        form.reset();
        //==============================================================================================================================================

        let btn = form.querySelector(".btn");
        const startText = btn.textContent;
        btn.textContent = "Thank You";
        setTimeout(function () {
            btn.textContent = startText;
        }, 2000);

        //==============================================================================================================================================
    }
}
