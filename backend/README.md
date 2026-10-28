# Venue Control API

Arquitectura local para el backend de Venue Control con Serverless Framework y Node.js + TypeScript.

## Arquitectura

- API Gateway expone las rutas HTTP.
- Cada función Lambda vive en `src/zones/*.ts`.
- La capa de dominio y validación está en `src/zones/model.ts`.
- El almacenamiento local se realiza en `data/zones.json` para que las escrituras simuladas sobrevivan entre invocaciones durante `serverless-offline`.
- La persistencia es simulada (no es DynamoDB): se usa un fichero JSON para demostrar el contrato real sin depender de infraestructura adicional.

## Contrato HTTP

GET /zones
GET /zones/{id}
POST /zones
PUT /zones/{id}
PATCH /zones/{id}
DELETE /zones/{id}

### pathParameters, body, JSON.parse, statusCode y PUT/PATCH

- `pathParameters` son los valores de la ruta, por ejemplo `id` en `/zones/ZONE-07`.
- `body` llega como texto JSON en `event.body` y se debe parsear con `JSON.parse` (o con una función wrapper que lo haga y valide el tipo).
- `statusCode` representa el resultado HTTP: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`.
- `PUT` reemplaza el recurso completo y exige los tres campos obligatorios: `name`, `capacity`, `status`.
- `PATCH` solo modifica `status` y acepta un cuerpo parcial, por ejemplo `{ "status": "CLOSED" }`.

## Ejecución local

1. Instala dependencias:
   npm install
2. Compila TypeScript:
   npm run build
3. Inicia la API local:
   AWS_REGION=us-east-1 LAMBDA_ROLE_ARN=arn:aws:iam::123456789012:role/local-role npx serverless offline start --host 127.0.0.1 --httpPort 4000 --lambdaPort 4102

También existe el atajo:

npm run start

## Validación con curl

### GET
curl.exe -i http://127.0.0.1:4000/dev/zones

### POST
curl.exe -i -X POST http://127.0.0.1:4000/dev/zones -H "Content-Type: application/json" --data-binary @create.json

### PUT
curl.exe -i -X PUT http://127.0.0.1:4000/dev/zones/ZONE-05 -H "Content-Type: application/json" --data-binary @replace.json

### PATCH
curl.exe -i -X PATCH http://127.0.0.1:4000/dev/zones/ZONE-05 -H "Content-Type: application/json" --data-binary @patch.json

### DELETE
curl.exe -i -X DELETE http://127.0.0.1:4000/dev/zones/ZONE-05

## Despliegue AWS

Se despliega con:

serverless deploy

Se recomienda no guardar credenciales en el repositorio, y usar variables de entorno o el perfil configurado por AWS Academy.

## Notas de implementación

- El backend está en TypeScript y compila con `tsc`.
- El contrato HTTP se prueba con peticiones reales sobre `localhost` para confirmar validaciones, errores y estados.
- El cliente móvil apunta por defecto a `http://localhost:4000/dev` y puede sobreescribirse con `EXPO_PUBLIC_API_URL`.
