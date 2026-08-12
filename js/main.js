(() => {
    // ---- Nav ativa conforme scroll ----
    const links = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section[id]");

    const setActiveLink = () => {
        let current = "";
        const scrollPos = window.scrollY + 130;
        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                current = sec.id;
            }
        });
        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    };
    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();

    // ---- Menu hambúrguer (mobile) ----
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            burger.classList.remove("open");
            nav.classList.remove("open");
        });
    });

    // ---- Fade-in ao rolar ----
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".fade").forEach(el => observer.observe(el));

    // ---- FAQ (acordeão) ----
    document.querySelectorAll(".faq-item").forEach(item => {
        item.querySelector(".faq-question").addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });

    // ---- Voltar ao topo ----
    const toTop = document.getElementById("to-top");
    window.addEventListener("scroll", () => {
        toTop.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();
