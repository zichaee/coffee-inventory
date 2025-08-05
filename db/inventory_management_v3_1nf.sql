pragma defer_foreign_keys=false;
create table if not exists users (
  username text primary key,
  password text,
  created_at timestamp not null default current_timestamp,
  status text check(status in ('active', 'deactivated')) default 'active',
  access_users_read integer not null,
  access_users_write integer not null,
  access_catalogue_read integer not null,
  access_catalogue_write integer not null,
  access_inventory_read integer not null,
  access_inventory_write integer not null
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
create table if not exists catalogue (
  catalogue_id integer primary key,
  name text,
  category text,
  unit text
);
create table if not exists inventory (
  product_id integer primary key,
  supplier_id integer,
  received_date date,
  expiration_date date,
  quantity integer,
  unit_price decimal(10, 2),
  storage_location text,
  water_content integer,
  note text,
  catalogue_id integer,
  foreign key (supplier_id) references suppliers(supplier_id),
  foreign key (catalogue_id) references catalogue(catalogue_id)
);
create table if not exists tokens (
  token_id integer primary key,
  token text,
  username text,
  created_at timestamp not null default current_timestamp,
  foreign key (username) references users(username)
);
create table if not exists history (
  history_id integer primary key,
  product_id integer,
  type text,
  time timestamp not null default current_timestamp,
  username text,
  foreign key (product_id) references inventory(product_id),
  foreign key (username) references users(username)
);
create table if not exists orders (
  order_id integer primary key,
  created_date timestamp default current_timestamp,
  note text,
  username text,
  supplier_id integer,
  foreign key (username) references users(username),
  foreign key (supplier_id) references suppliers(supplier_id)
);
create table if not exists order_details (
  order_detail_id integer primary key,
  order_id integer,
  catalogue_id integer,
  quantity integer,
  foreign key (order_id) references orders(order_id),
  foreign key (catalogue_id) references catalogue(catalogue_id)
);
