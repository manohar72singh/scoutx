-- ScoutX Protection Group — MySQL Schema
-- Run this file once to initialise the database

CREATE DATABASE IF NOT EXISTS scoutx_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE scoutx_db;

-- Quote / lead requests from B2B clients
CREATE TABLE IF NOT EXISTS leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(150),
  contact_person VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(150),
  city VARCHAR(100),
  guards_needed INT,
  service_type VARCHAR(100),
  message TEXT,
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
);

-- Job applications from guard candidates
CREATE TABLE IF NOT EXISTS applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(150),
  position_applied VARCHAR(100),
  experience_years INT,
  resume_file_path VARCHAR(255),
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
);

-- Client testimonials (admin-managed)
CREATE TABLE IF NOT EXISTS testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_name VARCHAR(100),
  client_company VARCHAR(150),
  quote_text TEXT,
  logo_image_path VARCHAR(255),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin panel users
CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed: default admin (password: Admin@123 — change immediately after first login)
-- Password hash generated with bcrypt rounds=10
INSERT IGNORE INTO admin_users (username, password_hash)
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Seed: sample testimonials
INSERT IGNORE INTO testimonials (client_name, client_company, quote_text, is_featured) VALUES
('Rajesh Sharma', 'Green Valley RWA, Ghaziabad', 'ScoutX provided highly trained, disciplined guards for our society. Response time is excellent and the team is very professional. Highly recommended!', TRUE),
('Priya Mehta', 'TechCorp Pvt. Ltd., Noida', 'We have been using ScoutX for our office premises for over a year. Their guards are punctual, well-uniformed, and always vigilant. Great service!', TRUE),
('Amit Verma', 'Verma Textile Mills, Greater Noida', 'After switching to ScoutX, pilferage incidents in our factory dropped significantly. Their mobile patrol and supervisor checks give us real peace of mind.', TRUE);
