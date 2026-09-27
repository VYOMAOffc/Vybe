import { Song } from '@saavn-labs/sdk';

export interface GetRadioSongsInput {
  stationId: string;
  limit?: number;
  next?: boolean;
}

export async function getRadioSongsUseCase(input: GetRadioSongsInput) {
  const { stationId, limit = 20, next = false } = input;

  try {
    const songs = await Song.getByStationId({ stationId, limit, next });
    return { success: true, data: songs };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Radio songs fetch failed',
    };
  }
}
