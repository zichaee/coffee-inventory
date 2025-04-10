import Cloudflare from 'cloudflare';

export async function onRequestGet(context) {
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("select user_role_name, access_users_read, access_users_write, access_orders_read, access_orders_write, access_sales_read, access_sales_write, access_invoices_read, access_invoices_write, access_suppliers_read, access_suppliers_write, access_orders_suppliers_read, access_orders_suppliers_write from user_roles;");
  const data = await ps.run();

  return Response.json(data.results);
}
