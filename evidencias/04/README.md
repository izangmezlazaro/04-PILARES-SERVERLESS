# Bloque 04
 
## Resultado
- Qué añadí al proyecto:
  - `backend/src/events/model.ts`: Modelo de datos en memoria (`catalog`), tipos (`FestivalEvent`, `EventStatus`, `EventInput`), función auxiliar de respuestas JSON con CORS (`json`), deserialización segura (`readBody`) y guardas de validación (`isEventInput`).
  - `backend/src/events/list.ts`: Handler para `GET /events` que devuelve el listado completo de actuaciones con HTTP 200.
  - `backend/src/events/get.ts`: Handler para `GET /events/{id}` que busca la actuación por identificador y devuelve 200 o 404 si no existe.
  - `backend/src/events/create.ts`: Handler para `POST /events` con validación de body (400 si faltan campos) y retorno de HTTP 201 (`EVT-NEW`).
  - `backend/src/events/replace.ts`: Handler para `PUT /events/{id}` que valida campos completos y devuelve 200 con `operation: "REPLACED"` o 400/404.
  - `backend/src/events/update.ts`: Handler para `PATCH /events/{id}` que admite únicamente el campo `status` (`CONFIRMED` o `CANCELLED`), devolviendo 200 con `operation: "UPDATED"` o 400 si se envían otros campos.
  - `backend/src/events/delete.ts`: Handler para `DELETE /events/{id}` que valida existencia y devuelve 200 con `operation: "DELETED"` o 404.
  - `backend/serverless.yml`: Definición de todas las rutas HTTP (`hello`, `listEvents`, `getEvent`, `createEvent`, `replaceEvent`, `updateEvent`, `deleteEvent`) con `cors: true`.

- Ruta o pantalla comprobada:
  - `POST http://localhost:3000/dev/events`
  - `GET http://localhost:3000/dev/events`
  - `GET http://localhost:3000/dev/events/EVT-101`
  - `GET http://localhost:3000/dev/events/EVT-NEW`
  - `GET http://localhost:3000/dev/events/NO-EXISTE`
  - `PUT http://localhost:3000/dev/events/EVT-101`
  - `PATCH http://localhost:3000/dev/events/EVT-101`
  - `DELETE http://localhost:3000/dev/events/EVT-102`
  - `OPTIONS http://localhost:3000/dev/events`

- Estado y respuesta observados:
  - `POST /events` (válido): `HTTP/1.1 201 Created` con `{"id":"EVT-NEW","artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}`.
  - `POST /events` (incompleto): `HTTP/1.1 400 Bad Request` con `{"message":"artist, space y time (HH:mm) son obligatorios"}`.
  - `POST /events` (JSON malformado `{`): `HTTP/1.1 400 Bad Request` con `{"message":"JSON inválido"}`.
  - `GET /events`: `HTTP/1.1 200 OK` con catálogo de 2 eventos (`EVT-101` y `EVT-102`).
  - `GET /events/EVT-101`: `HTTP/1.1 200 OK` con la ficha de Neon Waves.
  - `GET /events/NO-EXISTE`: `HTTP/1.1 404 Not Found` con `{"message":"Evento no encontrado"}`.
  - `PUT /events/EVT-101` (válido): `HTTP/1.1 200 OK` con `{"id":"EVT-101",...,"operation":"REPLACED"}`.
  - `PUT /events/EVT-101` (incompleto): `HTTP/1.1 400 Bad Request` con `{"message":"PUT requiere artist, space, time HH:mm y status válido"}`.
  - `PATCH /events/EVT-101` (válido): `HTTP/1.1 200 OK` con `{"id":"EVT-101","changes":{"status":"CANCELLED"},"operation":"UPDATED"}`.
  - `PATCH /events/EVT-101` (campo time inválido): `HTTP/1.1 400 Bad Request` con `{"message":"PATCH admite únicamente status CONFIRMED o CANCELLED"}`.
  - `DELETE /events/EVT-102`: `HTTP/1.1 200 OK` con `{"id":"EVT-102","operation":"DELETED"}`.
  - `OPTIONS /events`: `HTTP/1.1 200 OK` con cabeceras CORS (`Access-Control-Allow-Origin: http://localhost:8081`, `Access-Control-Allow-Methods: POST`, `Content-Length: 0`).
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: Serverless Offline escucha en `http://localhost:3000`. Al recibir una petición HTTP en `/dev/events` o `/dev/events/{id}`, evalúa el método (GET, POST, PUT, PATCH, DELETE u OPTIONS) y la ruta según lo configurado en `serverless.yml`, invocando el handler compilado correspondiente en `dist/events/`. La función Lambda extrae los parámetros de URL (`event.pathParameters.id`) o parsea el cuerpo (`event.body`) usando `readBody()`. Las funciones de guarda (`isEventInput`) comprueban tipos y formatos (ej. formato de hora `HH:mm`, campos obligatorios no vacíos). Si la validación falla se devuelve un código 400 o 404; si tiene éxito, se devuelve el objeto transformado con el código correspondiente (200 o 201) y cabeceras CORS mediante la función `json()`.
- Cambio guiado y resultado: Se verificó la matriz completa de operaciones CRUD contrastando casos de éxito con casos de error: envío de JSON incompleto (400), envío de sintaxis JSON rota (400), consulta de identificadores inexistentes (404), restricción estricta de campos en PATCH impidiendo mutar propiedades distintas de `status` (400), y comprobación de preflight CORS (OPTIONS con código 200 y cabeceras de autorización).
- Error encontrado y cómo lo resolví: En la terminal Git Bash se intentó ejecutar directamente el comando `GET http://localhost:3000/dev/events`, obteniendo el error `bash: GET: command not found`. Se resolvió usando la herramienta de terminal adecuada, `curl -i http://localhost:3000/dev/events`.
 
