from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, Literal


class UserBase(BaseModel):
    email: EmailStr


class UserRegister(UserBase):
    password: str = Field(..., min_length=8)
    confirm_password: str
    full_name: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v


class UserLogin(UserBase):
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str


class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[str] = None


class EmailVerificationRequest(BaseModel):
    token: str


class ResendVerificationRequest(BaseModel):
    email: EmailStr


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordReset(BaseModel):
    token: str
    password: str = Field(..., min_length=8)
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v


class UserProfile(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    organization: Optional[str] = None
    preferences: Optional[dict] = None


class UserResponse(BaseModel):
    user_id: str
    email: EmailStr
    full_name: Optional[str] = None
    is_verified: bool = False
    role: str = "user"
    organization: Optional[str] = None
    requires_profile_setup: bool = True 