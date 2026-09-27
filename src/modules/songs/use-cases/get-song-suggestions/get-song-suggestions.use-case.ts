import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'
import type { SongModel } from '#modules/songs/models'
import type { z } from 'zod'

export interface GetSongSuggestionsArgs {
  songId: string
  limit: number
}

export class GetSongSuggestionsUseCase
  implements IUseCase<GetSongSuggestionsArgs, z.infer<typeof SongModel>[]> {

  async execute({ songId, limit }: GetSongSuggestionsArgs) {
    const { data, ok } = await useFetch<any>({
      endpoint: Endpoints.songs.suggestions,
      params: {
        pid: songId,
        limit
      },
      context: ApiContextEnum.ANDROID
    })

    if (!data || !ok) {
      throw new HTTPException(404, {
        message: 'no song suggestions found'
      })
    }

    const songs = Object.values(data)
      .filter((item: any) => item && typeof item === 'object')
      .map((item: any) => item.song ?? item)
      .filter((song: any) => song?.id)
      .map((song: any) => createSongPayload(song))
      .filter(Boolean)
      .filter((song: any) => song.id !== songId)
      .slice(0, limit)

    return songs
  }
  }
