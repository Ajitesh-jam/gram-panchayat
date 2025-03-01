CREATE TABLE govt_monitor (

    govt_id INT UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    image VARCHAR(255),
    my_villages TEXT -- Storing an array as JSON text
);
INSERT INTO govt_monitor (govt_id, password, gender, name, email, image, my_villages) VALUES
(1, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 'male', 'Amit', 'amit@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCVEM0R8r1EDKsVDuRacVTQxvz4KFAakVMlQ&s', '[1, 3, 5, 8]'),
(2, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 'male', 'Reena', 'reena@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhInNpZrkBIl8qORSAxwf6oXa-gkZm-Au43A&s', '[2, 4, 7]'),
(3, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 'male', 'Sohan', 'sohan@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCVEM0R8r1EDKsVDuRacVTQxvz4KFAakVMlQ&s', '[1, 5, 6, 9]'),
(4, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 'male', 'Raj', 'raj@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCVEM0R8r1EDKsVDuRacVTQxvz4KFAakVMlQ&s', '[3, 7, 8, 10]'),
(5, '$2a$12$3uo2Vypayd0ZzR87oT5q7ej9QNsrmqnPEuXZKZu3wvfxQMS04vX2.', 'female', 'Pooja', 'pooja@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhInNpZrkBIl8qORSAxwf6oXa-gkZm-Au43A&s', '[2, 4, 6, 9]');  
