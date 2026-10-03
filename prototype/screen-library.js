/* Review navigation around the prototype; all entries reuse the app's renderers. */
const libraryEntries = [
  { id: 'today-appointments', group: 'Today', label: 'Appointments', screen: 'today', data: { todayMode: 'appointments' } },
  { id: 'today-round', group: 'Today', label: 'Round', screen: 'today', data: { todayMode: 'round' } },
  { id: 'appointments-list', group: 'Today', label: 'Full appointment list', screen: 'worklist', data: { worklistType: 'appointments' } },
  { id: 'round-list', group: 'Today', label: 'Full round list', screen: 'worklist', data: { worklistType: 'ward' } },
  { id: 'patients', group: 'Patients', label: 'Patient list', screen: 'patients' },
  { id: 'patient-history', group: 'Patients', label: 'Patient details & history', screen: 'history', data: { patientId: 'linda' } },
  { id: 'patient-details', group: 'Patients', label: 'Patient details', screen: 'history', modal:'patient-details', data:{patientId:'linda'} },
  { id: 'patient-context-edit', group: 'Patients', label: 'Edit patient context', screen: 'history', modal:'edit-patient-context', data:{patientId:'linda'} },
  { id: 'patient-details-edit', group: 'Patients', label: 'Edit patient details', screen: 'history', modal:'edit-patient-details', data:{patientId:'linda'} },
  { id: 'appointment', group: 'Encounters', label: 'Appointment encounter', screen: 'encounter', data: { patientId: 'amelia', encounterId: 'ameliaToday' } },
  { id: 'inpatient', group: 'Encounters', label: 'Inpatient encounter', screen: 'encounter', data: { patientId: 'linda', encounterId: 'lindaCurrent' } },
  { id: 'completed', group: 'Encounters', label: 'Completed encounter', screen: 'encounter', data: { patientId: 'linda', encounterId: 'lindaPrior' } },
  { id: 'sessions', group: 'Sessions', label: 'Session list', screen: 'sessions' },
  { id: 'session-linked', group: 'Sessions', label: 'Session details & note', screen: 'session', data: { sessionId: 's-linda-1', patientId: 'linda', encounterId: 'lindaCurrent' } },
  { id: 'session-details', group: 'Sessions', label: 'Session details', screen: 'session', modal: 'session-details', data: { sessionId: 's-linda-1', patientId: 'linda', encounterId: 'lindaCurrent' } },
  { id: 'session-adhoc', group: 'Sessions', label: 'Ad hoc session', screen: 'session', sample: 'unassigned' },
  { id: 'capture', group: 'Sessions', label: 'Capture / recording', screen: 'record', sample: 'unassigned' },
  { id: 'work', group: 'Work', label: 'All work', screen: 'tasks' },
  { id: 'todo-detail', group: 'Work', label: 'To-do details', screen: 'tasks', data: { expandedWorkId: 'results' } },
  { id: 'agent-detail', group: 'Work', label: 'Heidi work details', screen: 'tasks', data: { expandedWorkId: 'followup', collapsedWorkGroups: { todo: true } } },
  { id: 'quick-add', group: 'Create & assign', label: 'Quick add menu', screen: 'today', modal: 'quick-add' },
  { id: 'new-patient', group: 'Create & assign', label: 'Add patient profile', screen: 'patients', modal: 'new-patient', data: { patientCreationOrigin: 'standalone' } },
  { id: 'new-encounter-patient', group: 'Create & assign', label: 'Choose patient for new encounter', screen: 'today', modal: 'encounter-patient', data: { encounterCreationOrigin: 'standalone' } },
  { id: 'standalone-appointment', group: 'Create & assign', label: 'Add appointment without a session', screen: 'today', modal: 'new-encounter', data: { encounterCreationOrigin: 'standalone', quickAddPatientId: 'linda', newEncounterType: 'appointment' } },
  { id: 'standalone-inpatient', group: 'Create & assign', label: 'Add inpatient care without a session', screen: 'today', modal: 'new-encounter', data: { encounterCreationOrigin: 'standalone', quickAddPatientId: 'linda', newEncounterType: 'inpatient' } },
  { id: 'new-work', group: 'Create & assign', label: 'Add task / work', screen: 'tasks', modal: 'new-work' },
  { id: 'assign-patient', group: 'Create & assign', label: 'Assign patient', screen: 'session', modal: 'patient-picker', sample: 'unassigned' },
  { id: 'new-session-patient', group: 'Create & assign', label: 'Add patient to session', screen: 'session', modal: 'new-patient', sample: 'unassigned', data: { patientCreationOrigin: 'session' } },
  { id: 'assign-encounter', group: 'Create & assign', label: 'Assign encounter', screen: 'session', modal: 'encounter-picker', sample: 'patient' },
  { id: 'create-appointment', group: 'Create & assign', label: 'Create appointment encounter', screen: 'session', modal: 'new-encounter', sample: 'patient', data: { newEncounterType: 'appointment' } },
  { id: 'create-inpatient', group: 'Create & assign', label: 'Create inpatient encounter', screen: 'session', modal: 'new-encounter', sample: 'patient', data: { newEncounterType: 'inpatient' } },
  { id: 'ask-heidi', group: 'Across the app', label: 'Ask Heidi', screen: 'today', data: { chatOpen: true, chatContext: 'Today' } },
  { id: 'search', group: 'Across the app', label: 'Search', screen: 'search' }
];
const libraryLayout = window.matchMedia('(max-width: 740px)');
let libraryOpen = !libraryLayout.matches;
const libraryPanel = document.getElementById('screenLibrary');
const libraryList = document.getElementById('libraryScreens');

