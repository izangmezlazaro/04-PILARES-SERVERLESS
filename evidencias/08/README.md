# Bloque 08
 
## Resultado
- Qué añadí al proyecto: Desplegué el backend completo en AWS con `npx serverless deploy`. El stack `festival-control-api-izang-dev` quedó publicado con 7 funciones Lambda (hello, getEvent, createEvent, listEvents, replaceEvent, updateEvent, deleteEvent) y sus endpoints HTTP en API Gateway (us-west-2).
- Ruta o pantalla comprobada: `GET https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events` → 200 OK con los dos eventos (EVT-101, EVT-102).
izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ aws sts get-caller-identity --profile academy
{
    "UserId": "AROAQFXKADGK3YWTFOBAK:user4549458=a29317@svalero.com",
    "Account": "012301900181",
    "Arn": "arn:aws:sts::012301900181:assumed-role/voclabs/user4549458=a29317@svalero.com"
}


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ cd /d/DEVOPS/04-PILARES-SERVERLESS/backend
bash: cd: /d/DEVOPS/04-PILARES-SERVERLESS/backend: No such file or directory

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ pwd
/c/Users/izang/Pictures/dev/d

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ node -v
v26.10.0

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ npm run typecheck^C

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ cd backend
bash: cd: backend: No such file or directory

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ cd 04-PILARES-SERVERLESS

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS (main)
$ cd backend

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ pwd
/c/Users/izang/Pictures/dev/d/04-PILARES-SERVERLESS/backend

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$  node -v
v26.10.0

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run build

> backend@1.0.0 build
> tsc


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless package --stage dev --region "$AWS_REGION"

✖ Error: Cannot resolve '${env:STUDENT_CODE}' variable at 'service'. No value is available for this variable, and no default value was provided. Please check your variable definitions or provide a default value.
    at _ResolverManager.resolve (file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:40157)
    at async #handlePlaceholderNode (file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:37657)
    at async file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:35491
    at async processNodeAndHandleCompletion (file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:18749)

For help, try the following:
  • Run the command again with the "--debug" option
  • Review the docs: https://www.serverless.com/framework/docs/


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export AWS_PROFILE=academy

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export AWS_REGION="us-west-2"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export AWS_DEFAULT_REGION="$AWS_REGION"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export STUDENT_CODE="izang"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export LAMBDA_ROLE_ARN="arn:aws:iam::012301900181:role/LabRole"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless package --stage dev --region "$AWS_REGION"

√ Serverless Framework V4 CLI is free for developers and organizations making less than $2 million annually, but requires an account or a license key.

Please login/register or enter your license key: · Login/Register

If your browser does not open automatically, please open this URL: https://app.serverless.com?client=cli&transactionId=d7832f7b-4a10-41d5-8690-b4ecf9359da2     

✔ You have successfully signed in.

Packaging "festival-control-api-izang" for stage "dev" (us-west-2)

⠋ Packaging(node:10776) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ Service packaged (8s)


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run build

> backend@1.0.0 build
> tsc


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless package --stage dev --region "$AWS_REGION"

Packaging "festival-control-api-izang" for stage "dev" (us-west-2)

⠋ Packaging(node:9648) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ Service packaged (4s)


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless deploy --stage dev --region "$AWS_REGION"

Deploying "festival-control-api-izang" to stage "dev" (us-west-2)

⠋ Packaging(node:2724) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ Service deployed to stack festival-control-api-izang-dev (64s)

endpoints:
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/hello
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  POST - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  PUT - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  PATCH - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  DELETE - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
functions:
  hello: festival-control-api-izang-dev-hello (25 MB)
  getEvent: festival-control-api-izang-dev-getEvent (25 MB)
  createEvent: festival-control-api-izang-dev-createEvent (25 MB)
  listEvents: festival-control-api-izang-dev-listEvents (25 MB)
  replaceEvent: festival-control-api-izang-dev-replaceEvent (25 MB)
  updateEvent: festival-control-api-izang-dev-updateEvent (25 MB)
  deleteEvent: festival-control-api-izang-dev-deleteEvent (25 MB)


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless info --stage dev --region "$AWS_REGION"

