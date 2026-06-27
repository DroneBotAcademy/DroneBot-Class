(function () {
  const classPages    = ["class.html", "class-course.html", "class-regular.html"];
  const schedulePages = ["schedule-hdy.html", "schedule-bkk.html"];
  const studentPages  = ["student-bkk.html", "student-hdy.html"];

  function getCurrentPage() {
    return (window.location.pathname.split("/").pop() || "Home.html").toLowerCase();
  }

  function getUserRole() {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      return (userData?.role || "").toLowerCase();
    } catch (e) {
      return "";
    }
  }

  function getLinkClasses(isActive) {
    const base = "flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 font-medium";
    return isActive
      ? `${base} bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg shadow-red-200`
      : `${base} text-gray-500 hover:bg-red-50 hover:text-red-600`;
  }

  function getSubLinkClasses(isActive) {
    const base = "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all";
    return isActive
      ? `${base} bg-red-50 text-red-600`
      : `${base} text-gray-400 hover:bg-gray-50 hover:text-red-600`;
  }

  function updateMainNavbarUser() {
    const userData     = JSON.parse(localStorage.getItem("userData") || "null");
    const avatar       = document.getElementById("sidebarAvatar");
    const name         = document.getElementById("sidebarName");
    const role         = document.getElementById("sidebarRole");
    const mobileAvatar = document.getElementById("mobileAvatar");
    const adminBtn     = document.getElementById("adminPanelBtn");

    if (!avatar || !name || !role) return;

    if (userData) {
      name.textContent = userData.user || "User";
      role.textContent = userData.role || "User";
      const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.user || "User")}&background=fef2f2&color=e63946&bold=true`;
      avatar.src = avatarURL;
      if (mobileAvatar) mobileAvatar.src = avatarURL;
      if (adminBtn) {
        const isAdmin = (userData.role || "").toLowerCase() === "admin";
        adminBtn.classList.toggle("hidden", !isAdmin);
      }
      return;
    }

    name.textContent = "Guest";
    role.textContent = "User";
    avatar.src = "https://ui-avatars.com/api/?name=Guest&background=fef2f2&color=e63946&bold=true";
    if (mobileAvatar) mobileAvatar.src = avatar.src;
    if (adminBtn) adminBtn.classList.add("hidden");
  }

  function renderMainNavbar() {
    const target = document.getElementById("main-navbar");
    if (!target) return;

    const currentPage       = getCurrentPage();
    const role              = getUserRole();
    const isManager         = role === "manager";

    const classActive       = classPages.includes(currentPage);
    const courseActive      = currentPage === "class-course.html" || currentPage === "class.html";
    const regularActive     = currentPage === "class-regular.html";
    const scheduleActive    = schedulePages.includes(currentPage);
    const scheduleHdyActive = currentPage === "schedule-hdy.html";
    const scheduleBkkActive = currentPage === "schedule-bkk.html";
    const studentActive     = studentPages.includes(currentPage);
    const bkkActive         = currentPage === "student-bkk.html";
    const hdyActive         = currentPage === "student-hdy.html";

    // Regular Class link — แสดงเฉพาะ manager เท่านั้น
    const regularClassLink = isManager ? `
        <li>
          <a href="Class-regular.html" class="${getSubLinkClasses(regularActive)}">
            <i class="fas fa-users w-4 text-center"></i>
            <span>Regular Class</span>
          </a>
        </li>` : '';

    target.innerHTML = `

<!-- MOBILE TOP BAR -->
<div class="md:hidden flex items-center justify-between px-4 py-3
  bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md">
      <i class="fas fa-robot text-white text-sm"></i>
    </div>
    <div>
      <h1 class="font-black text-sm leading-tight text-gray-900">DroneBot Class</h1>
      <p class="text-[10px] text-gray-400 leading-tight">Management</p>
    </div>
  </div>
  <div class="flex items-center gap-3">
    <img id="mobileAvatar" class="w-9 h-9 rounded-full border-2 border-red-200 shadow-sm">
    <button onclick="toggleSidebar()"
      class="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-red-500 hover:text-white transition-all">
      <i class="fas fa-bars text-lg"></i>
    </button>
  </div>
</div>

<!-- OVERLAY -->
<div id="sidebarOverlay" onclick="toggleSidebar()"
  class="fixed inset-0 bg-black/40 z-40 hidden md:hidden"></div>

<!-- SIDEBAR -->
<nav id="sidebar"
  class="bg-white w-72 border-r border-gray-200 p-6 shadow-xl z-50
  fixed md:static top-0 left-0 h-full transform -translate-x-full md:translate-x-0
  transition-transform duration-300 flex flex-col">

  <div class="mb-10 flex justify-center p-4 bg-black rounded-3xl shadow-inner">
    <img src="./image/logo-white.png" class="w-48 object-contain">
  </div>

  <ul class="space-y-3 flex-1 overflow-y-auto">

    <!-- Dashboard -->
    <li>
      <a href="Home.html" class="${getLinkClasses(currentPage === "home.html")}">
        <i class="fas fa-th-large w-5 text-center"></i>
        <span>Dashboard</span>
      </a>
    </li>

    <!-- Schedule (submenu) -->
    <li>
      <button type="button" id="scheduleMenuButton"
        class="${getLinkClasses(scheduleActive)} w-full justify-between">
        <span class="flex items-center gap-3">
          <i class="fas fa-calendar-alt w-5 text-center"></i>
          <span>Schedule</span>
        </span>
        <i class="fas fa-chevron-down text-xs transition-transform duration-200 ${scheduleActive ? "rotate-180" : ""}"
          id="scheduleMenuChevron"></i>
      </button>
      <ul id="scheduleMenu" class="${scheduleActive ? "" : "hidden"} mt-2 space-y-1 pl-4">
        <li>
          <a href="Schedule-bkk.html" class="${getSubLinkClasses(scheduleBkkActive)}">
            <span class="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-600">BKK</span>
            <span>Bangkok</span>
          </a>
        </li>
        <li>
          <a href="Schedule-hdy.html" class="${getSubLinkClasses(scheduleHdyActive)}">
            <span class="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-50 text-red-500">HDY</span>
            <span>Hat Yai</span>
          </a>
        </li>
      </ul>
    </li>

    <!-- Students (submenu) -->
    <li>
      <button type="button" id="studentMenuButton"
        class="${getLinkClasses(studentActive)} w-full justify-between">
        <span class="flex items-center gap-3">
          <i class="fas fa-user-graduate w-5 text-center"></i>
          <span>Students</span>
        </span>
        <i class="fas fa-chevron-down text-xs transition-transform duration-200 ${studentActive ? "rotate-180" : ""}"
          id="studentMenuChevron"></i>
      </button>
      <ul id="studentMenu" class="${studentActive ? "" : "hidden"} mt-2 space-y-1 pl-4">
        <li>
          <a href="Student-bkk.html" class="${getSubLinkClasses(bkkActive)}">
            <span class="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-600">BKK</span>
            <span>Bangkok</span>
          </a>
        </li>
        <li>
          <a href="Student-hdy.html" class="${getSubLinkClasses(hdyActive)}">
            <span class="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-50 text-red-500">HDY</span>
            <span>Hat Yai</span>
          </a>
        </li>
      </ul>
    </li>

    <!-- Class (submenu) -->
    <li>
      <button type="button" id="classMenuButton"
        class="${getLinkClasses(classActive)} w-full justify-between">
        <span class="flex items-center gap-3">
          <i class="fas fa-graduation-cap w-5 text-center"></i>
          <span>Class</span>
        </span>
        <i class="fas fa-chevron-down text-xs transition-transform duration-200 ${classActive ? "rotate-180" : ""}"
          id="classMenuChevron"></i>
      </button>
      <ul id="classMenu" class="${classActive ? "" : "hidden"} mt-2 space-y-1 pl-4">
        <li>
          <a href="Class-course.html" class="${getSubLinkClasses(courseActive)}">
            <i class="fas fa-book-open w-4 text-center"></i>
            <span>Course Class</span>
          </a>
        </li>
        ${regularClassLink}
      </ul>
    </li>

    <!-- Employees -->
    <li>
      <a href="employees.html" class="${getLinkClasses(currentPage === "employees.html")}">
        <i class="fas fa-user-alt w-5 text-center"></i>
        <span>Employees</span>
      </a>
    </li>

  </ul>

  <!-- Bottom: User Info + Buttons -->
  <div class="mt-auto space-y-4 pt-4">
    <div class="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border">
      <img id="sidebarAvatar" class="w-10 h-10 rounded-full">
      <div class="overflow-hidden flex-1">
        <p id="sidebarName" class="text-sm font-bold truncate">Guest</p>
        <p id="sidebarRole" class="text-[10px] text-red-500 font-bold uppercase">User</p>
      </div>
    </div>
    <div id="adminPanelBtn" class="hidden">
      <button onclick="window.location.href='./admin/adminlog.html'"
        class="w-full bg-red-600 text-white py-3 rounded-2xl font-bold">
        Admin Panel
      </button>
    </div>
    <button id="logoutButton"
      class="w-full bg-red-50 text-red-600 py-3 rounded-2xl font-bold">
      Logout
    </button>
  </div>
</nav>
`;

    // ── Schedule submenu toggle ──
    const scheduleMenuButton  = document.getElementById("scheduleMenuButton");
    const scheduleMenu        = document.getElementById("scheduleMenu");
    const scheduleMenuChevron = document.getElementById("scheduleMenuChevron");
    if (scheduleMenuButton && scheduleMenu && scheduleMenuChevron) {
      scheduleMenuButton.addEventListener("click", () => {
        const isOpen = !scheduleMenu.classList.contains("hidden");
        scheduleMenu.classList.toggle("hidden", isOpen);
        scheduleMenuChevron.classList.toggle("rotate-180", !isOpen);
        scheduleMenuButton.setAttribute("aria-expanded", String(!isOpen));
      });
    }

    // ── Students submenu toggle ──
    const studentMenuButton  = document.getElementById("studentMenuButton");
    const studentMenu        = document.getElementById("studentMenu");
    const studentMenuChevron = document.getElementById("studentMenuChevron");
    if (studentMenuButton && studentMenu && studentMenuChevron) {
      studentMenuButton.addEventListener("click", () => {
        const isOpen = !studentMenu.classList.contains("hidden");
        studentMenu.classList.toggle("hidden", isOpen);
        studentMenuChevron.classList.toggle("rotate-180", !isOpen);
        studentMenuButton.setAttribute("aria-expanded", String(!isOpen));
      });
    }

    // ── Class submenu toggle ──
    const classMenuButton  = document.getElementById("classMenuButton");
    const classMenu        = document.getElementById("classMenu");
    const classMenuChevron = document.getElementById("classMenuChevron");
    if (classMenuButton && classMenu && classMenuChevron) {
      classMenuButton.addEventListener("click", () => {
        const isOpen = !classMenu.classList.contains("hidden");
        classMenu.classList.toggle("hidden", isOpen);
        classMenuChevron.classList.toggle("rotate-180", !isOpen);
        classMenuButton.setAttribute("aria-expanded", String(!isOpen));
      });
    }

    // ── Logout ──
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        if (!confirm("Sign out of DroneBot?")) return;
        localStorage.removeItem("userData");
        sessionStorage.clear();
        window.location.replace("Login.html");
      });
    }

    updateMainNavbarUser();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMainNavbar);
  } else {
    renderMainNavbar();
  }

  window.renderMainNavbar     = renderMainNavbar;
  window.updateMainNavbarUser = updateMainNavbarUser;
})();

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
}
