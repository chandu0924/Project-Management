CREATE SCHEMA IF NOT EXISTS clone;

CREATE TABLE clone.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) ,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clone.projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  owner_id INTEGER REFERENCES clone.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clone.epics (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES clone.projects(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'ToDo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clone.user_stories (
  id SERIAL PRIMARY KEY,
  epic_id INTEGER REFERENCES clone.epics(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'ToDo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clone.tasks (
  id SERIAL PRIMARY KEY,
  user_story_id INTEGER REFERENCES clone.user_stories(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'ToDo',
  priority INTEGER DEFAULT 1,
  assigned_to INTEGER REFERENCES clone.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clone.sprints (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES clone.projects(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clone.sprint_tasks (
  sprint_id INTEGER REFERENCES clone.sprints(id) ON DELETE CASCADE,
  task_id INTEGER REFERENCES clone.tasks(id) ON DELETE CASCADE,
  PRIMARY KEY (sprint_id, task_id)
);
