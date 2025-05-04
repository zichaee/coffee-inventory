pragma defer_foreign_keys=false;
create table if not exists users (
  username text primary key,
  password text,
  access_permissions text not null,
  created_at timestamp not null default current_timestamp,
  status text check(status in ('active', 'deactivated')) default 'active'
);
create table if not exists catalogue (
  catalogue_id integer primary key,
  name text,
  category text,
  unit text
);
create table if not exists inventory (
  product_id integer primary key,
  received_date date,
  expiration_date date,
  quantity integer,
  unit_price decimal(10, 2),
  note text,
  catalogue_id integer,
  foreign key (catalogue_id) references catalogue(catalogue_id)
);
create table if not exists tokens (
  token_id integer primary key,
  token text,
  username text,
  created_at timestamp not null default current_timestamp,
  foreign key (username) references users(username)
);
