/* Review navigation around the prototype; all entries reuse the app's renderers. */
const libraryEntries = [
  ...(isHomepageExploration ? [{id:'scribe-explore',group:'Scribe exploration',label:'Scribe · Appointments',screen:'scribe',data:{patientView:'appointments',patientDay:'2026-10-02'}}, ...(isScribeExploration ? [{id:'scribe-round',group:'Scribe exploration',label:'Scribe · Round',screen:'scribe',data:{patientView:'round',patientDay:'2026-10-02'}},{id:'scribe-sessions',group:'Scribe exploration',label:'Sessions · By date',screen:'scribe',data:{patientView:'sessions',sessionGrouping:'date'}},{id:'scribe-sessions-patient',group:'Scribe exploration',label:'Sessions · By patient',screen:'scribe',data:{patientView:'sessions',sessionGrouping:'patient'}},{id:'scribe-directory',group:'Scribe exploration',label:'Patients · Directory',screen:'patients',data:{patientView:'all'}},{id:'scribe-today',group:'Scribe exploration',label:'Today · Quick entry',screen:'today',data:{homeConcept:'apps'}},{id:'scribe-empty',group:'Scribe exploration',label:'Scribe · Empty day',screen:'scribe',data:{patientView:'appointments',patientDay:'2026-10-03'}}] : [])] : []),
  {id:'home-conference-email',group:'Homepage examples',label:'Conference invitation routine',screen:'today',modal:'home-detail',data:{homeConcept:'apps',homeDetailId:'conference-email'}},
  {id:'home-day-summary',group:'Homepage examples',label:'Day summary routine',screen:'today',modal:'home-detail',data:{homeConcept:'apps',homeDetailId:'day-summary'}},
  {id:'home-balanced',group:'Homepage options',label:'10 · Patients, work and review',screen:'today',data:{homeConcept:'balanced'}},
  {id:'home-instructions',group:'Homepage examples',label:'Patient instructions review',screen:'today',modal:'home-detail',data:{homeConcept:'balanced',homeDetailId:'instructions'}},
  ... (isHomepageExploration ? [
    {id:'note-pushed',group:'Sessions',label:'Note pushed to EHR',screen:'session',data:{sessionId:'s-linda-2',patientId:'linda',encounterId:'lindaCurrent'}},
    {id:'note-shared',group:'Sessions',label:'Note shared',screen:'session',data:{sessionId:'s-noah-1',patientId:'noah',encounterId:'noahPrior'}},
    {id:'note-unshared',group:'Sessions',label:'Note not shared',screen:'session',data:{sessionId:'s-amelia-1',patientId:'amelia',encounterId:'ameliaPrior'}},
    {id:'patients-appointments',group:'Patient ideas',label:'Appointments by day',screen:'patients',data:{patientView:'appointments',patientDay:'2026-10-02'}},
    {id:'patients-round',group:'Patient ideas',label:'Active inpatient round',screen:'patients',data:{patientView:'round'}},
    {id:'patients-all',group:'Patient ideas',label:'All patients directory',screen:'patients',data:{patientView:'all'}},
    {id:'patients-empty-day',group:'Patient ideas',label:'Day without appointments',screen:'patients',data:{patientView:'appointments',patientDay:'2026-10-03'}}
  ] : []),
  { id:'home-apps', group:'Homepage options', label:'1 · My day — Apps-owned', screen:'today', data:{homeConcept:'apps'} },
  { id:'home-agents', group:'Homepage options', label:'2 · Ready for you — Agents', screen:'today', data:{homeConcept:'agents'} },
  { id:'home-prepare', group:'Homepage options', label:'3 · Your day — Prepare', screen:'today', data:{homeConcept:'rhythm',homePhase:'prepare',homeAgents:true} },
  { id:'home-during', group:'Homepage options', label:'3 · Your day — See patients', screen:'today', data:{homeConcept:'rhythm',homePhase:'during',homeAgents:true} },
  { id:'home-finish', group:'Homepage options', label:'3 · Your day — Wrap up', screen:'today', data:{homeConcept:'rhythm',homePhase:'finish',homeAgents:true} },
  { id:'home-rhythm-apps', group:'Homepage options', label:'3 · Your day — Apps only', screen:'today', data:{homeConcept:'rhythm',homePhase:'prepare',homeAgents:false} },
  { id:'home-patient', group:'Homepage options', label:'4 · This patient, then next', screen:'today', data:{homeConcept:'patient',homeVisitStage:'after'} },
  { id:'home-delegated', group:'Homepage options', label:'5 · Heidi is taking care of', screen:'today', data:{homeConcept:'delegated'} },
  { id:'home-capture', group:'Homepage options', label:'6 · Get it out of your head', screen:'today', data:{homeConcept:'capture'} },
  { id:'home-now-patient', group:'Homepage examples', label:'9 · Patient and related work', screen:'history', data:{homeConcept:'now',patientId:'linda'} },
  { id:'home-visit', group:'Homepage options', label:'7 · Finish this visit', screen:'today', data:{homeConcept:'visit'} },
  { id:'home-leave', group:'Homepage options', label:'8 · Leave today in a good place', screen:'today', data:{homeConcept:'leave'} },
  { id:'home-now', group:'Homepage options', label:'9 · Pick up where you are', screen:'today', data:{homeConcept:'now'} },
  { id:'home-before', group:'Homepage examples', label:'Before seeing the patient', screen:'today', data:{homeConcept:'patient',homeVisitStage:'before'} },
  { id:'home-prechart', group:'Homepage examples', label:'Prechart preview', screen:'today', modal:'home-detail', data:{homeConcept:'patient',homeDetailId:'prechart'} },
  { id:'home-recipient', group:'Homepage examples', label:'Recipient needed', screen:'today', modal:'home-detail', data:{homeConcept:'delegated',homeDetailId:'recipient'} },
  { id:'home-desktop', group:'Homepage examples', label:'Desktop handoff', screen:'today', modal:'home-detail', data:{homeConcept:'delegated',homeDetailId:'desktop'} },
  { id:'home-urgent', group:'Homepage examples', label:'Flagged work', screen:'today', modal:'home-detail', data:{homeConcept:'leave',homeDetailId:'urgent'} },
  { id:'home-draft', group:'Homepage examples', label:'Ready draft', screen:'today', modal:'home-detail', data:{homeConcept:'agents',homeDetailId:'followup'} },
  { id:'home-handover', group:'Homepage examples', label:'Handover draft', screen:'today', modal:'home-detail', data:{homeConcept:'agents',homeDetailId:'handover'} },
  { id:'home-carry', group:'Homepage examples', label:'Carry forward', screen:'today', modal:'home-detail', data:{homeConcept:'rhythm',homePhase:'finish',homeDetailId:'carry'} },
  { id:'home-routine', group:'Homepage examples', label:'Routine result', screen:'today', modal:'home-detail', data:{homeConcept:'agents',homeDetailId:'brief'} },
  { id:'home-running', group:'Homepage examples', label:'Routine in progress', screen:'today', modal:'home-detail', data:{homeConcept:'agents',homeDetailId:'running'} },
  { id:'home-blocked', group:'Homepage examples', label:'Routine needs attention', screen:'today', modal:'home-detail', data:{homeConcept:'agents',homeDetailId:'blocked'} },
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
].filter(entry => isHomepageExploration || !entry.id.startsWith('home-'));
// Keep the current journey prominent; earlier explorations remain searchable.
if (isHomepageExploration) {
  const sections = {
    'Scribe exploration': ['scribe-explore','scribe-round','scribe-sessions','scribe-sessions-patient','scribe-directory','scribe-today','scribe-empty'],
    'Home': ['home-apps'],
    'Patients': ['patients-appointments','patients-round','patients-all','patient-history'],
    'Work & review': ['work','todo-detail','agent-detail','home-day-summary','home-conference-email','home-instructions','ask-heidi'],
    'Sessions & encounters': ['sessions','session-linked','note-pushed','note-shared','note-unshared','appointment','inpatient','completed'],
    'More states & tools': [],
    'Earlier home explorations': []
  };
  const names = {'home-apps':'My day · Apps-owned', 'home-balanced':'Patients, work and review','patients-appointments':'Appointments · By date','patients-round':'Round · By date','patients-all':'View all patients','patient-history':'Patient profile','work':'Work overview','todo-detail':'To-do details','agent-detail':'Work with Heidi','home-instructions':'Ready for review','session-linked':'Session workspace'};
  libraryEntries.forEach(entry => {
    const group = Object.keys(sections).find(key=>sections[key].includes(entry.id));
    entry.group = group || (entry.id.startsWith('home-') ? 'Earlier home explorations' : 'More states & tools');
    entry.label = names[entry.id] || entry.label.replace(/^\d+ · /,'');
  });
  const order = Object.keys(sections);
  libraryEntries.sort((a,b)=>order.indexOf(a.group)-order.indexOf(b.group) || (sections[a.group].indexOf(a.id) - sections[b.group].indexOf(b.id)));
}
const libraryLayout = window.matchMedia('(max-width: 740px)');
let libraryOpen = !libraryLayout.matches;
const libraryPanel = document.getElementById('screenLibrary');
const libraryList = document.getElementById('libraryScreens');

