# 70MM VISUAL MEDIA — Secure Administrator Bootstrap Guide

This document outlines the **one-time secure bootstrap process** for establishing the first platform administrator for 70MM VISUAL MEDIA.

---

## 1. Security Architecture Rules

To prevent authentication vulnerabilities and unauthorized access:
1. **No Public Registration:** Self-service registration is permanently disabled. There is no public signup API route, public registration form, or open Auth hook.
2. **No Hardcoded Credentials:** Never hardcode passwords, API keys, email addresses, or JWT tokens in source code or migration files.
3. **Privilege Separation:** Users cannot grant themselves administrator privileges. The `protect_profile_role` database trigger rejects role mutations unless initiated by an existing verified administrator or direct dashboard SQL.
4. **Least Privilege Default:** Any user created in `auth.users` receives a default role of `'editor'` in `public.profiles` unless explicitly promoted by the project owner.

---

## 2. Step-by-Step Bootstrap Process

### Step A: Create the Administrator Identity via Supabase Auth
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your **70MM Visual Media** project.
3. In the sidebar, navigate to **Authentication** -> **Users**.
4. Click **Add user** -> **Create user**.
5. Enter:
   - **User Email:** The verified administrative email address for the agency (e.g. `owner@70mmvisualmedia.com`).
   - **Password:** Generate a strong, unique 16+ character password (stored in your secure team password manager).
   - **Auto-Confirm User:** Toggle **Enabled** (checked) so email confirmation is pre-verified.
6. Click **Create user**.
7. Copy the newly created user's **User UID** (a UUID like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).

---

### Step B: Promote User to Administrator Role via SQL Editor
1. In the Supabase sidebar, open the **SQL Editor**.
2. Click **New query**.
3. Paste and run the bootstrap script below, replacing `<ADMIN_USER_EMAIL>` with the email entered in Step A:

```sql
-- 70MM VISUAL MEDIA — One-Time Administrator Bootstrap
DO $$
DECLARE
  target_user_id UUID;
  target_email TEXT := '<ADMIN_USER_EMAIL>'; -- REPLACE WITH YOUR ADMIN EMAIL
BEGIN
  -- Look up user ID from auth.users
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = target_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % was not found in auth.users. Please create the user in the Supabase Auth dashboard first.', target_email;
  END IF;

  -- Insert or promote profile to admin
  INSERT INTO public.profiles (id, full_name, role, created_at, updated_at)
  VALUES (target_user_id, 'Lead Administrator', 'admin', NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    updated_at = NOW();

  RAISE NOTICE 'Successfully bootstrapped administrator profile for % (UID: %)', target_email, target_user_id;
END $$;
```

4. Confirm the output says: `Successfully bootstrapped administrator profile...`.

---

### Step C: Verify the Bootstrap State
Run this verification query in the SQL Editor:

```sql
SELECT 
  p.id,
  u.email,
  p.full_name,
  p.role,
  p.created_at
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.role = 'admin';
```

Verify that:
- The row appears with `role = 'admin'`.
- The user is now permitted to authenticate at `/admin/login`.

---

## 3. Inviting Future Staff (Editors vs Administrators)

- **To invite an Editor (Content Only):**
  1. Create user in Supabase Auth -> Users.
  2. Insert their profile with `role = 'editor'`.
  3. Editors can create and update projects, services, and equipment. They **cannot** access confidential client enquiries, site settings, or elevate user permissions.
- **To invite an Administrator:**
  1. Only an existing verified administrator can promote another user by updating `profiles.role` to `'admin'`.
