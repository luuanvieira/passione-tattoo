from fastapi import APIRouter
from model.chat_interaction import ChatInteraction
from graph import create_graph
from langchain_core.messages import HumanMessage
from datetime import datetime

router = APIRouter()
graph = create_graph()

@router.post("/chat")
def chat(chat_interaction: ChatInteraction):
    
    config = {
        "configurable": {
            "thread_id": chat_interaction.session_id
        }
    }

    result = graph.invoke({"messages": [HumanMessage(content=chat_interaction.message)]}, config)
    
    return ChatInteraction(
        session_id=chat_interaction.session_id,
        message=result["messages"][-1].content,
        role="assistant",
        timestamp=datetime.now()
    )