function currentLibraryId() {
  if (isScribeExploration && !state.modal && !state.chatOpen) {
    if (state.screen === 'scribe') return state.patientView === 'round' ? 'scribe-round' : state.patientView === 'sessions' ? (state.sessionGrouping === 'patient' ? 'scribe-sessions-patient' : 'scribe-sessions') : state.patientDay === '2026-10-03' ? 'scribe-empty' : 'scribe-explore';
    if (state.screen === 'patients') return 'scribe-directory';
    if (state.screen === 'today' && state.homeConcept === 'apps') return 'scribe-today';
  }
  if (isHomepageExploration && state.screen === 'today' && !state.homeConcept && !state.modal && !state.chatOpen) return 'home-apps';
  if (isHomepageExploration && state.screen === 'patients' && !state.modal && !state.chatOpen) return state.patientView === 'round' ? 'patients-round' : state.patientView === 'all' ? 'patients-all' : state.patientDay === '2026-10-03' ? 'patients-empty-day' : 'patients-appointments';
  if (state.homeConcept === 'now' && state.screen === 'history' && !state.modal && !state.chatOpen) return 'home-now-patient';
  if (state.screen === 'today' && state.homeConcept === 'patient' && state.homeVisitStage === 'before' && !state.modal && !state.chatOpen) return 'home-before';
  if (state.modal === 'home-detail') return ({'conference-email':'home-conference-email','day-summary':'home-day-summary',instructions:'home-instructions',prechart:'home-prechart',recipient:'home-recipient',desktop:'home-desktop',urgent:'home-urgent',handover:'home-handover',carry:'home-carry',followup:'home-draft',brief:'home-routine',running:'home-running',blocked:'home-blocked'})[state.homeDetailId] || 'home-agents';
  if (state.screen === 'today' && state.homeConcept && !state.modal && !state.chatOpen) return state.homeConcept === 'rhythm' ? (state.homeAgents === false && state.homePhase === 'prepare' ? 'home-rhythm-apps' : 'home-' + (state.homePhase || 'prepare')) : 'home-' + state.homeConcept;
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
  if (state.screen === 'session') return (isHomepageExploration && {'s-linda-2':'note-pushed','s-noah-1':'note-shared','s-amelia-1':'note-unshared'}[state.sessionId]) || (session(state.sessionId)?.patientId ? 'session-linked' : 'session-adhoc');
  if (state.screen === 'record') return 'capture';
  if (state.screen === 'tasks') {
    const item = workItems.find(item => item.id === state.expandedWorkId);
    return item ? item.owner === 'heidi' ? 'agent-detail' : 'todo-detail' : 'work';
  }
  return state.screen;
}

