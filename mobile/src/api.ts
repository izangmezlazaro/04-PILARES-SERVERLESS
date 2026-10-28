import type { Zone, ZoneInput, ZoneStatus } from './types';

// ── Base URL ──────────────────────────────────────────────────────────────────
// Puedes sobreescribirlo en local con una variable de entorno Expo:
// EXPO_PUBLIC_API_URL=http://localhost:4000/dev
// o apuntar al endpoint de AWS tras desplegar.
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/dev';

// ── Cliente HTTP genérico ────────────────────────────────────────────────────

async function request(path: string, method = 'GET', body?: unknown): Promise<unknown> {
  const response = await fetch(API_URL + path, {
    method,
    ...(body !== undefined
      ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      : {})
  });

  // DELETE 204 no tiene body
  if (response.status === 204) return null;

  const value: unknown = await response.json();
  if (!response.ok) {
    const message =
      typeof value === 'object' && value !== null && 'message' in value
        ? String(value.message)
        : response.statusText;
    throw new Error(`HTTP ${response.status}: ${message}`);
  }
  return value;
}

// ── Type guard ───────────────────────────────────────────────────────────────

function isZone(value: unknown): value is Zone {
  return (
    typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'name' in value && typeof value.name === 'string' &&
    'capacity' in value && typeof value.capacity === 'number' &&
    'status' in value &&
    (value.status === 'OPEN' || value.status === 'FULL' || value.status === 'CLOSED')
  );
}

// ── Operaciones públicas ──────────────────────────────────────────────────────

export async function getZones(): Promise<Zone[]> {
  const value = await request('/zones');
  if (!Array.isArray(value) || !value.every(isZone)) {
    throw new Error('La API no devolvió una lista de zonas válida');
  }
  return value;
}

export async function getZone(id: string): Promise<Zone> {
  const value = await request(`/zones/${encodeURIComponent(id)}`);
  if (!isZone(value)) throw new Error('La API no devolvió una zona válida');
  return value;
}

export async function createZone(input: ZoneInput): Promise<Zone> {
  const value = await request('/zones', 'POST', input);
  if (!isZone(value)) throw new Error('Respuesta inesperada al crear zona');
  return value;
}

export async function replaceZone(id: string, input: ZoneInput): Promise<Zone> {
  const value = await request(`/zones/${encodeURIComponent(id)}`, 'PUT', input);
  if (!isZone(value)) throw new Error('Respuesta inesperada al reemplazar zona');
  return value;
}

export async function updateZoneStatus(id: string, status: ZoneStatus): Promise<Zone> {
  const value = await request(`/zones/${encodeURIComponent(id)}`, 'PATCH', { status });
  if (!isZone(value)) throw new Error('Respuesta inesperada al actualizar estado');
  return value;
}

export async function deleteZone(id: string): Promise<void> {
  await request(`/zones/${encodeURIComponent(id)}`, 'DELETE');
}