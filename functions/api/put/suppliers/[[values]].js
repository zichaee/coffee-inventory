import Cloudflare from 'cloudflare';
import { getTokenPermissions } from '../../../utils.js';

export async function onRequestPut(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);

  const token = values.shift();
  const permissions = await getTokenPermissions(token, context);

  if (permissions.access_suppliers_write == 1) {
    const ps = context.env.INVENTORY_MANAGEMENT.prepare("insert into suppliers(supplier_name, phone_number, email, address) values(?, ?, ?, ?);")
      .bind(...values);
    const data = await ps.run();
    return Response.json(data.results);
  } else {
    return Response.error();
  }
}
