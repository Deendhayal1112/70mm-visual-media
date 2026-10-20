-- ==============================================================================
-- 70MM VISUAL MEDIA — One-Time Administrator Bootstrap Script
-- ==============================================================================
-- Instructions:
-- 1. Create your admin user in Supabase Dashboard -> Authentication -> Users.
-- 2. Replace '<ADMIN_USER_EMAIL>' below with your actual admin email address.
-- 3. Execute this script in the Supabase SQL Editor.
-- ==============================================================================

DO $$
DECLARE
  target_user_id UUID;
  target_email TEXT := '<ADMIN_USER_EMAIL>'; -- REPLACE WITH YOUR ADMIN EMAIL
BEGIN
  -- Look up user ID from auth.users
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE lower(email) = lower(target_email);

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email "%" was not found in auth.users. Please create the user in the Supabase Auth dashboard first.', target_email;
  END IF;

  -- Insert or promote profile to admin
  INSERT INTO public.profiles (id, full_name, role, created_at, updated_at)
  VALUES (target_user_id, 'Lead Administrator', 'admin', NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    updated_at = NOW();

  RAISE NOTICE 'Successfully bootstrapped administrator profile for % (UID: %)', target_email, target_user_id;
END $$;
