CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT NOT NULL DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('anna', 'www.a.com', 'TitleA', 3);

INSERT INTO blogs (author, url, title, likes)
VALUES ('bia', 'www.b.com', 'TitleB', 10);