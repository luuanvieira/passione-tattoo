from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ChatInteraction(BaseModel):
    session_id: str
    message: str
    role: Optional[str] = None
    timestamp: Optional[datetime] = None