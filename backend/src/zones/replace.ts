import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json, readBody, isZoneInput, saveCatalog } from './model.js';

/**
 * PUT /zones/{id}
 * Reemplazo completo del recurso. Requiere los tres campos (name, capacity, status).
 * Diferencia con PATCH: PUT sustituye todo el objeto; PATCH sólo el campo status.
 * Si la zona no existe devuelve 404.
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log('[replace-zone] id:', id, '| body:', event.body);

  if (!id) return json(400, { message: 'Falta el parámetro id' });

  const idx = catalog.findIndex(z => z.id === id);
  if (idx === -1) return json(404, { message: `Zona ${id} no encontrada` });

  const body = readBody(event.body);
  if (!isZoneInput(body)) {
    return json(400, {
      message: 'PUT requiere name (string), capacity (entero > 0) y status (OPEN|FULL|CLOSED)'
    });
  }

  // Reemplazo completo conservando el id original
  catalog[idx] = { id, name: body.name.trim(), capacity: body.capacity, status: body.status };
  saveCatalog(catalog);
  console.log('[replace-zone] zona reemplazada:', id);
  return json(200, catalog[idx]);
};
