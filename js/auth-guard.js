const Auth = {
    publicPages: ['index.html', 'login.html', 'Login.html'],
    adminOnlyPages: ['regularClass.html'],
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

        const isAdminOnly = this.adminOnlyPages.some(
            page => currentPage.toLowerCase() === page.toLowerCase()
        );
        if (isAdminOnly && userData) {
            const user = JSON.parse(userData);
            if (user.role !== 'manager') {
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
