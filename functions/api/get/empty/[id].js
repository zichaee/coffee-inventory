import Cloudflare from 'cloudflare';
import { getTokenPermissions } from '../../../utils.js';

export async function onRequestGet(context) {
  const token = context.params.id;
  const permissions = await getTokenPermissions(token, context);

  if (permissions.access_catalogue_read == 1) {
    const ps = context.env.INVENTORY_MANAGEMENT.prepare(
      `SELECT
        c.*,
        COALESCE(cd.total_quantity, 0) AS total_quantity
      FROM
        catalogue c
      LEFT JOIN (
        SELECT
          catalogue_id,
          SUM(quantity) AS total_quantity
        FROM
          inventory
        GROUP BY
          catalogue_id
      ) cd ON c.catalogue_id = cd.catalogue_id
      WHERE
        COALESCE(cd.total_quantity, 0) = 0;`
    );
    const data = await ps.run();
    return Response.json(data.results);
  } else {
    return Response.error();
  }
}
