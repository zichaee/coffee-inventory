import Cloudflare from 'cloudflare';

export async function deleteToken(token, context) {
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("delete from tokens where token = ?;")
    .bind(token);
  await ps.run();
}

export async function tokenIsValid(token, context) {
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("select created_at from tokens where token = ?;")
    .bind(token);
  const matchingToken = await ps.first(); // Will return `null` if there is no matching record found

  if (!matchingToken) {
    return false;
  } else {
    const timestampDate = new Date(String(matchingToken.created_at));
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const isLessThanAWeekOld = timestampDate > oneWeekAgo;

    if (isLessThanAWeekOld) {
      return true;
    } else {
      await deleteToken(matchingToken);
      return false;
    }
  }
}

export async function getTokenUser(token, context) {
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("select username from tokens where token = ?;")
    .bind(token);
  const response = await ps.first();
  return response.username;
}

export async function getTokenPermissions(token, context) {
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("SELECT ur.* FROM tokens t JOIN users u ON t.username = u.username JOIN user_roles ur ON u.user_role_name = ur.user_role_name WHERE t.token = ?;")
    .bind(token);
  const response = await ps.first();
  return response;
}

export async function usernameExists(username, context) {
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("select 1 from users where username = ?;")
    .bind(username);
  const matchingUsername = await ps.first();

  if (matchingUsername) {
    return true;
  } else {
    return false;
  }
}
