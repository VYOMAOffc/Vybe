import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import type { Routes } from '#common/types'
import { GetSongStationUseCase } from '../use-cases/get-song-station/get-song-station.use-case'

export class RadioController implements Routes {
  public controller: OpenAPIHono
  private getSongStationUseCase: GetSongStationUseCase

  constructor() {
    this.controller = new OpenAPIHono()
    this.getSongStationUseCase = new GetSongStationUseCase()
  }

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/songs/radio/{stationId}',
        tags: ['Songs'],
        summary: 'Retrieve songs from a radio station',
        operationId: 'getRadioSongs',
        request: {
          params: z.object({
            stationId: z.string().openapi({
              title: 'Radio Station ID',
              description: 'Radio station ID returned by the song radio endpoint',
              type: 'string'
            })
          }),
          query: z.object({
            limit: z.string().pipe(z.coerce.number()).optional().openapi({
              title: 'Limit',
              description: 'Maximum number of songs to return',
              type: 'integer',
              example: '20',
              default: '20'
            })
          })
        },
        responses: {
          200: {
            description: 'Successful response with radio songs',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean(),
                  data: z.array(z.any())
                })
              }
            }
          },
          404: {
            description: 'Radio station songs not found'
          }
        }
      }),
      async (ctx) => {
        const { stationId } = ctx.req.valid('param')
        const { limit } = ctx.req.valid('query')

        const songs = await this.getSongStationUseCase.execute(stationId)

        const limitedSongs = songs.slice(0, limit || 20)

        return ctx.json({
          success: true,
          data: limitedSongs
        })
      }
    )
  }
}
