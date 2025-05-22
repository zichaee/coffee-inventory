import Cloudflare from 'cloudflare';
import { getTokenPermissions, getTokenUser } from '../../../utils.js';

export async function onRequestPut(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);

  const token = values.shift();
  const permissions = await getTokenPermissions(token, context);

  if (permissions.access_inventory_write == 1) {
    const ps = context.env.INVENTORY_MANAGEMENT.prepare("insert into inventory(supplier_id, received_date, expiration_date, quantity, unit_price, storage_location, note, catalogue_id) values(?, ?, ?, ?, ?, ?, ?, ?);")
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
