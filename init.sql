USE webappdb;

CREATE TABLE user_table (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  accessId VARCHAR(255) NOT NULL
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