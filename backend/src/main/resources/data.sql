-- Pre-seeding Roles
INSERT INTO roles (name) VALUES ('ROLE_USER') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON DUPLICATE KEY UPDATE name=name;

-- Pre-seeding Sample Beaches
INSERT INTO beaches (name, district, latitude, longitude, description, activities, water_sports, best_time_to_visit, image_url)
VALUES
('Panambur Beach', 'Dakshina Kannada', 12.9510, 74.8030, 'Mangaluru premier beach with wide golden sands and active lifeguards.', 'Camel rides, Parasailing, Sunset views', true, 'October to March', 'images/Beaches/Panambur Beach.jpg'),
('Malpe Beach', 'Udupi District', 13.3575, 74.7010, 'Vibrant beach harbour and the gateway to volcanic St. Marys Island.', 'Sea walk, Jet ski, Banana boat, Ferry', true, 'October to February', 'images/Beaches/Malpe Beach.jpg'),
('Kapu Beach', 'Udupi District', 13.2260, 74.7390, 'Historic 1901 British lighthouse perched atop colossal sea boulders.', 'Lighthouse climbing, Photography, Sunsets', false, 'October to April', 'images/Beaches/Kapu Beach.jpg'),
('Tannirbhavi Beach', 'Dakshina Kannada', 12.8988, 74.8150, 'Serene, pine-shaded beach accessible via scenic Gurupura river boat.', 'Pine tree walk, Relaxation, Photography', false, 'November to March', 'images/Beaches/Tannirbhavi Beach.jpg'),
('Maravanthe Beach', 'Udupi District', 13.7020, 74.6540, 'Scenic highway with the Arabian Sea on one side and Souparnika River on the other.', 'Scenic driving, Sunset photography', false, 'September to March', 'images/Beaches/Maravanthe Beach.jpg'),
('St. Marys Island', 'Udupi District', 13.3760, 74.6730, 'Hexagonal columnar basaltic rock formations from 88 million years ago.', 'Geology exploration, Photography, Shell gathering', false, 'October to May', 'images/Beaches/St. Marys Island.jpg')
ON DUPLICATE KEY UPDATE name=name;

-- Pre-seeding Sample Temples
INSERT INTO temples (name, deity, district, latitude, longitude, significance, timings, dress_code, image_url)
VALUES
('Sri Krishna Matha', 'Lord Krishna', 'Udupi District', 13.3409, 74.7522, 'Founded by Jagadguru Madhvacharya in the 13th century. Balakrishna is viewed through Kanakana Kindi.', '05:00 AM - 09:30 PM', 'Traditional attire. Men remove shirts in inner sanctum.', 'images/history/Sri Krishna Matha - Iconic Pilgrimage, Udupi.jpg'),
('Kateel Sri Durgaparameshwari', 'Goddess Durga', 'Dakshina Kannada', 13.0130, 74.8450, 'Holy shrine located on a river island in the holy waters of Nandini River.', '06:00 AM - 09:30 PM', 'Modest traditional dress required.', 'images/history/Kateel Temple - Kondemula, Kulai.jpg'),
('Murudeshwara Temple', 'Lord Shiva', 'Coastal North', 14.0940, 74.4850, 'Surrounded by sea on three sides with the world second tallest Shiva statue (123 ft).', '03:00 AM - 08:00 PM', 'Casual respectful attire permitted in complex.', 'images/history/Murudeshwara Temple - Famous Shiva Temple, Murudeshwara.jpg'),
('Kollur Mookambika Temple', 'Mookambika Devi', 'Coastal North', 13.8640, 74.9120, 'One of the seven sacred Muktikshethras of Karnataka at the foothills of Kodachadri.', '05:00 AM - 09:00 PM', 'Dhoti / Saree compulsory for inner sanctum entry.', 'images/history/Om Mookambika Temple - Kollur, Byndoor.jpg')
ON DUPLICATE KEY UPDATE name=name;

-- Pre-seeding Sample Foods
INSERT INTO foods (name, category, description, is_gluten_free, image_url)
VALUES
('Neer Dosa', 'VEG', 'Gossamer-thin, paper-soft rice crepes served with coconut chutney & jaggery milk.', true, 'images/food/Veg Food/Neer Dosa.jpg'),
('Golibaje', 'VEG', 'Crispy golden spongy fritters flavoured with green chillies, ginger, and curry leaves.', false, 'images/food/Veg Food/Golibaje.jpg'),
('Prawn Ghee Roast', 'NON_VEG', 'Plump prawns slow-roasted in pure ghee with charred Byadagi chillies and kokum.', true, 'images/food/Non-Veg Food/Prawn Ghee Roast.jpg'),
('Kori Rotti', 'NON_VEG', 'Crispy dehydrated rice crisps soaked in fragrant chicken coconut curry.', true, 'images/food/Non-Veg Food/Kori Rotti.jpg'),
('Bangude Gassi', 'FISH', 'Indian mackerel simmered in a coconut, coriander, and dry kokum broth.', true, 'images/food/Non-Veg Food/Bangude Gassi.jpg')
ON DUPLICATE KEY UPDATE name=name;

-- Pre-seeding Traditions
INSERT INTO festivals (name, category, season, description, cultural_importance, image_url)
VALUES
('Yakshagana', 'Dance-Drama', 'November to May', 'All-night classical theater with heavy makeup, soaring headgear, and Chande drumming.', 'Preserves ancient puranic epics with improvisational dialogue.', 'images/Culture/Yakshagana.jpg'),
('Kambala', 'Traditional Sport', 'November to March', 'High-speed traditional buffalo racing in slushy waterlogged paddy fields.', 'Celebrates agricultural gratitude and ancestral heritage.', 'images/Culture/Kambala.jpeg')
ON DUPLICATE KEY UPDATE name=name;