function syncLibrary() {
  const id = currentLibraryId();
  const clockLabel = document.querySelector('.phone-status > span:first-child');
  if (clockLabel) clockLabel.textContent = state.homeConcept === 'leave' ? '17:30' : state.homeConcept === 'rhythm' ? ({prepare:'7:30',during:'11:30',finish:'17:30'})[state.homePhase || 'prepare'] : '9:41';
  const selector = document.getElementById('homeConceptSelect');
  if (selector) {
    selector.value = state.homeConcept || (isHomepageExploration ? 'apps' : 'original');
    document.getElementById('homeDependency').textContent = state.homeConcept === 'now' ? 'Home → Patients · Existing work records · Agent activity illustrative' : state.homeConcept === 'agents' ? 'Agent examples · No connected execution' : state.homeConcept === 'rhythm' ? 'Day stages · Optional agent examples' : ['apps','capture'].includes(state.homeConcept) ? 'Apps-owned · No new agent dependency' : state.homeConcept ? 'Workflow concept · Example work and agent states' : 'Existing prototype';
    document.getElementById('homeAgentControl').hidden = state.homeConcept !== 'rhythm';
    document.getElementById('homeAgentToggle').checked = state.homeAgents !== false;
  }
  libraryList.querySelectorAll('[data-screen-id]').forEach(button => {
    if (button.dataset.screenId === id) { button.setAttribute('aria-current', 'page'); const group = button.closest('details'); if (group) group.open = true; }
    else button.removeAttribute('aria-current');
  });
  const entry = libraryEntries.find(entry => entry.id === id);
  document.getElementById('previewLocation').textContent = entry ? entry.group + ' / ' + entry.label : 'Mobile prototype';
}

