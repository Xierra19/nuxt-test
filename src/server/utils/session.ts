export function getSessionConfig(event: Parameters<typeof useSession>[0]) {
  const password = useRuntimeConfig(event).sessionPassword

  if (!password) {
    throw new Error('NUXT_SESSION_PASSWORD must be configured')
  }

  return { password }
}
