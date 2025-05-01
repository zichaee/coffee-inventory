create table if not exists users (
  username text primary key,
  password text,
  access_permissions text, -- e.g. 'users:read,write;orders:read;invoices:read,write'
  tokens text, -- e.g. 'abc123,def456,ghi789'
  created_at timestamp not null default current_timestamp,
  status text check(status in ('active', 'deactivated')) default 'active'
);

create table if not exists inventory (
  product_id integer primary key,
  product_name text,
  category text check(category in ('green_bean', 'roasted_bean', 'ground_coffee')),
  supplier_info text, -- e.g. 'Acme Coffee|555-4321|acme@coffee.com|42 Roast Rd'
  unit text,
  unit_price decimal(10, 2),
  quantity integer,
  received_date date,
  expiration_date date
);

create table if not exists orders (
  order_id integer primary key,
  created_date timestamp default current_timestamp,
  rejected_date timestamp,
  status text, -- e.g. 'pending', 'invoiced', etc.
  note text,
  username text,
  supplier_info text, -- e.g. 'Acme Coffee|555-4321|acme@coffee.com|42 Roast Rd'
  products text -- e.g. 'Coffee A|kg|10,Coffee B|kg|5'
);

create table if not exists invoices (
  invoice_id integer primary key,
  order_id integer,
  created_date timestamp default current_timestamp,
  approved_date timestamp,
  paid_date timestamp,
  rejected_date timestamp,
  status text, -- e.g. 'pending', 'approved', 'paid', etc.
  note text,
  rejection_note text,
  supplier_info text, -- e.g. 'Acme Coffee|555-4321|acme@coffee.com|42 Roast Rd'
  products text -- e.g. 'Coffee A|2025-05-01|kg|12.50|10,Coffee B|2025-06-01|kg|11.00|5'
);

create table if not exists sales (
  sale_id integer primary key,
  customer_name text,
  sale_date timestamp not null default current_timestamp,
  username text,
  supplier_info text, -- e.g. 'Acme Coffee|555-4321|acme@coffee.com|42 Roast Rd'
  products text -- e.g. 'Coffee A|green_bean|2025-08-01|kg|14.50|3,Coffee B|roasted_bean|2025-07-01|kg|16.00|2'
);
