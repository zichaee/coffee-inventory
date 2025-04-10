import Cloudflare from 'cloudflare';
import bcrypt from 'bcryptjs';
import _ from 'underscore';

function generateToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

export async function onRequestGet(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);

  const username = values[0];
  const password = values[1];

  const psGetDBHash = context.env.INVENTORY_MANAGEMENT.prepare("select password from users where username = ?;")
    .bind(username);
  const responsePSGetDBHash = await psGetDBHash.first();

  if (_.isEmpty(responsePSGetDBHash)) { // if there is no one by that `username`...
    return Response.error();
  } else {
    if (bcrypt.compareSync(password, responsePSGetDBHash.password)) { // if both `username` and `password` are valid...
      const token = generateToken(64);
      const psAddToken = context.env.INVENTORY_MANAGEMENT.prepare("insert into tokens(token, username) values(?, ?);")
        .bind(token, username);
      const responsePSAddToken = await psAddToken.run();
      return Response.json(token);
    } else {
      return Response.error();
    }
  }
}