function currentLibraryId() {
  if (state.modal === 'patient-details') return 'patient-details';
  if (state.modal === 'edit-patient-context') return 'patient-context-edit';
  if (state.modal === 'edit-patient-details') return 'patient-details-edit';
  if (state.chatOpen) return 'ask-heidi';
  if (state.modal === 'session-details') return 'session-details';
  if (state.modal === 'quick-add') return 'quick-add';
  if (state.modal === 'new-work') return 'new-work';
  if (state.modal === 'encounter-patient') return 'new-encounter-patient';
  if (state.modal === 'new-patient') return state.patientCreationOrigin !== 'session' ? 'new-patient' : 'new-session-patient';
  if (state.modal === 'patient-picker') return 'assign-patient';
  if (state.modal === 'encounter-picker') return 'assign-encounter';
  if (state.modal === 'new-encounter') return (state.encounterCreationOrigin === 'standalone' ? 'standalone-' : 'create-') + (state.newEncounterType === 'appointment' ? 'appointment' : 'inpatient');
  if (state.screen === 'today') return state.todayMode === 'round' ? 'today-round' : 'today-appointments';
  if (state.screen === 'worklist') return state.worklistType === 'appointments' ? 'appointments-list' : 'round-list';
  if (state.screen === 'history') return 'patient-history';
  if (state.screen === 'encounter') {
    const encounter = encounters[state.encounterId];
    return encounter.status === 'Complete' ? 'completed' : encounter.kind === 'Appointment encounter' ? 'appointment' : 'inpatient';
  }
  if (state.screen === 'session') return session(state.sessionId)?.patientId ? 'session-linked' : 'session-adhoc';
  if (state.screen === 'record') return 'capture';
  if (state.screen === 'tasks') {
    const item = workItems.find(item => item.id === state.expandedWorkId);
    return item ? item.owner === 'heidi' ? 'agent-detail' : 'todo-detail' : 'work';
  }
  return state.screen;
}

