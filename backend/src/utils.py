from clerk_backend_api import Clerk, bearer_auth, AuthenticateRequestOptions
from fastapi import HTTPException

import os
from dotenv import load_dotenv

load_dotenv()

clerk_sdk = Clerk(bearer_auth==os.getenv("CLERK_SECRET_KEY"))

def get_clerk_user_credentials(request):
    try:
        request_state = clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173"],
                jwt_key=os.getenv("CLERK_JWT_KEY")
            )
        )
        
        if not request_state.is_signed_in:
            raise HTTPException(
                status_code=401,
                detail="Unauthorized: Bad credentials",
            )
        
        user_id = request_state.user_id
        
        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Unauthorized: User ID not found",
            )
        
        return {"user_id": user_id}
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error: " + str(e),
        )