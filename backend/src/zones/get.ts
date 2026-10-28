import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json } from './model.js';

/**
 * GET /zones/{id}
 * pathParameters.id viene de API Gateway / serverless-offline.
 * Si no existe la zona devuelve 404.
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  console.log('[get-zone] id:', id);

  if (!id) return json(400, { message: 'Falta el parámetro id' });

  const zone = catalog.find(z => z.id === id);
  return zone
    ? json(200, zone)
    : json(404, { message: `Zona ${id} no encontrada` });
};