function syncLibrary() {
  const id = currentLibraryId();
  libraryList.querySelectorAll('[data-screen-id]').forEach(button => {
    if (button.dataset.screenId === id) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  const entry = libraryEntries.find(entry => entry.id === id);
  document.getElementById('previewLocation').textContent = entry ? entry.group + ' / ' + entry.label : 'Mobile prototype';
}

function renderLibrary() {
  const query = document.getElementById('librarySearch').value.trim().toLowerCase();
  const entries = libraryEntries.filter(entry => (entry.group + ' ' + entry.label).toLowerCase().includes(query));
  const groups = [...new Set(entries.map(entry => entry.group))];
  libraryList.innerHTML = groups.map(group => '<section class="library-group"><h2>' + esc(group) + '</h2>' + entries.filter(entry => entry.group === group).map(entry => '<button type="button" class="library-screen" data-action="library-screen" data-screen-id="' + entry.id + '"><span>' + esc(entry.label) + '</span>' + (entry.modal ? '<small>Sheet</small>' : '') + '</button>').join('') + '</section>').join('') || '<p class="library-no-results">No screens match “' + esc(query) + '”.</p>';
  document.getElementById('libraryCount').textContent = libraryEntries.length;
  syncLibrary();
}

function setLibraryOpen(open) {
  libraryOpen = open;
  document.querySelector('.demo-shell').classList.toggle('library-collapsed', !open);
  libraryPanel.hidden = !open;
  document.querySelector('.library-backdrop').hidden = !(open && libraryLayout.matches);
  document.querySelector('.device-stage').inert = open && libraryLayout.matches;
  const toggle = document.getElementById('libraryToggle');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Hide screen library' : 'Show screen library');
  toggle.innerHTML = icon(open ? 'left' : 'file') + '<span>Screens</span>';
  if (open && libraryLayout.matches) document.getElementById('librarySearch').focus();
}

function openLibraryScreen(id) {
  const entry = libraryEntries.find(entry => entry.id === id);
  if (!entry) return;
  if (entry.sample && state.recording) {
    if (entry.screen === 'record') {
      const recording = session(state.recordingSessionId);
      navigate('record', { sessionId: recording.id, patientId: recording.patientId, encounterId: recording.encounterId });
    } else toast('Finish your current recording before opening this example.');
    return;
  }
  Object.assign(state, { screen: entry.screen, stack: [], modal: entry.modal || null, chatOpen: false, chatVoiceNotice: false, toast: null, search: '', patientSearch: '', assignSearch: '', wardFilter: 'All wards', expandedWorkId: null, collapsedWorkGroups: {}, patientId: null, encounterId: null, sessionId: null, encounterCreationOrigin: 'session', quickAddPatientId: null, encounterDraft: null, workDraft: null }, entry.data || {});
  if (entry.sample) {
    // A temporary sample allows direct previews without adding a saved session.
    state.librarySession = { ...seedSessions.find(item => item.id === 's-unlinked'), id: 'library-session', patientId: entry.sample === 'patient' ? 'linda' : null, encounterId: null };
    state.sessionId = state.librarySession.id;
    state.patientId = state.librarySession.patientId;
    if (entry.screen === 'record') { state.elapsedBeforePause = 0; state.startedAt = null; state.paused = false; }
  } else if (entry.screen === 'session') {
    const selected = session(state.sessionId);
    selected.workspaceView = 'documents';
    state.patientId = selected.patientId;
    state.encounterId = selected.encounterId;
  }
  render();
  if (libraryLayout.matches) setLibraryOpen(false);
}

document.addEventListener('prototype-render', syncLibrary);
document.getElementById('librarySearch').addEventListener('input', renderLibrary);
document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (button?.dataset.action === 'toggle-library') {
    setLibraryOpen(!libraryOpen);
    if (!libraryOpen) document.getElementById('libraryToggle').focus();
  }
  if (button?.dataset.action === 'library-screen') openLibraryScreen(button.dataset.screenId);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && libraryLayout.matches && libraryOpen) {
    event.preventDefault();
    event.stopImmediatePropagation();
    setLibraryOpen(false);
    document.getElementById('libraryToggle').focus();
  }
}, true);
libraryLayout.addEventListener('change', () => setLibraryOpen(!libraryLayout.matches));
renderLibrary();
setLibraryOpen(libraryOpen);

// Allow a direct review link to an existing library screen.
const linkedScreen = new URLSearchParams(location.search).get('screen');
if (libraryEntries.some(entry => entry.id === linkedScreen)) openLibraryScreen(linkedScreen);
