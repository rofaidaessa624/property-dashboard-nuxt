export default defineNuxtRouteMiddleware((to, from) => {
    // لو رايح على صفحة login، سيبه يفتح عادي
    if (to.path === '/login') {
        return;
    }

    // جرب تجيب التوكن من localStorage
    const token = process.client ? localStorage.getItem('token') : null;

    // لو مش مسجل، رجع على صفحة تسجيل الدخول
    if (!token) {
        return navigateTo('/login');
    }
});