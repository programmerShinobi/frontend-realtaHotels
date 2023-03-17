select * from master.provinces order by prov_id ASC

-- delete data 
DELETE FROM master.regions
DELETE FROM master.country
DELETE FROM master.provinces
DELETE FROM master.address
DELETE FROM master.category_group
DELETE FROM master.policy
DELETE FROM master.price_items
DELETE FROM master.service_task

-- reset id data
ALTER SEQUENCE master.regions_region_code_seq RESTART WITH 1
ALTER SEQUENCE master.country_country_id_seq RESTART WITH 1
ALTER SEQUENCE master.prvinces_prov_id_seq RESTART WITH 1
ALTER SEQUENCE master.address_addr_id_seq RESTART WITH 1
ALTER SEQUENCE master.category_group_cagro_id_seq RESTART WITH 1
ALTER SEQUENCE master.policy_poli_id_seq RESTART WITH 1
ALTER SEQUENCE master.price_items_prit_id_seq RESTART WITH 1
ALTER SEQUENCE master.service_task_seta_id_seq RESTART WITH 1



insert into master.regions values
(1,'Asia'),
(2,'Africa'),
(3,'Autralia'),
(4,'Antartica'),
(5,'Europe'),
(6,'Green LAnd'),
(7,'Nourt America'),
(8,'South America');

insert into master.country values(1,'Indonesia',1),
(2,'Malaysia',1),
(3,'Jepang',1),
(4,'Tiongkok',1),
(5,'Singapura',1),
(6,'Africa',2),
(7,'Nigeria',2),
(8,'Ghana',2),
(9,'Kenya',2),
(10,'Maroko',2),
(11,'New South Wales',3),
(12,'Northern Teorritory',3),
(13,'South Australia',3),
(14,'Tasmania',3),
(15,'Victoria',3),
(16,'German',5),
(17,'Francies',5),
(18,'Holand',5),
(19,'Belgia',5),
(20,'Swises',5);

insert into master.provinces values(1,'Jakarta',1),
(2,'DKI Jakarta',1),
(3,'Jawa Barat',1),
(4,'Jawa Tengah',1),
(5,'Jawa Timur',1),
(6,'Bali',1),
(7,'Banten',1),
(8,'Sumatera Utara',1),
(9,'Sumatera Selatan',1),
(10,'Sumatera Barat',1),
(11,'Bengkulu',1),
(12,'Riau',1),
(13,'Jambi',1),
(14,'Kalimantan Barat',1),
(15,'Kalimantan Timur',1),
(16,'Kalimantan Selatan',1),
(17,'Kalimantan Tengah',1),
(18,'Kalimantan Utara',1),
(19,'Sulawesi Barat',1),
(20,'Sulawesi Utara',1);


INSERT INTO master.address (addr_id, addr_line1, addr_line2, addr_prov_id) VALUES
(1, 'Jl. Dr. Djunjunan No.162, Sukagalih, Kec. Sukajadi, Kota Bandung, Jawa Barat', 'Bandung', 3),
(2, 'Jl. Pandanaran No.40, Pekunden, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah', 'Semarang', 4),
(3, 'Jl. Sidosermo II No.70a, Sidosermo, Kec. Wonocolo, Kota SBY, Jawa Timur', 'Surabaya',5),
(4, 'l. Raya Karang Bolong No.KM.139, Karang Suraga, Kec. Cinangka, Kabupaten Serang, Banten', 'Serang', 7),
(5, 'Jl. H. Nawi Raya Jl. Radio Dalam Raya No.1, RT.3/RW.1, Gandaria Utara, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta ', 'Jakarta', 2);
(6, 'Jl. Indigo Raya Jl. Pahlawan, RT.05/RW.12, Mulyaharja, Kec. Bogor Sel., Kota Bogor, Jawa Barat', 'Bogor', 3);
