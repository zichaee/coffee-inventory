import Cloudflare from 'cloudflare';

export async function onRequestGet(context) {
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("select user_role_name, access_users_read, access_catalogue_read, access_catalogue_write, access_inventory_read, access_inventory_write from user_roles;");
  const data = await ps.run();

  return Response.json(data.results);
}
