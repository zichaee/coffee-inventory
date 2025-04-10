import Cloudflare from 'cloudflare';

export async function onRequestPut(context) {
  const rawValues = context.params.values;
  const values = rawValues.map(item => item === 'null' ? null : item);
  const ps = context.env.INVENTORY_MANAGEMENT.prepare("insert into inventory(product_name, category, supplier_id, unit, unit_price, quantity, received_date, expiration_date) values(?, ?, ?, ?, ?, ?, ?, ?);")
    .bind(...values);
  const data = await ps.run();

  return Response.json(data.results);
}
