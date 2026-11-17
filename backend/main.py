from controller import auth_controller, client_contact_controller, chat_controller
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database import engine, Base


Base.metadata.create_all(bind=engine)
app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(auth_controller.router, tags=["auth"])
app.include_router(client_contact_controller.router, tags=["client-contacts"])
app.include_router(chat_controller.router, tags=["chat"])
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)