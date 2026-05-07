// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // تأكد من أن الكود يعمل فقط في المتصفح
  if (process.client) {
    // جلب الـ token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // الصفحات العامة التي لا تحتاج مصادقة
    const publicRoutes = ['/login'];
    
    // هل الصفحة الحالية عامة؟
    const isPublicRoute = publicRoutes.includes(to.path);
    
    // إذا لا يوجد token والصفحة غير عامة → اذهب لتسجيل الدخول
    if (!token && !isPublicRoute) {
      console.log('🚫 No token, redirecting to login');
      return navigateTo('/login');
    }
    
    // إذا يوجد token ونحاول الدخول لصفحة login → اذهب للداشبورد
    if (token && to.path === '/login') {
      console.log('✅ Token exists, redirecting to dashboard');
      return navigateTo('/dashboard');
    }
  }
});