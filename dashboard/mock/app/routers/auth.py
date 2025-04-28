from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Optional

from app.schemas.auth import (
    UserRegister, 
    UserLogin, 
    Token, 
    EmailVerificationRequest, 
    PasswordResetRequest, 
    PasswordReset,
    UserResponse,
    UserProfile,
    ResendVerificationRequest
)
from app.db import mock_db
from app.utils.auth import (
    verify_password, 
    get_password_hash, 
    create_access_token, 
    decode_token,
    generate_verification_token,
    generate_reset_token
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

# OAuth2 password bearer token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


# Current user dependency
async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_token(token)
    if payload is None:
        raise credentials_exception
    
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    
    user = mock_db.get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    
    return user


# Register a new user
@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def register(user_data: UserRegister):
    # Check if email already exists
    if mock_db.get_user_by_email(user_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    user_id = mock_db.create_user(user_data.email, hashed_password, user_data.full_name)
    
    # Generate verification token
    token = generate_verification_token()
    mock_db.save_verification_token(user_id, token)
    
    # Return user data
    user = mock_db.get_user_by_id(user_id)
    return UserResponse(
        user_id=user["user_id"],
        email=user["email"],
        full_name=user["full_name"],
        is_verified=user["is_verified"],
        role=user["role"],
        requires_profile_setup=user["requires_profile_setup"]
    )


# Login user
@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Get user by email
    user = mock_db.get_user_by_email(form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password
    if not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if email is verified
    if not user["is_verified"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified. Please verify your email before logging in.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user["user_id"], "email": user["email"]}
    )
    
    return Token(access_token=access_token, user_id=user["user_id"])


# Verify email
@router.post("/verify-email", response_model=UserResponse)
async def verify_email(verification_data: EmailVerificationRequest):
    token = verification_data.token
    user_id = mock_db.get_user_id_by_verification_token(token)
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification token"
        )
    
    # Mark user as verified
    if not mock_db.verify_user(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    # Get updated user data
    user = mock_db.get_user_by_id(user_id)
    
    return UserResponse(
        user_id=user["user_id"],
        email=user["email"],
        full_name=user["full_name"],
        is_verified=user["is_verified"],
        role=user["role"],
        organization=user.get("organization"),
        requires_profile_setup=user["requires_profile_setup"]
    )


# Resend verification email
@router.post("/resend-verification", status_code=status.HTTP_200_OK)
async def resend_verification(data: ResendVerificationRequest):
    user = mock_db.get_user_by_email(data.email)
    
    if not user:
        # For security reasons, don't reveal if the email exists
        return {"message": "If your email exists, a verification link has been sent"}
    
    if user["is_verified"]:
        return {"message": "Your email is already verified"}
    
    # Generate new verification token
    token = generate_verification_token()
    mock_db.save_verification_token(user["user_id"], token)
    
    # In a real implementation, send an email with the verification link
    # For mock purposes, just return success
    return {"message": "Verification email sent successfully"}


# Request password reset
@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(reset_request: PasswordResetRequest):
    user = mock_db.get_user_by_email(reset_request.email)
    
    # Always return success, even if email not found (security)
    if user:
        token = generate_reset_token()
        mock_db.save_reset_token(reset_request.email, token)
    
    return {"message": "Password reset link sent if email exists"}


# Reset password
@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(reset_data: PasswordReset):
    email = mock_db.get_email_by_reset_token(reset_data.token)
    
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired token"
        )
    
    # Update password
    hashed_password = get_password_hash(reset_data.password)
    if not mock_db.update_password(email, hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update password"
        )
    
    return {"message": "Password updated successfully"}


# Complete user profile
@router.post("/complete-profile", response_model=UserResponse)
async def complete_profile(token: str, profile_data: UserProfile):
    # Decode token to get user_id
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token data"
        )
    
    # Update profile
    if not mock_db.update_profile(user_id, profile_data.model_dump(exclude_unset=True)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update profile"
        )
    
    # Get updated user data
    user = mock_db.get_user_by_id(user_id)
    
    return UserResponse(
        user_id=user["user_id"],
        email=user["email"],
        full_name=user["full_name"],
        is_verified=user["is_verified"],
        role=user["role"],
        organization=user.get("organization"),
        requires_profile_setup=user["requires_profile_setup"]
    )


# Get current user
@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        user_id=current_user["user_id"],
        email=current_user["email"],
        full_name=current_user["full_name"],
        is_verified=current_user["is_verified"],
        role=current_user["role"],
        organization=current_user.get("organization"),
        requires_profile_setup=current_user["requires_profile_setup"]
    )


# Google OAuth endpoints
@router.get("/google/authorize")
async def google_authorize():
    # In a real implementation, generate a Google OAuth URL
    # For mock purposes, just return a dummy URL
    return {
        "authorization_url": "https://accounts.google.com/o/oauth2/auth?mock=true"
    }


@router.post("/google/callback")
async def google_callback(code: str):
    # In a real implementation, exchange the code for tokens and get user info
    # For mock purposes, just return a dummy token
    return {
        "access_token": "mock_google_token",
        "token_type": "bearer",
        "user_id": "google_user_123"
    } 