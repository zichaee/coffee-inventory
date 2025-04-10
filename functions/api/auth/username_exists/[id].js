import Cloudflare from 'cloudflare';
import { usernameExists } from '../../../utils.js';

export async function onRequestGet(context) {
  const username = context.params.id;
  const exists = await usernameExists(username, context);
  return Response.json(exists);
}
