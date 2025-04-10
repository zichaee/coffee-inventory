import Cloudflare from 'cloudflare';
import { getTokenPermissions } from '../../../utils.js';

export async function onRequestGet(context) {
  const token = context.params.id;
  const permissions = await getTokenPermissions(token, context);

  if (permissions.access_invoices_read == 1) {
    const ps = context.env.INVENTORY_MANAGEMENT.prepare("SELECT * FROM invoices;");
    const data = await ps.run();
    return Response.json(data.results);
  } else {
    return Response.error();
  }
}
