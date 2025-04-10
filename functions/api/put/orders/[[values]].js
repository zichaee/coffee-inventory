import Cloudflare from 'cloudflare';
import { getTokenPermissions, getTokenUser } from '../../../utils.js';

export async function onRequestPut(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);

  const token = values.shift();
  const permissions = await getTokenPermissions(token, context);
  const username = await getTokenUser(token, context);

  if (permissions.access_orders_write == 1) {
    const ps = context.env.INVENTORY_MANAGEMENT.prepare("insert into orders(username, note, supplier_id) values(?, ?, ?);")
      .bind(username, ...values);
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
