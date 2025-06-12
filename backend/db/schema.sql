CREATE SCHEMA clone;

CREATE TABLE clone.projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clone.sprints (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES clone.projects(id) ON DELETE CASCADE,
  name VARCHAR(100),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'Active'
);

CREATE TABLE clone.backlog_items (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES clone.projects(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES clone.backlog_items(id) ON DELETE CASCADE,
  sprint_id INTEGER REFERENCES clone.sprints(id) ON DELETE SET NULL,
  title VARCHAR(100),
  description TEXT,
  type VARCHAR(20), -- 'epic', 'story', 'task'
  status VARCHAR(20) DEFAULT 'ToDo'
);