## Evidencias
- Captura o transcripción breve, sin credenciales:

```text
S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{"artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}'
HTTP/1.1 201 Created
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 95
Date: Tue, 27 Oct 2026 10:23:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"EVT-NEW","artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{"artist":"Nova Pulse"}'
HTTP/1.1 400 Bad Request
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 59
Date: Tue, 27 Oct 2026 10:23:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"artist, space y time (HH:mm) son obligatorios"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{'
HTTP/1.1 400 Bad Request
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 28
Date: Tue, 27 Oct 2026 10:23:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"JSON inválido"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i http://localhost:3000/dev/events
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 199
accept-ranges: bytes
Date: Tue, 27 Oct 2026 10:47:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"},{"id":"EVT-102","artist":"Midnight Session","space":"Club Stage","time":"23:45","status":"CONFIRMED"}]

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i http://localhost:3000/dev/events/EVT-101
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 95
accept-ranges: bytes
Date: Tue, 27 Oct 2026 10:47:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i http://localhost:3000/dev/events/NO-EXISTE
HTTP/1.1 404 Not Found
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 34
Date: Tue, 27 Oct 2026 10:47:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Evento no encontrado"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i -X PUT http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{"artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}'
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 118
Date: Tue, 27 Oct 2026 10:48:02 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"EVT-101","artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED","operation":"REPLACED"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i -X PATCH http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{"status":"CANCELLED"}'
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 71
Date: Tue, 27 Oct 2026 10:49:36 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"EVT-101","changes":{"status":"CANCELLED"},"operation":"UPDATED"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i -X DELETE http://localhost:3000/dev/events/EVT-102
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
content-length: 38  
Date: Tue, 27 Oct 2026 10:49:36 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"EVT-102","operation":"DELETED"}

S1-PC80@S1-PC80 UCRT64 /d/DEVOPS/04-PILARES-SERVERLESS
$ curl -i -X OPTIONS http://localhost:3000/dev/events -H 'Origin: http://localhost:8081' -H 'Access-Control-Request-Method: POST' -H 'Access-Control-Request-Headers: content-type'
HTTP/1.1 200 OK
access-control-allow-origin: http://localhost:8081
access-control-allow-methods: POST
access-control-allow-headers: accept,content-type,x-api-key,authorization
access-control-max-age: 86400
access-control-expose-headers: WWW-Authenticate,Server-Authorization
access-control-allow-credentials: true
cache-control: no-cache
content-length: 0
Date: Tue, 27 Oct 2026 10:49:50 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

- Limitaciones del ejercicio:
  Ninguna. Los datos se gestionan en memoria en el modelo local para comprobar el protocolo HTTP y el contrato de la API sin requerir persistencia en base de datos.
