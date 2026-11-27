/* =========================================================
   Cerrajería El Prado · interacciones
   Sin dependencias. Respeta prefers-reduced-motion.
   ========================================================= */

(() => {
  const doc = document;
  const body = doc.body;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  requestAnimationFrame(() => body.classList.add("is-loaded"));

  window.addEventListener("pageshow", () => {
    body.classList.remove("is-leaving");
    body.classList.add("is-loaded");
  });

  /* ---------- Año ---------- */
  doc.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Header + progreso ---------- */
  const header = doc.querySelector("[data-header]");
  const progress = doc.querySelector("[data-progress]");

  const updateScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      const max = doc.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }
  };

  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);

  /* ---------- Menú móvil ---------- */
  const menu = doc.getElementById("mobile-menu");
  const openBtn = doc.querySelector("[data-menu-open]");
  const closeBtn = doc.querySelector("[data-menu-close]");
  const inertTargets = doc.querySelectorAll("main, .site-footer, .fab");
  let lastFocus = null;
  let closeTimer = 0;
  let menuIsOpen = false;

  const menuFocusables = () => {
    if (!menu) return [];
    return Array.from(
      menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
  };

  const revealMenu = () => {
    if (!menu) return;
    if (!menuIsOpen) return;
    menu.classList.add("is-open");
    closeBtn?.focus({ preventScroll: true });
  };

  const openMenu = () => {
    if (!menu || !openBtn) return;
    window.clearTimeout(closeTimer);
    lastFocus = doc.activeElement;
    menuIsOpen = true;
    menu.hidden = false;
    body.classList.add("menu-open");
    openBtn.setAttribute("aria-expanded", "true");
    inertTargets.forEach((el) => {
      el.inert = true;
    });
    requestAnimationFrame(revealMenu);
    window.setTimeout(revealMenu, 90);
  };

  const closeMenu = () => {
    if (!menu || !openBtn) return;
    menuIsOpen = false;
    menu.classList.remove("is-open");
    body.classList.remove("menu-open");
    openBtn.setAttribute("aria-expanded", "false");
    inertTargets.forEach((el) => {
      el.inert = false;
    });
    closeTimer = window.setTimeout(() => {
      if (!menuIsOpen) menu.hidden = true;
    }, reduced ? 0 : 520);
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  };

  openBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  doc.addEventListener("keydown", (event) => {
    if (!menu || menu.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const items = menuFocusables();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && doc.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* ---------- Revelado al hacer scroll ---------- */
  const revealItems = Array.from(doc.querySelectorAll("[data-reveal]"));

  if (reduced || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  /* ---------- FAQ: una abierta a la vez ---------- */
  const faqItems = Array.from(doc.querySelectorAll(".faq-item"));
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Botones magnéticos ---------- */
  if (finePointer && !reduced) {
    doc.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = Number(el.dataset.magnetic) || 5;

      el.addEventListener("pointermove", (event) => {
        const rect = el.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength * 2;
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      });

      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Inclinación sutil del esquema ---------- */
  if (finePointer && !reduced) {
    doc.querySelectorAll("[data-tilt]").forEach((el) => {
      const max = Number(el.dataset.tilt) || 3;

      el.addEventListener("pointermove", (event) => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
      });

      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Formulario → WhatsApp ---------- */
  const form = doc.getElementById("wa-form");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const servicio = String(data.get("servicio") || "").trim();
    const ubicacion = String(data.get("ubicacion") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();
    const status = doc.getElementById("form-status");

    const lines = [
      `Hola Cerrajería El Prado, soy ${nombre}.`,
      `Quiero consultar por ${servicio}.`,
      ubicacion ? `Ubicación: ${ubicacion}.` : "",
      mensaje ? `Detalle: ${mensaje}` : "",
      "¿Me confirman disponibilidad y precio?",
    ].filter(Boolean);

    const url = `https://wa.me/50498192313?text=${encodeURIComponent(lines.join("\n"))}`;

    if (status) status.textContent = "Abriendo WhatsApp con tu mensaje…";
    const opened = window.open(url, "_blank");
    if (opened) {
      opened.opener = null;
    } else {
      window.location.href = url;
    }
  });

  /* ---------- Transición entre páginas ---------- */
  if (!reduced) {
    doc.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!href.includes(".html")) return;

      const destination = new URL(link.href, window.location.href);

      if (destination.pathname === window.location.pathname && destination.hash) {
        const target = doc.getElementById(decodeURIComponent(destination.hash.slice(1)));
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          window.history.pushState(null, "", destination.hash);
          return;
        }
      }

      event.preventDefault();
      body.classList.add("is-leaving");
      window.setTimeout(() => {
        window.location.href = href;
      }, 160);
    });
  }
})();
