-- Migration: Allow unauthenticated users to like posts
-- Run this migration if you have an existing database

-- Step 1: Make user_id nullable and add guest_session_id column
ALTER TABLE likes 
  ALTER COLUMN user_id DROP NOT NULL,
  ADD COLUMN guest_session_id TEXT;

-- Step 2: Add check constraint to ensure at least one identifier is set
ALTER TABLE likes 
  ADD CONSTRAINT likes_user_or_guest_check 
  CHECK ((user_id IS NOT NULL) OR (guest_session_id IS NOT NULL));

-- Step 3: Update unique constraints
-- Drop existing unique constraint
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_post_id_user_id_key;

-- Add separate unique constraints for user_id and guest_session_id
ALTER TABLE likes 
  ADD CONSTRAINT likes_post_id_user_id_unique 
  UNIQUE (post_id, user_id);

ALTER TABLE likes 
  ADD CONSTRAINT likes_post_id_guest_session_id_unique 
  UNIQUE (post_id, guest_session_id);

-- Step 4: Add index for guest_session_id
CREATE INDEX IF NOT EXISTS idx_likes_guest_session ON likes(guest_session_id);

-- Step 5: Drop old RLS policies
DROP POLICY IF EXISTS "Authenticated users can like posts" ON likes;
DROP POLICY IF EXISTS "Users can unlike posts" ON likes;

-- Step 6: Create new RLS policies
CREATE POLICY "Anyone can like posts"
    ON likes FOR INSERT
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        (auth.uid() IS NULL AND guest_session_id IS NOT NULL)
    );

CREATE POLICY "Users can unlike their own likes"
    ON likes FOR DELETE
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        (auth.uid() IS NULL AND guest_session_id IS NOT NULL)
    );

