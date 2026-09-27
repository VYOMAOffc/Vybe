import { Song } from '@saavn-labs/sdk';
import { Controller } from '../../../app/controller'; // path apne project ke hisaab se adjust kar

export class RadioController extends Controller {
  constructor() {
    super('radio');
  }

  async getByStationId(c: any) {
    const stationId = c.req.param('stationId');
    const limit = Number(c.req.query('limit')) || 20;
    const next = c.req.query('next') === 'true';

    try {
      const songs = await Song.getByStationId({ stationId, limit, next });
      return c.json({ success: true, data: songs });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }

  // 🆕 
  async getRecommendations(c: any) {
    const songId = c.req.param('songId');
    try {
      const recos = await Song.getRecommendations({ songId });
      return c.json({ success: true, data: recos });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }
}
