-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE note_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE note_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Notebooks policies
CREATE POLICY "Users can view their own notebooks"
  ON notebooks FOR SELECT
  USING (owner_id = auth.uid() OR id IN (
    SELECT notebook_id FROM collaborators WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create notebooks"
  ON notebooks FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update their own notebooks"
  ON notebooks FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Users can delete their own notebooks"
  ON notebooks FOR DELETE
  USING (owner_id = auth.uid());

-- Notes policies
CREATE POLICY "Users can view their own notes or shared notes"
  ON notes FOR SELECT
  USING (
    owner_id = auth.uid() OR
    is_public = TRUE OR
    id IN (SELECT note_id FROM collaborators WHERE user_id = auth.uid()) OR
    notebook_id IN (SELECT notebook_id FROM collaborators WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create notes"
  ON notes FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update their own notes or notes they can edit"
  ON notes FOR UPDATE
  USING (
    owner_id = auth.uid() OR
    id IN (SELECT note_id FROM collaborators WHERE user_id = auth.uid() AND role IN ('editor', 'admin'))
  );

CREATE POLICY "Users can delete their own notes"
  ON notes FOR DELETE
  USING (owner_id = auth.uid());

-- Tags policies (public read, authenticated write)
CREATE POLICY "Anyone can view tags"
  ON tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Note tags policies
CREATE POLICY "Users can view note tags for accessible notes"
  ON note_tags FOR SELECT
  USING (note_id IN (SELECT id FROM notes));

CREATE POLICY "Users can manage tags on their notes"
  ON note_tags FOR ALL
  USING (note_id IN (SELECT id FROM notes WHERE owner_id = auth.uid()));

-- Collaborators policies
CREATE POLICY "Users can view collaborators for their notes"
  ON collaborators FOR SELECT
  USING (
    user_id = auth.uid() OR
    note_id IN (SELECT id FROM notes WHERE owner_id = auth.uid()) OR
    notebook_id IN (SELECT id FROM notebooks WHERE owner_id = auth.uid())
  );

CREATE POLICY "Note owners can manage collaborators"
  ON collaborators FOR ALL
  USING (
    note_id IN (SELECT id FROM notes WHERE owner_id = auth.uid()) OR
    notebook_id IN (SELECT id FROM notebooks WHERE owner_id = auth.uid())
  );

-- Note versions policies
CREATE POLICY "Users can view versions of accessible notes"
  ON note_versions FOR SELECT
  USING (note_id IN (SELECT id FROM notes));

CREATE POLICY "System can create versions"
  ON note_versions FOR INSERT
  WITH CHECK (note_id IN (SELECT id FROM notes));

-- Comments policies
CREATE POLICY "Users can view comments on accessible notes"
  ON comments FOR SELECT
  USING (note_id IN (SELECT id FROM notes));

CREATE POLICY "Users can create comments on accessible notes"
  ON comments FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    note_id IN (SELECT id FROM notes)
  );

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  USING (user_id = auth.uid());

-- Activities policies
CREATE POLICY "Users can view their own activities"
  ON activities FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can create activities"
  ON activities FOR INSERT
  WITH CHECK (true);
