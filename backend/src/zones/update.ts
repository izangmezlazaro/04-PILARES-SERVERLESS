import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json, readBody, isZoneStatus, saveCatalog } from './model.js';

/**
 * PATCH /zones/{id}
 * Actualización parcial: sólo modifica el campo `status`.
 * Diferencia con PUT: PATCH no exige enviar todos los campos del recurso,
 * únicamente la propiedad que cambia (status: OPEN|FULL|CLOSED).
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log('[patch-zone] id:', id, '| body:', event.body);

  if (!id) return json(400, { message: 'Falta el parámetro id' });

  const idx = catalog.findIndex(z => z.id === id);
  if (idx === -1) return json(404, { message: `Zona ${id} no encontrada` });

  const body = readBody(event.body);
  if (!body || !isZoneStatus(body.status)) {
    return json(400, { message: 'PATCH requiere { status: "OPEN" | "FULL" | "CLOSED" }' });
  }

  catalog[idx] = { ...catalog[idx]!, status: body.status };
  saveCatalog(catalog);
  console.log('[patch-zone] status actualizado:', id, '->', body.status);
  return json(200, catalog[idx]);
};
