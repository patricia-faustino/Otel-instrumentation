# app/endpoints.py
import logging

from fastapi import APIRouter, HTTPException, Request
from opentelemetry.trace import get_tracer

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

router = APIRouter()

tracer = get_tracer('tracer')

@router.get("/get")
async def process_config_endpoint():
    try:
      return {"message": "Hello World"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/context")
async def hello(request: Request):
    logger.info("Recebida requisição no /context")

    # Exibir os headers recebidos (para validar propagação)
    print(request.headers)

    with tracer.start_as_current_span("processar_contexto") as span:
        span.set_attribute("http.method", "GET")
        span.set_attribute("http.url", str(request.url))

        span.add_event("Iniciando processamento")

        logger.info("Executando lógica do endpoint /context")

        span.add_event("Finalizando processamento")
        logger.info("Resposta enviada com sucesso")

        return {"message": "Hello from API 2!"}