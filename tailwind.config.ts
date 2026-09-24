import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {}
  }
}
