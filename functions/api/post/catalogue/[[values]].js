import Cloudflare from 'cloudflare';
import { getTokenPermissions, getTokenUser } from '../../../utils.js';

export async function onRequestPost(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);

  const token = values.shift();
  const permissions = await getTokenPermissions(token, context);

  if (permissions.access_orders_write == 1) {
    const ps = context.env.INVENTORY_MANAGEMENT.prepare("update catalogue set name = ?, category = ?, unit = ? where catalogue_id = ?;")
      .bind(...values);
    const data = await ps.run();

    return Response.json({
      success: data.success,
      meta: {
        last_row_id: data.meta.last_row_id
      }
    });
  } else {
    return Response.error();
  }
}
