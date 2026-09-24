export default defineNuxtRouteMiddleware(async (to) => {
  const { data: user } = await useFetch('/api/me', { key: 'auth-user' })

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/home')
  }

  if (to.path === '/') {
    return navigateTo(user.value ? '/home' : '/login')
  }

  if (to.path === '/admin' && user.value?.role !== 'admin') {
    return navigateTo('/home')
  }
})
