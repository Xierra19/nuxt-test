import { getSessionConfig } from '../utils/session'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  if (!url.pathname.startsWith('/admin')) {
    return
  }

  const session = await useSession(event, getSessionConfig(event))

  if (session.data?.role !== 'admin') {
    return sendRedirect(event, '/home')
  }
})
