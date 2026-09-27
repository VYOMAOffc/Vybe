import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import { CreateSongStationUseCase } from '#modules/songs/use-cases'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'
import type { SongModel, SongSuggestionAPIResponseModel } from '#modules/songs/models'
import type { z } from 'zod'

export interface GetSongSuggestionsArgs {
  songId: string
  limit: number
}

export class GetSongSuggestionsUseCase
  implements IUseCase<GetSongSuggestionsArgs, z.infer<typeof SongModel>[]> {

  private readonly createSongStation: CreateSongStationUseCase

  constructor() {
    this.createSongStation = new CreateSongStationUseCase()
  }

  async execute({ songId, limit }: GetSongSuggestionsArgs) {
    const stationId = await this.createSongStation.execute(songId)

    console.log('RADIO SONG ID:', songId)
    console.log('RADIO STATION ID:', stationId)
    console.log('RADIO LIMIT:', limit)
console.log('RADIO PARAMS:', JSON.stringify({
  stationid: stationId,
  k: limit
}))

    const { data, ok } =
      await useFetch<z.infer<typeof SongSuggestionAPIResponseModel>>({
        endpoint: Endpoints.songs.suggestions,
        params: {
          stationid: stationId,
          k: limit
        },
        context: ApiContextEnum.ANDROID
      })
    
    console.log('RADIO OK:', ok)
    console.log('RADIO RAW DATA:', JSON.stringify(data))
    return data as any
    

    if (!data || !ok) {
      throw new HTTPException(404, {
        message: 'no radio suggestions found'
      })
    }

    const songs = Object.values(data)
      .filter((item: any) => item && typeof item === 'object')
      .map((item: any) => item.song ?? item)
      .filter((song: any) => song && song.id)
      .map((song: any) => createSongPayload(song))
      .filter(Boolean)
      .slice(0, limit)

    console.log('RADIO SONG COUNT:', songs.length)

    return songs
  }
  }
