import Cloudflare from 'cloudflare';
import { getTokenPermissions } from '../../../utils.js';

export async function onRequestGet(context) {
  const token = context.params.id;
  const permissions = await getTokenPermissions(token, context);
  return Response.json(permissions);
}
