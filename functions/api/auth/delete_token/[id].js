import Cloudflare from 'cloudflare';
import { deleteToken } from '../../../utils.js';

export async function onRequestGet(context) {
  const token = context.params.id;
  try {
    await deleteToken(token, context);
    return Response.json(true);
  } catch (e) {
    return Response.json(false);
  }
}
