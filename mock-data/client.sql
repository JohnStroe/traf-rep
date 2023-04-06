create table client (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	magic_link VARCHAR(50),
	email VARCHAR(50),
	created_on DATE,
	last_seen DATE
);
insert into client (id, name, magic_link, email, created_on, last_seen) values (1, 'Fredrick Heyward', 'Zmv0d84z7H64wzOW62rWZhJr', 'fheyward0@blogspot.com', '8/25/2022', '1/21/2023');
insert into client (id, name, magic_link, email, created_on, last_seen) values (2, 'Nicky Poppleton', '7hdPfXxc8F9lrfKRd9c9UfCj', 'npoppleton1@cnn.com', '1/4/2023', '11/15/2022');
insert into client (id, name, magic_link, email, created_on, last_seen) values (3, 'Lalo Dallan', 'LjwA6N0eDS9ylpSSmYo17yVd', 'ldallan2@ftc.gov', '4/2/2022', '11/2/2022');
insert into client (id, name, magic_link, email, created_on, last_seen) values (4, 'Ellen Meany', '8vmSx0q0ZKQymzTGl9h7C3N5', 'emeany3@timesonline.co.uk', '12/22/2022', '11/27/2022');
insert into client (id, name, magic_link, email, created_on, last_seen) values (5, 'Rochette McKain', 'Idf78581PGFrycXI7Ko32xHi', 'rmckain4@economist.com', '2/14/2023', '12/24/2022');
insert into client (id, name, magic_link, email, created_on, last_seen) values (6, 'Demetrius Bantick', 'Z8rH1Jom0LPtrhER08eWPpI9', 'dbantick5@noaa.gov', '9/28/2022', '1/23/2023');
insert into client (id, name, magic_link, email, created_on, last_seen) values (7, 'Meriel Milam', 'Z45Lr6tcKW1gycSKyOwS9jWz', 'mmilam6@china.com.cn', '9/28/2022', '4/22/2022');
insert into client (id, name, magic_link, email, created_on, last_seen) values (8, 'Wadsworth Davage', '2xj0e5npSK2ctuUVn9p5V4Rq', 'wdavage7@arstechnica.com', '8/31/2022', '11/25/2022');
insert into client (id, name, magic_link, email, created_on, last_seen) values (9, 'Sandi Pearsey', 'B0sBu5uwAUIug6H1oH1EOs11', 'spearsey8@google.com.au', '9/9/2022', '8/21/2022');
insert into client (id, name, magic_link, email, created_on, last_seen) values (10, 'Tabitha Braybrook', '88rZm51nVH066oEP1Bm7FhZg', 'tbraybrook9@histats.com', '6/14/2022', '2/2/2023');
