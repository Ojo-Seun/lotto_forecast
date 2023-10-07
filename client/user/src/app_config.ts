const DEV_URL = import.meta.env.VITE_DEV_API_URL
const PRO_URL = import.meta.env.VITE_PRO_API_URL
const MODE = import.meta.env.MODE

const config: Readonly<Map<string, string>> = new Map([
  ["BASE_URL", MODE === "development" ? DEV_URL : PRO_URL],
])

export default config
