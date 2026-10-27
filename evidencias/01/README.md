# Festival Control · Bloque 01
 
## Qué he construido
Se ha configurado la base del backend mediante tres archivos con responsabilidades claramente separadas:
1. `backend/tsconfig.json`: Define las reglas de compilación estricta de TypeScript (`strict: true`, resolución `NodeNext`, `rootDir: "src"`, `outDir: "dist"`).
2. `backend/serverless.yml`: Declara la infraestructura como código con Serverless Framework y el plugin `serverless-offline`, vinculando el evento HTTP `GET /hello` con el punto de entrada generado `dist/hello.handler`.
3. `backend/src/hello.ts`: Implementa la función Lambda asíncrona tipada que procesa la petición entrante, registra el evento en los logs del servidor y devuelve una respuesta con estado HTTP 200 y cuerpo JSON.

La ruta local comprobada en el entorno de desarrollo fue `http://localhost:3000/dev/hello` bajo el método HTTP `GET`.
 
## Qué he comprendido
- **Tipos del handler**: Se utiliza `import type` para importar contratos de `@types/aws-lambda` que no generan dependencias en el código JavaScript compilado. `APIGatewayProxyEvent` modela la estructura del evento recibido a través del API Gateway (método, cabeceras, rutas), mientras que `Promise<APIGatewayProxyResult>` asegura que la función asíncrona devuelva un objeto con la firma obligatoria `{ statusCode: number, body: string }`.
- **Compilación**: TypeScript no se ejecuta directamente en producción; el comando `npm run typecheck` (`tsc --noEmit`) valida los tipos sin generar archivos, y `npm run build` (`tsc`) compila el código fuente de `src/hello.ts` hacia `dist/hello.js`. Serverless Offline ejecuta ese artefacto compilado en `dist`.
- **Dónde aparece EVENT RECIBIDO**: La sentencia `console.log('EVENT RECIBIDO:', event)` se imprime exclusivamente en la **terminal del backend** (servidor). Es una traza interna de depuración que demuestra que la invocación llegó a la función Lambda, y no se envía ni forma parte del payload HTTP que viaja al cliente.
 
## Qué he modificado
En `backend/src/hello.ts` se modificó el objeto serializado dentro de `JSON.stringify`:
- Se cambió el mensaje a `"message": "Festival Control · equipo preparado"`.
- Se añadió un nuevo campo `"service": "hello"`.

**Por qué no cambió la URL**:
La URL (`/hello` que se expone como `/dev/hello`) y el método HTTP (`GET`) están definidos exclusivamente en `backend/serverless.yml` dentro de la sección `events.http`. Modificar el contenido devuelto en el handler de TypeScript únicamente afecta al cuerpo (`body`) del payload de respuesta; la ruta de enrutamiento permanece inalterada porque pertenece a la capa de configuración de API Gateway / Serverless.
 
## Cómo lo he comprobado
Se comprobó la disponibilidad del servicio con dos clientes HTTP distintos y verificando las trazas en la terminal del servidor:
1. **Thunder Client**: Petición `GET http://localhost:3000/dev/hello` obteniendo `Status: 200 OK` y el JSON con el nuevo mensaje.
2. **curl**: Ejecución desde terminal Git Bash con el comando `curl -i http://localhost:3000/dev/hello`, comprobando las cabeceras HTTP y el cuerpo JSON devuelto.
3. **Log del servidor**: Verificación de la traza `EVENT RECIBIDO:` en la terminal activa del backend con cada petición recibida.

### Evidencia de ejecución
```text
$ curl -i http://localhost:3000/dev/hello
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Api-Key
Content-Type: application/json
Connection: keep-alive
Content-Length: 68

{"message":"Festival Control · equipo preparado","service":"hello"}
```

Log en la terminal del backend:
```text
GET /dev/hello (λ: hello)
EVENT RECIBIDO: {
  httpMethod: 'GET',
  path: '/dev/hello',
  headers: { ... }
}
```