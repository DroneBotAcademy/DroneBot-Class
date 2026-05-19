(function () {
  'use strict'

  function checkAuth() {
    const authStatus = sessionStorage.getItem("isLoggedIn");
    if (authStatus !== "true") {
      // หากไม่ได้ Login ให้ดีดกลับไปหน้า Login ทันที
      window.location.replace("adminlog.html");
    }
  }

  checkAuth();

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) { checkAuth(); }
  });

})();