function renderLibrary() {
  const query = document.getElementById('librarySearch').value.trim().toLowerCase();
  const entries = libraryEntries.filter(entry => (entry.group + ' ' + entry.label).toLowerCase().includes(query));
  const groups = [...new Set(entries.map(entry => entry.group))];
  const previousOpen = new Set([...libraryList.querySelectorAll('details[open]')].map(el=>el.dataset.group));
  libraryList.innerHTML = groups.map(group => {
    const rows = entries.filter(entry=>entry.group === group).map(entry => '<button type="button" class="library-screen" data-action="library-screen" data-screen-id="' + entry.id + '"><span>' + esc(entry.label) + '</span>' + (entry.modal ? '<small>Sheet</small>' : '') + '</button>').join('');
    if (!isHomepageExploration) return '<section class="library-group"><h2>' + esc(group) + '</h2>' + rows + '</section>';
    const open = query || previousOpen.has(group) || ['Scribe exploration','Home','Patients','Work & review'].includes(group);
    return '<details class="library-group library-disclosure" data-group="' + esc(group) + '"' + (open ? ' open' : '') + '><summary>' + esc(group) + '</summary>' + rows + '</details>';
  }).join('') || '<p class="library-no-results">No screens match “' + esc(query) + '”.</p>';
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
  if (id === 'scribe-explore' && !isScribeExploration) { location.href = '?view=ideas&flow=scribe&screen=scribe-explore'; return; }
  if (entry.sample && state.recording) {
    if (entry.screen === 'record') {
      const recording = session(state.recordingSessionId);
      navigate('record', { sessionId: recording.id, patientId: recording.patientId, encounterId: recording.encounterId });
    } else toast('Finish your current recording before opening this example.');
    return;
  }
  Object.assign(state, { screen: entry.screen, homeConcept:null, homeListMode:'appointments', homeReturnScroll:0, stack: [], modal: entry.modal || null, chatOpen: false, chatVoiceNotice: false, toast: null, search: '', patientSearch: '', assignSearch: '', wardFilter: 'All wards', expandedWorkId: null, collapsedWorkGroups: {}, patientId: null, encounterId: null, sessionId: null, encounterCreationOrigin: 'session', quickAddPatientId: null, encounterDraft: null, workDraft: null }, entry.data || {});
  if (isScribeExploration && entry.screen === 'sessions') { state.screen = 'scribe'; state.patientView = 'sessions'; }
  if (isScribeExploration && entry.screen === 'patients' && ['appointments','round'].includes(entry.data?.patientView)) state.screen = 'scribe';
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
else if (isHomepageExploration) openLibraryScreen('home-apps');

// Comparison controls belong to the preview shell, not the clinician product.
document.getElementById('homeConceptSelect')?.addEventListener('change', event => {
  openLibraryScreen(({balanced:'home-balanced',now:'home-now',patient:'home-patient',delegated:'home-delegated',capture:'home-capture',visit:'home-visit',leave:'home-leave',apps:'home-apps',agents:'home-agents',rhythm:'home-prepare',original:'today-appointments'})[event.target.value]);
});
document.getElementById('homeAgentToggle')?.addEventListener('change', event => {
  state.homeAgents = event.target.checked; state.screen = 'today'; state.modal = null; state.chatOpen = false; render();
});
