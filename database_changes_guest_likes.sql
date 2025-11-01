-- =====================================================
-- DATABASE CHANGES: Allow Unauthenticated Users to Like Posts
-- =====================================================
-- This file contains all the database modifications
-- needed to enable unauthenticated (guest) users to like posts.
--
-- Date: 2024
-- Description: Modified the likes table and RLS policies to support
--              both authenticated and unauthenticated users.
--
-- IMPORTANT: Run this migration on existing databases.
-- For new databases, use the updated blog_schema.sql file.
-- =====================================================

-- =====================================================
-- STEP 1: MODIFY LIKES TABLE STRUCTURE
-- =====================================================

-- Make user_id nullable (was previously NOT NULL)
ALTER TABLE likes 
  ALTER COLUMN user_id DROP NOT NULL;

-- Add guest_session_id column for tracking unauthenticated users
ALTER TABLE likes 
  ADD COLUMN IF NOT EXISTS guest_session_id TEXT;

-- Add check constraint to ensure at least one identifier is set
-- (Either user_id for authenticated users OR guest_session_id for guests)
ALTER TABLE likes 
  DROP CONSTRAINT IF EXISTS likes_user_or_guest_check;

ALTER TABLE likes 
  ADD CONSTRAINT likes_user_or_guest_check 
  CHECK ((user_id IS NOT NULL) OR (guest_session_id IS NOT NULL));

-- =====================================================
-- STEP 2: UPDATE UNIQUE CONSTRAINTS
-- =====================================================

-- Drop existing unique constraint if it exists
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_post_id_user_id_key;
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_post_id_user_id_unique;
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_post_id_guest_session_id_unique;

-- Add separate unique constraints:
-- Note: PostgreSQL treats NULLs as distinct in unique constraints,
-- so we can have multiple rows with NULL user_id or NULL guest_session_id
-- This is intentional - the check constraint ensures only one is NULL

-- 1. One like per authenticated user per post (user_id must be unique when not NULL)
ALTER TABLE likes 
  ADD CONSTRAINT likes_post_id_user_id_unique 
  UNIQUE (post_id, user_id);

-- 2. One like per guest session per post (guest_session_id must be unique when not NULL)
ALTER TABLE likes 
  ADD CONSTRAINT likes_post_id_guest_session_id_unique 
  UNIQUE (post_id, guest_session_id);

-- =====================================================
-- STEP 3: ADD INDEXES
-- =====================================================

-- Add index for guest_session_id to optimize queries
CREATE INDEX IF NOT EXISTS idx_likes_guest_session 
  ON likes(guest_session_id);

-- =====================================================
-- STEP 4: UPDATE ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Drop old policies
DROP POLICY IF EXISTS "Authenticated users can like posts" ON likes;
DROP POLICY IF EXISTS "Users can unlike posts" ON likes;
DROP POLICY IF EXISTS "Users can unlike their own likes" ON likes;

-- Create new policy: Anyone (authenticated or guest) can like posts
CREATE POLICY "Anyone can like posts"
    ON likes FOR INSERT
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        (auth.uid() IS NULL AND guest_session_id IS NOT NULL)
    );

-- Create new policy: Users can unlike their own likes (authenticated or guest)
CREATE POLICY "Users can unlike their own likes"
    ON likes FOR DELETE
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        (auth.uid() IS NULL AND guest_session_id IS NOT NULL)
    );

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify the table structure
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'likes'
-- ORDER BY ordinal_position;

-- Verify constraints
-- SELECT constraint_name, constraint_type
-- FROM information_schema.table_constraints
-- WHERE table_name = 'likes';

-- Verify indexes
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'likes';

-- Verify policies
-- SELECT policyname, cmd, qual, with_check
-- FROM pg_policies
-- WHERE tablename = 'likes';

-- =====================================================
-- ROLLBACK SCRIPT (if needed)
-- =====================================================

-- To rollback these changes, run:
/*
-- Drop new policies
DROP POLICY IF EXISTS "Anyone can like posts" ON likes;
DROP POLICY IF EXISTS "Users can unlike their own likes" ON likes;

-- Restore old policies (if needed)
CREATE POLICY "Authenticated users can like posts"
    ON likes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
    ON likes FOR DELETE
    USING (auth.uid() = user_id);

-- Drop new index
DROP INDEX IF EXISTS idx_likes_guest_session;

-- Drop constraints
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_user_or_guest_check;
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_post_id_user_id_unique;
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_post_id_guest_session_id_unique;

-- Remove guest_session_id column
ALTER TABLE likes DROP COLUMN IF EXISTS guest_session_id;

-- Make user_id NOT NULL again (WARNING: Only if no NULL values exist)
-- ALTER TABLE likes ALTER COLUMN user_id SET NOT NULL;
*/

-- =====================================================
-- SUMMARY OF CHANGES
-- =====================================================
-- 1. ✅ Made user_id nullable in likes table
-- 2. ✅ Added guest_session_id column (TEXT)
-- 3. ✅ Added check constraint: user_id OR guest_session_id must be set
-- 4. ✅ Added unique constraints for both user_id and guest_session_id
-- 5. ✅ Added index on guest_session_id for performance
-- 6. ✅ Updated RLS policies to allow unauthenticated users
-- 7. ✅ Maintained backward compatibility with existing authenticated likes
-- =====================================================