⠋ Fetching service information(node:24212) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
service: festival-control-api-izang
stage: dev
region: us-west-2
stack: festival-control-api-izang-dev
endpoints:
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/hello
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  POST - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  PUT - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  PATCH - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  DELETE - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
functions:
  hello: festival-control-api-izang-dev-hello
  getEvent: festival-control-api-izang-dev-getEvent
  createEvent: festival-control-api-izang-dev-createEvent
  listEvents: festival-control-api-izang-dev-listEvents
  replaceEvent: festival-control-api-izang-dev-replaceEvent
  updateEvent: festival-control-api-izang-dev-updateEvent
  deleteEvent: festival-control-api-izang-dev-deleteEvent


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ read -r -p "URL base real, hasta /dev: " API_BASE
URL base real, hasta /dev: gs -f listEvents --stage dev --region "$AWS_REGION"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ read -r -p "URL base real, hasta /dev: " API_BASE
URL base real, hasta /dev: gs -f listEvents --stage dev --region "$AWS_REGION"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless logs -f listEvents --stage dev --region "$AWS_REGION"

⠋ Fetching logs(node:11620) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)

✖ No existing streams for the function


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ # 1. Definir correctamente la variable API_BASE

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export API_BASE="https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ # 2. Comprobar que responde tu API en AWS

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ curl -i "$API_BASE/events"
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 199
Connection: keep-alive
Date: Tue, 27 Oct 2026 21:33:48 GMT
X-Amzn-Trace-Id: Root=1-6ae118bc-1a454f526f89dd5469bd2f6f;Parent=2964dcae9b4fb745;Sampled=0;Lineage=1:8d682e96:0
x-amzn-RequestId: e69824a2-2ef9-4016-a5e9-15a74066837f
Access-Control-Allow-Origin: *
x-amz-apigw-id: F7DNiE_3PHcERSg=
X-Cache: Miss from cloudfront
Via: 1.1 ddad005ff10ada7b206d062a22b1ae38.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: MAD56-P5
X-Amz-Cf-Id: W4Nc2qYgaO7KbvlkaylsYo4MvFfIKozr7L-voKKSD011vwqJqoUEpQ==

[{"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"},{"id":"EVT-102","artist":"Midnight Session","space":"Club Stage","time":"23:45","status":"CONFIRMED"}]
izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ # 3. Consultar los logs en CloudWatch (ahora sí mostrará el stream)

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless logs -f listEvents --stage dev --region "$AWS_REGION"

⠋ Fetching logs(node:1948) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
Logs Start Time: 2026-10-27 22:23:54

INIT_START Runtime - Version: nodejs:22.mainline.v154   Runtime Version ARN: arn:aws:lambda:us-west-2::runtime:564bb908e71037c3cb0bf7362c5f4bcfeb80c4622ce5ed46e7265c4db411e47c
START - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a - Version: $LATEST
2026-10-27 22:32:45.286 - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a - 
INFO    LIST eventos: GET
END - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a
REPORT - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a
Duration: 6.26 ms       Billed Duration: 172 ms Memory Size: 1024 MB    Max Memory Used: 71 MB  Init Duration: 164.79 ms

- Estado y respuesta observados: `HTTP/1.1 200 OK`, `Content-Type: application/json`, cuerpo con array de 2 actuaciones. CloudWatch confirmó el invocación: `INFO LIST eventos: GET`, duración 6.26 ms, billed 172 ms (cold start incluido).
 
