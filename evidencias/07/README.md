# Bloque 07

## Resultado
- Qué añadí al proyecto:
  - En `mobile/src/api.ts`: Se exportaron las cuatro funciones HTTP de escritura utilizando la función base `request`:
    - `createEvent(input)`: `POST /events` con `body: JSON.stringify(input)` y cabecera `Content-Type: application/json`.
    - `replaceEvent(id, input)`: `PUT /events/:id` con `body` completo codificando el identificador con `encodeURIComponent`.
    - `updateEvent(id, status)`: `PATCH /events/:id` enviando exclusivamente `{ status }`.
    - `deleteEvent(id)`: `DELETE /events/:id` sin body.
  - En `mobile/App.tsx`: Se agregaron los cuatro botones de acción interactivos (`POST crear`, `PUT reemplazar EVT-101`, `PATCH cancelar EVT-101`, `DELETE EVT-102`), el estado `busy` para deshabilitar botones durante las peticiones y el área de texto `result` que formatea e imprime la respuesta JSON devuelta por el servidor.
- Ruta o pantalla comprobada: Interfaz en `http://localhost:8081` y endpoints de API en `http://localhost:3000/dev/events` y `http://localhost:3000/dev/events/{id}`.
- Estado y respuesta observados:
  - `POST /events` → `HTTP 201 Created`:
    ```json
    {
      "id": "EVT-NEW",
      "artist": "Nova Pulse",
      "space": "Main Stage",
      "time": "21:00",
      "status": "CONFIRMED"
    }
    ```
  - `PUT /events/EVT-101` → `HTTP 200 OK`:
    ```json
    {
      "id": "EVT-101",
      "artist": "Nova Pulse",
      "space": "Main Stage",
      "time": "21:00",
      "status": "CONFIRMED",
      "operation": "REPLACED"
    }
    ```
  - `PATCH /events/EVT-101` → `HTTP 200 OK`:
    ```json
    {
      "id": "EVT-101",
      "changes": {
        "status": "CANCELLED"
      },
      "operation": "UPDATED"
    }
    ```
  - `DELETE /events/EVT-102` → `HTTP 200 OK`:
    ```json
    {
      "id": "EVT-102",
      "operation": "DELETED"
    }
    ```

## Comprensión
- Recorrido del dato, explicado con mis palabras: Al pulsar uno de los botones (por ejemplo, "PATCH cancelar EVT-101"), se activa la función `run()` en `App.tsx`. Se establece `busy = true` para evitar clics concurrentes y se invoca la función auxiliar correspondiente de `api.ts` (`updateEvent('EVT-101', 'CANCELLED')`). Esta ejecuta `request('/events/' + encodeURIComponent('EVT-101'), 'PATCH', { status: 'CANCELLED' })`. La petición HTTP viaja con método `PATCH`, URL `/dev/events/EVT-101`, cabeceras `Content-Type: application/json` y el body serializado. En el backend, el handler `update.handler` recibe el evento, valida el id y el estado permitido, genera la respuesta con `{ operation: 'UPDATED' }` y código 200. En el cliente, la respuesta se deserializa y se formatea con `JSON.stringify(response, null, 2)` en la variable de estado `result`, renderizándose inmediatamente en el bloque de texto de la UI.
- Cambio guiado y resultado: Se modificó temporalmente en `App.tsx` el estado enviado en el botón PATCH de `'CANCELLED'` a `'CONFIRMED'`. Al pulsar el botón, el backend respondió `HTTP 200 OK` con `{"id": "EVT-101", "changes": {"status": "CONFIRMED"}, "operation": "UPDATED"}`. Posteriormente se restauró `'CANCELLED'` para mantener la consistencia con el cuaderno.
- Error encontrado y cómo lo resolví: Se comprobó que al recargar la lista con `GET recargar` tras ejecutar DELETE o PATCH, el catálogo continuaba mostrando las dos actuaciones originales con status `CONFIRMED`. Esto demostró que las operaciones de escritura en esta fase son simuladas (stateless/en memoria sin persistencia en base de datos), entendiendo que una respuesta HTTP 200 de éxito no garantiza persistencia si la capa de almacenamiento no está conectada.

## Evidencias
- Captura o transcripción breve, sin credenciales:
```text
POST http://localhost:3000/dev/events
Content-Type: application/json
Body: {"artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}
HTTP/1.1 201 Created
{"id":"EVT-NEW","artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}

PUT http://localhost:3000/dev/events/EVT-101
Content-Type: application/json
Body: {"artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED"}
HTTP/1.1 200 OK
{"id":"EVT-101","artist":"Nova Pulse","space":"Main Stage","time":"21:00","status":"CONFIRMED","operation":"REPLACED"}

PATCH http://localhost:3000/dev/events/EVT-101
Content-Type: application/json
Body: {"status":"CANCELLED"}
HTTP/1.1 200 OK
{"id":"EVT-101","changes":{"status":"CANCELLED"},"operation":"UPDATED"}

DELETE http://localhost:3000/dev/events/EVT-102
HTTP/1.1 200 OK
{"id":"EVT-102","operation":"DELETED"}

GET http://localhost:3000/dev/events
HTTP/1.1 200 OK
[{"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"},{"id":"EVT-102","artist":"Midnight Session","space":"Club Stage","time":"23:45","status":"CONFIRMED"}]
```
- Limitaciones del ejercicio: En este bloque las escrituras no persisten en DynamoDB ni en ninguna base de datos; el array `catalog` del backend no sufre mutaciones permanentes, por lo que las consultas posteriores con `GET` siguen devolviendo los dos elementos iniciales intactos.
