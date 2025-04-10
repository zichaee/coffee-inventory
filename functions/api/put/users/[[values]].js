import Cloudflare from 'cloudflare';
import { getTokenPermissions } from '../../../utils.js';
import bcrypt from 'bcryptjs';

export async function onRequestPut(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);

  const token = values.shift();
  const permissions = await getTokenPermissions(token, context);

  if (permissions.access_users_write == 1) {
    const username = values[0]
    const password = values[1];
    const role = values[2];
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const ps = context.env.INVENTORY_MANAGEMENT.prepare("insert into users(username, password, user_role_name) values(?, ?, ?);")
      .bind(username, hash, role);
    const data = await ps.run();

    return Response.json(data.results);
  } else {
    return Response.error();
  }
}
