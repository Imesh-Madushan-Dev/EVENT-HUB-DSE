-- Create the database
CREATE DATABASE IF NOT EXISTS eventhub;
USE eventhub;

-- Users table (with proper password field length)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Events table (with image_url)
CREATE TABLE events (

    id INT AUTO_INCREMENT PRIMARY KEY,
     image_url VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME,
    location VARCHAR(255),
    category VARCHAR(50),

);

-- Insert sample users (passwords will be hashed when inserted through the application)
INSERT INTO users (name, email, password) VALUES
('John Doe', 'a@a.com', 'aaa'),


-- Insert sample events
INSERT INTO events (image_url, title, description, date, time, location, category) VALUES
('https://picsum.photos/200/300', 'Summer Music Festival', 'Join us for an amazing day of live music!', '2024-07-15', '14:00:00', 'Central Park', 'Music'),
('https://picsum.photos/200/300', 'Tech Conference', 'Annual technology conference', '2024-06-20', '09:00:00', 'Convention Center', 'Technology'),
('https://picsum.photos/200/300', 'Art Exhibition', 'Local artists showcase', '2024-05-10', '10:00:00', 'City Gallery', 'Arts');