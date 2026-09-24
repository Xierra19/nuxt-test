import { getSessionConfig } from '../utils/session'

export default defineEventHandler(async (event) => {
  const session = await useSession(event, getSessionConfig(event))
  await session.clear()

  return { success: true }
})
