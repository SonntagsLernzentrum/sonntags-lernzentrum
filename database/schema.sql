-- Beispiel Datenbankstruktur fuer spaeter
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  login VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT,
  name VARCHAR(100),
  grade VARCHAR(20),
  school VARCHAR(255),
  school_type VARCHAR(100)
);

CREATE TABLE invoices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT,
  invoice_number VARCHAR(50),
  title VARCHAR(255),
  total DECIMAL(10,2),
  status VARCHAR(50)
);

CREATE TABLE contracts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT,
  contract_number VARCHAR(50),
  type VARCHAR(100),
  subject VARCHAR(100),
  tariff VARCHAR(100),
  start_date DATE,
  end_date DATE
);
