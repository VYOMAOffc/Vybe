import { Controller } from '../../../app/controller'; // path adjust karna
import { Song } from '@saavn-labs/sdk';

export class RadioController extends Controller {
  constructor() {
    super('radio'); // route base path
  }

  async getByStation(c: any) {
    const stationId = c.req.param('stationId');
    const limit = Number(c.req.query('limit')) || 20;
    const next = c.req.query('next') === 'true';

    try {
      const songs = await Song.getByStationId({ stationId, limit, next });
      return c.json({ success: true, data: songs });
    } catch (error: any) {
      return c.json(
        { success: false, error: error.message || 'Radio fetch failed' },
        500
      );
    }
  }
}
