import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'

export class GetSongStationUseCase
  implements IUseCase<string, any[]> {

  async execute(stationId: string) {
    const { data, ok } = await useFetch<any>({
      endpoint: 'webradio.getSongStation',
      params: {
        stationid: stationId
      },
      context: ApiContextEnum.ANDROID
    })

    if (!data || !ok) {
      throw new HTTPException(404, {
        message: 'no station songs found'
      })
    }

    const songs = Object.values(data)
      .filter((item: any) => item && typeof item === 'object')
      .map((item: any) => item.song ?? item)
      .filter((song: any) => song?.id)
      .map((song: any) => createSongPayload(song))
      .filter(Boolean)

    return songs
  }
  }
