import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json, readBody, isZoneInput, nextId, saveCatalog } from './model.js';

/**
 * POST /zones
 * Crea una nueva zona. Lee el body con JSON.parse (vía readBody).
 * Valida campos obligatorios: name (string), capacity (int > 0), status (OPEN|FULL|CLOSED).
 * Escritura simulada: el objeto se añade al catálogo en memoria de esta invocación.
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('[create-zone] body recibido:', event.body);

  const body = readBody(event.body);
  if (!isZoneInput(body)) {
    return json(400, {
      message: 'Campos obligatorios: name (string), capacity (entero > 0), status (OPEN|FULL|CLOSED)'
    });
  }

  const newZone = {
    id: nextId(),
    name: body.name.trim(),
    capacity: body.capacity,
    status: body.status
  };

  // Escritura simulada: persiste en memoria durante la vida del contenedor Lambda
  catalog.push(newZone);
  saveCatalog(catalog);
  console.log('[create-zone] creada zona:', newZone.id, newZone.name);

  return json(201, newZone);
};
