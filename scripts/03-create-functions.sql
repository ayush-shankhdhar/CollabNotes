-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_notebooks
  BEFORE UPDATE ON notebooks
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_notes
  BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_comments
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Function to create a version snapshot when a note is updated
CREATE OR REPLACE FUNCTION public.create_note_version()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create version if content or title changed
  IF OLD.content IS DISTINCT FROM NEW.content OR OLD.title IS DISTINCT FROM NEW.title THEN
    INSERT INTO note_versions (note_id, content, title, created_by)
    VALUES (OLD.id, OLD.content, OLD.title, NEW.owner_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create version on note update
DROP TRIGGER IF EXISTS on_note_updated ON notes;
CREATE TRIGGER on_note_updated
  BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION create_note_version();

-- Function to log activities
CREATE OR REPLACE FUNCTION public.log_activity()
RETURNS TRIGGER AS $$
DECLARE
  action_type TEXT;
BEGIN
  IF TG_OP = 'INSERT' THEN
    action_type := 'created';
  ELSIF TG_OP = 'UPDATE' THEN
    action_type := 'updated';
  ELSIF TG_OP = 'DELETE' THEN
    action_type := 'deleted';
  END IF;

  IF TG_TABLE_NAME = 'notes' THEN
    INSERT INTO activities (user_id, note_id, action)
    VALUES (
      COALESCE(NEW.owner_id, OLD.owner_id),
      COALESCE(NEW.id, OLD.id),
      action_type
    );
  ELSIF TG_TABLE_NAME = 'notebooks' THEN
    INSERT INTO activities (user_id, notebook_id, action)
    VALUES (
      COALESCE(NEW.owner_id, OLD.owner_id),
      COALESCE(NEW.id, OLD.id),
      action_type
    );
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for activity logging
CREATE TRIGGER log_note_activity
  AFTER INSERT OR UPDATE OR DELETE ON notes
  FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_notebook_activity
  AFTER INSERT OR UPDATE OR DELETE ON notebooks
  FOR EACH ROW EXECUTE FUNCTION log_activity();
