// admin-common.js
(function () {
  const themeValues = ["light", "dark", "auto"];

  function isValidTheme(theme) {
    return themeValues.includes(theme);
  }

  function getStoredTheme() {
    return localStorage.getItem("theme");
  }

  function getPreferredAdminTheme() {
    const storedTheme = getStoredTheme();
    return isValidTheme(storedTheme) ? storedTheme : "auto";
  }

  function getActualTheme(theme) {
    if (theme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return theme;
  }

  function applyAdminTheme(theme) {
    const selectedTheme = isValidTheme(theme) ? theme : "auto";
    document.documentElement.setAttribute(
      "data-bs-theme",
      getActualTheme(selectedTheme),
    );
    return selectedTheme;
  }

  function getThemeToggleMarkup() {
    return `
      <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button
          class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme (auto)"
        >
          <svg class="bi my-1 theme-icon-active" aria-hidden="true">
            <use href="#circle-half"></use>
          </svg>
          <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
          <li>
            <button
              type="button"
              class="dropdown-item d-flex align-items-center"
              data-bs-theme-value="light"
              aria-pressed="false"
            >
              <svg class="bi me-2 opacity-50" aria-hidden="true">
                <use href="#sun-fill"></use>
              </svg>
              Light
              <svg class="bi ms-auto d-none" aria-hidden="true">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dropdown-item d-flex align-items-center"
              data-bs-theme-value="dark"
              aria-pressed="false"
            >
              <svg class="bi me-2 opacity-50" aria-hidden="true">
                <use href="#moon-stars-fill"></use>
              </svg>
              Dark
              <svg class="bi ms-auto d-none" aria-hidden="true">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dropdown-item d-flex align-items-center"
              data-bs-theme-value="auto"
              aria-pressed="false"
            >
              <svg class="bi me-2 opacity-50" aria-hidden="true">
                <use href="#circle-half"></use>
              </svg>
              Auto
              <svg class="bi ms-auto d-none" aria-hidden="true">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    `;
  }

  function hasCompleteThemeToggle(toggle) {
    if (!toggle || !document.getElementById("bd-theme-text")) return false;

    return themeValues.every((theme) => {
      const button = toggle.querySelector(`[data-bs-theme-value="${theme}"]`);
      return Boolean(button && button.querySelector("svg use"));
    });
  }

  function ensureAdminThemeToggle() {
    const existingToggle = document.querySelector(".bd-mode-toggle");

    if (!existingToggle) {
      document.body.insertAdjacentHTML("beforeend", getThemeToggleMarkup());
      return;
    }

    if (!hasCompleteThemeToggle(existingToggle)) {
      existingToggle.outerHTML = getThemeToggleMarkup();
    }
  }

  function updateAdminThemeUI(theme) {
    const selectedTheme = isValidTheme(theme) ? theme : "auto";
    const themeSwitcher = document.getElementById("bd-theme");
    const themeSwitcherText = document.getElementById("bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const activeButton = document.querySelector(
      `[data-bs-theme-value="${selectedTheme}"]`,
    );

    document.querySelectorAll("[data-bs-theme-value]").forEach((button) => {
      const isActive =
        button.getAttribute("data-bs-theme-value") === selectedTheme;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    const activeButtonIcon = activeButton
      ? activeButton.querySelector("svg use")
      : null;

    if (activeThemeIcon && activeButtonIcon) {
      const iconHref =
        activeButtonIcon.getAttribute("href") ||
        activeButtonIcon.getAttribute("xlink:href");

      if (iconHref) {
        activeThemeIcon.setAttribute("href", iconHref);
      }
    }

    if (themeSwitcher && themeSwitcherText) {
      themeSwitcher.setAttribute(
        "aria-label",
        `${themeSwitcherText.textContent} (${selectedTheme})`,
      );
    }
  }

  function setupAdminTheme() {
    ensureAdminThemeToggle();

    const currentTheme = applyAdminTheme(getPreferredAdminTheme());
    updateAdminThemeUI(currentTheme);

    document.querySelectorAll("[data-bs-theme-value]").forEach((button) => {
      if (button.dataset.adminThemeBound === "true") return;

      button.dataset.adminThemeBound = "true";
      button.addEventListener("click", () => {
        const selectedTheme = applyAdminTheme(
          button.getAttribute("data-bs-theme-value"),
        );

        localStorage.setItem("theme", selectedTheme);
        updateAdminThemeUI(selectedTheme);

        const themeSwitcher = document.getElementById("bd-theme");
        if (themeSwitcher) themeSwitcher.focus();
      });
    });
  }

  async function loadComponent(id, file) {
    const target = document.getElementById(id);
    if (!target) return null;

    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      target.innerHTML = await response.text();
      return target;
    } catch (error) {
      console.error(`Error loading ${file}`, error);
      return null;
    }
  }

  function updateDisplayName() {
    const fullName = sessionStorage.getItem("userFullName");
    const targetElement = document.getElementById("displayUsername");

    if (fullName && targetElement) {
      targetElement.textContent = fullName;
      return true;
    }

    return false;
  }

  function updateActiveNav() {
    const currentPage =
      window.location.pathname.split("/").pop() || "adminpage.html";
    const navLinks = document.querySelectorAll("#navbar-placeholder .nav-link");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const hrefPage = href.split("#")[0].split("?")[0];
      const isActive = hrefPage === currentPage;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /**
   * ตรวจสอบและโหลด config.js หากยังไม่ได้ถูกโหลดในหน้า HTML
   */
  async function ensureConfigLoaded() {
    if (typeof scriptURL !== 'undefined' || typeof API_URL !== 'undefined') return;

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "../js/config.js";
      script.onload = () => resolve();
      script.onerror = () => {
        console.warn(
          "admin-common: ไม่พบไฟล์ config.js ที่ตำแหน่ง ../js/config.js",
        );
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  async function loadAdminShell() {
    await ensureConfigLoaded();

    const navbarPlaceholder = document.getElementById("navbar-placeholder");

    await Promise.all([
      loadComponent("icons-placeholder", "admin-icons.html"),
      loadComponent("header-placeholder", "admin-header.html"),
      // โหลด Navbar และเรียกใช้ logic ต่อเมื่อโหลดเสร็จ
      loadComponent("navbar-placeholder", "admin-navbar.html"),
    ]);

    // ✅ เรียก updateActiveNav ทันทีหลัง navbar โหลดเสร็จ (ก่อน setTimeout)
    updateDisplayName();
    updateActiveNav();

    setupAdminTheme();
  }

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const syncAutoTheme = () => {
    if (getPreferredAdminTheme() === "auto") {
      applyAdminTheme("auto");
      updateAdminThemeUI("auto");
    }
  };

  if (typeof darkModeMediaQuery.addEventListener === "function") {
    darkModeMediaQuery.addEventListener("change", syncAutoTheme);
  } else if (typeof darkModeMediaQuery.addListener === "function") {
    darkModeMediaQuery.addListener(syncAutoTheme);
  }

  window.loadComponent = loadComponent;
  window.loadAdminShell = loadAdminShell;
  window.setupAdminTheme = setupAdminTheme;
  window.updateAdminThemeUI = updateAdminThemeUI;
  window.applyAdminTheme = applyAdminTheme;
  window.updateDisplayName = updateDisplayName;
  window.updateActiveNav = updateActiveNav;
})();
