import Cloudflare from 'cloudflare';
import { getTokenPermissions, getTokenUser } from '../../../utils.js';

export async function onRequestPost(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);

  const token = values.shift();
  const permissions = await getTokenPermissions(token, context);

  if (permissions.access_inventory_write == 1) {
    const ps = context.env.INVENTORY_MANAGEMENT.prepare("update inventory set received_date = ?, expiration_date = ?, quantity = ?, unit_price = ?, note = ? where product_id = ?;")
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
