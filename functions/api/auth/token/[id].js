import Cloudflare from 'cloudflare';
import { tokenIsValid } from '../../../utils.js';

export async function onRequestGet(context) {
  const token = context.params.id;
  const valid = await tokenIsValid(token, context);
  return Response.json(valid);
}
