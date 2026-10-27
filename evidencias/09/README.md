# Bloque 09

## Resultado
- Qué añadí al proyecto: Cambié la constante `API_URL` en `mobile/src/api.ts` de `http://localhost:3000/dev` al endpoint real de AWS `https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev`. La misma pantalla del bloque anterior (App.tsx con los cinco botones) ahora consume las Lambdas desplegadas en lugar del servidor Offline.
- Ruta o pantalla comprobada: Pantalla principal de la app web (`expo start --web`) → los cinco botones (GET, POST, PUT, PATCH, DELETE) hacen peticiones HTTPS al dominio `execute-api.us-west-2.amazonaws.com`.

## Fase 2 · Recupera sesión y endpoint

```
$ aws sts get-caller-identity --profile academy
{
    "UserId": "AROAQFXKADGK3YWTFOBAK:user4549458=a29317@svalero.com",
    "Account": "012301900181",
    "Arn": "arn:aws:sts::012301900181:assumed-role/voclabs/user4549458=a29317@svalero.com"
}

$ npx serverless info --stage dev --region "$AWS_REGION"
service: festival-control-api-izang
stage: dev
region: us-west-2
stack: festival-control-api-izang-dev
endpoints:
  GET    - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/hello
  GET    - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  POST   - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  GET    - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  PUT    - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  PATCH  - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  DELETE - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
```

Verificación curl antes de tocar el cliente:

```
$ export API_BASE="https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev"
$ curl -i "$API_BASE/events"
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *

[{"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"},
 {"id":"EVT-102","artist":"Midnight Session","space":"Club Stage","time":"23:45","status":"CONFIRMED"}]
```

## Fase 3 · Cambio en api.ts

Única línea modificada en `mobile/src/api.ts`:

```diff
- export const API_URL = 'http://localhost:3000/dev';
+ export const API_URL = 'https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev';
```

## Fase 4 · Prueba

### Paso 1 — Expo en navegador

```
$ npm run typecheck
> festival-control-mobile@1.0.0 typecheck
> tsc --noEmit
(sin errores)

$ npm run web
> festival-control-mobile@1.0.0 web
> expo start --web
```

App visible en `http://localhost:8081`: fondo negro, acentos rosas, título **Festival Control · Programación**.

### Paso 2 — Cinco métodos desde Network

| Método | URL | Status |
|--------|-----|--------|
| GET    | `https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events`       | 200 |
| POST   | `https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events`       | 201 |
| PUT    | `https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/EVT-101` | 200 |
| PATCH  | `https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/EVT-101` | 200 |
| DELETE | `https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/EVT-102` | 200 |

Todas las URLs son HTTPS del endpoint real. GET conserva los dos eventos tras las escrituras (datos en memoria, sin persistencia).

### Paso 3 — Logs CloudWatch

```
$ npx serverless logs -f listEvents --stage dev --region "$AWS_REGION"
Logs Start Time: 2026-10-27 22:23:54

INIT_START Runtime - Version: nodejs:22.mainline.v154
START - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a - Version: $LATEST
2026-10-27 22:32:45.286  INFO    LIST eventos: GET
END   - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a
REPORT Duration: 6.26 ms   Billed Duration: 172 ms   Memory Size: 1024 MB   Max Memory Used: 71 MB   Init Duration: 164.79 ms
```

Los logs confirman que las peticiones llegaron a las Lambdas cloud y no al servidor local.

## Comprensión
- Recorrido del dato, explicado con mis palabras: Al pulsar un botón en la app web, `App.tsx` llama a la función de `api.ts` correspondiente. Esa función usa `fetch` contra `API_URL + ruta`. La petición viaja por HTTPS hasta el API Gateway en `us-west-2`, que la enruta a la Lambda correcta (Node 22). La Lambda ejecuta el handler TypeScript compilado, procesa la operación y devuelve JSON. El header `Access-Control-Allow-Origin: *` permite que el navegador acepte la respuesta cross-origin. El resultado se muestra en el área verde de la pantalla.
- Cambio guiado y resultado: Solo cambié una constante (`API_URL`). Con eso el cliente dejó de depender completamente del servidor Offline y empezó a consumir la API real en AWS sin modificar ningún otro archivo.
- Error encontrado y cómo lo resolví: Al abrir una terminal nueva, los comandos `npm run typecheck` y `npm run web` fallaban porque `node_modules` no estaba instalado en `mobile/`. Solución: ejecutar `npm install` en `mobile/` antes de lanzar cualquier script del proyecto.

## Limitaciones del ejercicio
- Los datos de las Lambdas son estáticos en memoria; cada cold start los reinicia a EVT-101 y EVT-102, por lo que las escrituras (POST, PUT, PATCH, DELETE) no se persisten entre invocaciones frías.
- La app se ejecuta solo en web (`expo start --web`); para dispositivo físico o simulador haría falta Expo Go o EAS Build.
- Las credenciales de Academy caducan con la sesión del laboratorio; si el lab expira, el endpoint deja de responder hasta abrir una nueva sesión y reexportar las variables.
