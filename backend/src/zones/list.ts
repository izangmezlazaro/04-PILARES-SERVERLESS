import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { catalog, json } from './model.js';

/**
 * GET /zones
 * Devuelve el catálogo completo de zonas.
 * event.httpMethod confirma el método; la ruta la establece API Gateway.
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('[list-zones] httpMethod:', event.httpMethod);
  return json(200, catalog);
};
