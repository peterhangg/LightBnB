INSERT INTO users (name, email, password)
VALUES('Eva Stanley', 'sebastianguerra@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dominic Park', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,
cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,
number_of_bedrooms, country, street, city, province, post_code, active)

VALUES(1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrbg&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 
930, 6, 4 ,8, 'Canada', '536 Namsub Highway', 'sotboske', 'Quebec', 28142, true),
(2, 'Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrbg&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 
46058, 0, 5 ,6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', 44583, true),
(4, 'Headed know', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrbg&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 
82640, 0, 5 ,5, 'Canada', '513 Powov', 'Jaebvap', 'Ontario', 38051, true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 3, 'message'),
(2, 2, 2, 4 , 'message'),
(3, 3, 3, 4 , 'message');