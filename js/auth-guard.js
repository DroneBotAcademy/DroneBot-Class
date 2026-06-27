const Auth = {
    publicPages: ['index.html', 'login.html', 'Login.html'],
    managerOnlyPages: ['class-regular.html'],

    checkAccess: function() {
        const userData = localStorage.getItem('userData');
        const path = window.location.pathname;
        const currentPage = path.split("/").pop() || 'index.html';

        const isPublic = this.publicPages.some(
            page => currentPage.toLowerCase() === page.toLowerCase()
        );

        if (!userData && !isPublic) {
            window.location.replace('Login.html?message=please_login');
            return;
        }

        if (userData && isPublic) {
            window.location.replace('Home.html');
            return;
        }

        const isManagerOnly = this.managerOnlyPages.some(
            page => currentPage.toLowerCase() === page.toLowerCase()
        );

        if (isManagerOnly && userData) {
            let user;
            try {
                user = JSON.parse(userData);
            } catch (e) {
                localStorage.removeItem('userData');
                window.location.replace('Login.html?message=please_login');
                return;
            }

            if ((user.role || '').toLowerCase() !== 'manager') {
                window.location.replace('Home.html?message=no_permission');
                return;
            }
        }

        function showBody() {
            document.body.style.visibility = 'visible';
        }
        if (document.body) {
            showBody();
        } else {
            document.addEventListener('DOMContentLoaded', showBody);
        }

        if (userData && !isPublic) {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function() {
                window.history.pushState(null, null, window.location.href);
            };
        }
    }
};

Auth.checkAccess();
