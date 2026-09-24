export type UserRole = 'admin' | 'employee'

export interface UserSession {
  username: string
  role: UserRole
}

const validUsers: Record<string, { password: string; role: UserRole }> = {
  admin: { password: 'admin', role: 'admin' },
  employee: { password: 'employee', role: 'employee' }
}

export async function getUser(username: string, password: string): Promise<UserSession | null> {
  const target = validUsers[username]

  if (!target || target.password !== password) {
    return null
  }

  return {
    username,
    role: target.role
  }
}
