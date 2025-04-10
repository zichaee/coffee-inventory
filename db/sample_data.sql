insert into user_roles (user_role_name, access_users_read, access_users_write, access_orders_read, access_orders_write, access_sales_read, access_sales_write, access_invoices_read, access_invoices_write, access_suppliers_read, access_suppliers_write, access_orders_suppliers_read, access_orders_suppliers_write) values('admin', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0);
insert into user_roles (user_role_name, access_users_read, access_users_write, access_orders_read, access_orders_write, access_sales_read, access_sales_write, access_invoices_read, access_invoices_write, access_suppliers_read, access_suppliers_write, access_orders_suppliers_read, access_orders_suppliers_write) values('staff', 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0);
insert into user_roles (user_role_name, access_users_read, access_users_write, access_orders_read, access_orders_write, access_sales_read, access_sales_write, access_invoices_read, access_invoices_write, access_suppliers_read, access_suppliers_write, access_orders_suppliers_read, access_orders_suppliers_write) values('supplier', 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1);

insert into users (username, password, user_role_name) values('admin', '$2b$10$cJjniQOaHwsYgItJrrNfpu8TpNtnh8mkknXw9eLd8HNIaPNuRYCGu', 'admin');
insert into users (username, password, user_role_name) values('supplier', '$2b$10$Sj/TjHGpfqk3zZoYGEm.0uo4wnnowx4uYJGqxR3cxIP8JTQq7XfdC', 'supplier');

insert into suppliers (supplier_name, phone_number, email, address) values('Pak Budi (Gayo)', '081234567890', 'pakbudi@gayo.co.id', 'Aceh, Indonesia');
insert into suppliers (supplier_name, phone_number, email, address) values('Koperasi Kintamani', '085612345678', 'koperasi@kintamani.com', 'Bali, Indonesia');
insert into suppliers (supplier_name, phone_number, email, address) values('PT Kopi Nusantara', '0218765432', 'info@kopinusantara.com', 'Jakarta, Indonesia');
insert into suppliers (supplier_name, phone_number, email, address) values('Ibu Siti (Toraja)', '082198765432', 'ibusiti@toraja.co.id', 'Sulawesi Selatan, Indonesia');
insert into suppliers (supplier_name, phone_number, email, address) values('CV Sumatra Beans', '081390123456', 'sales@sumatrabeans.com', 'Sumatra Utara');
