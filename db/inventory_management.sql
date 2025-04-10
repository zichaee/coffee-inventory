pragma defer_foreign_keys=false;
create table if not exists user_roles (
  user_role_name text primary key,
  access_users_read integer not null,
  access_users_write integer not null,
  access_orders_read integer not null,
  access_orders_write integer not null,
  access_sales_read integer not null,
  access_sales_write integer not null,
  access_invoices_read integer not null,
  access_invoices_write integer not null,
  access_suppliers_read integer not null,
  access_suppliers_write integer not null,
  access_orders_suppliers_read integer not null,
  access_orders_suppliers_write integer not null
);
create table if not exists users (
  username text primary key,
  password text,
  user_role_name text,
  created_at timestamp not null default current_timestamp,
  status text check(status in ('active', 'deactivated')) default 'active',
  foreign key (user_role_name) references user_roles(user_role_name)
);
create table if not exists suppliers (
  supplier_id integer primary key,
  supplier_name text,
  phone_number text,
  email text,
  address text,
  username text,
  foreign key (username) references users(username)
);
create table if not exists inventory (
  product_id integer primary key,
  product_name text,
  category text check(category in ('green_bean', 'roasted_bean', 'ground_coffee')),
  supplier_id integer,
  unit text,
  unit_price decimal(10, 2),
  quantity integer,
  received_date date,
  expiration_date date,
  foreign key (supplier_id) references suppliers(supplier_id)
);
create table if not exists orders (
  order_id integer primary key,
  created_date timestamp default current_timestamp,
  rejected_date timestamp,
  status text check(status in ('pending', 'invoiced', 'rejected')) default 'pending',
  note text,
  username text,
  supplier_id integer,
  foreign key (username) references users(username),
  foreign key (supplier_id) references suppliers(supplier_id)
);
create table if not exists order_details (
  order_detail_id integer primary key,
  order_id integer,
  product_name text,
  unit text,
  quantity integer,
  foreign key (order_id) references orders(order_id)
);
create table if not exists invoices (
  invoice_id integer primary key,
  order_id integer,
  created_date timestamp default current_timestamp,
  approved_date timestamp,
  paid_date timestamp,
  rejected_date timestamp,
  status text check(status in ('pending', 'approved', 'paid', 'rejected')) default 'pending',
  note text,
  rejection_note text,
  supplier_id integer,
  foreign key (order_id) references orders(order_id),
  foreign key (supplier_id) references suppliers(supplier_id)
);
create table if not exists invoice_details (
  invoice_detail_id integer primary key,
  invoice_id integer,
  product_name text,
  expiration_date date,
  unit text,
  unit_price decimal(10, 2),
  quantity integer,
  foreign key (invoice_id) references invoices(invoice_id)
);
create table if not exists sales (
  sale_id integer primary key,
  customer_name text,
  sale_date timestamp not null default current_timestamp,
  username text,
  supplier_id integer,
  foreign key (username) references users(username),
  foreign key (supplier_id) references suppliers(supplier_id)
);
create table if not exists sale_details (
  sale_detail_id integer primary key,
  sale_id integer,
  product_name text,
  category text check(category in ('green_bean', 'roasted_bean', 'ground_coffee')),
  expiration_date date,
  unit text,
  unit_price decimal(10, 2),
  quantity integer,
  foreign key (sale_id) references sales(sale_id)
);
create table if not exists tokens (
  token_id integer primary key,
  token text,
  username text,
  created_at timestamp not null default current_timestamp,
  foreign key (username) references users(username)
);