## Comprensión
- Recorrido del dato, explicado con mis palabras: El cliente hace un `GET /events`. API Gateway recibe la petición y la enruta a la Lambda `listEvents`. La función se ejecuta en Node 22, lee el array en memoria y devuelve JSON con el header `Access-Control-Allow-Origin: *`. CloudFront distribuye la respuesta. El log en CloudWatch confirma cada invocación con su duración real y la de billing.
- Cambio guiado y resultado: Antes del deploy el `serverless package` fallaba con `Cannot resolve '${env:STUDENT_CODE}'` porque la variable de entorno no estaba exportada. Exporté `STUDENT_CODE=izang`, `AWS_REGION=us-west-2`, `AWS_DEFAULT_REGION` y `LAMBDA_ROLE_ARN` antes de volver a ejecutar el comando. El packaging funcionó y el deploy tardó 64 s.
- Error encontrado y cómo lo resolví: `✖ No existing streams for the function` en el primer intento de `serverless logs`. La Lambda no tenía log stream porque nunca se había invocado. Solución: llamar primero a `curl -i "$API_BASE/events"` para forzar la ejecución y que CloudWatch creara el stream; el segundo `serverless logs` mostró los eventos correctamente.
 
## Evidencias
- Captura o transcripción breve, sin credenciales:

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ aws sts get-caller-identity --profile academy
{
    "UserId": "AROAQFXKADGK3YWTFOBAK:user4549458=a29317@svalero.com",
    "Account": "012301900181",
    "Arn": "arn:aws:sts::012301900181:assumed-role/voclabs/user4549458=a29317@svalero.com"
}


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ cd /d/DEVOPS/04-PILARES-SERVERLESS/backend
bash: cd: /d/DEVOPS/04-PILARES-SERVERLESS/backend: No such file or directory

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ pwd
/c/Users/izang/Pictures/dev/d

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ node -v
v26.10.0

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ npm run typecheck^C

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ cd backend
bash: cd: backend: No such file or directory

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d
$ cd 04-PILARES-SERVERLESS

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS (main)
$ cd backend

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ pwd
/c/Users/izang/Pictures/dev/d/04-PILARES-SERVERLESS/backend

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$  node -v
v26.10.0

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run build

> backend@1.0.0 build
> tsc


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless package --stage dev --region "$AWS_REGION"

✖ Error: Cannot resolve '${env:STUDENT_CODE}' variable at 'service'. No value is available for this variable, and no default value was provided. Please check your variable definitions or provide a default value.
    at _ResolverManager.resolve (file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:40157)
    at async #handlePlaceholderNode (file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:37657)
    at async file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:35491
    at async processNodeAndHandleCompletion (file:///C:/Users/izang/.serverless/releases/4.45.0/package/dist/sf-core.js:3336:18749)

For help, try the following:
  • Run the command again with the "--debug" option
  • Review the docs: https://www.serverless.com/framework/docs/


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export AWS_PROFILE=academy

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export AWS_REGION="us-west-2"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export AWS_DEFAULT_REGION="$AWS_REGION"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export STUDENT_CODE="izang"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export LAMBDA_ROLE_ARN="arn:aws:iam::012301900181:role/LabRole"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless package --stage dev --region "$AWS_REGION"

√ Serverless Framework V4 CLI is free for developers and organizations making less than $2 million annually, but requires an account or a license key.

Please login/register or enter your license key: · Login/Register

If your browser does not open automatically, please open this URL: https://app.serverless.com?client=cli&transactionId=d7832f7b-4a10-41d5-8690-b4ecf9359da2     

✔ You have successfully signed in.

Packaging "festival-control-api-izang" for stage "dev" (us-west-2)

⠋ Packaging(node:10776) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ Service packaged (8s)


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run typecheck

> backend@1.0.0 typecheck
> tsc --noEmit


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npm run build

> backend@1.0.0 build
> tsc


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless package --stage dev --region "$AWS_REGION"

Packaging "festival-control-api-izang" for stage "dev" (us-west-2)

⠋ Packaging(node:9648) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ Service packaged (4s)


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless deploy --stage dev --region "$AWS_REGION"

Deploying "festival-control-api-izang" to stage "dev" (us-west-2)

⠋ Packaging(node:2724) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ Service deployed to stack festival-control-api-izang-dev (64s)

endpoints:
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/hello
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  POST - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  PUT - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  PATCH - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  DELETE - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
functions:
  hello: festival-control-api-izang-dev-hello (25 MB)
  getEvent: festival-control-api-izang-dev-getEvent (25 MB)
  createEvent: festival-control-api-izang-dev-createEvent (25 MB)
  listEvents: festival-control-api-izang-dev-listEvents (25 MB)
  replaceEvent: festival-control-api-izang-dev-replaceEvent (25 MB)
  updateEvent: festival-control-api-izang-dev-updateEvent (25 MB)
  deleteEvent: festival-control-api-izang-dev-deleteEvent (25 MB)


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless info --stage dev --region "$AWS_REGION"

⠋ Fetching service information(node:24212) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
service: festival-control-api-izang
stage: dev
region: us-west-2
stack: festival-control-api-izang-dev
endpoints:
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/hello
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  POST - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  GET - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events
  PUT - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  PATCH - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
  DELETE - https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev/events/{id}
functions:
  hello: festival-control-api-izang-dev-hello
  getEvent: festival-control-api-izang-dev-getEvent
  createEvent: festival-control-api-izang-dev-createEvent
  listEvents: festival-control-api-izang-dev-listEvents
  replaceEvent: festival-control-api-izang-dev-replaceEvent
  updateEvent: festival-control-api-izang-dev-updateEvent
  deleteEvent: festival-control-api-izang-dev-deleteEvent


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ read -r -p "URL base real, hasta /dev: " API_BASE
URL base real, hasta /dev: gs -f listEvents --stage dev --region "$AWS_REGION"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ read -r -p "URL base real, hasta /dev: " API_BASE
URL base real, hasta /dev: gs -f listEvents --stage dev --region "$AWS_REGION"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless logs -f listEvents --stage dev --region "$AWS_REGION"

⠋ Fetching logs(node:11620) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)

