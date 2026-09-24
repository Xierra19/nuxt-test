<template>
  <div class="auth-page flex min-h-screen items-center justify-center px-4 py-10">
    <UCard class="auth-card w-full max-w-lg border-2 border-sky-500 bg-white/90 shadow-2xl backdrop-blur-sm">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white">A</div>
          <h1 class="text-2xl font-bold text-slate-800">Admin Only Area</h1>
        </div>
      </template>

      <p class="mb-5 text-slate-700">You can see this because your role is admin.</p>

      <NuxtLink to="/home">
        <UButton class="bg-slate-800 text-white hover:bg-slate-700">Back to Home</UButton>
      </NuxtLink>
    </UCard>
  </div>
</template>
