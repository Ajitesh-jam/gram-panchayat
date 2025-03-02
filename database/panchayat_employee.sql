create table panchayat_employee (
	employee_id INT Primary key,
	password VARCHAR(60),
	citizen_id INT References citizen(citizen_id),
	role VARCHAR(10)
);

insert into panchayat_employee (employee_id, password, citizen_id, role) values (1, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 10, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (2, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 43, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (3, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 30, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (4, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 19, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (5, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 87, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (6, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 48, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (7, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 93, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (8, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 15, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (9, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 48, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (10, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 80, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (11, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 4, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (12, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 10, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (13, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 60, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (14, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 49, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (15, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 32, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (16, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 49, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (17, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 9, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (18, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 94, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (19, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 47, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (20, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 75, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (21, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 32, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (22, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 43, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (23, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 80, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (24, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 30, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (25, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 100, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (26, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 37, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (27, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 12, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (28, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 23, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (29, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 34, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (30, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 33, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (31, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 94, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (32, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 27, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (33, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 90, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (34, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 100, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (35, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 58, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (36, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 83, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (37, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 83, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (38, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 18, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (39, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 86, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (40, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 81, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (41, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 56, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (42, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 92, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (43, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 85, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (44, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 11, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (45, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 3, 'Karyavaah');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (46, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 75, 'Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (47, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 85, 'Sarpanch');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (48, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 68, 'Sachiv');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (49, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 54, 'Up-Pradhan');
insert into panchayat_employee (employee_id, password, citizen_id, role) values (50, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 39, 'Karyavaah');