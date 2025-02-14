/* Replace with your SQL commands */
CREATE TABLE admins (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'admin', -- Allows role-based permissions
    created_at TIMESTAMP DEFAULT NOW()
);
