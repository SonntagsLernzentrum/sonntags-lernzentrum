CREATE DATABASE IF NOT EXISTS sonntags_lernzentrum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sonntags_lernzentrum;

CREATE TABLE IF NOT EXISTS parents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_number VARCHAR(32) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  salutation VARCHAR(20), first_name VARCHAR(100), last_name VARCHAR(100),
  email VARCHAR(180), phone VARCHAR(50), street VARCHAR(180), zip VARCHAR(20), city VARCHAR(100),
  sole_custody BOOLEAN DEFAULT FALSE, proof_file VARCHAR(255),
  payment_method ENUM('Barzahlung','EC-Karte','Visa','Mastercard','Vorkasse','Rechnung 7 Tage','Rechnung 14 Tage','Rechnung Öffentliche Einrichtung 30 Tage','SEPA Lastschrift') DEFAULT 'Rechnung 14 Tage',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS second_guardians (
  id INT AUTO_INCREMENT PRIMARY KEY, parent_id INT NOT NULL,
  salutation VARCHAR(20), first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(180), phone VARCHAR(50), street VARCHAR(180), zip VARCHAR(20), city VARCHAR(100),
  FOREIGN KEY(parent_id) REFERENCES parents(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_number VARCHAR(32) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('verwaltung','lehrer','buchhaltung') NOT NULL,
  salutation VARCHAR(20), first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(180),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS schools (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(180) NOT NULL, type VARCHAR(80));
CREATE TABLE IF NOT EXISTS tariffs (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(80) UNIQUE NOT NULL);
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_id INT NOT NULL, name VARCHAR(120) NOT NULL, birthdate DATE, class_name VARCHAR(50), school_id INT, school_type VARCHAR(80), tariff_id INT, subject VARCHAR(80),
  FOREIGN KEY(parent_id) REFERENCES parents(id), FOREIGN KEY(school_id) REFERENCES schools(id), FOREIGN KEY(tariff_id) REFERENCES tariffs(id)
);
CREATE TABLE IF NOT EXISTS contracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contract_number VARCHAR(40) UNIQUE NOT NULL,
  type ENUM('Nachhilfe','Quali Vorbereitung','M-Zweig Vorbereitung','Deutschkurs B1','Deutschkurs B2','Sachkunde §34a GewO','Fachkunde für Taxi und Mietwagenunternehmer') NOT NULL,
  student_id INT NOT NULL, subject VARCHAR(80), tariff VARCHAR(80), start_date DATE NOT NULL, end_date DATE NOT NULL, status ENUM('aktiv','gekündigt','widerrufen','beendet') DEFAULT 'aktiv',
  FOREIGN KEY(student_id) REFERENCES students(id)
);
CREATE TABLE IF NOT EXISTS invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_id INT NOT NULL, invoice_number VARCHAR(40) UNIQUE NOT NULL, title VARCHAR(255), amount DECIMAL(10,2), travel_zone_amount DECIMAL(10,2) DEFAULT 0, travel_zone INT DEFAULT 1,
  vat_text VARCHAR(255) DEFAULT 'MwSt. 0% §4 Nr.21a)bb) UStG Umsatzsteuerfrei', total DECIMAL(10,2), due_date DATE, status ENUM('offen','bezahlt','überfällig') DEFAULT 'offen', pdf_file VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(parent_id) REFERENCES parents(id)
);
CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, title VARCHAR(180), type VARCHAR(80), file_path VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY, parent_id INT, contract_id INT, type ENUM('kündigung','widerruf') NOT NULL, message TEXT, status ENUM('neu','bearbeitet') DEFAULT 'neu', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(parent_id) REFERENCES parents(id), FOREIGN KEY(contract_id) REFERENCES contracts(id)
);
