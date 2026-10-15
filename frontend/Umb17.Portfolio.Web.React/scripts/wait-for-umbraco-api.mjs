const apiOrigin = process.env.VITE_UMBRACO_API_ORIGIN ?? 'https://localhost:63177'
const manifestEndpoint = `${apiOrigin}/api/frontend/manifest`
const intervalMs = Number(process.env.UMBRACO_API_WAIT_INTERVAL_MS ?? 1500)
const timeoutMs = Number(process.env.UMBRACO_API_WAIT_TIMEOUT_MS ?? 120000)
const startedAt = Date.now()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

while (Date.now() - startedAt < timeoutMs) {
  try {
    const response = await fetch(manifestEndpoint, { cache: 'no-store' })

    if (response.ok) {
      process.stdout.write(`Umbraco API is ready at ${manifestEndpoint}\n`)
      process.exit(0)
    }

    process.stdout.write(`Waiting for Umbraco API: ${response.status}\n`)
  } catch (error) {
    process.stdout.write(`Waiting for Umbraco API: ${error.message}\n`)
  }

  await wait(intervalMs)
}

process.stderr.write(`Timed out waiting for Umbraco API at ${manifestEndpoint}\n`)
process.exit(1)
