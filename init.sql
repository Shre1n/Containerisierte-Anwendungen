USE webappdb;

CREATE TABLE user_table (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  accessId VARCHAR(255) NOT NULL,
  vorname VARCHAR(255),
  nachname VARCHAR(255)
);

CREATE TABLE module (
  module_id INT(11) AUTO_INCREMENT PRIMARY KEY,
  module_name VARCHAR(255) NOT NULL,
  crp INT(11) NOT NULL,
  weight INT(11) NOT NULL,
  grade INT(11) NOT NULL
);

CREATE TABLE user_module (
  user_id INT(11) NOT NULL,
  module_id INT(11) NOT NULL
);

ALTER TABLE user_module
ADD FOREIGN KEY (user_id) REFERENCES user_table(id),
ADD FOREIGN KEY (module_id) REFERENCES module(module_id) ON DELETE CASCADE;


INSERT INTO module (module_id, module_name, crp, weight, grade) VALUES
(1, "Naturwissenschaftliche und technische Grundlagen", 6, 1, 65),
(2, "LA", 6, 1, 50),
(3, "DM", 6, 1, 78),
(4, "Algorithmen auf Sequenzen", 6, 2, 70),
(5, "AUD", 6, 1, 90);
