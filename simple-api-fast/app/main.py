import logging
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

from app.endpoints import router

app = FastAPI()

# Criando um logger instrumentado corretamente
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Altere conforme necessário
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers, incluindo traceparent e b3
)


app.include_router(router)
# FastAPIInstrumentor.instrument_app(app)
#

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)

