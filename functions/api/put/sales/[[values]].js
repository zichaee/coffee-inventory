import Cloudflare from 'cloudflare';

export async function onRequestPut(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("insert into sales(customer_name, sale_date, username, supplier_id) values(?, ?, ?, ?);")
    .bind(...values);
  const data = await ps.run();

  return Response.json(data.results);
}
