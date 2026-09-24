import { getSessionConfig } from '../utils/session'

export default defineEventHandler(async (event) => {
  const session = await useSession(event, getSessionConfig(event))

  if (!session.data?.username) {
    return null
  }

  return {
    username: session.data.username,
    role: session.data.role
  }
})
