-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notebooks table
CREATE TABLE IF NOT EXISTS notebooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'Untitled',
  content JSONB DEFAULT '{"type":"doc","content":[{"type":"paragraph"}]}'::jsonb,
  notebook_id UUID REFERENCES notebooks(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note tags junction table
CREATE TABLE IF NOT EXISTS note_tags (
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, tag_id)
);

-- Collaborators table (for sharing notes/notebooks)
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  notebook_id UUID REFERENCES notebooks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('viewer', 'editor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT collaborator_target CHECK (
    (note_id IS NOT NULL AND notebook_id IS NULL) OR
    (note_id IS NULL AND notebook_id IS NOT NULL)
  )
);

-- Note versions table (for version history)
CREATE TABLE IF NOT EXISTS note_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  title TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity feed table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  notebook_id UUID REFERENCES notebooks(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'deleted', 'shared', 'commented')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_notes_owner ON notes(owner_id);
CREATE INDEX IF NOT EXISTS idx_notes_notebook ON notes(notebook_id);
CREATE INDEX IF NOT EXISTS idx_notes_updated ON notes(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_notebooks_owner ON notebooks(owner_id);
CREATE INDEX IF NOT EXISTS idx_collaborators_user ON collaborators(user_id);
CREATE INDEX IF NOT EXISTS idx_collaborators_note ON collaborators(note_id);
CREATE INDEX IF NOT EXISTS idx_collaborators_notebook ON collaborators(notebook_id);
CREATE INDEX IF NOT EXISTS idx_note_versions_note ON note_versions(note_id);
CREATE INDEX IF NOT EXISTS idx_comments_note ON comments(note_id);
CREATE INDEX IF NOT EXISTS idx_activities_user ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_created ON activities(created_at DESC);
