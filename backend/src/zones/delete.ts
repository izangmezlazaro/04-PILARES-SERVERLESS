import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json, saveCatalog } from './model.js';

/**
 * DELETE /zones/{id}
 * Elimina la zona del catálogo en memoria.
 * Devuelve 204 No Content si tuvo éxito, 404 si no existe.
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log('[delete-zone] id:', id);

  if (!id) return json(400, { message: 'Falta el parámetro id' });

  const idx = catalog.findIndex(z => z.id === id);
  if (idx === -1) return json(404, { message: `Zona ${id} no encontrada` });

  catalog.splice(idx, 1);
  saveCatalog(catalog);
  console.log('[delete-zone] zona eliminada:', id);

  // 204 sin body
  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    },
    body: ''
  };
};
