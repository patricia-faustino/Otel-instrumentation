import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';



const traceExporter = new OTLPTraceExporter({
  url: import.meta.env.VITE_OTEL_EXPORTER_URL,
  headers: {
    Authorization: `Api-Token ${import.meta.env.VITE_OTEL_API_TOKEN}`,
    "Content-Type": "application/x-protobuf",
  },
});

const provider = new WebTracerProvider({
  resource: new Resource({
    'service.name': 'simple-front',
  }),
  spanProcessors: [
    new BatchSpanProcessor(traceExporter),
    new SimpleSpanProcessor(new ConsoleSpanExporter())
  ],
});

provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new W3CTraceContextPropagator(), // Usa W3C em vez de B3
})


registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
    }),
  ],
});


