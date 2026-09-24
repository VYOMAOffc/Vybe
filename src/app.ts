import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { Home } from './pages/home'
import type { Routes } from '#common/types'
import type { HTTPException } from 'hono/http-exception'

export class App {
  private app: OpenAPIHono

  constructor(routes: Routes[]) {
    this.app = new OpenAPIHono()

    this.initializeGlobalMiddlewares()
    this.initializeRoutes(routes)
    this.initializeSwaggerUI()
    this.initializeRouteFallback()
    this.initializeErrorHandler()
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      route.initRoutes()
      this.app.route('/api', route.controller)
    })

    this.app.route('/', Home)
  }

  private initializeGlobalMiddlewares() {
    this.app.use(logger())
    this.app.use(prettyJSON())
    this.app.use(cors())
  }

  private initializeSwaggerUI() {
    this.app.doc31('/swagger', (c) => {
      const { protocol: urlProtocol, hostname, port } = new URL(c.req.url)

      const protocol = c.req.header('x-forwarded-proto')
        ? `${c.req.header('x-forwarded-proto')}:`
        : urlProtocol

      return {
        openapi: '3.1.0',

        info: {
          version: '1.0.0',
          title: 'VYBE API',
          description: `# Introduction

VYBE API is a fast, reliable, and easy-to-use music API for developers.

Connect with us on [Telegram](https://t.me/VyomaOfficial).`
        },

        servers: [
          {
            url: `${protocol}//${hostname}${port ? `:${port}` : ''}`,
            description: 'Current environment'
          }
        ]
      }
    })

    this.app.get(
      '/docs',
      apiReference({
        pageTitle: 'VYBE API Documentation',
        theme: 'deepSpace',
        isEditable: false,
        layout: 'modern',
        darkMode: true,

        metaData: {
          applicationName: 'VYBE API',
          author: 'VYOMA',
          creator: 'VYOMA',
          publisher: 'VYOMA',
          robots: 'index, follow',
          description:
            'VYBE API is a fast and reliable music API for developers, providing programmatic access to songs, albums, artists, and playlists.'
        },

        url: '/swagger'
      })
    )
  }

  private initializeRouteFallback() {
    this.app.notFound((ctx) => {
      return ctx.json(
        {
          success: false,
          message: 'Route not found. Check the API documentation at /docs'
        },
        404
      )
    })
  }

  private initializeErrorHandler() {
    this.app.onError((err, ctx) => {
      const error = err as HTTPException

      return ctx.json(
        {
          success: false,
          message: error.message
        },
        error.status || 500
      )
    })
  }

  public getApp() {
    return this.app
  }
}
