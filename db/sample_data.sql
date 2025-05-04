insert into user_roles (user_role_name, access_users_read, access_users_write, access_catalogue_read, access_catalogue_write, access_inventory_read, access_inventory_write) values('admin', 1, 1, 1, 1, 1, 1);
insert into user_roles (user_role_name, access_users_read, access_users_write, access_catalogue_read, access_catalogue_write, access_inventory_read, access_inventory_write) values('staff', 0, 0, 1, 1, 1, 1);

insert into users (username, password, user_role_name) values('admin', '$2b$10$cJjniQOaHwsYgItJrrNfpu8TpNtnh8mkknXw9eLd8HNIaPNuRYCGu', 'admin');
insert into users (username, password, user_role_name) values('staff', '$2b$10$Sj/TjHGpfqk3zZoYGEm.0uo4wnnowx4uYJGqxR3cxIP8JTQq7XfdC', 'staff');
