import { z } from 'zod'
import { getUser } from '../repositories/user'
import { getSessionConfig } from '../utils/session'

const schema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(4, { message: 'Invalid username' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'Password must be at least 4 characters' })
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Validation failed'
    })
  }

  const user = await getUser(parsed.data.username, parsed.data.password)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  const session = await useSession(event, getSessionConfig(event))
  await session.update({ username: user.username, role: user.role })

  return { success: true, user }
})
