pragma defer_foreign_keys=false;
create table if not exists users (
  username text primary key,
  password text,
  created_at timestamp not null default current_timestamp,
  status text check(status in ('active', 'deactivated')) default 'active',
  access_users integer not null,
  access_catalogue integer not null,
  access_inventory integer not null
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
  items text,
  quantities text,
  foreign key (username) references users(username),
  foreign key (supplier_id) references suppliers(supplier_id)
);
