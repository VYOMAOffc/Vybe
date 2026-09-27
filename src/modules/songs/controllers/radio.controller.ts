import { Controller } from '#app/controller'
import { GetSongStationUseCase } from '../use-cases/get-song-station.use-case'

export class RadioController extends Controller {
  constructor() {
    super('radio')
  }

  async getByStation(c: any) {
    const stationId = c.req.param('stationId')

    try {
      const songs = await new GetSongStationUseCase().execute(stationId)

      return c.json({
        success: true,
        data: songs
      })
    } catch (error: any) {
      return c.json(
        {
          success: false,
          error: error.message || 'Radio fetch failed'
        },
        404
      )
    }
  }
}
