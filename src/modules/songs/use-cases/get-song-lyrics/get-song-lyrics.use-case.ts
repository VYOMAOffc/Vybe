import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'

export class GetSongLyricsUseCase {
  async execute(songId: string) {
    const { data, ok } = await useFetch<any>({
      endpoint: Endpoints.songs.lyrics,
      params: {
        lyrics_id: songId
      }
    })

    if (!ok || !data?.lyrics) {
      throw new HTTPException(404, {
        message: 'Lyrics not found'
      })
    }

    return data
  }
}
