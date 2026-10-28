import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, Pressable, TextInput,
  StyleSheet, ActivityIndicator, Platform, Modal,
  KeyboardAvoidingView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { Zone, ZoneInput, ZoneStatus } from './src/types';
import {
  getZones, createZone, replaceZone, updateZoneStatus, deleteZone
} from './src/api';

// ── Colores del sistema de diseño ────────────────────────────────────────────
const C = {
  bg:        '#080c14',
  surface:   '#0f1523',
  card:      '#131929',
  border:    '#1e2a40',
  accent:    '#3b82f6',
  accentDim: '#1d4ed8',
  live:      '#22c55e',
  warn:      '#f59e0b',
  danger:    '#ef4444',
  text:      '#f1f5f9',
  muted:     '#64748b',
  label:     '#94a3b8',
  open:      '#22c55e',
  full:      '#f59e0b',
  closed:    '#ef4444',
};

type Screen = 'list' | 'detail' | 'create' | 'edit';

const STATUS_COLORS: Record<ZoneStatus, string> = {
  OPEN: C.open, FULL: C.warn, CLOSED: C.danger
};
const STATUS_BG: Record<ZoneStatus, string> = {
  OPEN: '#052e16', FULL: '#451a03', CLOSED: '#450a0a'
};

// ── Componente principal ─────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('list');
  const [zones, setZones] = useState<Zone[]>([]);
  const [selected, setSelected] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  // Formulario
  const [formName, setFormName] = useState('');
  const [formCapacity, setFormCapacity] = useState('');
  const [formStatus, setFormStatus] = useState<ZoneStatus>('OPEN');
  const [formBusy, setFormBusy] = useState(false);

  // Modal cambio de estado
  const [statusModal, setStatusModal] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const loadZones = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getZones();
      setZones(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error de red');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadZones(); }, [loadZones]);

  // ── Navegar a detalle
  function openDetail(zone: Zone) {
    setSelected(zone);
    setScreen('detail');
    setError('');
  }

  // ── Navegar a nuevo
  function openCreate() {
    setFormName('');
    setFormCapacity('');
    setFormStatus('OPEN');
    setError('');
    setScreen('create');
  }

  // ── Navegar a editar
  function openEdit(zone: Zone) {
    setSelected(zone);
    setFormName(zone.name);
    setFormCapacity(String(zone.capacity));
    setFormStatus(zone.status);
    setError('');
    setScreen('edit');
  }

  // ── POST crear zona
  async function handleCreate() {
    const cap = parseInt(formCapacity, 10);
    if (!formName.trim() || isNaN(cap) || cap <= 0) {
      setError('Nombre y capacidad (entero > 0) son obligatorios.');
      return;
    }
    const input: ZoneInput = { name: formName.trim(), capacity: cap, status: formStatus };
    setFormBusy(true);
    setError('');
    try {
      const created = await createZone(input);
      setZones(prev => [...prev, created]);
      showToast(`✓ ${created.name} creada`);
      setScreen('list');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al crear');
    } finally {
      setFormBusy(false);
    }
  }

  // ── PUT reemplazar zona
  async function handleReplace() {
    if (!selected) return;
    const cap = parseInt(formCapacity, 10);
    if (!formName.trim() || isNaN(cap) || cap <= 0) {
      setError('Nombre y capacidad (entero > 0) son obligatorios.');
      return;
    }
    const input: ZoneInput = { name: formName.trim(), capacity: cap, status: formStatus };
    setFormBusy(true);
    setError('');
    try {
      const updated = await replaceZone(selected.id, input);
      setZones(prev => prev.map(z => z.id === updated.id ? updated : z));
      setSelected(updated);
      showToast(`✓ ${updated.name} actualizada`);
      setScreen('detail');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al actualizar');
    } finally {
      setFormBusy(false);
    }
  }

  // ── PATCH cambiar estado
  async function handlePatchStatus(newStatus: ZoneStatus) {
    if (!selected) return;
    setStatusModal(false);
    setFormBusy(true);
    try {
      const updated = await updateZoneStatus(selected.id, newStatus);
      setZones(prev => prev.map(z => z.id === updated.id ? updated : z));
      setSelected(updated);
      showToast(`✓ Estado: ${updated.status}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cambiar estado');
    } finally {
      setFormBusy(false);
    }
  }

  // ── DELETE eliminar zona
  async function handleDelete() {
    if (!selected) return;
    setFormBusy(true);
    try {
      await deleteZone(selected.id);
      setZones(prev => prev.filter(z => z.id !== selected.id));
      showToast(`✓ Zona eliminada`);
      setScreen('list');
      setSelected(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al eliminar');
    } finally {
      setFormBusy(false);
    }
  }

  // ── Renders por pantalla ─────────────────────────────────────────────────

  function renderList() {
    return (
      <ScrollView style={s.scroll} contentContainerStyle={s.content}>
        {/* Stats bar */}
        <View style={s.statsRow}>
          <StatPill label="TOTAL"   value={String(zones.length)}                                  color={C.accent} />
          <StatPill label="ABIERTAS" value={String(zones.filter(z => z.status === 'OPEN').length)} color={C.open}   />
          <StatPill label="LLENAS"   value={String(zones.filter(z => z.status === 'FULL').length)} color={C.warn}   />
          <StatPill label="CERRADAS" value={String(zones.filter(z => z.status === 'CLOSED').length)} color={C.danger} />
        </View>

        {loading && <ActivityIndicator color={C.accent} style={{ marginVertical: 24 }} />}
        {error ? <ErrorBanner message={error} /> : null}

        {zones.map(zone => (
          <Pressable
            key={zone.id}
            style={({ pressed }) => [s.card, pressed && s.cardPressed]}
            onPress={() => openDetail(zone)}
            accessibilityRole="button"
            accessibilityLabel={`Ver detalle de ${zone.name}`}
          >
            <View style={s.cardRow}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={s.zoneId}>{zone.id}</Text>
                <Text style={s.zoneName}>{zone.name}</Text>
                <Text style={s.zoneCapacity}>{zone.capacity.toLocaleString()} personas</Text>
              </View>
              <StatusBadge status={zone.status} />
            </View>
          </Pressable>
        ))}

        <Pressable
          style={({ pressed }) => [s.btnCreate, pressed && { opacity: 0.85 }]}
          onPress={openCreate}
          accessibilityRole="button"
          accessibilityLabel="Añadir nueva zona"
        >
          <Text style={s.btnCreateText}>＋ NUEVA ZONA</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [s.btnSecondary, pressed && { opacity: 0.7 }]}
          onPress={() => void loadZones()}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Recargar zonas"
        >
          <Text style={s.btnSecondaryText}>↺ Recargar</Text>
        </Pressable>
      </ScrollView>
    );
  }

  function renderDetail() {
    if (!selected) return null;
    const color = STATUS_COLORS[selected.status];
    const bg    = STATUS_BG[selected.status];
    return (
      <ScrollView style={s.scroll} contentContainerStyle={s.content}>
        <Pressable onPress={() => setScreen('list')} style={s.backBtn} accessibilityRole="button">
          <Text style={s.backText}>← ESPACIOS</Text>
        </Pressable>

        <View style={[s.detailHero, { borderColor: color + '44' }]}>
          <Text style={s.detailId}>{selected.id}</Text>
          <Text style={s.detailName}>{selected.name}</Text>
          <View style={s.detailCapRow}>
            <Text style={s.detailCapNum}>{selected.capacity.toLocaleString()}</Text>
            <Text style={s.detailCapLabel}>CAPACIDAD</Text>
          </View>
          <View style={[s.detailStatus, { backgroundColor: bg, borderColor: color + '66' }]}>
            <View style={[s.dot, { backgroundColor: color }]} />
            <Text style={[s.detailStatusText, { color }]}>{selected.status}</Text>
          </View>
        </View>

        <Text style={s.sectionLabel}>OPERACIONES</Text>

        <Pressable
          style={({ pressed }) => [s.opBtn, pressed && { opacity: 0.8 }]}
          onPress={() => openEdit(selected)}
          accessibilityRole="button"
          disabled={formBusy}
        >
          <Text style={s.opBtnText}>✏️  Editar espacio</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [s.opBtn, { backgroundColor: '#0f2240' }, pressed && { opacity: 0.8 }]}
          onPress={() => setStatusModal(true)}
          accessibilityRole="button"
          disabled={formBusy}
        >
          <Text style={s.opBtnText}>🔄  Cambiar estado</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [s.opBtn, { backgroundColor: '#2a0c0c' }, pressed && { opacity: 0.8 }]}
          onPress={() => void handleDelete()}
          accessibilityRole="button"
          disabled={formBusy}
        >
          <Text style={[s.opBtnText, { color: C.danger }]}>
            {formBusy ? 'Eliminando…' : '🗑️  Eliminar zona'}
          </Text>
        </Pressable>

        {error ? <ErrorBanner message={error} /> : null}

        {/* Modal PATCH */}
        <Modal visible={statusModal} transparent animationType="fade">
          <View style={s.overlay}>
            <View style={s.modalCard}>
              <Text style={s.modalTitle}>Cambiar Estado</Text>
              <Text style={s.modalSub}>Selecciona el nuevo estado para {selected.name}</Text>
              {(['OPEN', 'FULL', 'CLOSED'] as ZoneStatus[]).map(st => (
                <Pressable
                  key={st}
                  style={[s.modalOption, { borderColor: STATUS_COLORS[st] + '55' }]}
                  onPress={() => void handlePatchStatus(st)}
                  accessibilityRole="button"
                >
                  <View style={[s.dot, { backgroundColor: STATUS_COLORS[st] }]} />
                  <Text style={[s.modalOptionText, { color: STATUS_COLORS[st] }]}>{st}</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => setStatusModal(false)} style={s.modalCancel} accessibilityRole="button">
                <Text style={s.btnSecondaryText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

  function renderForm(mode: 'create' | 'edit') {
    const isEdit = mode === 'edit';
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={s.scroll} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
          <Pressable
            onPress={() => setScreen(isEdit ? 'detail' : 'list')}
            style={s.backBtn}
            accessibilityRole="button"
          >
            <Text style={s.backText}>← {isEdit ? 'ESPACIO' : 'CANCELAR'}</Text>
          </Pressable>

          <Text style={s.formTitle}>{isEdit ? `EDITAR · ${selected?.id}` : 'NUEVO ESPACIO'}</Text>

          <Text style={s.formLabel}>NOMBRE</Text>
          <TextInput
            style={s.input}
            value={formName}
            onChangeText={setFormName}
            placeholder="River Stage"
            placeholderTextColor={C.muted}
            accessibilityLabel="Nombre de la zona"
          />

          <Text style={s.formLabel}>CAPACIDAD</Text>
          <TextInput
            style={s.input}
            value={formCapacity}
            onChangeText={setFormCapacity}
            keyboardType="numeric"
            placeholder="1800"
            placeholderTextColor={C.muted}
            accessibilityLabel="Capacidad de la zona"
          />

          <Text style={s.formLabel}>ESTADO</Text>
          <View style={s.statusToggle}>
            {(['OPEN', 'FULL', 'CLOSED'] as ZoneStatus[]).map(st => (
              <Pressable
                key={st}
                style={[
                  s.statusOption,
                  formStatus === st && { backgroundColor: STATUS_BG[st], borderColor: STATUS_COLORS[st] }
                ]}
                onPress={() => setFormStatus(st)}
                accessibilityRole="radio"
                accessibilityLabel={`Estado ${st}`}
                accessibilityState={{ checked: formStatus === st }}
              >
                <View style={[s.dot, { backgroundColor: STATUS_COLORS[st] }]} />
                <Text style={[s.statusOptionText, formStatus === st && { color: STATUS_COLORS[st] }]}>{st}</Text>
              </Pressable>
            ))}
          </View>

          {error ? <ErrorBanner message={error} /> : null}

          <Pressable
            style={({ pressed }) => [s.btnCreate, pressed && { opacity: 0.85 }]}
            onPress={() => void (isEdit ? handleReplace() : handleCreate())}
            disabled={formBusy}
            accessibilityRole="button"
            accessibilityLabel={isEdit ? 'Guardar cambios' : 'Crear zona'}
          >
            {formBusy
              ? <ActivityIndicator color="#fff" />
              : <Text style={s.btnCreateText}>{isEdit ? '💾  GUARDAR CAMBIOS' : '✚  CREAR ESPACIO'}</Text>
            }
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // ── Layout raíz ──────────────────────────────────────────────────────────

  return (
    <View style={s.root}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Text style={s.headerTitle}>VENUE CONTROL</Text>
          <View style={s.liveRow}>
            <View style={s.liveDot} />
            <Text style={s.liveText}>LIVE</Text>
          </View>
        </View>
        <View style={s.headerNav}>
          {([
            ['LISTADO',  'list'],
            ['DETALLE',  'detail'],
            ['NUEVO',    'create'],
            ['EDITAR',   'edit'],
          ] as [string, Screen][]).map(([label, sc]) => (
            <Text
              key={sc}
              style={[s.navItem, screen === sc && s.navActive]}
              onPress={() => {
                if (sc === 'list')   { setScreen('list'); return; }
                if (sc === 'detail' && selected) { setScreen('detail'); return; }
                if (sc === 'create') { openCreate(); return; }
                if (sc === 'edit' && selected) { openEdit(selected); return; }
              }}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>

      {/* Subheader */}
      <View style={s.subheader}>
        <Text style={s.subTitle}>FESTIVAL OPERATIONS · ESPACIOS</Text>
        <Text style={s.subSub}>{zones.length} zonas · operación en directo</Text>
      </View>

      {/* Toast */}
      {toast ? (
        <View style={s.toast}>
          <Text style={s.toastText}>{toast}</Text>
        </View>
      ) : null}

      {/* Screens */}
      {screen === 'list'   && renderList()}
      {screen === 'detail' && renderDetail()}
      {screen === 'create' && renderForm('create')}
      {screen === 'edit'   && renderForm('edit')}
    </View>
  );
}

// ── Sub-componentes ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ZoneStatus }) {
  return (
    <View style={[sb.badge, { backgroundColor: STATUS_BG[status], borderColor: STATUS_COLORS[status] + '66' }]}>
      <View style={[sb.dot, { backgroundColor: STATUS_COLORS[status] }]} />
      <Text style={[sb.text, { color: STATUS_COLORS[status] }]}>{status}</Text>
    </View>
  );
}
const sb = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  dot:   { width: 7, height: 7, borderRadius: 4 },
  text:  { fontWeight: '700', fontSize: 12, letterSpacing: 1 },
});

function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={[sp.pill, { borderColor: color + '44' }]}>
      <Text style={[sp.value, { color }]}>{value}</Text>
      <Text style={sp.label}>{label}</Text>
    </View>
  );
}
const sp = StyleSheet.create({
  pill:  { flex: 1, alignItems: 'center', paddingVertical: 10, borderWidth: 1, borderRadius: 12, backgroundColor: C.card },
  value: { fontWeight: '800', fontSize: 22 },
  label: { color: C.muted, fontSize: 10, fontWeight: '600', letterSpacing: 1, marginTop: 2 },
});

function ErrorBanner({ message }: { message: string }) {
  return (
    <View style={eb.banner}>
      <Text style={eb.text}>⚠ {message}</Text>
    </View>
  );
}
const eb = StyleSheet.create({
  banner: { backgroundColor: '#2a0c0c', borderWidth: 1, borderColor: C.danger + '55', borderRadius: 10, padding: 14 },
  text:   { color: C.danger, fontSize: 14, lineHeight: 20 },
});

// ── Estilos globales ─────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root:        { flex: 1, backgroundColor: C.bg },
  scroll:      { flex: 1 },
  content:     { padding: 16, gap: 12, paddingBottom: 40 },

  // Header
  header:      { backgroundColor: C.surface, borderBottomWidth: 1, borderBottomColor: C.border,
                 paddingHorizontal: 20, paddingTop: Platform.OS === 'web' ? 20 : 52, paddingBottom: 12,
                 flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  headerLeft:  { gap: 4 },
  headerTitle: { color: C.text, fontWeight: '800', fontSize: 18, letterSpacing: 2 },
  liveRow:     { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot:     { width: 8, height: 8, borderRadius: 4, backgroundColor: C.live },
  liveText:    { color: C.live, fontWeight: '700', fontSize: 11, letterSpacing: 1.5 },
  headerNav:   { flexDirection: 'row', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' },
  navItem:     { color: C.muted, fontSize: 11, fontWeight: '600', letterSpacing: 1,
                 paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, overflow: 'hidden' },
  navActive:   { color: C.accent, backgroundColor: C.accent + '22' },

  // Subheader
  subheader:   { backgroundColor: C.surface, borderBottomWidth: 1, borderBottomColor: C.border,
                 paddingHorizontal: 20, paddingVertical: 10 },
  subTitle:    { color: C.accent, fontWeight: '700', fontSize: 11, letterSpacing: 1.5 },
  subSub:      { color: C.label, fontSize: 13, marginTop: 2 },

  // Toast
  toast:       { position: 'absolute', top: Platform.OS === 'web' ? 80 : 120, alignSelf: 'center',
                 backgroundColor: '#0d2b1a', borderWidth: 1, borderColor: C.live + '66',
                 borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10, zIndex: 99 },
  toastText:   { color: C.live, fontWeight: '700', fontSize: 14 },

  // Cards listado
  statsRow:    { flexDirection: 'row', gap: 8, marginBottom: 4 },
  card:        { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 16, padding: 18 },
  cardPressed: { opacity: 0.75 },
  cardRow:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  zoneId:      { color: C.muted, fontWeight: '700', fontSize: 11, letterSpacing: 1 },
  zoneName:    { color: C.text, fontWeight: '700', fontSize: 20 },
  zoneCapacity:{ color: C.label, fontSize: 14 },

  // Botones principales
  btnCreate:   { backgroundColor: C.accent, borderRadius: 14, paddingVertical: 16,
                 alignItems: 'center', marginTop: 4 },
  btnCreateText:{ color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 1 },
  btnSecondary: { borderWidth: 1, borderColor: C.border, borderRadius: 14, paddingVertical: 12,
                  alignItems: 'center' },
  btnSecondaryText: { color: C.label, fontWeight: '600', fontSize: 14 },

  // Detalle
  backBtn:     { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  backText:    { color: C.accent, fontWeight: '700', fontSize: 13, letterSpacing: 1 },
  detailHero:  { backgroundColor: C.card, borderWidth: 1, borderRadius: 20, padding: 24, gap: 8, marginBottom: 8 },
  detailId:    { color: C.muted, fontWeight: '700', fontSize: 12, letterSpacing: 1.5 },
  detailName:  { color: C.text, fontWeight: '800', fontSize: 32, lineHeight: 38 },
  detailCapRow:{ gap: 2 },
  detailCapNum:{ color: C.text, fontWeight: '800', fontSize: 44 },
  detailCapLabel:{ color: C.muted, fontWeight: '700', fontSize: 12, letterSpacing: 2 },
  detailStatus:{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                 paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, marginTop: 4 },
  detailStatusText: { fontWeight: '800', fontSize: 16, letterSpacing: 1 },
  dot:         { width: 9, height: 9, borderRadius: 5 },
  sectionLabel:{ color: C.muted, fontWeight: '700', fontSize: 11, letterSpacing: 2, marginTop: 8 },
  opBtn:       { backgroundColor: '#0d1e36', borderWidth: 1, borderColor: C.border,
                 borderRadius: 14, paddingVertical: 16, paddingHorizontal: 20 },
  opBtnText:   { color: C.text, fontWeight: '700', fontSize: 16 },

  // Modal
  overlay:     { flex: 1, backgroundColor: '#000000cc', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard:   { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, borderRadius: 20,
                 padding: 24, width: '100%', maxWidth: 380, gap: 12 },
  modalTitle:  { color: C.text, fontWeight: '800', fontSize: 22 },
  modalSub:    { color: C.label, fontSize: 14, lineHeight: 20 },
  modalOption: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14,
                 borderWidth: 1, borderRadius: 12, backgroundColor: C.card },
  modalOptionText: { fontWeight: '700', fontSize: 16 },
  modalCancel: { paddingVertical: 12, alignItems: 'center' },

  // Formulario
  formTitle:   { color: C.text, fontWeight: '800', fontSize: 26, marginBottom: 4 },
  formLabel:   { color: C.muted, fontWeight: '700', fontSize: 11, letterSpacing: 1.5, marginTop: 8 },
  input:       { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 12,
                 color: C.text, fontSize: 16, padding: 14 },
  statusToggle:{ flexDirection: 'row', gap: 8 },
  statusOption:{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                 gap: 6, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: C.border,
                 backgroundColor: C.card },
  statusOptionText: { color: C.muted, fontWeight: '700', fontSize: 12 },
});