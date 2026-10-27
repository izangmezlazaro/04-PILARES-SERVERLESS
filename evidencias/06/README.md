# Bloque 06

## Resultado
- Qué añadí al proyecto: Se conectó la aplicación cliente de React Native (Expo) con la API REST local mediante `mobile/src/api.ts` (función `getEvents()` tipada con type guards) y se actualizó `mobile/App.tsx` para sustituir los datos estáticos por una llamada HTTP `GET /events`, gestionando los estados de carga (`loading`), datos (`events`) y error (`error`).
- Ruta o pantalla comprobada: Pantalla principal de la aplicación móvil en web (`http://localhost:8081`) y endpoint `http://localhost:3000/dev/events`.
- Estado y respuesta observados: `HTTP 200 OK` con el catálogo JSON de dos eventos:
  ```json
  [
    {"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"},
    {"id":"EVT-102","artist":"Midnight Session","space":"Club Stage","time":"23:45","status":"CONFIRMED"}
  ]
  ```
  La interfaz renderiza las dos tarjetas correspondientes a Neon Waves y Midnight Session con fondo oscuro y estilos temáticos del festival.

## Comprensión
- Recorrido del dato, explicado con mis palabras: Al montar el componente `App`, el hook `useEffect` ejecuta la función asíncrona `loadEvents()`. Esta invoca `getEvents()` de `api.ts`, la cual realiza una petición HTTP `fetch('http://localhost:3000/dev/events')`. El servidor backend procesa la petición y devuelve un array JSON con código 200. En el cliente, `api.ts` valida que `response.ok` sea verdadero y que los datos cumplan con el guard `isFestivalEvent`. Al retornar los eventos válidos, `setEvents(...)` actualiza el estado local de React, provocando un re-renderizado que dibuja las tarjetas en el `ScrollView`.
- Cambio guiado y resultado:
  1. Al cambiar `/events` por `/ruta-inexistente` en `getEvents()`, con el backend activo: el servidor responde con código `HTTP 404: Not Found` (o `Ruta no encontrada`). En la pestaña Network se observa la respuesta HTTP y en la UI se muestra el error `HTTP 404: Ruta no encontrada`.
  2. Al detener el backend con Ctrl+C y pulsar "GET recargar": el navegador no puede conectar con el socket de red, lanzando una excepción de red (`Error de red` / `fetch failed`), demostrando la diferencia entre un fallo a nivel de transporte/servidor caído y una respuesta de error HTTP con servidor activo.
  3. Al restaurar `/events` y volver a arrancar el backend: desaparece el mensaje de error y reaparecen las dos tarjetas con respuesta 200.
- Error encontrado y cómo lo resolví: 
  - Al ejecutar inicialmente `npm run typecheck` y `npm run web`, el sistema indicaba que ni `tsc` ni `expo` se reconocían como comandos ejecutables. Esto se debía a que no se habían instalado los paquetes (`node_modules`) tras clonar el repositorio en esta máquina. Se resolvió ejecutando `npm install` tanto en `backend` como en `mobile`.
  - En backend, Serverless Framework v4 requería autenticación; se configuró el servidor local y se validó el paso de tipos con `npm run typecheck` limpio.

## Evidencias
- Captura o transcripción breve, sin credenciales:
```text
> festival-control-mobile@1.0.0 typecheck
> tsc --noEmit

GET http://localhost:3000/dev/events
HTTP/1.1 200 OK
Content-Type: application/json
[{"id":"EVT-101","artist":"Neon Waves","space":"Main Stage","time":"22:30","status":"CONFIRMED"},{"id":"EVT-102","artist":"Midnight Session","space":"Club Stage","time":"23:45","status":"CONFIRMED"}]

GET http://localhost:3000/dev/ruta-inexistente
HTTP/1.1 404 Not Found
{"message":"Ruta no encontrada"}
```
- Limitaciones del ejercicio: Los datos no persisten en una base de datos real en esta fase (se sirven desde el catálogo en memoria del modelo backend) y la URL del backend está fijada a `localhost:3000` para desarrollo local en navegador web.
