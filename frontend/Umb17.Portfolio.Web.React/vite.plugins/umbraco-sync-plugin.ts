import { spawn } from 'node:child_process'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import type { Plugin } from 'vite'

const syncEndpoint = '/__admin/umbraco-sync'
const themeColorSyncEndpoint = '/__admin/theme-color-sync'
const healthEndpoint = '/__admin/health'

function readRequestBody(request: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let body = ''

    request.setEncoding('utf8')
    request.on('data', (chunk: string) => {
      body += chunk
    })
    request.on('end', () => resolve(body))
    request.on('error', reject)
  })
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(body))
}

function runGenerator(root: string, payload: string) {
  return new Promise<string>((resolve, reject) => {
    const scriptPath = path.join(root, 'scripts', 'generate-umbraco-models.mjs')
    const child = spawn(process.execPath, [scriptPath], {
      cwd: root,
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += String(chunk)
    })
    child.stderr.on('data', (chunk) => {
      stderr += String(chunk)
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout)
      } else {
        reject(new Error(stderr || `Generator exited with code ${code}`))
      }
    })

    child.stdin.end(payload)
  })
}

function runThemeColorGenerator(root: string, payload: string) {
  return new Promise<string>((resolve, reject) => {
    const scriptPath = path.join(root, 'scripts', 'generate-umbraco-theme-colors.mjs')
    const child = spawn(process.execPath, [scriptPath], {
      cwd: root,
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += String(chunk)
    })
    child.stderr.on('data', (chunk) => {
      stderr += String(chunk)
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout)
      } else {
        reject(new Error(stderr || `Theme color generator exited with code ${code}`))
      }
    })

    child.stdin.end(payload)
  })
}

export function umbracoSyncPlugin(): Plugin {
  return {
    name: 'umbraco-sync-plugin',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url?.startsWith(healthEndpoint)) {
          sendJson(response, 200, { ok: true })
          return
        }

        if (request.url?.startsWith(themeColorSyncEndpoint)) {
          if (request.method !== 'POST') {
            sendJson(response, 405, { error: 'Method not allowed' })
            return
          }

          try {
            const body = await readRequestBody(request)
            const result = await runThemeColorGenerator(server.config.root, body)

            sendJson(response, 200, {
              ok: true,
              result: result ? JSON.parse(result) : undefined,
              restarting: true,
            })

            setTimeout(() => {
              void server.restart()
            }, 250)
          } catch (error) {
            sendJson(response, 500, {
              error: error instanceof Error ? error.message : 'Unable to sync Umbraco theme colors',
            })
          }

          return
        }

        if (!request.url?.startsWith(syncEndpoint)) {
          next()
          return
        }

        if (request.method !== 'POST') {
          sendJson(response, 405, { error: 'Method not allowed' })
          return
        }

        try {
          const body = await readRequestBody(request)
          const result = await runGenerator(server.config.root, body)

          sendJson(response, 200, {
            ok: true,
            result: result ? JSON.parse(result) : undefined,
            restarting: true,
          })

          setTimeout(() => {
            void server.restart()
          }, 250)
        } catch (error) {
          sendJson(response, 500, {
            error: error instanceof Error ? error.message : 'Unable to sync Umbraco models',
          })
        }
      })
    },
  }
}
