#!/bin/sh

# Inicie a aplicação com a instrumentação do OpenTelemetry
source /home/ion/.pyenv/versions/3.10.10/envs/simple-api/bin/activate

opentelemetry-instrument --traces_exporter otlp --metrics_exporter otlp --logs_exporter console uvicorn app.main:app --host 0.0.0.0 --port 8080 --log-level debug