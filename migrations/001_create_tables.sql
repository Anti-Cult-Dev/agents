-- Migration: Create initial tables for workflows, servers, and UIs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nodes JSONB NOT NULL,
  connections JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nodes JSONB NOT NULL,
  connections JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS uis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nodes JSONB NOT NULL,
  connections JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workflows_updated
  BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER servers_updated
  BEFORE UPDATE ON servers
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER uis_updated
  BEFORE UPDATE ON uis
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();
