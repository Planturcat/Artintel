import uuid
from datetime import datetime
from typing import Dict, List, Optional

# Mock database storage
users_db: Dict[str, dict] = {}
password_reset_tokens: Dict[str, str] = {}
verification_tokens: Dict[str, str] = {}


def create_user(email: str, hashed_password: str, full_name: str) -> str:
    """Create a new user and return the user_id"""
    user_id = str(uuid.uuid4())
    users_db[user_id] = {
        "user_id": user_id,
        "email": email,
        "hashed_password": hashed_password,
        "full_name": full_name,
        "is_verified": False,
        "role": "user",
        "created_at": datetime.utcnow().isoformat(),
        "requires_profile_setup": True
    }
    return user_id


def get_user_by_email(email: str) -> Optional[dict]:
    """Get a user by email"""
    for user_id, user in users_db.items():
        if user["email"] == email:
            return user
    return None


def get_user_by_id(user_id: str) -> Optional[dict]:
    """Get a user by ID"""
    return users_db.get(user_id)


def save_verification_token(user_id: str, token: str) -> None:
    """Save a verification token for a user"""
    verification_tokens[token] = user_id


def get_user_id_by_verification_token(token: str) -> Optional[str]:
    """Get a user ID by verification token"""
    return verification_tokens.get(token)


def verify_user(user_id: str) -> bool:
    """Mark a user as verified"""
    if user_id in users_db:
        users_db[user_id]["is_verified"] = True
        return True
    return False


def save_reset_token(email: str, token: str) -> None:
    """Save a password reset token"""
    password_reset_tokens[token] = email


def get_email_by_reset_token(token: str) -> Optional[str]:
    """Get an email by reset token"""
    return password_reset_tokens.get(token)


def update_password(email: str, hashed_password: str) -> bool:
    """Update a user's password"""
    user = get_user_by_email(email)
    if user:
        users_db[user["user_id"]]["hashed_password"] = hashed_password
        return True
    return False


def update_profile(user_id: str, profile_data: dict) -> bool:
    """Update a user's profile"""
    if user_id in users_db:
        user = users_db[user_id]
        
        # Update fields
        if "full_name" in profile_data:
            user["full_name"] = profile_data["full_name"]
        
        if "bio" in profile_data:
            user["bio"] = profile_data["bio"]
            
        if "organization" in profile_data:
            user["organization"] = profile_data["organization"]
            
        if "preferences" in profile_data:
            user["preferences"] = profile_data["preferences"]
            
        # Mark profile as completed
        user["requires_profile_setup"] = False
        
        return True
    return False

# Add some sample users for testing
def add_sample_users():
    from app.utils.auth import get_password_hash
    
    # Sample admin user
    admin_id = str(uuid.uuid4())
    users_db[admin_id] = {
        "user_id": admin_id,
        "email": "admin@artintellm.com",
        "hashed_password": get_password_hash("admin1234"),
        "full_name": "Admin User",
        "is_verified": True,
        "role": "admin",
        "created_at": datetime.utcnow().isoformat(),
        "requires_profile_setup": False
    }
    
    # Sample regular user
    user_id = str(uuid.uuid4())
    users_db[user_id] = {
        "user_id": user_id,
        "email": "user@example.com",
        "hashed_password": get_password_hash("user1234"),
        "full_name": "Demo User",
        "is_verified": True,
        "role": "user",
        "created_at": datetime.utcnow().isoformat(),
        "requires_profile_setup": False
    } 