✖ No existing streams for the function


izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ # 1. Definir correctamente la variable API_BASE

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ export API_BASE="https://d1m3tn4c18.execute-api.us-west-2.amazonaws.com/dev"

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ # 2. Comprobar que responde tu API en AWS

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ curl -i "$API_BASE/events"
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 199
Connection: keep-alive
Date: Tue, 27 Oct 2026 21:33:48 GMT
X-Amzn-Trace-Id: Root=1-6ae118bc-1a454f526f89dd5469bd2f6f;Parent=2964dcae9b4fb745;Sampled=0;Lineage=1:8d682e96:0
x-amzn-RequestId: e69824a2-2ef9-4016-a5e9-15a74066837f
Access-Control-Allow-Origin: *
x-amz-apigw-id: F7DNiE_3PHcERSg=
X-Cache: Miss from cloudfront
Via: 1.1 ddad005ff10ada7b206d062a22b1ae38.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: MAD56-P5
X-Amz-Cf-Id: W4Nc2qYgaO7KbvlkaylsYo4MvFfIKozr7L-voKKSD011vwqJqoUEpQ==

[{"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"},{"id":"EVT-102","artist":"Midnight Session","space":"Club Stage","time":"23:45","status":"CONFIRMED"}]
izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ # 3. Consultar los logs en CloudWatch (ahora sí mostrará el stream)

izang@DESKTOP-4VFGEOU MINGW64 ~/Pictures/dev/d/04-PILARES-SERVERLESS/backend (main)
$ npx serverless logs -f listEvents --stage dev --region "$AWS_REGION"

⠋ Fetching logs(node:1948) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
Logs Start Time: 2026-10-27 22:23:54

INIT_START Runtime - Version: nodejs:22.mainline.v154   Runtime Version ARN: arn:aws:lambda:us-west-2::runtime:564bb908e71037c3cb0bf7362c5f4bcfeb80c4622ce5ed46e7265c4db411e47c
START - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a - Version: $LATEST
2026-10-27 22:32:45.286 - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a - 
INFO    LIST eventos: GET
END - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a
REPORT - 1be5e0b6-2b30-4b37-9c4d-8dff3628f52a
Duration: 6.26 ms       Billed Duration: 172 ms Memory Size: 1024 MB    Max Memory Used: 71 MB  Init Duration: 164.79 ms

- Limitaciones del ejercicio: Los datos son estáticos en memoria (se reinician con cada cold start). No hay base de datos persistente. Las credenciales de Academy caducan con la sesión del laboratorio; hay que volver a exportar las variables en cada terminal nueva.