const Auth = {
    publicPages: ['index.html', 'login.html', 'Login.html'],
    managerOnlyPages: ['regularClass.html', 'RegularClass.html'],

    checkAccess: function() {
        const userData = localStorage.getItem('userData');
        const path = window.location.pathname;
        const currentPage = path.split("/").pop() || 'index.html';

        // ตรวจว่าเป็นหน้า public ไหม (case-insensitive)
        const isPublic = this.publicPages.some(
            page => currentPage.toLowerCase() === page.toLowerCase()
        );

        // ยังไม่ login และไม่ใช่หน้า public → ไป login
        if (!userData && !isPublic) {
            window.location.replace('Login.html?message=please_login');
            return;
        }

        // login แล้วแต่เข้าหน้า public → ไป Home
        if (userData && isPublic) {
            window.location.replace('Home.html');
            return;
        }

        // ตรวจว่าเป็นหน้า manager-only ไหม (case-insensitive)
        const isManagerOnly = this.managerOnlyPages.some(
            page => currentPage.toLowerCase() === page.toLowerCase()
        );

        if (isManagerOnly && userData) {
            let user;
            try {
                user = JSON.parse(userData);
            } catch (e) {
                // userData เสีย → บังคับ logout
                localStorage.removeItem('userData');
                window.location.replace('Login.html?message=please_login');
                return;
            }

            // role ไม่ใช่ manager → กลับ Home พร้อม message
            if ((user.role || '').toLowerCase() !== 'manager') {
                window.location.replace('Home.html?message=no_permission');
                return;
            }
        }

        // แสดง body หลังผ่านการตรวจสอบแล้ว
        function showBody() {
            document.body.style.visibility = 'visible';
        }
        if (document.body) {
            showBody();
        } else {
            document.addEventListener('DOMContentLoaded', showBody);
        }

        // ป้องกัน back button หลัง login
        if (userData && !isPublic) {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function() {
                window.history.pushState(null, null, window.location.href);
            };
        }
    }
};

Auth.checkAccess();
