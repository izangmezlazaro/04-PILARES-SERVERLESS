import type { APIGatewayProxyResult } from 'aws-lambda';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type ZoneStatus = 'OPEN' | 'FULL' | 'CLOSED';

export interface Zone {
  id: string;
  name: string;
  capacity: number;
  status: ZoneStatus;
}

export type ZoneInput = Omit<Zone, 'id'>;

// ─── Almacenamiento local para serverless-offline ─────────────────────────────
// Se usa un archivo JSON dentro del proyecto para conservar el estado entre
// invocaciones Lambda, manteniendo la simulación de escritura sin depender de una BD.
const DATA_DIR = join(process.cwd(), 'data');
const DATA_FILE = join(DATA_DIR, 'zones.json');

const initialCatalog: Zone[] = [
  { id: 'ZONE-01', name: 'Main Stage',     capacity: 5000, status: 'OPEN'   },
  { id: 'ZONE-02', name: 'Garden Stage',   capacity: 2500, status: 'FULL'   },
  { id: 'ZONE-03', name: 'Invernadero',    capacity: 1800, status: 'OPEN'   },
  { id: 'ZONE-04', name: 'Electronic Den', capacity:  900, status: 'CLOSED' }
];

function isZoneRecord(value: unknown): value is Zone {
  return (
    typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'name' in value && typeof value.name === 'string' &&
    'capacity' in value && typeof value.capacity === 'number' &&
    'status' in value &&
    (value.status === 'OPEN' || value.status === 'FULL' || value.status === 'CLOSED')
  );
}

function loadCatalog(): Zone[] {
  try {
    const raw = readFileSync(DATA_FILE, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isZoneRecord)) {
      return parsed;
    }
  } catch {
    // Si no existe el archivo o el contenido no es válido, se usa seed inicial.
  }

  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(initialCatalog, null, 2), 'utf8');
  } catch {
    // Escritura local no disponible; se conserva el catálogo en memoria solo para esa ejecución.
  }

  return [...initialCatalog];
}

export function saveCatalog(items: Zone[]): void {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
  } catch {
    // Ignorado: la simulación sigue funcionando en memoria si el sistema de archivos
    // no permite escribir.
  }
}

export const catalog: Zone[] = loadCatalog();

/** Genera el próximo id correlativo */
export function nextId(): string {
  const currentMax = catalog.reduce((max, zone) => {
    const match = /^ZONE-(\d+)$/i.exec(zone.id);
    const value = match ? Number(match[1]) : 0;
    return Math.max(max, value);
  }, 0);

  return `ZONE-${String(currentMax + 1).padStart(2, '0')}`;
}

// ─── Helpers HTTP ─────────────────────────────────────────────────────────────

export const json = (statusCode: number, value: unknown): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  },
  body: JSON.stringify(value)
});

// ─── Parsing de body ──────────────────────────────────────────────────────────

export function readBody(text: string | null): Record<string, unknown> | null {
  try {
    const value: unknown = JSON.parse(text ?? 'null');
    return typeof value === 'object' && value !== null && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch { return null; }
}

// ─── Validación de entrada completa ──────────────────────────────────────────

export function isZoneInput(value: Record<string, unknown> | null): value is ZoneInput {
  if (value === null) return false;
  const { name, capacity, status } = value;
  return (
    typeof name === 'string' && name.trim().length > 0 &&
    typeof capacity === 'number' && Number.isInteger(capacity) && capacity > 0 &&
    (status === 'OPEN' || status === 'FULL' || status === 'CLOSED')
  );
}

// ─── Validación de status parcial (PATCH) ────────────────────────────────────

export function isZoneStatus(value: unknown): value is ZoneStatus {
  return value === 'OPEN' || value === 'FULL' || value === 'CLOSED';
}
