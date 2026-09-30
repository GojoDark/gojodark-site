document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    const navLinks = [...document.querySelectorAll("#nav a")];
    const sections = [...document.querySelectorAll("main section[id]")];
    const toTop = document.getElementById("to-top");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const setMenu = (open) => {
        if (!burger || !nav) return;

        burger.classList.toggle("open", open);
        nav.classList.toggle("open", open);

        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute(
            "aria-label",
            open ? "Fechar menu" : "Abrir menu"
        );
    };

    burger?.addEventListener("click", () => {
        setMenu(!nav.classList.contains("open"));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setMenu(false);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenu(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            setMenu(false);
        }
    });


    /* =====================================================
       ACTIVE NAV SECTION
       ===================================================== */

    const updateActiveSection = () => {
        const marker = window.scrollY + 160;

        let current = sections[0]?.id || "home";

        sections.forEach((section) => {
            if (marker >= section.offsetTop) {
                current = section.id;
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${current}`
            );
        });
    };

    updateActiveSection();

    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const fadeElements = document.querySelectorAll(".fade");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        fadeElements.forEach((element) => {
            element.classList.add("show");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        fadeElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const updateTopButton = () => {
        if (!toTop) return;

        toTop.classList.toggle(
            "show",
            window.scrollY > 650
        );
    };

    updateTopButton();

    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );

    toTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth"
        });
    });


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    document
        .querySelectorAll('a[target="_blank"]')
        .forEach((link) => {
            const rel = new Set(
                (link.getAttribute("rel") || "")
                    .split(/\s+/)
                    .filter(Boolean)
            );

            rel.add("noopener");
            rel.add("noreferrer");

            link.setAttribute(
                "rel",
                [...rel].join(" ")
            );
        });
});