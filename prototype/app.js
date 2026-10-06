/* Local, fictional product prototype. No clinical data or EHR service is connected. */
const isHomepageExploration = new URLSearchParams(location.search).get('view') === 'ideas';
const isScribeExploration = isHomepageExploration && new URLSearchParams(location.search).get('flow') === 'scribe';
document.body.classList.toggle('has-homepage-explorations', isHomepageExploration);
const conceptToolbar = document.querySelector('.concept-toolbar');
if (conceptToolbar) conceptToolbar.hidden = !isHomepageExploration || isScribeExploration;
document.querySelectorAll('[data-site-tab]').forEach(link => {
  if (link.dataset.siteTab === (isHomepageExploration ? 'ideas' : 'prototype')) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
});
const STORAGE_KEY = isScribeExploration ? 'heidi-scribe-exploration-v1' : isHomepageExploration ? 'heidi-homepage-explorations-v1' : 'heidi-today-concept-v2';
const patients = {
  linda: { name: 'Linda Wong', dob: '20 Apr 1985', initials: 'LW', avatar: 'green', identifier: 'HW-10482' },
  amelia: { name: 'Amelia Grant', dob: '14 Feb 1979', initials: 'AG', avatar: 'blue', identifier: 'HW-20816' },
  noah: { name: 'Noah Patel', dob: '8 Nov 1991', initials: 'NP', avatar: 'sun', identifier: 'HW-30154' }
};
const encounters = {
  lindaCurrent: { patientId: 'linda', title: 'Inpatient care', kind: 'Inpatient encounter', date: '30 Sep – ongoing', startedAt: '2026-09-30', source: 'Cerner', location: 'Ward 4B · Room 09', status: 'Active', sort: 20260930 },
  lindaPrior: { patientId: 'linda', title: 'Respiratory follow-up', kind: 'Appointment encounter', date: '12 Aug 2026', startedAt: '2026-08-12', source: 'Cerner', location: 'Respiratory clinic', status: 'Complete', sort: 20260812 },
  ameliaToday: { patientId: 'amelia', title: 'Follow-up appointment', kind: 'Appointment encounter', date: 'Today · 10:30 AM', startedAt: '2026-10-02T10:30', source: 'Cerner', location: 'General practice', status: 'Upcoming', sort: 20261002 },
  ameliaPrior: { patientId: 'amelia', title: 'Initial consultation', kind: 'Appointment encounter', date: '12 Jun 2026', startedAt: '2026-06-12', source: 'Cerner', location: 'General practice', status: 'Complete', sort: 20260612 },
  noahToday: { patientId: 'noah', title: 'Review appointment', kind: 'Appointment encounter', date: 'Today · 1:45 PM', startedAt: '2026-10-02T13:45', source: 'Cerner', location: 'General practice', status: 'Upcoming', sort: 20261002 },
  noahPrior: { patientId: 'noah', title: 'Medication review', kind: 'Appointment encounter', date: '24 Sep 2026', startedAt: '2026-09-24', source: 'Cerner', location: 'General practice', status: 'Complete', sort: 20260924 }
};
const appointmentPlan = [
  { patientId: 'olivia', encounterId: 'oliviaToday', time: '10:00', name: 'Olivia Chen', dob: '6 May 1988', initials: 'OC', avatar: 'blue', title: 'Review appointment' },
  { patientId: 'amelia', encounterId: 'ameliaToday', time: '10:30' },
  { patientId: 'sofia', encounterId: 'sofiaToday', time: '11:00', name: 'Sofia Martin', dob: '18 Mar 1972', initials: 'SM', avatar: 'green', title: 'Follow-up appointment' },
  { patientId: 'ibrahim', encounterId: 'ibrahimToday', time: '11:30', name: 'Ibrahim Hassan', dob: '9 Jan 1965', initials: 'IH', avatar: 'sun', title: 'Initial consultation' },
  { patientId: 'ethan', encounterId: 'ethanToday', time: '12:15', name: 'Ethan Brooks', dob: '2 Sep 1981', initials: 'EB', avatar: 'blue', title: 'Review appointment' },
  { patientId: 'priya', encounterId: 'priyaToday', time: '13:00', name: 'Priya Shah', dob: '21 Jul 1990', initials: 'PS', avatar: 'green', title: 'Follow-up appointment' },
  { patientId: 'noah', encounterId: 'noahToday', time: '13:45' },
  { patientId: 'mei', encounterId: 'meiToday', time: '14:30', name: 'Mei Tan', dob: '11 Dec 1978', initials: 'MT', avatar: 'sun', title: 'Review appointment' },
  { patientId: 'gabriel', encounterId: 'gabrielToday', time: '15:15', name: 'Gabriel Reed', dob: '4 Apr 1959', initials: 'GR', avatar: 'blue', title: 'Follow-up appointment' },
  { patientId: 'leah', encounterId: 'leahToday', time: '16:00', name: 'Leah Morgan', dob: '17 Oct 1984', initials: 'LM', avatar: 'green', title: 'Initial consultation' }
];
const wardPlan = [
  { patientId: 'linda', encounterId: 'lindaCurrent', ward: 'Ward 4B', room: '09' },
  { patientId: 'marcus', encounterId: 'marcusCurrent', name: 'Marcus Bell', dob: '3 Jun 1949', initials: 'MB', avatar: 'blue', ward: 'Ward 4B', room: '10' },
  { patientId: 'danielle', encounterId: 'danielleCurrent', name: 'Danielle Wu', dob: '27 Feb 1976', initials: 'DW', avatar: 'sun', ward: 'Ward 4B', room: '11' },
  { patientId: 'sahvni', encounterId: 'sahvniCurrent', name: 'Sahvni Patel', dob: '12 Aug 1968', initials: 'SP', avatar: 'green', ward: 'Ward 4B', room: '12' },
  { patientId: 'mateo', encounterId: 'mateoCurrent', name: 'Mateo Silva', dob: '30 Nov 1956', initials: 'MS', avatar: 'blue', ward: 'Ward 4B', room: '14' },
  { patientId: 'amina', encounterId: 'aminaCurrent', name: 'Amina Yusuf', dob: '8 Apr 1983', initials: 'AY', avatar: 'sun', ward: 'Ward 4B', room: '16' },
  { patientId: 'eva', encounterId: 'evaCurrent', name: 'Eva Kim', dob: '14 Sep 1970', initials: 'EK', avatar: 'green', ward: 'Ward 6A', room: '02' },
  { patientId: 'henry', encounterId: 'henryCurrent', name: 'Henry Clark', dob: '25 May 1961', initials: 'HC', avatar: 'blue', ward: 'Ward 6A', room: '04' },
  { patientId: 'zara', encounterId: 'zaraCurrent', name: 'Zara Ali', dob: '19 Jan 1992', initials: 'ZA', avatar: 'sun', ward: 'Ward 6A', room: '07' },
  { patientId: 'joseph', encounterId: 'josephCurrent', name: 'Joseph Price', dob: '7 Jul 1947', initials: 'JP', avatar: 'green', ward: 'Ward 6A', room: '08' }
];
appointmentPlan.forEach(item => {
  if (!patients[item.patientId]) patients[item.patientId] = { name: item.name, dob: item.dob, initials: item.initials, avatar: item.avatar, identifier: 'HW-' + String(40000 + Object.keys(patients).length * 137) };
  if (!encounters[item.encounterId]) encounters[item.encounterId] = { patientId: item.patientId, title: item.title, kind: 'Appointment encounter', date: 'Today · ' + item.time, startedAt: '2026-10-02T' + item.time, source: 'Cerner', location: 'General practice', status: 'Upcoming', sort: 20261002 };
});
wardPlan.forEach(item => {
  if (!patients[item.patientId]) patients[item.patientId] = { name: item.name, dob: item.dob, initials: item.initials, avatar: item.avatar, identifier: 'HW-' + String(50000 + Object.keys(patients).length * 137) };
  if (!encounters[item.encounterId]) encounters[item.encounterId] = { patientId: item.patientId, title: 'Inpatient care', kind: 'Inpatient encounter', date: '30 Sep – ongoing', startedAt: '2026-09-30', source: 'Cerner', location: item.ward + ' · Room ' + item.room, status: 'Active', sort: 20260930 };
});
Object.keys(encounters).sort().forEach((id, index) => { encounters[id].identifier = 'HE-' + String(10001 + index); });
const seedSessions = [
  { id: 's-linda-1', occurredAt: '2026-10-02T08:12:00', patientId: 'linda', encounterId: 'lindaCurrent', title: 'Morning ward review', date: 'Today · 8:12 AM', note: 'Oxygen requirement improving. Review morning results and reassess the discharge plan with Linda and her family.', status: 'Note ready' },
  { id: 's-linda-2', occurredAt: '2026-10-01T16:10:00', patientId: 'linda', encounterId: 'lindaCurrent', title: 'Care team discussion', date: 'Yesterday · 4:10 PM', note: 'Discussed the overnight plan and pending blood cultures with the care team.', status: 'Note ready' },
  { id: 's-linda-3', occurredAt: '2026-09-30T11:05:00', patientId: 'linda', encounterId: 'lindaCurrent', title: 'Admission review', date: '30 Sep · 11:05 AM', note: 'Admitted via emergency with community-acquired pneumonia. Initial assessment and treatment plan recorded.', status: 'Note ready' },
  { id: 's-linda-4', occurredAt: '2026-08-12T14:20:00', patientId: 'linda', encounterId: 'lindaPrior', title: 'Respiratory follow-up', date: '12 Aug · 2:20 PM', note: 'Reviewed breathing symptoms and planned a follow-up if symptoms persisted.', status: 'Note ready' },
  { id: 's-amelia-1', occurredAt: '2026-06-12T09:45:00', patientId: 'amelia', encounterId: 'ameliaPrior', title: 'Initial consultation', date: '12 Jun · 9:45 AM', note: 'Discussed symptoms, history and a plan for follow-up.', status: 'Note ready' },
  { id: 's-noah-1', occurredAt: '2026-09-24T15:15:00', patientId: 'noah', encounterId: 'noahPrior', title: 'Medication review', date: '24 Sep · 3:15 PM', note: 'Reviewed current medication and follow-up questions.', status: 'Note ready' },
  { id: 's-unlinked', occurredAt: '2026-10-02T09:18:00', patientId: null, encounterId: null, title: 'Conversation to file', date: 'Today · 9:18 AM', note: 'Discussed progress since the last review and agreed on the next steps.', status: 'Note ready' }
];
const workItems = [
  { id: 'results', title: 'Review morning results', status: 'todo', owner: 'you', sessionId: 's-linda-1', origin: 'Suggested from session', detail: 'Review the pending results discussed during the morning ward review.' },
  { id: 'discharge', title: 'Clarify discharge plan', status: 'todo', owner: 'you', sessionId: 's-linda-1', origin: 'Suggested from session', detail: 'Confirm the next steps with Linda and her family.' },
  { id: 'team', title: 'Follow up with the team', status: 'todo', owner: 'you', origin: 'Added through Ask Heidi', detail: 'Check in with the team tomorrow about the next steps.' },
  { id: 'followup', title: 'Prepare GP follow-up', status: 'progress', owner: 'heidi', encounterId: 'lindaCurrent', origin: 'Requested through Ask Heidi', detail: 'Heidi is preparing a draft from this encounter. It will be available here and in the encounter when ready for review.' },
  { id: 'prep', title: 'Prepare tomorrow’s schedule', status: 'progress', owner: 'heidi', origin: 'Routine · Daily preparation', detail: 'Heidi is gathering tomorrow’s appointments and related session notes for your daily preparation.' },
  { id: 'overnight', title: 'Review overnight plan', status: 'done', owner: 'you', sessionId: 's-linda-2', origin: 'Suggested from session', detail: 'Reviewed the overnight plan from the care team discussion.' }
];
// Embedded guide examples use temporary state and never read or overwrite saved records.
const isEmbeddedPreview = document.documentElement.hasAttribute('data-embedded-preview');
const stored = (() => { if (isEmbeddedPreview) return null; try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; } })();
// Fictional clinician-curated examples; these fields belong to the patient, not a session.
const patientDetails = {
  linda: { context: 'Respiratory follow-up. Admitted with pneumonia; oxygen needs are improving. Review results and reassess discharge with Linda and her family.', history: 'Previous respiratory review in August 2026.', additionalNotes: 'Include Linda and her family in discharge planning.' },
  amelia: { context: 'General practice follow-up after her initial consultation. Review symptom progress and agree the next steps.', history: 'Initial consultation in June 2026.' },
  ...(stored && stored.patientDetails || {})
};
const customPatients = stored && stored.patients && !Array.isArray(stored.patients) ? stored.patients : {};
const customEncounters = stored && stored.encounters && !Array.isArray(stored.encounters) ? stored.encounters : {};
const customWorkItems = Array.isArray(stored && stored.workItems) ? stored.workItems : [];
workItems.unshift(...customWorkItems);
Object.assign(patients, customPatients);
Object.assign(encounters, customEncounters);
Object.entries(customEncounters).forEach(([id, encounter]) => {
  if (!encounter.identifier) encounter.identifier = 'HE-' + id.replace(/^manual-e-/, '').slice(-8);
});
syncManualEncounterLists();
const state = {
  screen: 'today',
  stack: [],
  sessions: Array.isArray(stored && stored.sessions) ? stored.sessions : seedSessions,
  patientId: null,
  encounterId: null,
  sessionId: null,
  assignSearch: '',
  patientCreationOrigin: 'session',
  newEncounterType: 'appointment',
  encounterCreationOrigin: 'session',
  quickAddPatientId: null,
  encounterDraft: null,
  workDraft: null,
  modal: null,
  recording: false,
  recordingSessionId: null,
  paused: false,
  startedAt: null,
  elapsedBeforePause: 0,
  toast: null,
  search: '',
  worklistType: 'appointments',
  todayMode: 'appointments',
  workStatuses: stored && stored.workStatuses || {},
  expandedWorkId: null,
  collapsedWorkGroups: {},
  wardFilter: 'All wards',
  patientSearch: '',
  chatOpen: false,
  chatMessages: [],
  chatDraft: '',
  chatContext: 'Today',
  chatVoiceNotice: false
};
const legacyDemoSession = state.sessions.find(s => s.id === 's-unlinked');
if (legacyDemoSession && legacyDemoSession.note === 'Discussed progress since the last review and agreed on the next steps. Add the patient and encounter so this work appears in the right history.') {
  legacyDemoSession.note = 'Discussed progress since the last review and agreed on the next steps.';
  save();
}
const iconNames = {
  home: 'House', waves: 'AudioLines', check: 'Check', chevron: 'ChevronRight',
  left: 'ChevronLeft', plus: 'Plus', link: 'Link', clock: 'Clock', search: 'Search',
  close: 'X', file: 'FileText', user: 'UserRound', calendar: 'CalendarDays',
  pause: 'Pause', play: 'Play', stop: 'Square', alert: 'CircleAlert', mic: 'Mic', arrowUp: 'ArrowUp', copy: 'Copy', down: 'ChevronDown', edit: 'Pencil', list: 'List', more: 'Ellipsis', pen: 'NotebookPen'
};
function icon(name) {
  // Render the official Lucide geometry with the product system's stroke weight.
  const renderNode = ([tag, attrs, children = []]) => '<' + tag + ' ' + Object.entries(attrs).map(([key, value]) => key + '="' + esc(value) + '"').join(' ') + '>' + children.map(renderNode).join('') + '</' + tag + '>';
  const [tag, attrs, children] = lucide.icons[iconNames[name]];
  return renderNode([tag, { ...attrs, 'stroke-width': 1.5, 'aria-hidden': 'true' }, children]);
}
function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
function session(id) { return state.sessions.find(s => s.id === id) || (state.librarySession?.id === id ? state.librarySession : undefined); }
function sessionsForEncounter(id) { return state.sessions.filter(s => s.encounterId === id); }
function sessionsForPatientWithoutEncounter(id) { return state.sessions.filter(s => s.patientId === id && !s.encounterId); }
function sessionRecency(s) {
  if (s.createdAt) return s.createdAt;
  if (/^s-\d{13}$/.test(s.id)) return Number(s.id.slice(2));
  const date = s.date.replace(/^Today/, '2 Oct 2026').replace(/^Yesterday/, '1 Oct 2026');
  if (date.includes('just now')) return Date.parse('2 Oct 2026 9:41 AM');
  const dated = date.includes('2026') ? date : date.replace(' · ', ' 2026 · ');
  return Date.parse(dated.replace(' · ', ' ')) || 0;
}
function encountersForPatient(id) { return Object.entries(encounters).filter(([, e]) => e.patientId === id).sort((a, b) => b[1].sort - a[1].sort); }
function encounterTypeLabel(e) { return e.kind === 'Appointment encounter' ? 'Appointment' : 'Inpatient care'; }
function encounterStartLabel(e) {
  if (e.startedAt) {
    const [date, time] = e.startedAt.split('T');
    return prettyDate(date) + (time ? ' · ' + time : '');
  }
  return e.date.split(' – ')[0].split('–')[0];
}
// Seed dates are explicit local wall times; saved sessions retain their own timestamps.
function sessionDateTimeLabel(s) {
  const value = s.startedAt || s.occurredAt || s.createdAt || seedSessions.find(item => item.id === s.id)?.occurredAt;
  if (!value) return 'Session date/time not recorded';
  const wallTime = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(value);
  const date = new Date(wallTime ? value + 'Z' : value);
  if (Number.isNaN(date.getTime())) return 'Session date/time not recorded';
  const timeZone = wallTime ? 'UTC' : 'America/Los_Angeles';
  return new Intl.DateTimeFormat('en-GB', {weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone}).format(date) + ' · ' + new Intl.DateTimeFormat('en-US', {hour:'numeric',minute:'2-digit',hour12:true,timeZone}).format(date);
}
function renderPatientContext(patientId, encounterId, options = {}) {
  const p = patients[patientId], candidate = encounters[encounterId];
  // Never show an encounter from a different patient or infer one from history.
  const e = p && candidate?.patientId === patientId ? candidate : null;
  const field = (label, value) => '<div class="patient-context-field"><dt>' + esc(label) + '</dt><dd>' + esc(value || 'Not recorded') + '</dd></div>';
  const tag = options.compact ? 'h2' : 'h1';
  const identity = p ? '<dl class="patient-context-fields">' + field('DOB',p.dob) + field('Heidi patient ID',p.identifier) + '</dl>' : '<p class="patient-context-empty">Patient not assigned</p>';
  const encounter = e ? '<dl class="patient-context-fields patient-context-encounter">' + field('Heidi encounter ID', e.identifier) + field(e.kind === 'Inpatient encounter' ? 'Admitted' : 'Encounter start',encounterStartLabel(e)) + '<div class="patient-context-location"><dt class="visually-hidden">Location and care type</dt><dd>' + esc(e.location || encounterTypeLabel(e)) + (e.location ? ' · ' + esc(encounterTypeLabel(e)) : '') + '</dd></div></dl>' : options.session ? '<p class="patient-context-empty">Encounter not assigned</p>' : '';
  const sessionLine = options.session ? '<div class="patient-context-session"><span><span class="patient-session-label">Session · </span>' + esc(options.session.title || 'Untitled') + '</span><time>' + esc(sessionDateTimeLabel(options.session)) + '</time></div>' : '';
  return '<section class="patient-context' + (options.compact ? ' patient-context-compact' : ' patient-context-sticky screen-heading') + '" aria-label="Patient verification"><div class="patient-title-row"><' + tag + '>' + esc(p ? p.name : 'Unassigned session') + '</' + tag + '>' + (options.scribe && p ? huiButton('Start Scribe for ' + p.name, options.scribeAction || 'patient-scribe', {glyph:'waves', iconOnly:true, className:'patient-scribe', disabled:!!options.scribeDisabled}) : '') + '</div>' + identity + encounter + sessionLine + '</section>';
}
function save() { if (isEmbeddedPreview) return; localStorage.setItem(STORAGE_KEY, JSON.stringify({ patientDetails, sessions: state.sessions, patients: customPatients, encounters: customEncounters, workStatuses: state.workStatuses, workItems: customWorkItems })); }
function syncManualEncounterLists() {
  appointmentPlan.splice(0, appointmentPlan.length, ...appointmentPlan.filter(item => !item.manual));
  wardPlan.splice(0, wardPlan.length, ...wardPlan.filter(item => !item.manual));
  Object.entries(customEncounters).forEach(([id, e]) => {
    if (!patients[e.patientId] || e.status === 'Complete') return;
    const date = (e.startedAt || '').slice(0, 10);
    if (e.kind === 'Appointment encounter' && date === '2026-10-02') appointmentPlan.push({ patientId: e.patientId, encounterId: id, time: e.startedAt.slice(11, 16) || '—', manual: true });
    if (e.kind === 'Inpatient encounter' && date && date <= '2026-10-02') wardPlan.push({ patientId: e.patientId, encounterId: id, ward: e.location || 'Location not added', room: '', manual: true });
  });
  appointmentPlan.sort((a, b) => a.time.localeCompare(b.time));
}
function activeCareContext() {
  if (state.screen === 'session' || state.screen === 'record') {
    const s = session(state.sessionId);
    return { patientId: s?.patientId || null, encounterId: s?.encounterId || null, sessionId: state.sessions.some(saved => saved.id === s?.id) ? s.id : null };
  }
  if (state.screen === 'encounter') return { patientId: encounters[state.encounterId]?.patientId || null, encounterId: state.encounterId, sessionId: null };
  if (state.screen === 'history') return { patientId: state.patientId, encounterId: null, sessionId: null };
  return { patientId: null, encounterId: null, sessionId: null };
}
function initials(p) { return '<span class="avatar ' + p.avatar + '">' + esc(p.initials) + '</span>'; }
function patientCountLabel(items) { const count = new Set(items.map(item => item.patientId)).size; return count + (count === 1 ? ' patient' : ' patients'); }
function pill(text, tone, name) { return '<span class="pill ' + tone + '">' + (name ? icon(name) : '') + esc(text) + '</span>'; }
function action(label, actionName, css, extra) { return '<button type="button" class="button ' + (css || '') + '" data-action="' + actionName + '" ' + (extra || '') + '>' + label + '</button>'; }
function iconButton(name, label, actionName, css) { return '<button type="button" class="icon-button ' + (css || '') + '" aria-label="' + esc(label) + '" data-action="' + actionName + '">' + icon(name) + '</button>'; }
function topbar(title, details = false) {
  if (!title) return '<header class="topbar"><button type="button" class="mark-button" aria-label="Go to Today" data-action="go-today"><img src="./assets/heidi-symbol-bark.svg" alt="" /></button><div class="topbar-right">' + iconButton('search', 'Search', 'search') + '</div></header>';
  return '<header class="topbar">' + iconButton('left', 'Go back', 'back') + '<span class="back-title">' + esc(title) + '</span><div class="topbar-right">' + (details ? iconButton('more', 'Session details', 'open-session-details') : iconButton('home', 'Go to Today', 'go-today')) + '</div></header>';
}
function nav() {
  if (isScribeExploration) {
    const active = ['today','scribe','patients','tasks'].includes(state.screen) ? state.screen : state.screen === 'history' ? 'patients' : state.screen === 'sessions' ? 'scribe' : state.stack.findLast(item => ['scribe','patients','today'].includes(item.screen))?.screen || 'scribe';
    return '<div class="nav-shell"><nav class="nav-dock" aria-label="Main navigation">' + [['today','home','Today'],['scribe','waves','Scribe'],['patients','user','Patients'],['tasks','check','Work']].map(([screen,glyph,label])=>'<button type="button" class="nav-item ' + (active === screen ? 'active' : '') + '" aria-current="' + (active === screen ? 'page' : 'false') + '" data-action="nav-' + screen + '">' + icon(glyph) + '<span>' + label + '</span></button>').join('') + '</nav></div>';
  }
  const items = [['today','home','Today'], ['patients','user','Patients'], ['sessions','waves','Sessions'], ['tasks','check','Work']];
  return '<div class="nav-shell"><nav class="nav-dock" aria-label="Main navigation">' + items.map(([screen, glyph, label]) => '<button type="button" class="nav-item ' + (state.screen === screen || (screen === 'today' && state.screen === 'worklist') || (isHomepageExploration && screen === 'patients' && (['history','encounter'].includes(state.screen) || (state.screen === 'record' && state.patientId))) ? 'active' : '') + '" data-action="nav-' + screen + '">' + icon(glyph) + '<span>' + label + '</span></button>').join('') + '</nav></div>';
}
function chatContextLabel() {
  if (state.screen === 'encounter' || state.screen === 'history') return patients[state.patientId]?.name || 'Patient';
  if (state.screen === 'session' || state.screen === 'record') return session(state.sessionId)?.title || 'Session';
  if (state.screen === 'worklist') return state.worklistType === 'appointments' ? 'Appointments' : 'Ward round';
  return state.screen === 'tasks' ? 'Work' : state.screen === 'sessions' ? 'Sessions' : state.screen === 'patients' ? 'Patients' : 'Today';
}
function askBar() {
  if (state.screen === 'record') return '';
  return '<div class="ask-shell" aria-label="Heidi 2"><div class="ask-bar"><button type="button" class="ask-open" data-action="open-chat" aria-label="Ask Heidi"><img src="./assets/heidi-symbol-bark.svg" alt="" /><span>Ask Heidi</span></button><button type="button" class="ask-mic" data-action="open-voice-chat" aria-label="Ask Heidi by voice">' + icon('mic') + '</button></div><button type="button" class="ask-add" data-action="open-quick-add" aria-label="Add new" aria-haspopup="dialog">' + icon('plus') + '</button></div>';
}
function renderChat() {
  return '<section class="chat-view" role="dialog" aria-modal="true" aria-labelledby="chatTitle"><header class="chat-top"><button type="button" class="icon-button" data-action="close-chat" aria-label="Close Ask Heidi">' + icon('close') + '</button><strong id="chatTitle">Ask Heidi</strong><span class="chat-top-spacer"></span></header><div class="chat-body"><div class="chat-intro"><img src="./assets/heidi-symbol-bark.svg" alt="" /><span class="eyebrow">Heidi 2 · Across your work</span><h2>What can I take care of?</h2><p>Ask Heidi to find or summarize information across patients, encounters, sessions, and tasks, or take on work for you. You opened this from ' + esc(state.chatContext) + '. AI actions are not connected in this local prototype.</p>' + (state.chatVoiceNotice ? '<div class="inline-notice">Voice input is not connected in this local prototype. You can type a message below.</div>' : '') + '</div><div class="chat-messages">' + state.chatMessages.map(m => '<div class="chat-message ' + m.role + '">' + esc(m.text) + '</div>').join('') + '</div></div><form class="chat-compose" id="chatForm"><input id="chatInput" name="message" autocomplete="off" placeholder="Work with Heidi…" aria-label="Message Heidi" value="' + esc(state.chatDraft) + '" /><button type="submit" aria-label="Send message">' + icon('arrowUp') + '</button></form></section>';
}
function appointmentRow(encounterId, time) {
  const e = encounters[encounterId], p = patients[e.patientId];
  return '<button type="button" class="appointment-row" data-action="open-encounter" data-id="' + encounterId + '"><span class="appointment-time">' + time + '</span>' + initials(p) + '<span class="row-main"><span class="row-title">' + esc(p.name) + '</span><span class="row-sub">' + esc(e.title) + '</span></span><span class="row-arrow">' + icon('chevron') + '</span></button>';
}
function wardRow(item, showAdmission = false) {
  const p = patients[item.patientId], recent = sessionsForEncounter(item.encounterId)[0];
  return '<button type="button" class="encounter-row" data-action="open-encounter" data-id="' + item.encounterId + '">' + initials(p) + '<span class="row-main"><span class="row-title">' + esc(p.name) + '</span><span class="row-sub">' + esc(item.ward) + (item.room ? ' · Room ' + esc(item.room) : '') + '</span><span class="row-third">' + esc(showAdmission === true ? 'Admitted ' + encounterStartLabel(encounters[item.encounterId]) : recent ? 'Latest session ' + recent.date.toLowerCase() : 'No Heidi session yet') + '</span></span><span class="row-arrow">' + icon('chevron') + '</span></button>';
}
// Homepage explorations use transient example state; no saved records or agent jobs are created.
function homePatientName() { return patients[session('s-linda-1')?.patientId]?.name || 'Unassigned session'; }
function homeSection(title, content, trailing = '') {
  return '<section class="home-section"><div class="home-section-heading"><h2>' + esc(title) + '</h2>' + trailing + '</div>' + content + '</section>';
}
function homeDetailButton(id, title, sub, glyph = 'file', status = '') {
  return '<button type="button" class="home-row" data-action="home-detail" data-id="' + id + '"><span class="home-symbol">' + icon(glyph) + '</span><span class="row-main"><span class="row-title">' + esc(title) + '</span><span class="row-sub">' + esc(sub) + '</span>' + (status ? '<span class="home-state">' + esc(status) + '</span>' : '') + '</span><span class="row-arrow">' + icon('chevron') + '</span></button>';
}
function homeContinue() {
  const recent = [...state.sessions].sort((a,b) => sessionRecency(b)-sessionRecency(a))[0];
  if (!recent) return homeSection('Recent sessions', '<p class="home-muted">No sessions yet. Use + to start a session.</p>');
  const p = patients[recent.patientId];
  return homeSection('Pick up where you left off', '<div class="card"><button type="button" class="home-row" data-action="open-session" data-id="' + esc(recent.id) + '"><span class="home-symbol">' + icon('pen') + '</span><span class="row-main"><span class="row-title">' + esc(recent.title) + '</span><span class="row-sub">' + esc(p?.name || 'Unassigned session') + '</span><span class="row-third">' + esc(recent.date) + '</span></span><span class="row-arrow">' + icon('chevron') + '</span></button></div>');
}
function homePatientRow(item, round) {
  const e = encounters[item.encounterId], p = patients[e.patientId];
  const detail = round ? item.ward + (item.room ? ' · Room ' + item.room : '') : item.time + ' · ' + e.title;
  return '<div class="home-patient-entry"><button type="button" class="home-row" data-action="open-encounter" data-id="' + esc(item.encounterId) + '">' + initials(p) + '<span class="row-main"><span class="row-title">' + esc(p.name) + '</span><span class="row-sub">' + esc(detail) + '</span></span></button>' + huiButton('Start Scribe for ' + p.name, 'home-patient-scribe', {glyph:'waves',iconOnly:true,className:'patient-scribe','data-id':item.encounterId,disabled:e.status === 'Complete'}) + '</div>';
}
function homePatients(heading = 'Your patients', limit = 2) {
  const round = state.homeListMode === 'round';
  const controls = '<div class="today-modes" role="group" aria-label="Patient list">' + [['appointments','Appointments',appointmentPlan.length],['round','Round',wardPlan.length]].map(([id,label,count]) => '<button type="button" class="today-mode' + ((round ? id === 'round' : id === 'appointments') ? ' selected' : '') + '" data-action="home-list-mode" data-id="' + id + '" aria-pressed="' + (round ? id === 'round' : id === 'appointments') + '">' + label + '<span>' + count + '</span></button>').join('') + '</div>';
  const rows = round ? wardPlan.slice(0,limit).map(item => homePatientRow(item,true)).join('') : appointmentPlan.slice(state.homeConcept === 'rhythm' && state.homePhase === 'during' ? 3 : 0, (state.homeConcept === 'rhythm' && state.homePhase === 'during' ? 3 : 0)+limit).map(item => homePatientRow(item,false)).join('');
  return homeSection(heading, controls + '<div class="card home-patient-list">' + (rows || '<p class="home-muted">No patients on this list.</p>') + '</div>', '<button type="button" class="text-action" data-action="home-all-patients">View all ' + icon('chevron') + '</button>');
}
function homeTasks(showAll = false) {
  const tasks = [['pharmacy','Call the pharmacy','Linda Thompson · Added by you'],['paperwork','Review discharge paperwork','Linda Thompson · Added by you']];
  return homeSection(showAll ? 'To do' : 'Your to-dos', '<div class="card">' + tasks.map(([id,title,sub]) => '<button type="button" class="home-row home-check-row' + (state.homeDone?.[id] ? ' is-done' : '') + '" role="checkbox" aria-checked="' + !!state.homeDone?.[id] + '" data-action="home-task" data-id="' + id + '"><span class="home-check">' + (state.homeDone?.[id] ? icon('check') : '') + '</span><span class="row-main"><span class="row-title">' + title + '</span><span class="row-sub">' + sub + '</span></span></button>').join('') + (showAll ? '<button type="button" class="home-row home-delegate-row" data-action="home-ask" aria-label="Ask Heidi to draft patient instructions for ' + esc(homePatientName()) + '"><span class="home-heidi-mark"><img src="./assets/heidi-symbol-bark.svg" alt="" /></span><span class="row-main"><span class="row-title">Draft patient instructions</span><span class="row-sub">' + esc(homePatientName()) + ' · Ask Heidi</span></span><span class="row-arrow">' + icon('chevron') + '</span></button>' : '') + '</div>', showAll ? '<button type="button" class="text-action" data-action="nav-tasks">View all ' + icon('chevron') + '</button>' : '');
}
function homeReady() {
  return homeSection('Ready for you', '<div class="card">' + homeDetailButton('followup','GP follow-up draft','Linda Thompson · Morning ward review','file','Ready to review · Not sent') + homeDetailButton('handover','Handover draft','Ward 4B · Today’s sessions','file','Ready to review') + '</div>', '<span class="home-count">2</span>');
}
function homeRoutines() {
  return homeSection('Your routines', '<div class="card">' + homeDetailButton('brief','Morning preparation','Completed 07:15 · Next: tomorrow','check') + homeDetailButton('running','Patient instructions','Preparing a draft · Started 09:35','clock') + homeDetailButton('blocked','Tomorrow’s preparation','Needs attention · Calendar unavailable','alert') + '</div>');
}
function homeCompleted() {
  return homeSection('Completed today', '<div class="home-completed">' + icon('check') + '<div><span class="row-title">Morning brief prepared</span><span class="row-sub">07:15 · Available to review</span></div><button type="button" class="text-action" data-action="home-detail" data-id="brief">Open</button></div>');
}
function homeCheck(id, title, sub) {
  return '<button type="button" class="home-row home-check-row' + (state.homeDone?.[id] ? ' is-done' : '') + '" role="checkbox" aria-checked="' + !!state.homeDone?.[id] + '" data-action="home-task" data-id="' + esc(id) + '"><span class="home-check">' + (state.homeDone?.[id] ? icon('check') : '') + '</span><span class="row-main"><span class="row-title">' + esc(title) + '</span><span class="row-sub">' + esc(sub) + '</span></span></button>';
}
function homeCurrentPatient() {
  const source = session('s-linda-1');
  return source ? '<div class="home-current">' + renderPatientContext(source.patientId,source.encounterId,{compact:true}) + '</div>' : '';
}
function homeNextPatient() {
  return homeSection('Next patient', '<div class="card">' + wardRow(wardPlan[1]) + '</div>');
}
function homeCaptureList() {
  const items = state.homeCaptured || [];
  return homeSection('Captured today', items.length ? '<div class="card">' + items.map((item,i)=> homeCheck('capture-' + i,item.title,item.context)).join('') + '</div>' : '<div class="home-empty">' + icon('pen') + '<p>Nothing to hold in your head.</p><span>Add a to-do as it comes up.</span></div>');
}
function renderWorkflowHome() {
  const type = state.homeConcept;
  const titles = {patient:'This patient. Then next.',delegated:'Heidi is on it.',capture:'Get it out of your head.',visit:'Finish this visit.',leave:'Leave today in a good place.'};
  const subtitles = {patient:'Keep the work with the patient.',delegated:'Your work, moving while you see patients.',capture:'A place for the little things to do.',visit:'Close the loop before the next patient.',leave:'Friday 2 October · Before you finish'};
  let content = '';
  if (type === 'patient') {
    const before = state.homeVisitStage === 'before';
    content = '<div class="today-modes" role="group" aria-label="Patient stage">' + [['before','Before seeing them'],['after','After the session']].map(([id,label])=>'<button class="today-mode' + (before === (id === 'before') ? ' selected' : '') + '" type="button" data-action="home-visit-stage" data-id="' + id + '" aria-pressed="' + (before === (id === 'before')) + '">' + label + '</button>').join('') + '</div>' + homeCurrentPatient();
    content += before ? homeSection('Before you begin','<div class="card">' + homeDetailButton('prechart','Prechart ready','Recent sessions and patient context','file','Example draft · Review before use') + '</div><div class="home-inline-actions">' + huiButton('Open encounter','open-encounter',{'data-id':session('s-linda-1')?.encounterId || 'lindaCurrent',variant:'secondary'}) + '</div>') : homeSection('For this patient','<div class="card">' + '<button type="button" class="home-row" data-action="home-source"><span class="home-symbol">' + icon('pen') + '</span><span class="row-main"><span class="row-title">Review the note</span><span class="row-sub">Morning ward review · Open session</span></span><span class="row-arrow">' + icon('chevron') + '</span></button>' + homeDetailButton('followup','Review follow-up draft','Ready to review · Not sent') + homeCheck('patient-followup','Arrange follow-up','Your to-do · Added by you') + '</div>');
    content += homeNextPatient();
  }
  if (type === 'delegated') content = homeSection('Needs your input','<div class="card">' + homeDetailButton('recipient','Choose a referral recipient',homePatientName() + ' · Draft waiting','user','Waiting for you') + '</div>') + homeSection('Heidi is working on','<div class="card">' + homeDetailButton('running','Patient instructions',homePatientName() + ' · Preparing draft','clock') + homeDetailButton('desktop','Documentation on your desktop','Waiting for your desktop · No changes made','pause') + '</div>') + homeReady() + homeNextPatient() + homeCompleted();
  if (type === 'capture') content = '<form id="homeCaptureForm" class="home-capture-form"><label for="homeCaptureText">What do you need to do?</label><textarea id="homeCaptureText" name="title" rows="2" maxlength="500" required placeholder="Call the pharmacy after reviewing results…"></textarea><label for="homeCaptureContext">Keep it with</label><select id="homeCaptureContext" name="context"><option value="General">General</option><option value="' + esc(homePatientName()) + '">' + esc(homePatientName()) + ' · Current encounter</option></select>' + huiButton('Add to my day','',{type:'submit',variant:'secondary',glyph:'plus'}) + '<p class="home-capture-feedback" role="status">' + (state.homeCaptured?.length ? 'Added to your example list below.' : 'Example to-dos stay here until you reload.') + '</p></form>' + homeCaptureList() + homeTasks() + homePatients('Your patients',1);
  if (type === 'visit') {
    const remaining = ['visit-note','visit-referral','visit-followup'].filter(id=>!state.homeDone?.[id]).length;
    content = homeCurrentPatient() + '<div class="home-progress" role="status"><span>' + (remaining ? remaining + (remaining === 1 ? ' thing to finish' : ' things to finish') : 'This visit’s checklist is complete') + '</span><small>Your checklist · Mark off as you go</small></div>' + '<div class="card">' + homeCheck('visit-note','Note reviewed','Open the source note to review') + homeCheck('visit-referral','Referral draft reviewed','Review is separate from sending') + homeCheck('visit-followup','Follow-up task confirmed','Your to-do') + '</div><div class="home-inline-actions">' + huiButton('Open note','home-source',{glyph:'file'}) + huiButton('Open referral draft','home-detail',{'data-id':'followup',glyph:'file'}) + '</div>' + homeNextPatient() + '<p class="home-muted">Anything unfinished stays on your checklist.</p>';
  }
  if (type === 'leave') content = homeSection('Needs attention now','<div class="home-urgent">' + homeDetailButton('urgent','Review flagged follow-up',homePatientName() + ' · Marked urgent by you','alert','Illustrative flagged task') + '</div>') + homeSection('Still needs you','<div class="card">' + homeDetailButton('followup','Follow-up draft','Ready for review · Not sent') + homeCheck('leave-call','Call the pharmacy','Your to-do · Still outstanding') + '</div>') + homeSection('Still with Heidi','<div class="card">' + homeDetailButton('desktop','Documentation on your desktop','Blocked · Waiting for your desktop','pause') + '</div>') + homeCompleted() + homeSection('Keep sight of what remains','<div class="card">' + homeDetailButton('carry','Review carry-forward','Unfinished work stays visible','list') + '</div>');
  return '<div class="home-concept home-' + type + '">' + topbar() + '<div class="hero"><h1>' + titles[type] + '</h1><div class="hero-subtitle">' + subtitles[type] + '</div></div>' + (type !== 'capture' ? '<p class="home-demo-label">Example workflow · Agent activity is illustrative</p>' : '') + content + '<p class="home-example-note">Local concept · Example checklist changes last until reload.<br>No agent execution, sending or desktop changes.</p></div>';
}

// The focused home is an entry point; patient work reuses the Work records.
function workForPatient(patientId) {
  return workItems.filter(item => {
    const source = item.sessionId && session(item.sessionId);
    return (source?.patientId || encounters[item.encounterId]?.patientId) === patientId;
  });
}
function renderNowHome() {
  const source = session('s-linda-1'), p = patients[source?.patientId];
  const outstanding = p ? workForPatient(source.patientId).filter(item => workStatus(item) !== 'done') : [];
  const current = p ? '<section class="home-now-current"><div class="home-section-heading"><h2>Pick up with</h2></div>' + homeCurrentPatient() +
    '<p class="home-now-summary">' + (outstanding.length ? outstanding.length + ' work items to pick up with this patient' : 'No outstanding work for this patient') + '</p>' +
    huiButton('Open patient','history-patient',{'data-id':source.patientId,variant:'secondary',glyph:'chevron'}) + '</section>' : '<p class="home-muted">Choose a patient to get started.</p>';
  return '<div class="home-concept home-now">' + topbar() + '<div class="hero"><h1>Pick up here.</h1><div class="hero-subtitle">Your patient, and what needs doing.</div></div>' + current +
    homeSection('When you’re ready', '<div class="today-modes home-now-modes" role="group" aria-label="Choose patient list">' + [['appointments','Appointments'],['round','Round']].map(([id,label])=>'<button type="button" class="today-mode' + ((state.homeNowList || 'appointments') === id ? ' selected' : '') + '" aria-pressed="' + ((state.homeNowList || 'appointments') === id) + '" data-action="home-now-list" data-id="' + id + '">' + label + '</button>').join('') + '</div><div class="home-now-list-link"><span>' + (state.homeNowList === 'round' ? 'Your active inpatient list' : 'Your schedule, day by day') + '</span><button type="button" class="text-action" data-action="home-now-open-list">' + (state.homeNowList === 'round' ? 'Open round' : 'Open appointments') + ' ' + icon('chevron') + '</button></div>') + '</div>';
}
function patientDateControl(day) {
  return '<div class="patient-date-nav"><button type="button" class="icon-button" data-action="patient-day" data-id="-1" aria-label="Previous day">' + icon('left') + '</button><label>Viewing date<input id="patientDay" type="date" value="' + esc(day) + '" /></label><button type="button" class="icon-button" data-action="patient-day" data-id="1" aria-label="Next day">' + icon('chevron') + '</button></div>';
}
function roundForDay(day) {
  return wardPlan.filter(item => { const e = encounters[item.encounterId]; return e && e.startedAt?.slice(0,10) <= day && e.status !== 'Complete'; });
}
function renderBalancedHome() {
  const round = state.homeNowList === 'round';
  const day = state.patientDay || '2026-10-02';
  const next = round ? roundForDay(day)[0] : Object.entries(encounters).filter(([,e])=>e.kind === 'Appointment encounter' && e.startedAt?.slice(0,10) === day).sort((a,b)=>a[1].startedAt.localeCompare(b[1].startedAt)).map(([id,e])=>({encounterId:id,patientId:e.patientId,time:e.startedAt.slice(11,16)}))[0];
  const p = next && patients[next.patientId];
  const source = session('s-linda-1');
  const todo = source ? workForPatient(source.patientId).filter(item=>workStatus(item) === 'todo') : [];
  const switcher = '<div class="today-modes home-now-modes" role="group" aria-label="Choose patient list">' + [['appointments','Appointments'],['round','Round']].map(([id,label])=>'<button type="button" class="today-mode' + ((round ? 'round' : 'appointments') === id ? ' selected' : '') + '" aria-pressed="' + ((round ? 'round' : 'appointments') === id) + '" data-action="home-now-list" data-id="' + id + '">' + label + '</button>').join('') + '</div>';
  const nextRow = p ? '<div class="card"><button type="button" class="home-row" data-action="history-patient" data-id="' + esc(next.patientId) + '">' + initials(p) + '<span class="row-main"><span class="row-title">' + esc(p.name) + '</span><span class="row-sub">' + esc(round ? next.ward + ' · Room ' + next.room : next.time + ' · ' + encounters[next.encounterId].title) + '</span></span><span class="row-arrow">' + icon('chevron') + '</span></button></div>' : '<p class="home-muted">No patients on this list.</p>';
  const work = todo.length ? '<div class="home-finish-group"><div class="home-finish-heading"><strong>' + esc(homePatientName()) + '</strong><span>' + todo.length + ' to do</span></div><div class="home-finish-titles">' + '<button type="button" class="text-action" data-action="balanced-work" data-id="' + esc(todo[0].id) + '">' + esc(todo.slice(0,2).map(item=>item.title).join(' · ')) + ' ' + icon('chevron') + '</button>' + '</div><div class="home-inline-actions">' + huiButton('Ask Heidi to help','balanced-ask',{variant:'secondary'}) + '</div></div>' : '<p class="home-muted">No outstanding to-dos for this patient.</p>';
  return '<div class="home-concept home-balanced">' + topbar() + '<div class="hero"><h1>Hello, Cara</h1><div class="hero-subtitle">Your patients and work</div></div>' + homeSection('Up next',switcher + patientDateControl(day) + nextRow,'<button type="button" class="text-action" data-action="home-now-open-list">View list ' + icon('chevron') + '</button>') + homeSection('To finish',work,'<button type="button" class="text-action" data-action="nav-tasks">All work ' + icon('chevron') + '</button>') + homeSection('Ready to review','<div class="card">' + homeDetailButton('instructions','Patient instructions',homePatientName() + ' · Draft ready','file','Review before sending · Example') + '</div>') + '<p class="home-example-note">Agent outputs are examples. Nothing has been sent.</p></div>';
}

function renderNowPatientWork() {
  if (state.homeConcept !== 'now') return '';
  const items = workForPatient(state.patientId);
  return '<section class="home-section"><div class="home-section-heading"><h2>Work for this patient</h2></div>' +
    (items.length ? '<div class="work-list">' + items.map(renderWorkItem).join('') + '</div>' : '<p class="home-muted">No work linked to this patient yet.</p>') +
    (items.some(item=>item.owner === 'heidi') ? '<p class="patient-provenance">Heidi activity is an example · No agent is running</p>' : '') + '</section>';
}

function renderHomeConcept() {
  if (state.homeConcept === 'now') return renderNowHome();
  if (['patient','delegated','capture','visit','leave'].includes(state.homeConcept)) return renderWorkflowHome().replaceAll('Linda Thompson',esc(homePatientName()));
  const type = state.homeConcept || 'apps', phase = state.homePhase || 'prepare', ai = type === 'agents' || (type === 'rhythm' && state.homeAgents !== false);
  const title = type === 'apps' ? 'Today' : type === 'agents' ? 'A little less to do.' : phase === 'prepare' ? 'Good morning, Cara' : phase === 'during' ? 'One patient at a time.' : 'Let’s wrap up.';
  const sub = type === 'apps' ? 'Friday 2 October' : type === 'agents' ? 'Two drafts are ready for your review.' : phase === 'prepare' ? 'Friday 2 October · Before your first patient' : phase === 'during' ? 'Friday 2 October · During your day' : 'Friday 2 October · Before you finish';
  let body = '';
  if (type === 'apps') body = homePatients(state.homeListMode === 'round' ? 'Your round' : 'Upcoming appointments') + homeTasks(true) + homeSection('Your routines', '<div class="card">' + homeDetailButton('day-summary','Your day summary','Ready to read · Routine example','file') + homeDetailButton('conference-email','Medical conference invitations','Check email daily · Routine example','file') + '</div>');
  if (type === 'agents') body = '<p class="home-demo-label">Example agent activity</p>' + homeReady() + homeRoutines() + homeSection('Suggested next step', '<div class="home-suggestion"><span class="home-symbol">' + icon('pen') + '</span><div><h3>Turn the plan into instructions</h3><p>Use the morning ward session to prepare a patient-friendly draft.</p>' + huiButton('Ask Heidi to prepare','home-ask',{variant:'secondary',glyph:'plus'}) + '</div></div>') + homePatients('Coming up',1) + homeCompleted();
  if (type === 'rhythm') {
    const switcher = '<div class="today-modes home-phase" role="group" aria-label="Stage of your day">' + [['prepare','Prepare'],['during','See patients'],['finish','Wrap up']].map(([id,label]) => '<button type="button" class="today-mode' + (phase === id ? ' selected' : '') + '" data-action="home-phase" data-id="' + id + '" aria-pressed="' + (phase === id) + '">' + label + '</button>').join('') + '</div>';
    const brief = homeSection('Before you begin', '<div class="home-brief"><div class="home-brief-label"><img src="./assets/heidi-symbol-bark.svg" alt="" /><span>Morning preparation</span><span class="home-state">Ready</span></div><h2>Your day is ready to review.</h2><p>Today’s patients, recent notes and the work you carried forward.</p>' + huiButton('Open morning brief','home-detail',{variant:'secondary','data-id':'brief',glyph:'file'}) + '<small>Example routine · Prepared at 07:15</small></div>');
    if (phase === 'prepare') body = switcher + (ai ? brief : homeTasks()) + homePatients('Your day ahead') + (ai ? homeReady() : homeContinue());
    if (phase === 'during') body = switcher + homePatients('Next up',3) + homeContinue() + (ai ? homeSection('While you see patients', '<div class="home-quiet-work">' + icon('clock') + '<div><span class="row-title">Heidi is preparing a draft</span><span class="row-sub">Patient instructions · Example activity</span></div></div>') + homeReady() : homeTasks());
    if (phase === 'finish') body = switcher + (ai ? homeReady() : homeTasks()) + homeSection('Before you leave', '<div class="card">' + homeDetailButton('carry','Carry work into tomorrow','Review remaining personal to-dos','list') + '</div>') + (ai ? homeCompleted() : homeContinue()) + homePatients('Today’s patients',1);
  }
  const markup = '<div class="home-concept home-' + type + '">' + topbar() + '<div class="hero"><h1>' + title + '</h1><div class="hero-subtitle">' + sub + '</div></div>' + body + '<p class="home-example-note">Example day · 2 October 2026' + (ai ? '<br>Agent work and routines are illustrative.' : '<br>Example checklist changes last for this visit.') + '</p></div>';
  return markup.replaceAll('Linda Thompson', esc(homePatientName()));
}
function renderHomeDetail() {
  const id = state.homeDetailId;
  const details = {
    'conference-email':['Medical conference invitations','Check email · Daily routine','Check email for medical conference invitations.\nCollect the conference name, dates and response deadline so you can decide which invitations to follow up.','Example routine only. Email is not connected; no inbox has been checked and no replies are sent.'],
    'day-summary':['Your day summary','Daily summary routine · Example result','Work to follow up\nCall the pharmacy and review discharge paperwork for ' + homePatientName() + '.\nReady to hand off\nAsk Heidi to draft patient instructions from the morning ward review.','Illustrative routine output for this concept. No routine has run, and reading this summary does not complete your to-dos.'],
    instructions:['Patient instructions',homePatientName() + ' · Ready to review','Example draft awaiting review\nThe instructions would appear here for you to check against the source session.','This is an illustrative review state. Submission and approval are not connected; nothing has been sent.'],
    prechart:['Prechart','Example preparation','Review before seeing the patient\nRecent session notes and clinician-curated context would appear here, with their sources.','Illustrative preparation. Open the source session to inspect existing context.'],
    recipient:['Choose a referral recipient','Needs your input','Recipient not selected\nThe draft is waiting for you to choose a destination before it can be sent.','This homepage preview does not send referrals or select recipients.'],
    desktop:['Documentation on your desktop','Waiting for your desktop','Next step\nContinue on your connected desktop to review the intended destination and proposed changes.','Example handoff only. No computer-use task is running and no external record was changed.'],
    urgent:['Review flagged follow-up','Marked urgent by you · Example','A flagged task stays visible\nOpen its source context and review the outstanding follow-up.','Illustrative clinician-marked priority, not an automatically detected clinical alert.'],
    followup:['GP follow-up draft','Linda Thompson · Ready to review','Example draft\nFollow-up summary based on the morning ward review.\n\nFor review\nReview morning results and reassess the discharge plan with Linda and her family.','Draft prepared in this example. Nothing has been sent.'],
    handover:['Handover draft','Ward 4B · Ready to review','For the next team\nLinda Thompson: review morning results and reassess the discharge plan.\n\nSource\nMorning ward review · 2 October, 8:12 AM.','Illustrative extract, not a complete ward handover.'],
    brief:['Morning preparation','Completed · 07:15','Your day\n10 appointments and 10 round patients are available in this example.\n\nPick up the context\nOpen the relevant encounter to review recent sessions before seeing each patient.','Example routine. Next run: tomorrow at 07:15.'],
    running:['Patient instructions','In progress · Example activity','Preparing a draft\nThe routine would use the source session to prepare instructions for clinician review.','No agent is running in this prototype.'],
    blocked:['Tomorrow’s preparation','Needs attention','Calendar unavailable\nThe last attempt could not read the calendar. No updated preparation was produced.','In a connected product, restore access before retrying.'],
    carry:['Carry into tomorrow','Your remaining work','Review your to-dos\nChoose what still needs attention before finishing your day.','This homepage concept does not change due dates or hand work to another clinician.']
  };
  const d = (details[id] || details.brief).map(text => text.replaceAll('Linda Thompson',homePatientName()));
  const source = ['instructions','followup','handover','running','prechart','recipient','urgent'].includes(id) && session('s-linda-1') ? '<div class="home-detail-source">' + huiButton('View source session','home-source',{glyph:'waves'}) + '</div>' : '';
  const sourceSession = session('s-linda-1');
  const verification = ['instructions','followup','handover','running','prechart','recipient','urgent'].includes(id) && sourceSession ? renderPatientContext(sourceSession.patientId,sourceSession.encounterId,{compact:true,session:sourceSession}) : '';
  return huiSheet(d[0],d[1], '<div class="home-detail-body">' + verification + renderDocumentBody(d[2]) + '<p class="home-detail-notice">' + esc(d[3]) + '</p>' + source + '</div>', 'home-detail-sheet');
}

function renderToday() {
  if (isHomepageExploration && !state.homeConcept) return renderHomeConcept();
  if (isHomepageExploration && state.homeConcept === 'balanced') return renderBalancedHome();
  if (state.homeConcept) return renderHomeConcept();
  const modes = [['appointments', 'Appointments', appointmentPlan.length], ['round', 'Round', wardPlan.length]];
  const switcher = '<div class="today-modes" role="tablist" aria-label="Today view">' + modes.map(([mode, label, count]) => '<button type="button" role="tab" aria-selected="' + (state.todayMode === mode) + '" class="today-mode ' + (state.todayMode === mode ? 'selected' : '') + '" data-action="set-today-mode" data-mode="' + mode + '">' + label + (count == null ? '' : '<span>' + count + '</span>') + '</button>').join('') + '</div>';
  const heading = [topbar(), '<div class="hero"><h1>Hello, Cara</h1><div class="hero-subtitle">Friday 2 October</div></div>', switcher];
  if (state.todayMode === 'appointments') return heading.concat([
    '<div class="today-view-intro"><div><h2>Appointments</h2><p>Friday 2 October · in time order</p></div><span>' + appointmentPlan.length + ' scheduled</span></div>',
    '<div class="section-subline">' + (appointmentPlan.some(item => item.manual) ? 'Cerner appointments and encounters added in Heidi' : 'Linked from Cerner · updated 8:52 AM') + '</div>',
    '<div class="card">' + appointmentPlan.map(item => appointmentRow(item.encounterId, item.time)).join('') + '</div>'
  ]).join('');
  if (state.todayMode === 'round') {
    const visible = wardPlan.filter(item => state.wardFilter === 'All wards' || item.ward === state.wardFilter);
    return heading.concat([
      '<div class="today-view-intro"><div><h2>Round</h2><p>Your active inpatient encounters</p></div><span>' + patientCountLabel(visible) + '</span></div>',
      '<div class="filter-row" aria-label="Filter round by ward">' + ['All wards', ...new Set(wardPlan.map(item => item.ward))].map(label => '<button type="button" class="filter-chip ' + (state.wardFilter === label ? 'selected' : '') + '" data-action="filter-ward" data-filter="' + esc(label) + '">' + esc(label) + '</button>').join('') + '</div>',
      '<div class="card round-list">' + visible.map(wardRow).join('') + '</div>'
    ]).join('');
  }
  return heading.join('');
}
function renderWorklist() {
  if (state.worklistType === 'appointments') return [
    topbar('Today'),
    '<div class="screen-heading"><div class="eyebrow">Friday 2 October</div><h1>Appointments</h1><p>All ' + appointmentPlan.length + ' scheduled appointments, in time order. Open one to see its encounter and patient history.</p></div>',
    '<div class="section-heading"><h2>Today’s schedule</h2><span>' + appointmentPlan.length + ' appointments</span></div>',
    '<div class="card">' + appointmentPlan.map(item => appointmentRow(item.encounterId, item.time)).join('') + '</div>'
  ].join('');
  const visible = wardPlan.filter(item => state.wardFilter === 'All wards' || item.ward === state.wardFilter);
  return [
    topbar('Today'),
    '<div class="screen-heading"><div class="eyebrow">Friday 2 October</div><h1>Ward round</h1><p>' + patientCountLabel(wardPlan) + ' with active inpatient care. Each encounter belongs to one patient.</p></div>',
    '<div class="filter-row" aria-label="Filter ward round">' + ['All wards', ...new Set(wardPlan.map(item => item.ward))].map(label => '<button type="button" class="filter-chip ' + (state.wardFilter === label ? 'selected' : '') + '" data-action="filter-ward" data-filter="' + esc(label) + '">' + esc(label) + '</button>').join('') + '</div>',
    '<div class="section-heading"><h2>' + esc(state.wardFilter) + '</h2><span>' + patientCountLabel(visible) + '</span></div>',
    '<div class="card">' + visible.map(wardRow).join('') + '</div>'
  ].join('');
}
// Illustrative delivery receipts only; encounter linkage is not EHR write access.
const exampleNoteDelivery = {
  's-linda-1': {channel:'ehr'},
  's-linda-2': {channel:'ehr', sent:true, at:'1 Oct · 4:25 PM'},
  's-linda-3': {channel:'ehr', sent:true, at:'30 Sep · 11:30 AM'},
  's-linda-4': {channel:'ehr', sent:true, at:'12 Aug · 2:40 PM'},
  's-amelia-1': {channel:'share'},
  's-noah-1': {channel:'share', sent:true, at:'24 Sep · 3:30 PM'}
};
function noteDelivery(s, d) {
  const example = exampleNoteDelivery[s.id] || {channel:'share'};
  const sent = d.id === 'clinical' && example.sent;
  const changed = sent && d.edited;
  const review = !!s.captureNeedsReview;
  const label = example.channel === 'ehr' ? (sent ? 'Pushed to EHR' : 'Not pushed to EHR') : (sent ? 'Shared' : 'Not shared');
  return {done:!!sent && !changed && !review, label:(changed ? 'Changes not ' + (example.channel === 'ehr' ? 'pushed' : 'shared') : review ? 'Review resumed session' : label), detail:sent ? (changed || review ? 'Previously ' + (example.channel === 'ehr' ? 'pushed to EHR' : 'shared') + ' · ' : '') + example.at : 'Review before ' + (example.channel === 'ehr' ? 'pushing to EHR' : 'sharing')};
}
function sessionDeliverySummary(s) {
  if (!isHomepageExploration) return '';
  const docs = sessionDocuments(s), statuses = docs.map(d=>noteDelivery(s,d));
  const pending = statuses.filter(d=>!d.done).length;
  const label = statuses.length === 1 ? statuses[0].label : pending ? pending + ' notes need attention' : 'All notes taken care of';
  return '<span class="row-third">' + esc(docs.length ? label : 'No note yet') + '</span>';
}
function resumeSessionButton(s) {
  return huiButton('Resume session','resume-session',{glyph:'waves',variant:'ghost','data-id':s.id});
}
function scribeTabs(mode) {
  return '<div class="today-modes patient-view-modes scribe-view-modes" role="group" aria-label="Scribe view">' + [['appointments','Schedule'],['round','List'],['sessions','Sessions']].map(([id,label])=>'<button type="button" class="today-mode' + (id === mode ? ' selected' : '') + '" aria-pressed="' + (id === mode) + '" data-action="patient-view" data-id="' + id + '">' + label + '</button>').join('') + '</div>';
}
function renderScribe() {
  return state.patientView === 'sessions' ? renderSessions() : renderIdeaPatients();
}
function renderSessionRow(s) {
      const p = s.patientId && patients[s.patientId], e = s.encounterId && encounters[s.encounterId];
      const contextLabel = e ? 'In encounter' : p ? 'Patient added' : 'Add patient';
      const contextDescription = e ? 'Change encounter for ' + s.title : p ? 'Add or change encounter for ' + s.title : 'Add a patient to ' + s.title;
      return '<div class="session-item"><button type="button" class="session-row" data-action="open-session" data-id="' + esc(s.id) + '">' + (p ? initials(p) : '<span class="avatar blue">' + icon('waves') + '</span>') + '<span class="row-main"><span class="row-title">' + esc(s.title) + '</span><span class="row-sub">' + esc(s.date) + (p ? ' · ' + esc(p.name) : '') + '</span>' + (e ? '<span class="row-third">' + esc(e.title) + ' · ' + esc(e.identifier) + '</span>' : '') + sessionDeliverySummary(s) + '</span><span class="row-arrow">' + icon('chevron') + '</span></button><div class="session-item-footer">' + (isHomepageExploration ? resumeSessionButton(s) : '') + '<button type="button" class="session-context-button" data-action="configure-session" data-id="' + esc(s.id) + '" aria-label="' + esc(contextDescription) + '">' + esc(contextLabel) + ' ' + icon('chevron') + '</button></div></div>';
}
function renderSessions() {
  const ordered = [...state.sessions].sort((a,b) => sessionRecency(b) - sessionRecency(a));
  const header = topbar() + (isScribeExploration ? '<div class="screen-heading"><h1>Scribe</h1></div>' + scribeTabs('sessions') : '<div class="screen-heading"><h1>Sessions</h1>' + (isHomepageExploration ? '<p class="patient-provenance">Example note statuses · No EHR or sharing connection</p>' : '') + '</div>');
  if (!isScribeExploration) return header + '<div class="section-heading"><h2>Recent sessions</h2><span>' + ordered.length + ' total</span></div><div class="card">' + ordered.map(renderSessionRow).join('') + '</div>';
  const byPatient = state.sessionGrouping === 'patient';
  const groups = new Map();
  ordered.forEach(s => {
    const date = new Date(s.createdAt || s.occurredAt || sessionRecency(s));
    const key = byPatient ? (patients[s.patientId] ? s.patientId : 'unassigned') : (Number.isNaN(date.getTime()) ? 'unknown' : date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0'));
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  });
  const entries = [...groups];
  if (byPatient) entries.sort(([a],[b]) => a === 'unassigned' ? 1 : b === 'unassigned' ? -1 : patients[a].name.localeCompare(patients[b].name));
  else entries.sort(([a],[b]) => b.localeCompare(a));
  return header + '<div class="section-heading"><h2>All sessions</h2><span>' + ordered.length + ' total</span></div>' +
    '<div class="today-modes patient-view-modes" role="group" aria-label="Group sessions by">' + [['date','By date'],['patient','By patient']].map(([id,label]) => '<button type="button" class="today-mode' + ((byPatient ? 'patient' : 'date') === id ? ' selected' : '') + '" aria-pressed="' + ((byPatient ? 'patient' : 'date') === id) + '" data-action="session-grouping" data-id="' + id + '">' + label + '</button>').join('') + '</div>' +
    (entries.length ? entries.map(([key,items]) => '<section><div class="section-heading"><h2>' + esc(byPatient ? key === 'unassigned' ? 'Unassigned' : patients[key].name + ' · ' + patients[key].identifier : key === 'unknown' ? 'Date not available' : prettyDate(key)) + '</h2><span>' + items.length + '</span></div><div class="card">' + items.map(renderSessionRow).join('') + '</div></section>').join('') : '<div class="today-empty">No sessions yet. Use + to start a session.</div>');
}

function renderTasks() {
  return topbar() + '<div class="screen-heading work-heading"><h1>Work</h1><p>Your to-dos and work with Heidi.</p></div>' +
    [['todo', 'To do'], ['progress', 'Work in progress'], ['done', 'Done']].map(([status, label]) => {
      const items = workItems.filter(item => workStatus(item) === status);
      const collapsed = !!state.collapsedWorkGroups[status];
      return '<section class="work-group work-group-' + status + '"><h2><button type="button" class="work-group-toggle" data-action="toggle-work-group" data-id="' + status + '" aria-expanded="' + !collapsed + '" aria-controls="work-group-' + status + '"><span class="work-group-symbol" aria-hidden="true">' + icon(status === 'done' ? 'check' : status === 'progress' ? 'clock' : 'file') + '</span><span>' + label + '</span><span class="work-count">' + items.length + '</span><span class="work-chevron ' + (collapsed ? '' : 'expanded') + '">' + icon('chevron') + '</span></button></h2><div class="work-list" id="work-group-' + status + '"' + (collapsed ? ' hidden' : '') + '>' + (items.length ? items.map(renderWorkItem).join('') : '<p class="work-empty">' + (status === 'todo' ? 'You’re all caught up.' : 'Nothing here yet.') + '</p>') + '</div></section>';
    }).join('');
}
function workStatus(item) { return ['todo', 'done'].includes(state.workStatuses[item.id]) && item.owner === 'you' ? state.workStatuses[item.id] : item.status; }
function renderWorkItem(item) {
  const status = workStatus(item), expanded = state.expandedWorkId === item.id;
  const source = item.sessionId && session(item.sessionId);
  const encounterId = source ? source.encounterId : item.encounterId;
  const encounter = encounterId && encounters[encounterId];
  const patient = patients[source?.patientId || encounter?.patientId];
  const owner = item.owner === 'heidi' ? '<span class="work-owner heidi" role="img" aria-label="Heidi"><img src="./assets/heidi-symbol-bark.svg" alt="" /></span>' : '<span class="work-owner you" role="img" aria-label="You">CR</span>';
  const control = item.owner === 'you' ? '<button type="button" class="work-check" role="checkbox" aria-checked="' + (status === 'done') + '" aria-label="' + esc(item.title) + '" data-action="toggle-work-done" data-id="' + item.id + '"><span class="work-status-circle" aria-hidden="true">' + (status === 'done' ? icon('check') : '') + '</span></button>' : '<span class="work-running" role="img" aria-label="In progress"><span class="work-status-circle" aria-hidden="true"></span></span>';
  return '<div class="work-item ' + (status === 'done' ? 'is-done' : '') + '"><div class="work-item-row">' + control + '<button type="button" class="work-item-open" data-action="toggle-work-detail" data-id="' + item.id + '" aria-expanded="' + expanded + '" aria-controls="work-detail-' + item.id + '"><span class="work-item-copy"><strong>' + esc(item.title) + '</strong><small>' + esc(patient ? patient.name : 'General') + '</small></span>' + owner + '</button></div><div class="work-item-detail" id="work-detail-' + item.id + '"' + (expanded ? '' : ' hidden') + '><span class="work-origin">' + esc(item.origin) + ' · ' + (item.owner === 'heidi' ? 'Heidi' : 'You') + '</span><p>' + esc(item.detail) + '</p>' + (encounter ? '<p class="work-encounter-context">' + esc(encounter.title) + ' · ' + esc(encounter.identifier) + '</p>' : '') + '<div class="work-detail-links">' + (source ? '<button type="button" class="text-action" data-action="open-session" data-id="' + esc(source.id) + '">View source session ' + icon('chevron') + '</button>' : '') + (encounter ? '<button type="button" class="text-action" data-action="open-encounter" data-id="' + esc(encounterId) + '">View encounter ' + icon('chevron') + '</button>' : '') + '</div></div></div>';
}
function renderWorkChange(focusSelector, revealFocus = false) {
  const scrollTop = document.querySelector('.app-scroll')?.scrollTop || 0;
  render();
  document.querySelector('.app-scroll').scrollTop = scrollTop;
  document.querySelector(focusSelector)?.focus({ preventScroll: !revealFocus });
}
function renderIdeaPatients() {
  const mode = isScribeExploration && state.screen === 'patients' ? 'all' : state.patientView || 'appointments', day = state.patientDay || '2026-10-02';
  const query = state.patientSearch.trim().toLowerCase();
  const matches = id => (patients[id].name + ' ' + patients[id].identifier).toLowerCase().includes(query);
  const modes = [['appointments','Appointments'],['round','Round']];
  const switcher = '<div class="today-modes patient-view-modes" role="group" aria-label="Patient view">' + modes.map(([id,label]) => '<button type="button" class="today-mode' + (id === mode ? ' selected' : '') + '" aria-pressed="' + (id === mode) + '" data-action="patient-view" data-id="' + id + '">' + label + '</button>').join('') + '</div>';
  const header = isScribeExploration ? topbar() + '<div class="screen-heading"><h1>' + (mode === 'all' ? 'Patients' : 'Scribe') + '</h1></div>' + (mode === 'all' ? '' : scribeTabs(mode)) + '<input class="search-input" id="patientsTabSearch" type="search" placeholder="Search name or Heidi ID" aria-label="Search patients" value="' + esc(state.patientSearch) + '" />' : topbar() + '<div class="screen-heading patient-list-heading"><h1>' + (mode === 'all' ? 'All patients' : 'Patients') + '</h1><button type="button" class="text-action" data-action="patient-directory">' + (mode === 'all' ? 'Back to list' : 'View all') + '</button></div>' + (mode === 'all' ? '' : switcher) + '<input class="search-input" id="patientsTabSearch" type="search" placeholder="Search name or Heidi ID" aria-label="Search patients" value="' + esc(state.patientSearch) + '" />';
  if (mode === 'appointments') {
    const entries = Object.entries(encounters).filter(([,e])=>e.kind === 'Appointment encounter' && e.startedAt?.slice(0,10) === day && matches(e.patientId)).sort((a,b)=>a[1].startedAt.localeCompare(b[1].startedAt));
    return header + patientDateControl(day) + '<p class="patient-provenance">Example schedule · 2 October has 10 appointments</p><div class="section-heading"><h2>' + esc(prettyDate(day)) + '</h2><span>' + entries.length + ' appointments</span></div>' + (entries.length ? '<div class="card">' + entries.map(([id,e])=>homePatientRow({encounterId:id,time:e.startedAt.slice(11,16) || '—'},false)).join('') + '</div>' : '<div class="today-empty">' + (query ? 'No appointments match this search.' : 'No appointments on this date.') + '</div>');
  }
  if (mode === 'round') {
    const rows = roundForDay(day).filter(item=>matches(item.patientId) && (state.wardFilter === 'All wards' || item.ward === state.wardFilter));
    return header + patientDateControl(day) + '<p class="patient-provenance">Example list from admission dates · Not a historical roster</p><div class="today-view-intro"><div><h2>Your round</h2><p>' + esc(prettyDate(day)) + '</p></div><span>' + rows.length + ' patients</span></div><div class="filter-row" aria-label="Filter round by ward">' + ['All wards',...new Set(wardPlan.map(item=>item.ward))].map(label=>'<button type="button" class="filter-chip' + (state.wardFilter === label ? ' selected' : '') + '" data-action="filter-ward" data-filter="' + esc(label) + '">' + esc(label) + '</button>').join('') + '</div>' + (rows.length ? [...new Set(rows.map(item=>item.ward))].map(ward=>'<div class="section-heading"><h2>' + esc(ward) + '</h2></div><div class="card">' + rows.filter(item=>item.ward === ward).map(item=>homePatientRow(item,true)).join('') + '</div>').join('') : '<div class="today-empty">No patients match this round filter.</div>');
  }
  const people = Object.entries(patients).filter(([id])=>matches(id)).sort((a,b)=>a[1].name.localeCompare(b[1].name));
  return header + '<div class="section-heading"><h2>All patients in Heidi</h2><span>' + people.length + '</span></div>' + (people.length ? '<div class="card">' + people.map(([id,p])=>{
    const es = encountersForPatient(id);
    const contexts = es.filter(([,e])=>e.kind === 'Inpatient encounter' && e.status !== 'Complete').map(([,e])=>'Active inpatient · ' + (e.location || 'Location not added'));
    const appointments = es.filter(([,e])=>e.kind === 'Appointment encounter');
    if (appointments.length) contexts.push('Appointment · ' + prettyDate(appointments[0][1].startedAt?.slice(0,10)));
    return '<button type="button" class="history-row" data-action="history-patient" data-id="' + esc(id) + '">' + initials(p) + '<span class="row-main"><span class="row-title">' + esc(p.name) + '</span><span class="row-sub">' + esc(p.identifier) + '</span>' + (contexts.length ? contexts : ['Heidi profile · No active care listed']).map(text=>'<span class="row-third">' + esc(text) + '</span>').join('') + '</span><span class="row-arrow">' + icon('chevron') + '</span></button>';
  }).join('') + '</div>' : '<div class="today-empty">No patients match this search.</div>');
}

function renderPatients() {
  if (isHomepageExploration) return renderIdeaPatients();
  const query = state.patientSearch.trim().toLowerCase();
  const onSchedule = new Set(appointmentPlan.map(item => item.patientId));
  const onRound = new Set(wardPlan.map(item => item.patientId));
  const matches = ([id, p]) => !query || p.name.toLowerCase().includes(query) || p.identifier.toLowerCase().includes(query);
  const groups = [
    ['Today’s appointments', [...new Set(appointmentPlan.map(item => item.patientId))].map(id => [id, patients[id]]).filter(matches)],
    ['On your round', [...new Set(wardPlan.map(item => item.patientId))].map(id => [id, patients[id]]).filter(matches)],
    ['Added in Heidi', Object.entries(customPatients).filter(([id, p]) => !onSchedule.has(id) && !onRound.has(id) && matches([id, p]))]
  ].filter(([, people]) => people.length);
  const patientRow = ([id, p]) => {
    const count = encountersForPatient(id).length;
    const context = onSchedule.has(id) ? 'Appointment today' : onRound.has(id) ? 'On your round' : 'Heidi profile';
    return '<button type="button" class="history-row" data-action="history-patient" data-id="' + esc(id) + '">' + initials(p) + '<span class="row-main"><span class="row-title">' + esc(p.name) + '</span><span class="row-sub">' + esc(context) + ' · ' + esc(p.identifier) + '</span><span class="row-third">' + count + ' encounter' + (count === 1 ? '' : 's') + ' in Heidi history</span></span><span class="row-arrow">' + icon('chevron') + '</span></button>';
  };
  return [
    topbar(),
    '<div class="screen-heading"><h1>Patients</h1></div>',
    '<input class="search-input" id="patientsTabSearch" type="search" placeholder="Search name or Heidi ID" aria-label="Search patients" value="' + esc(state.patientSearch) + '" />',
    '<button type="button" class="choice-card create-choice" data-action="create-patient-profile"><span class="avatar blue">' + icon('plus') + '</span><span class="choice-copy"><strong>Add a patient</strong><small>Create a profile now; add a session later</small></span><span class="row-arrow">' + icon('chevron') + '</span></button>',
    groups.length ? groups.map(([label, people]) => '<div class="section-heading"><h2>' + esc(label) + '</h2><span>' + people.length + '</span></div><div class="card">' + people.map(patientRow).join('') + '</div>').join('') : '<div class="today-empty">No patients match this search.</div>'
  ].join('');
}
function renderEncounter() {
  const e = encounters[state.encounterId], p = patients[e.patientId], ss = sessionsForEncounter(state.encounterId);
  return [
    topbar(p.name),
    renderPatientContext(e.patientId, state.encounterId, {scribe:isHomepageExploration, scribeAction:'start-encounter-session', scribeDisabled:e.status === 'Complete'}),
    '<section class="card detail-hero"><div class="encounter-hero-heading"><h2>' + esc(e.title) + '</h2>' + pill(e.status, e.status === 'Complete' ? 'sand' : 'green') + '</div><div class="encounter-hero-meta"><p>' + esc(e.location || e.date) + '</p>' + pill(e.source === 'Heidi' ? 'Added in Heidi' : 'EHR linked', e.source === 'Heidi' ? 'sand' : 'blue', e.source === 'Heidi' ? null : 'link') + '</div><div class="detail-actions">' + action('Patient history', 'open-history', 'outline') + (isHomepageExploration ? '' : action(icon('plus') + ' Start session', 'start-encounter-session', 'secondary', e.status === 'Complete' ? 'disabled' : '')) + '</div></section>',
    '<div class="subsection-label">Encounter details</div><div class="card info-stack"><div class="info-line"><span>Encounter ID</span><span>' + esc(e.identifier) + '</span></div><div class="info-line"><span>Started</span><span>' + esc(encounterStartLabel(e)) + '</span></div><div class="info-line"><span>Nature of care</span><span>' + esc(encounterTypeLabel(e)) + '</span></div>' + (e.location ? '<div class="info-line"><span>Location</span><span>' + esc(e.location) + '</span></div>' : '') + '<div class="info-line"><span>Source</span><span>' + (e.source === 'Heidi' ? 'Added in Heidi' : e.kind === 'Inpatient encounter' ? 'Cerner · ward patient list' : 'Cerner · appointment') + '</span></div></div>',
    '<div class="subsection-label">Patient details</div><div class="card info-stack"><div class="info-line"><span>Date of birth</span><span>' + esc(p.dob || 'Not added') + '</span></div><div class="info-line"><span>Heidi patient ID</span><span>' + esc(p.identifier) + '</span></div></div>',
    '<div class="section-heading"><h2>Sessions in this encounter</h2><span>' + ss.length + '</span></div>',
    ss.length ? '<div class="card">' + ss.map(s => '<button type="button" class="history-row" data-action="open-session" data-id="' + esc(s.id) + '"><span class="avatar blue">' + icon('waves') + '</span><span class="row-main"><span class="row-title">' + esc(s.title) + '</span><span class="row-sub">' + esc(s.date) + '</span><span class="row-third">' + esc(s.note) + '</span>' + sessionDeliverySummary(s) + '</span><span class="row-arrow">' + icon('chevron') + '</span></button>').join('') + '</div>' : '<div class="today-empty">No Heidi session yet. Start one when the visit begins.</div>',
    '<div class="section-heading"><h2>Across this patient’s care</h2></div><div class="card quiet-card"><span class="section-icon">' + icon('clock') + '</span><div><strong>' + encountersForPatient(e.patientId).length + ' encounter' + (encountersForPatient(e.patientId).length === 1 ? '' : 's') + ' in Heidi</strong><p>See earlier encounters and every session Heidi has for this patient.</p><button type="button" class="text-action" data-action="open-history">Explore history ' + icon('chevron') + '</button></div></div>'
  ].join('');
}
function renderHistory() {
  const p = patients[state.patientId], details = patientDetails[state.patientId] || {}, es = encountersForPatient(state.patientId);
  return topbar('Patient') + renderPatientContext(state.patientId, null, {scribe:true}) +
    '<section class="patient-overview"><div class="patient-section-title"><h2>Patient context</h2>' + huiButton(details.context ? 'Edit context' : 'Add context','edit-patient-context',{variant:'ghost',size:'sm'}) + '</div>' +
    '<p class="patient-context-copy' + (details.context?.length > 220 && state.expandedContextPatient !== state.patientId ? ' patient-context-clamped' : '') + '" id="patientContextText">' + esc(details.context || 'Add why you see this patient and what matters for their ongoing care.') + '</p>' + (details.context?.length > 220 ? huiButton(state.expandedContextPatient === state.patientId ? 'Show less' : 'Read more','toggle-patient-context',{variant:'ghost',size:'sm','aria-expanded':state.expandedContextPatient === state.patientId,'aria-controls':'patientContextText'}) : '') + '<p class="patient-provenance">Clinician-managed · Saved with patient</p></section>' +
    renderNowPatientWork() + '<button type="button" class="patient-details-link" data-action="patient-details"><span><strong>Patient details</strong><small>History, medications, allergies and more</small></span>' + icon('chevron') + '</button>' +
    '<div class="section-heading"><h2>Encounter</h2><span>' + es.length + '</span></div>' +
    (es.length ? '<div class="card patient-encounters">' + es.map(([id,e]) => '<button type="button" class="patient-encounter-row" data-action="open-encounter" data-id="' + esc(id) + '"><span class="row-main"><span class="patient-encounter-type">' + esc(encounterTypeLabel(e)) + ' · ' + esc(e.status) + '</span><strong>' + esc(e.title) + '</strong><span class="row-sub">' + esc(encounterStartLabel(e)) + ' · ' + esc(e.identifier) + '</span><span class="row-sub">' + esc(e.location || 'Location not added') + ' · ' + sessionsForEncounter(id).length + (sessionsForEncounter(id).length === 1 ? ' session' : ' sessions') + '</span></span>' + icon('chevron') + '</button>').join('') + '</div>' : '<div class="today-empty">No encounters yet. Start Scribe or add an encounter from +.</div>');
}
function renderPatientDetails() {
  const p = patients[state.patientId], d = patientDetails[state.patientId] || {};
  const items = [['Date of birth',p.dob],['Heidi patient ID',p.identifier],['Gender',d.gender],['Email',d.email],['Phone',d.phone],['Medical history',d.history],['Medications',d.medications],['Allergies',d.allergies],['Additional notes',d.additionalNotes]];
  return huiSheet('Patient details',p.name,'<p class="patient-provenance">Saved with this patient in Heidi</p><dl class="patient-detail-list">' + items.map(([label,value]) => '<div><dt>' + esc(label) + '</dt><dd>' + esc(value || 'Not recorded') + '</dd></div>').join('') + '</dl><div class="patient-sheet-actions">' + huiButton('Edit details','edit-patient-details',{variant:'secondary'}) + '</div>','patient-detail-sheet');
}
function renderPatientContextEdit() {
  const p = patients[state.patientId], d = patientDetails[state.patientId] || {};
  return huiSheet('Patient context',p.name,'<form id="patientContextForm" class="hui-form"><label>Why I see this patient and what matters<textarea name="context" rows="5" maxlength="1200" placeholder="Reason for care, current situation and useful preferences">' + esc(d.context || '') + '</textarea></label><p class="patient-provenance">Saved with the patient, independently of session notes.</p><div class="patient-sheet-actions">' + huiButton('Cancel','close-modal',{variant:'ghost'}) + huiButton('Save context','',{type:'submit',variant:'secondary'}) + '</div></form>','patient-context-sheet');
}
function patientDobInput(p) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(p.dob || '')) return p.dob;
  const m = (p.dob || '').match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
  const month = m && ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(m[2]);
  return m && month >= 0 ? m[3] + '-' + String(month + 1).padStart(2,'0') + '-' + m[1].padStart(2,'0') : '';
}
function renderPatientDetailsEdit() {
  const p = patients[state.patientId], d = patientDetails[state.patientId] || {};
  const input = (label,name,value,type='text',required=false) => '<label>' + label + '<input name="' + name + '" type="' + type + '" value="' + esc(value || '') + '"' + (required ? ' required' : '') + ' /></label>';
  const fields = [['Medical history','history'],['Medications','medications'],['Allergies','allergies'],['Additional notes','additionalNotes']];
  return huiSheet('Edit patient details',p.name,'<form id="patientDetailsForm" class="hui-form">' + input('Full name','name',p.name,'text',true) + input('Date of birth','dob',patientDobInput(p),'date') + input('Gender','gender',d.gender) + input('Email','email',d.email,'email') + input('Phone','phone',d.phone,'tel') + fields.map(([label,key]) => '<label>' + label + '<textarea name="' + key + '" rows="2">' + esc(d[key] || '') + '</textarea></label>').join('') + '<p class="patient-provenance">Changes are saved to the Heidi profile. They do not update the EHR.</p><div class="patient-sheet-actions">' + huiButton('Cancel','patient-details',{variant:'ghost'}) + huiButton('Save details','',{type:'submit',variant:'secondary'}) + '</div></form>','patient-detail-sheet');
}
function sessionDocuments(s) {
  if (!s.documents) {
    s.documents = s.note ? [{ id: 'clinical', title: 'Clinical note', body: s.note }] : [];
    if (s.id === 's-linda-1') s.documents.push({ id: 'handover', title: 'Handover', body: 'Current status\nOxygen requirement improving.\n\nFor the next team\nReview morning results. Reassess the discharge plan with Linda and her family.' });
  }
  return s.documents;
}
function activeDocument(s) {
  const docs = sessionDocuments(s);
  return docs.find(d => d.id === s.activeDocumentId) || docs[0];
}
function huiButton(label, actionName, options = {}) {
  const { glyph, iconOnly, className = '', ...props } = options;
  return HeidiUI.button((glyph ? icon(glyph) : '') + (iconOnly ? '' : '<span>' + esc(label) + '</span>'), { 'data-action': actionName, 'aria-label': iconOnly ? label : undefined, iconOnly: !!iconOnly, className: 'hui-button ' + className, ...props });
}
function huiText(kind, content, className = '', props = {}) {
  return HeidiUI.text('Typography' + kind, content, { className: 'hui-type ' + className, ...props });
}
function huiSheet(title, subtitle, body, modifier = '') {
  const currentSession = state.screen === 'session' && ['documents','new-document','edit-document','document-actions','dictate-session','session-details'].includes(state.modal) ? session(state.sessionId) : null;
  const context = currentSession ? renderPatientContext(currentSession.patientId, currentSession.encounterId, {compact:true,session:currentSession}) : '';
  return '<div class="sheet-backdrop hui-overlay" data-action="close-modal"><section class="hui-sheet ' + modifier + '" role="dialog" aria-modal="true" aria-labelledby="sheetTitle"><div class="hui-handle"></div><header class="hui-sheet-heading"><div>' + huiText('H3', title, 'hui-display', { id: 'sheetTitle' }) + (subtitle ? huiText('P2', subtitle, 'hui-muted') : '') + '</div>' + huiButton('Close', 'close-modal', { glyph:'close', iconOnly:true, className:'hui-circle' }) + '</header>' + context + body + '</section></div>';
}
function renderDocumentBody(body) {
  return body.split(/\n\n/).map(text => {
    const lines = text.split('\n');
    if (lines.length > 1 && lines[0].length < 60) return '<section class="hui-note-section">' + huiText('PBold', lines.shift()) + huiText('P', lines.join('\n'), 'hui-note-paragraph') + '</section>';
    return huiText('P', text, 'hui-note-paragraph');
  }).join('');
}
function renderSession() {
  const s = session(state.sessionId);
  const docs = sessionDocuments(s), doc = activeDocument(s), source = s.workspaceView === 'source';
  const tabs = docs.map(d => huiButton(d.title,'select-document',{size:'sm',role:'tab',id:'doc-tab-' + d.id,'aria-controls':'sessionContentPanel','aria-selected':!source && doc?.id === d.id,tabIndex:!source && doc?.id === d.id ? 0 : -1,'data-id':d.id,variant:'ghost',className:'hui-workspace-tab' + (!source && doc?.id === d.id ? ' is-active' : '')})).join('') + huiButton('Transcript','session-view',{size:'sm',role:'tab',id:'session-tab-source','aria-controls':'sessionContentPanel','aria-selected':source,tabIndex:source || !docs.length ? 0 : -1,'data-id':'source',variant:'ghost',className:'hui-workspace-tab hui-transcript-tab' + (source ? ' is-active' : '')});
  const documentTitle = doc ? huiText('PBold',esc(doc.title),'hui-document-title',{role:'heading','aria-level':2}) : '';
  const noteBody = doc ? '<article class="hui-paper"><header class="hui-paper-heading"><div>' + documentTitle + huiText('Caption',isHomepageExploration ? noteDelivery(s,doc).label : 'Draft · ' + (doc.edited ? 'Edited' : 'Ready to review'),'hui-muted') + (isHomepageExploration ? huiText('Caption',noteDelivery(s,doc).detail + ' · Example status','hui-muted') : '') + '</div>' + huiButton('Document actions','document-actions',{glyph:'more',iconOnly:true,'aria-haspopup':'dialog',className:'hui-paper-menu'}) + '</header><div class="hui-note-content">' + (doc.body ? renderDocumentBody(doc.body) : huiText('P','This document is blank. Open document actions to start writing.','hui-muted')) + '</div><footer class="hui-paper-footer">' + icon('waves') + huiText('Caption','From this session','hui-muted') + '</footer></article>' : '<article class="hui-paper hui-empty-document">' + huiText('H4','Your first document') + huiText('P','Create a note from this session.','hui-muted') + huiButton('Create document','new-document',{glyph:'plus',variant:'secondary','aria-haspopup':'dialog'}) + '</article>';
  return '<section class="hui-session">' + topbar('Session',true) + renderPatientContext(s.patientId,s.encounterId,{session:s}) + (isHomepageExploration ? '<div class="session-resume-action">' + resumeSessionButton(s) + '</div>' : '') + '<div class="hui-workspace-navigation"><div class="hui-workspace-tabs" role="tablist" aria-label="Session documents and transcript">' + tabs + '</div>' + huiButton('Create document','new-document',{glyph:'plus',iconOnly:true,variant:'ghost','aria-haspopup':'dialog',className:'hui-add-document'}) + '</div><div role="tabpanel" id="sessionContentPanel"' + (source || doc ? ' aria-labelledby="' + (source ? 'session-tab-source' : 'doc-tab-' + esc(doc.id)) + '"' : ' aria-label="Documents"') + '>' + (source ? renderSessionSource(s) : noteBody) + '</div></section>';

}
function renderDocumentActions() {
  const d = activeDocument(session(state.sessionId));
  return huiSheet(d.title, 'Document actions', '<div class="hui-action-group">' + huiButton('Edit document', 'edit-document', {glyph:'edit', variant:'menuItem', className:'hui-action-row'}) + huiButton('Copy document', 'copy-session-note', {glyph:'copy', variant:'menuItem', className:'hui-action-row'}) + '</div>');
}
function renderDocumentPicker() {
  const s = session(state.sessionId), current = activeDocument(s), docs = sessionDocuments(s);
  const rows = docs.map(d => {
    const selected = current?.id === d.id;
    const content = '<span class="hui-document-symbol">' + icon('file') + '</span><span class="hui-row-copy">' + huiText('PBold', d.title) + huiText('Caption', isHomepageExploration ? noteDelivery(s,d).label : 'Draft · ' + (d.edited ? 'Edited' : 'Ready to review'), 'hui-muted') + '</span>' + (selected ? '<span class="hui-selected-check">' + icon('check') + '</span>' : '');
    return HeidiUI.button(content, {type:'button', variant:'menuItem', size:'xl', className:'hui-document-row', 'data-action':'select-document', 'data-id':d.id, 'aria-current': selected ? 'true' : undefined, 'aria-label': 'Open ' + d.title + (selected ? ', current document' : '')});
  }).join('');
  return huiSheet('Documents', docs.length + ' from this session', '<div class="hui-document-list">' + rows + '</div><footer class="hui-sheet-footer">' + huiButton('Create document', 'new-document', {glyph:'plus',variant:'default',size:'xxl',className:'rounded-full w-full'}) + '</footer>');
}
function renderNewDocument() {
  const s = session(state.sessionId);
  const options = [['Clinical note','A structured record of the session'],['Handover','Key updates for the next clinician'],['Patient summary','A summary to share with the patient'],['Blank document','Start with your own words']];
  return huiSheet('Create a document', 'Choose what you’d like to write.', '<form id="createDocumentForm"><fieldset class="hui-template-list"><legend class="visually-hidden">Document type</legend>' + options.map(([title, detail], index) => '<label class="hui-template-option"><span class="hui-document-symbol">' + icon('file') + '</span><span class="hui-row-copy">' + huiText('PBold',title) + huiText('Caption',detail,'hui-muted') + '</span><input type="radio" name="documentType" value="' + title + '" ' + (index === 0 ? 'checked' : '') + ' required /></label>').join('') + '</fieldset><div class="hui-context-source">' + icon('waves') + '<div>' + huiText('Caption','Using this session','hui-muted') + huiText('P2',s.title) + '</div></div><footer class="hui-sheet-footer">' + huiButton('Create document', '', {type:'submit',variant:'default',size:'xxl',className:'rounded-full w-full'}) + huiText('Caption','Prototype · example text, no AI generation','hui-prototype-note hui-muted') + '</footer></form>');
}
function createSessionDocument(type) {
  const s = session(state.sessionId), docs = sessionDocuments(s);
  const count = docs.filter(d => d.title === type || d.title.startsWith(type + ' ')).length;
  const body = type === 'Blank document' ? '' : (type === 'Handover' ? 'For the next team\n' : type === 'Patient summary' ? 'What we discussed\n' : '') + (s.note || s.transcript?.map(t => t.text).join('\n') || '') + (s.dictation ? '\n\nDictation\n' + s.dictation : '');
  const doc = { id: 'doc-' + Date.now(), title: type + (count ? ' ' + (count + 1) : ''), body };
  docs.push(doc); s.activeDocumentId = doc.id; s.workspaceView = 'documents';
  state.modal = type === 'Blank document' ? 'edit-document' : null; save(); render();
}
function renderSessionDictation() {
  const s = session(state.sessionId), p = s.patientId && patients[s.patientId], phase = state.dictationPhase || 'ready';
  const context = '';
  if (phase === 'review') return huiSheet('Review dictation', 'Use this dictation as source material for documents.', context + '<form id="sessionDictationForm" class="hui-form"><label for="sessionDictation">' + huiText('P2Bold','Dictation transcript') + '<textarea id="sessionDictation" name="dictation" rows="5" required placeholder="Type a transcript to try this prototype…"></textarea></label><footer class="hui-sheet-footer">' + huiButton('Use dictation', '', {type:'submit',variant:'default',size:'lg',className:'hui-dictation-action rounded-full w-full'}) + huiText('Caption','Prototype · no audio was captured.','hui-prototype-note hui-muted') + '</footer></form>', 'hui-dictation-sheet');
  const capturing = phase === 'capturing';
  return huiSheet('Dictate', 'Speak a summary for this session.', context + '<div class="hui-dictation-capture">' + icon(capturing ? 'waves' : 'mic') + huiText('PBold', capturing ? 'Dictating · preview' : 'Ready to dictate', '', {role:'status'}) + huiText('P2',capturing ? 'Stop when you’re ready to review.' : 'Your dictation becomes source material for your notes.', 'hui-muted') + '</div><footer class="hui-sheet-footer">' + huiButton(capturing ? 'Stop and review' : 'Start dictating', capturing ? 'stop-dictation' : 'begin-dictation', {glyph:capturing ? 'stop' : 'mic',variant:'default',size:'lg',className:'hui-dictation-action rounded-full w-full'}) + huiText('Caption','Prototype · microphone capture is simulated.','hui-prototype-note hui-muted') + '</footer>', 'hui-dictation-sheet');
}
function useSessionDictation(text) {
  const s = session(state.sessionId), transcript = text.trim();
  if (!transcript) return false;
  s.dictation = [s.dictation, transcript].filter(Boolean).join('\n\n');
  save(); state.modal = null; state.dictationPhase = null; s.workspaceView = 'source';
  toast('Dictation added to this session.');
  return true;
}
function renderEditDocument() {
  const d = activeDocument(session(state.sessionId));
  return huiSheet('Edit document', '', '<form id="editDocumentForm" class="hui-form"><label>' + huiText('P2Bold','Document title') + '<input name="title" required value="' + esc(d.title) + '" /></label><label>' + huiText('P2Bold','Note') + '<textarea name="body" rows="9" required>' + esc(d.body) + '</textarea></label><footer class="hui-sheet-footer">' + huiButton('Save document','',{type:'submit',variant:'default',size:'xxl',className:'rounded-full w-full'}) + '</footer></form>');
}
function renderSessionSource(s) {
  const transcript = s.transcript || (s.id === 's-linda-1' ? [{speaker:'Clinician',time:'00:00',text:'Linda’s oxygen requirement is improving. We’ll review the morning results and reassess the discharge plan with Linda and her family.'}] : []);
  return '<section class="hui-paper"><header class="hui-paper-heading"><div>' + huiText('PBold','Transcript', 'hui-document-title', {role:'heading','aria-level':2}) + huiText('Caption','Session source','hui-muted') + '</div>' + huiButton('Dictate','dictate-session',{glyph:'mic',size:'sm',variant:'ghost','aria-haspopup':'dialog',className:'hui-source-button'}) + '</header>' + (transcript.length ? transcript.map(t => '<section class="hui-transcript-turn"><header>' + huiText('P2Bold',t.speaker) + huiText('Caption',t.time,'hui-muted') + '</header>' + huiText('P',t.text) + '</section>').join('') : huiText('P','No transcript captured for this session.','hui-muted')) + '<section class="hui-dictation-context">' + huiText('PBold','Dictation') + huiText('P',s.dictation || 'No additional dictation yet.','hui-note-paragraph') + '</section></section>';
}
function renderSessionDetails() {
  const s = session(state.sessionId), p = s.patientId && patients[s.patientId], candidate = encounters[s.encounterId], e = candidate?.patientId === s.patientId ? candidate : null;
  const others = e ? sessionsForEncounter(s.encounterId).filter(item => item.id !== s.id) : [];
  const body = '<div class="context-card session-details-context"><div class="context-row"><div><span>Patient</span><strong>' + esc(p ? p.name : 'Not added') + '</strong>' + (p ? '<small>' + esc(p.dob || 'Date of birth not added') + ' · ' + esc(p.identifier) + '</small>' : '') + '</div><button type="button" class="text-action" data-action="open-patient-picker" aria-label="' + (p ? 'Change patient' : 'Add patient') + '">' + (p ? 'Change' : 'Add patient') + ' ' + icon('chevron') + '</button></div><div class="context-row"><div><span>Encounter</span><strong>' + esc(e ? e.title : 'Not assigned') + '</strong>' + (e ? '<small>Encounter ID ' + esc(e.identifier) + '</small><small>Started ' + esc(encounterStartLabel(e)) + '</small><small>' + esc(encounterTypeLabel(e)) + (e.location ? ' · ' + esc(e.location) : '') + '</small>' : '') + '</div><button type="button" class="text-action" data-action="open-encounter-picker" aria-label="' + (e ? 'Change encounter' : 'Assign encounter') + '">' + (e ? 'Change' : 'Assign') + ' ' + icon('chevron') + '</button></div>' + (p ? '<button type="button" class="context-history" data-action="open-history">View patient history ' + icon('chevron') + '</button>' : '') + (e ? '<button type="button" class="context-history" data-action="open-encounter" data-id="' + esc(s.encounterId) + '">View encounter ' + icon('chevron') + '</button>' : '') + '</div>' +
    (others.length ? '<div class="section-heading"><h2>Other sessions</h2><span>' + others.length + '</span></div><div class="session-related-list">' + others.map(item => '<button type="button" class="history-row" data-action="open-session" data-id="' + esc(item.id) + '"><span class="row-main"><span class="row-title">' + esc(item.title) + '</span><span class="row-sub">' + esc(item.date) + '</span></span><span class="row-arrow">' + icon('chevron') + '</span></button>').join('') + '</div>' : '');
  return huiSheet('Session details', '', body, 'session-details-sheet');
}
function renderRecord() {
  const s = session(state.sessionId), e = s.encounterId && encounters[s.encounterId], p = s.patientId && patients[s.patientId];
  return [
    topbar(isHomepageExploration && p ? p.name : 'Recording'),
    renderPatientContext(s.patientId, s.encounterId, {session:s}),
    '<div class="section-heading"><h2>Capture</h2></div>',
    '<div class="record-panel"><div class="record-wave">' + Array.from({length: 13}, () => '<span></span>').join('') + '</div><h2>' + (state.recording ? state.paused ? 'Paused' : 'Recording' : 'Ready to record') + '</h2><p>' + (state.recording ? 'The session stays active while you move through Heidi.' : 'Confirm consent before you begin.') + '</p><div class="record-time" id="recordTime">' + formatElapsed() + '</div><div class="record-controls">' + (state.recording ? '<button type="button" class="record-control" aria-label="' + (state.paused ? 'Resume recording' : 'Pause recording') + '" data-action="pause-record">' + icon(state.paused ? 'play' : 'pause') + '</button><button type="button" class="record-control stop" aria-label="End recording" data-action="end-record">' + icon('stop') + '</button>' : '<button type="button" class="record-control stop" aria-label="Start recording" data-action="begin-record">' + icon('waves') + '</button>') + '</div><div class="record-tip">' + (state.recording ? 'End recording to review the note and link the session.' : 'The prototype simulates recording and note generation.') + '</div></div>',
    '<div class="inline-notice">Session details can be connected to an encounter after capture. Review any generated note before use.</div>'
  ].join('');
}
function renderSearch() {
  const q = state.search.trim().toLowerCase();
  const matches = Object.entries(patients).filter(([, p]) => !q || p.name.toLowerCase().includes(q));
  return [topbar('Search'), '<div class="screen-heading"><div class="eyebrow">Find work</div><h1>Search</h1><p>Find a patient through their Heidi history.</p></div>', '<input class="search-input" id="patientSearch" type="search" placeholder="Search patients" aria-label="Search patients" value="' + esc(state.search) + '" />', '<button type="button" class="choice-card create-choice" data-action="create-patient-profile"><span class="avatar blue">' + icon('plus') + '</span><span><strong>Add a patient</strong><small>Create a Heidi profile without a session</small></span><span class="row-arrow">' + icon('chevron') + '</span></button>', '<div class="section-heading"><h2>Patients</h2><span>' + matches.length + '</span></div>', matches.length ? '<div class="card">' + matches.map(([id, p]) => '<button type="button" class="history-row" data-action="history-patient" data-id="' + id + '">' + initials(p) + '<span class="row-main"><span class="row-title">' + esc(p.name) + '</span><span class="row-sub">' + encountersForPatient(id).length + ' encounter' + (encountersForPatient(id).length === 1 ? '' : 's') + ' in Heidi</span></span><span class="row-arrow">' + icon('chevron') + '</span></button>').join('') + '</div>' : '<div class="today-empty">No matching patients in this prototype.</div>'].join('');
}
function sheetFrame(kicker, title, copy, body, modifier = '') {
  return '<div class="sheet-backdrop" data-action="close-modal"><section class="sheet ' + esc(modifier) + '" role="dialog" aria-modal="true" aria-labelledby="sheetTitle"><div class="sheet-handle"></div><header class="sheet-top"><h2 id="sheetTitle">' + esc(title) + '</h2>' + iconButton('close', 'Close', 'close-modal', 'ghost') + '</header>' + (copy ? '<p>' + esc(copy) + '</p>' : '') + body + '</section></div>';
}
function renderPatientPicker() {
  const s = session(state.sessionId);
  const q = state.assignSearch.trim().toLowerCase();
  const matches = Object.entries(patients).filter(([, person]) => !q || person.name.toLowerCase().includes(q) || person.identifier.toLowerCase().includes(q));
  const body = '<input class="search-input" id="assignSearch" type="search" placeholder="Search name or Heidi ID" aria-label="Search patients to add" value="' + esc(state.assignSearch) + '" />' +
    (s.encounterId ? '<div class="inline-notice">Changing the patient will remove the current encounter link.</div>' : '') +
    '<button type="button" class="choice-card create-choice" data-action="show-new-patient"><span class="avatar blue">' + icon('plus') + '</span><span><strong>Add a new patient</strong><small>Create a profile in Heidi</small></span><span class="row-arrow">' + icon('chevron') + '</span></button>' +
    '<div class="subsection-label">Existing patients · ' + matches.length + '</div><div class="patient-choices">' + (matches.length ? matches.map(([id, person]) => '<button type="button" class="choice-card" data-action="select-patient" data-id="' + esc(id) + '">' + initials(person) + '<span><strong>' + esc(person.name) + '</strong><small>' + esc(person.dob || 'Date of birth not added') + ' · ' + esc(person.identifier) + '</small></span></button>').join('') : '<div class="today-empty">No match. You can add a new patient above.</div>') + '</div>';
  return sheetFrame('PATIENT', 'Who was this with?', 'Find an existing Heidi patient or create a profile. You can add an encounter later.', body);
}
function renderNewSessionContext() {
  const care = activeCareContext(), p = patients[care.patientId], e = encounters[care.encounterId];
  const ongoing = e && e.status !== 'Complete';
  return huiSheet('New session', 'Who is this session for?',
    '<div class="hui-session-context">' + huiText('H4', p.name) + huiText('P2', ongoing ? e.title + ' · ' + e.identifier : 'Choose an encounter after starting', 'hui-muted') + huiText('Caption', ongoing ? 'A separate session in this encounter. Existing notes stay here.' : 'This session will be linked to this patient.', 'hui-muted') + '</div>' +
    '<div class="hui-new-session-actions">' + huiButton('Start for ' + p.name, 'start-context-session', {variant:'default',size:'xl',className:'rounded-full w-full'}) + huiButton('Start without a patient', 'start-unassigned-session', {variant:'ghost',size:'xl',className:'rounded-full w-full'}) + '</div>' + huiText('Caption', 'You can assign another patient from the new session.', 'hui-muted hui-prototype-note'));
}
function renderQuickAdd() {
  const options = [
    ['session', 'waves', 'Session', 'Record a conversation'],
    ['encounter', 'calendar', 'Encounter', 'Appointment or inpatient care'],
    ['patient', 'user', 'Patient', 'Add a patient profile'],
    ['work', 'check', 'Task / work', 'A to-do for you or Heidi']
  ];
  return sheetFrame('QUICK ADD', 'Add new', '', '<div class="quick-add-options">' + options.map(([id, glyph, label, detail]) => '<button type="button" class="quick-add-option" data-action="quick-add-' + id + '"><span class="avatar">' + icon(glyph) + '</span><span class="choice-copy"><strong>' + label + '</strong><small>' + detail + '</small></span><span class="row-arrow">' + icon('chevron') + '</span></button>').join('') + '</div>', 'quick-add-sheet');
}
function renderEncounterPatientPicker() {
  const q = state.assignSearch.trim().toLowerCase();
  const matches = Object.entries(patients).filter(([, p]) => !q || (p.name + ' ' + p.identifier).toLowerCase().includes(q));
  const body = '<button type="button" class="text-action sheet-back-link" data-action="back-from-encounter-patient">' + icon('left') + ' Back</button><input class="search-input" id="assignSearch" type="search" placeholder="Search name or Heidi ID" aria-label="Search patients to add" value="' + esc(state.assignSearch) + '" /><button type="button" class="choice-card create-choice" data-action="quick-encounter-new-patient"><span class="avatar blue">' + icon('plus') + '</span><span class="choice-copy"><strong>Add a new patient</strong><small>Create a profile for this encounter</small></span></button><div class="subsection-label">Existing patients · ' + matches.length + '</div>' + (matches.length ? matches.map(([id, p]) => '<button type="button" class="choice-card" data-action="quick-encounter-select-patient" data-id="' + esc(id) + '">' + initials(p) + '<span class="choice-copy"><strong>' + esc(p.name) + '</strong><small>' + esc(p.dob || 'Date of birth not added') + ' · ' + esc(p.identifier) + '</small></span></button>').join('') : '<div class="today-empty">No matching patient. Add a new profile above.</div>');
  return sheetFrame('NEW ENCOUNTER', 'Choose a patient', 'Each encounter belongs to one patient.', body, 'encounter-picker-sheet');
}
function renderNewWork() {
  const draft = state.workDraft || { title: '', detail: '', context: '' };
  const current = activeCareContext(), source = current.sessionId && session(current.sessionId);
  const options = '<option value="">General · no patient or encounter</option>' + (source ? '<option value="session:' + esc(source.id) + '"' + (draft.context === 'session:' + source.id ? ' selected' : '') + '>This session · ' + esc(source.title) + '</option>' : '') + Object.entries(encounters).map(([id, e]) => '<option value="encounter:' + esc(id) + '"' + (draft.context === 'encounter:' + id ? ' selected' : '') + '>' + esc(patients[e.patientId].name + ' · ' + e.title + ' · ' + e.identifier + ' · ' + encounterStartLabel(e)) + '</option>').join('');
  const body = '<button type="button" class="text-action sheet-back-link" data-action="open-quick-add">' + icon('left') + ' Add new</button><form id="newWorkForm" class="sheet-form"><label>What needs doing?<input name="title" required placeholder="e.g. Follow up with the team" value="' + esc(draft.title) + '" /></label><label>Details <span>Optional</span><textarea name="detail" rows="3" placeholder="Anything else to remember">' + esc(draft.detail) + '</textarea></label><label>Related to <span>Optional</span><select name="context">' + options + '</select></label><div class="sheet-footer"><button type="submit" class="button primary full">Add to-do</button><button type="button" class="button outline full work-with-heidi" data-action="quick-work-ask-heidi"><img src="./assets/heidi-symbol-bark.svg" alt="" />Work with Heidi instead</button></div></form>';
  return sheetFrame('NEW WORK', 'Add a task', '', body, 'encounter-picker-sheet');
}
function renderNewPatient() {
  const standalone = state.patientCreationOrigin !== 'session', fromQuickAdd = state.patientCreationOrigin === 'quick-add';
  const body = '<button type="button" class="text-action sheet-back-link" data-action="back-to-patients">' + icon('left') + (fromQuickAdd ? ' Add new' : state.patientCreationOrigin === 'standalone' ? ' Back' : ' Find an existing patient') + '</button><form id="newPatientForm" class="sheet-form"><label>Full name <span>Required</span><input name="name" type="text" autocomplete="off" required value="' + esc(state.assignSearch) + '" placeholder="Patient name" /></label><label>Date of birth <span>Optional</span><input name="dob" type="date" /></label><div class="inline-notice">This creates a Heidi profile. It does not create a patient in the EHR.</div><div class="sheet-footer"><button type="submit" class="button primary full">' + (state.patientCreationOrigin === 'encounter' ? 'Create patient and continue' : standalone ? 'Create patient profile' : 'Add patient to session') + '</button></div></form>';
  return sheetFrame('NEW PATIENT', 'Add a patient', '', body);
}
function renderEncounterPicker() {
  const s = session(state.sessionId), p = patients[s.patientId], choices = encountersForPatient(s.patientId);
  const body = '<div class="choice-card selected">' + initials(p) + '<span><strong>' + esc(p.name) + '</strong><small>' + esc(p.dob || 'Date of birth not added') + ' · ' + esc(p.identifier) + '</small></span><span class="choice-check">' + icon('check') + '</span></div>' +
    '<button type="button" class="choice-card create-choice" data-action="show-new-encounter"><span class="avatar blue">' + icon('plus') + '</span><span><strong>Create a new encounter</strong><small>Set the type and start date, then assign this session</small></span><span class="row-arrow">' + icon('chevron') + '</span></button>' +
    '<div class="subsection-label">Existing encounters · ' + choices.length + '</div>' +
    (choices.length ? choices.map(([id, e]) => '<button type="button" class="choice-card encounter-choice' + (s.encounterId === id ? ' selected' : '') + '" data-action="link-existing-encounter" data-id="' + esc(id) + '"><span class="avatar blue">' + icon(e.kind === 'Appointment encounter' ? 'calendar' : 'file') + '</span><span class="choice-copy"><strong>' + esc(e.title) + '</strong><small class="encounter-choice-id">Encounter ID ' + esc(e.identifier) + '</small><small>Started ' + esc(encounterStartLabel(e)) + ' · ' + esc(encounterTypeLabel(e)) + '</small>' + (e.location ? '<small>' + esc(e.location) + '</small>' : '') + '</span><span class="' + (s.encounterId === id ? 'choice-check' : 'row-arrow') + '">' + icon(s.encounterId === id ? 'check' : 'chevron') + '</span></button>').join('') : '<div class="today-empty">No encounter for this patient yet.</div>') +
    '<div class="sheet-footer">' + action(s.encounterId ? 'Remove encounter link' : 'Keep at patient level for now', s.encounterId ? 'unlink-encounter' : 'close-modal', 'secondary full') + '</div>';
  return sheetFrame('ENCOUNTER', 'Assign to an encounter', 'Choose the right care period by ID, start date, and type, or create a new one.', body, 'encounter-picker-sheet');
}
function renderNewEncounter() {
  const standalone = state.encounterCreationOrigin === 'standalone';
  const p = patients[standalone ? state.quickAddPatientId : session(state.sessionId)?.patientId], appointment = state.newEncounterType === 'appointment';
  if (!p) return renderEncounterPatientPicker();
  const draft = state.encounterDraft || {};
  const types = '<div class="type-options"><button type="button" class="filter-chip ' + (appointment ? 'selected' : '') + '" data-action="set-encounter-type" data-type="appointment">Appointment</button><button type="button" class="filter-chip ' + (!appointment ? 'selected' : '') + '" data-action="set-encounter-type" data-type="inpatient">Inpatient</button></div>';
  const fields = appointment
    ? '<label>Encounter start date <input name="date" type="date" value="' + esc(draft.date || '2026-10-02') + '" required /></label><div class="form-pair"><label>Start time <input name="startTime" type="time" value="' + esc(draft.startTime || '09:41') + '" required /></label><label>End time <span>Optional</span><input name="endTime" type="time" value="' + esc(draft.endTime || '') + '" /></label></div><label>Location <span>Optional</span><input name="location" type="text" value="' + esc(draft.location || '') + '" placeholder="e.g. General practice" /></label>'
    : '<label>Care period start <input name="date" type="date" value="' + esc(draft.date || '2026-10-02') + '" required /></label><label>Hospital / ward <span>Optional</span><input name="location" type="text" value="' + esc(draft.location || '') + '" placeholder="e.g. Ward 4B" /></label>';
  const patientChoice = standalone ? '<button type="button" class="choice-card" data-action="quick-encounter-change-patient">' + initials(p) + '<span class="choice-copy"><strong>' + esc(p.name) + '</strong><small>' + esc(p.identifier) + ' · Change patient</small></span><span class="row-arrow">' + icon('chevron') + '</span></button>' : '';
  const body = '<button type="button" class="text-action sheet-back-link" data-action="' + (standalone ? 'open-quick-add' : 'back-to-encounters') + '">' + icon('left') + (standalone ? ' Add new' : ' Existing encounters') + '</button>' + patientChoice + '<div class="subsection-label">Type of care</div>' + types + '<form id="newEncounterForm" class="sheet-form"><label>Encounter name <input name="title" type="text" required value="' + esc(draft.title ?? (appointment ? 'Ad hoc appointment' : 'Inpatient care')) + '" /></label>' + fields + '<div class="inline-notice">A Heidi encounter ID is assigned when you create it. ' + (appointment ? 'Use a separate encounter for each appointment.' : 'The care period can remain open until discharge.') + '</div><div class="sheet-footer"><button type="submit" class="button primary full">' + (standalone ? 'Create encounter' : 'Create and assign encounter') + '</button></div></form>';
  return sheetFrame('NEW ENCOUNTER', 'Create an encounter', standalone ? '' : p.name, body, 'encounter-picker-sheet');
}
function formatElapsed() {
  const seconds = state.elapsedBeforePause + (state.recording && !state.paused && state.startedAt ? Math.floor((Date.now() - state.startedAt) / 1000) : 0);
  return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
}
let ticker = null;
function updateTicker() { clearInterval(ticker); if (state.recording && !state.paused) ticker = setInterval(() => { const el = document.getElementById('recordTime'); if (el) el.textContent = formatElapsed(); }, 500); }
function render() {
  const pages = { scribe: renderScribe, today: renderToday, worklist: renderWorklist, sessions: renderSessions, tasks: renderTasks, patients: renderPatients, encounter: renderEncounter, history: renderHistory, session: renderSession, record: renderRecord, search: renderSearch };
  const modals = { 'home-detail':renderHomeDetail, 'patient-details':renderPatientDetails, 'edit-patient-details':renderPatientDetailsEdit, 'edit-patient-context':renderPatientContextEdit, 'new-session-context': renderNewSessionContext, 'document-actions': renderDocumentActions, 'dictate-session': renderSessionDictation, 'documents': renderDocumentPicker, 'new-document': renderNewDocument, 'edit-document': renderEditDocument, 'session-details': renderSessionDetails, 'patient-picker': renderPatientPicker, 'new-patient': renderNewPatient, 'encounter-picker': renderEncounterPicker, 'new-encounter': renderNewEncounter, 'quick-add': renderQuickAdd, 'encounter-patient': renderEncounterPatientPicker, 'new-work': renderNewWork };
  document.getElementById('app').classList.toggle('session-focused', state.screen === 'session');
  document.getElementById('app').innerHTML = '<div class="app-scroll">' + pages[state.screen]() + '</div>' + (state.screen === 'session' ? '' : nav()) + askBar() + (state.recording && state.screen !== 'record' ? '<button type="button" class="mini-player" data-action="return-record">' + icon('waves') + '<span>Recording in progress</span><strong>' + formatElapsed() + '</strong></button>' : '') + (modals[state.modal] ? modals[state.modal]() : '') + (state.chatOpen ? renderChat() : '') + (state.toast ? '<div class="toast" role="status">' + esc(state.toast) + '</div>' : '');
  const activeSheet = document.querySelector('.hui-sheet');
  if (activeSheet) {
    if (state.modal === 'home-detail') document.querySelector('#app > .nav-shell').inert = true;
    document.querySelectorAll('#app > .app-scroll, #app > .ask-shell').forEach(el => { el.inert = true; });
    if (!isEmbeddedPreview) activeSheet.querySelector('button, input, textarea')?.focus({ preventScroll: true });
  }
  const selectedTab = document.querySelector('.hui-workspace-tabs [aria-selected="true"]');
  if (selectedTab) { const strip = selectedTab.parentElement; strip.scrollLeft = Math.max(0, selectedTab.offsetLeft - Math.max(0, (strip.clientWidth - selectedTab.offsetWidth) / 2)); }
  updateTicker();
  document.dispatchEvent(new Event('prototype-render'));
}
function navigate(screen, data) {
  state.stack.push({ screen: state.screen, patientId: state.patientId, encounterId: state.encounterId, sessionId: state.sessionId, worklistType: state.worklistType, wardFilter: state.wardFilter, ...(isScribeExploration ? {patientView:state.patientView,patientDay:state.patientDay,patientSearch:state.patientSearch,returnScroll:document.querySelector('.app-scroll')?.scrollTop || 0} : {}) });
  state.screen = screen;
  Object.assign(state, data || {});
  if (screen === 'session' && session(state.sessionId)) session(state.sessionId).workspaceView = 'documents';
  render();
}
function toast(message) { state.toast = message; render(); setTimeout(() => { if (state.toast === message) { state.toast = null; document.querySelector('.toast')?.remove(); } }, 3000); }
function prettyDate(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  return day + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month - 1] + ' ' + year;
}
function attachPatient(patientId) {
  const s = session(state.sessionId);
  if (s.patientId !== patientId) s.encounterId = null;
  s.patientId = patientId;
  state.patientId = patientId;
  state.encounterId = s.encounterId;
  state.modal = 'encounter-picker';
  state.assignSearch = '';
  save(); render();
}
function attachEncounter(encounterId) {
  const s = session(state.sessionId), e = encounters[encounterId];
  if (!e || e.patientId !== s.patientId) return;
  s.encounterId = encounterId;
  state.encounterId = encounterId;
  state.modal = null;
  save();
  toast('Session assigned to ' + e.identifier + ' · ' + e.title + '.');
}
function newSession(encounterId, patientId = null) {
  state.resumeSessionId = null;
  if (state.recording) { toast('Finish your current recording first.'); return; }
  const e = encounterId && encounters[encounterId];
  if (e?.status === 'Complete') { toast('Choose an active encounter for a new session.'); return; }
  patientId = e ? e.patientId : patientId;
  const id = 's-' + Date.now();
  state.sessions.unshift({ id, patientId: patientId, encounterId: encounterId || null, title: e ? 'New ' + e.title.toLowerCase() + ' session' : 'New session', date: 'Today · just now', createdAt: Date.now(), note: 'The session has been captured. Review this draft and add the details that matter before using it.', status: 'Draft note' });
  save();
  state.recording = false; state.recordingSessionId = null; state.paused = false; state.startedAt = null; state.elapsedBeforePause = 0;
  navigate('record', { sessionId: id, encounterId: encounterId || null, patientId: patientId });
}
function closeCurrentModal() {
  if (state.modal === 'home-detail') {
    state.modal = null; render();
    document.querySelector('.app-scroll').scrollTop = state.homeReturnScroll || 0;
    document.querySelector('[data-action="home-detail"][data-id="' + state.homeDetailId + '"]')?.focus({preventScroll:true});
    return;
  }
    if (['patient-details','edit-patient-details','edit-patient-context'].includes(state.modal)) {
      const action = state.modal === 'edit-patient-context' ? 'edit-patient-context' : 'patient-details';
      const scroll = document.querySelector('.app-scroll').scrollTop;
      state.modal = null; render(); document.querySelector('.app-scroll').scrollTop = scroll;
      document.querySelector('[data-action="' + action + '"]')?.focus({preventScroll:true}); return;
    }
    const documentReturn = {documents:'open-documents','new-document':'new-document','edit-document':'document-actions','document-actions':'document-actions'}[state.modal];
    const wasSessionDetails = state.modal === 'session-details', wasDictation = state.modal === 'dictate-session';
    const scrollTop = document.querySelector('.app-scroll').scrollTop;
    state.modal = null; state.dictationPhase = null; render();
    if (wasDictation) { document.querySelector('.app-scroll').scrollTop = state.dictationReturnScroll || 0; document.querySelector('[data-action="dictate-session"]')?.focus({preventScroll:true}); }
    if (wasSessionDetails) { document.querySelector('.app-scroll').scrollTop = scrollTop; document.querySelector('[data-action="open-session-details"]')?.focus({ preventScroll: true }); }
    if (documentReturn) { document.querySelector('.app-scroll').scrollTop = scrollTop; document.querySelector('[data-action="' + documentReturn + '"]')?.focus({preventScroll:true}); }
}
document.addEventListener('click', ev => {
  const target = ev.target.closest('[data-action]');
  if (!target) return;
  const a = target.dataset.action, id = target.dataset.id;
  if (a === 'balanced-work') { navigate('tasks',{expandedWorkId:id}); return; }
  if (a === 'balanced-ask') { state.chatContext = homePatientName() + ' · Morning ward review'; state.chatDraft = 'Help me finish the outstanding work for ' + homePatientName() + '. Review the source session and suggest which preparation you can do; leave clinical decisions for me.'; state.chatOpen = true; render(); document.getElementById('chatInput')?.focus(); return; }
  if (a === 'home-now-list') { state.homeNowList = id; const scroll = document.querySelector('.app-scroll').scrollTop; render(); document.querySelector('.app-scroll').scrollTop = scroll; document.querySelector('[data-action="home-now-list"][data-id="' + id + '"]')?.focus({preventScroll:true}); return; }
  if (a === 'home-now-open-list') { navigate(isScribeExploration ? 'scribe' : 'patients', {patientView:state.homeNowList || 'appointments',patientSearch:''}); return; }
  if (a === 'home-now-round') { navigate(isScribeExploration ? 'scribe' : 'patients', {patientView:'round'}); return; }
  if (a === 'patient-directory') { if (state.patientView === 'all') state.patientView = state.patientDirectoryReturn || 'appointments'; else { state.patientDirectoryReturn = state.patientView || 'appointments'; state.patientView = 'all'; } state.patientSearch = ''; render(); document.querySelector('[data-action="patient-directory"]')?.focus({preventScroll:true}); return; }
  if (a === 'session-grouping') { state.sessionGrouping = id; render(); document.querySelector('[data-action="session-grouping"][data-id="' + id + '"]')?.focus({preventScroll:true}); return; }
  if (a === 'patient-view') { if (isScribeExploration) state.screen = 'scribe'; state.patientView = id; state.patientSearch = ''; render(); document.querySelector('[data-action="patient-view"][data-id="' + id + '"]')?.focus(); return; }
  if (a === 'patient-day') { const day = new Date((state.patientDay || '2026-10-02') + 'T12:00:00Z'); day.setUTCDate(day.getUTCDate() + Number(id)); state.patientDay = day.toISOString().slice(0,10); render(); document.querySelector('[data-action="patient-day"][data-id="' + id + '"]')?.focus(); return; }
  if (a === 'home-visit-stage') { state.homeVisitStage = id; render(); document.querySelector('[data-action="home-visit-stage"][data-id="' + id + '"]')?.focus({preventScroll:true}); return; }
  if (a === 'home-phase') { state.homePhase = id; render(); document.querySelector('[data-action="home-phase"][data-id="' + id + '"]')?.focus({preventScroll:true}); return; }
  if (a === 'home-list-mode') { const scroll = document.querySelector('.app-scroll').scrollTop; state.homeListMode = id; render(); document.querySelector('.app-scroll').scrollTop = scroll; document.querySelector('[data-action="home-list-mode"][data-id="' + id + '"]')?.focus({preventScroll:true}); return; }
  if (a === 'home-patient-scribe') {
    if (state.recording) { toast('Finish your current recording first.'); return; }
    const e = encounters[id];
    if (!e || e.status === 'Complete') return;
    navigate('encounter', {encounterId:id,patientId:e.patientId});
    newSession(id); return;
  }
  if (a === 'home-all-patients') { navigate(isScribeExploration ? 'scribe' : 'patients', {patientView:state.homeListMode === 'round' ? 'round' : 'appointments',patientDay:'2026-10-02',patientSearch:'',wardFilter:'All wards'}); return; }
  if (a === 'home-task') { const scroll = document.querySelector('.app-scroll').scrollTop; state.homeDone = state.homeDone || {}; state.homeDone[id] = !state.homeDone[id]; render(); document.querySelector('.app-scroll').scrollTop = scroll; document.querySelector('[data-action="home-task"][data-id="' + id + '"]')?.focus({preventScroll:true}); return; }
  if (a === 'home-detail') { state.homeReturnScroll = document.querySelector('.app-scroll').scrollTop; state.homeDetailId = id; state.modal = 'home-detail'; render(); return; }
  if (a === 'home-source') { const source = session('s-linda-1'); if (!source) return; state.modal = null; navigate('session', {sessionId:source.id,patientId:source.patientId,encounterId:source.encounterId}); return; }
  if (a === 'home-ask') { state.modal = null; state.chatContext = homePatientName() + ' · Morning ward review'; state.chatDraft = 'Prepare patient instructions from the morning ward review for ' + homePatientName() + ' for me to review.'; state.chatOpen = true; render(); document.getElementById('chatInput')?.focus(); return; }
  if (['patient-details','edit-patient-details','edit-patient-context'].includes(a)) { state.modal = a; render(); return; }
  if (a === 'toggle-patient-context') { state.expandedContextPatient = state.expandedContextPatient === state.patientId ? null : state.patientId; render(); document.querySelector('[data-action="toggle-patient-context"]')?.focus({preventScroll:true}); return; }
  if (a === 'patient-scribe') {
    if (state.recording) { toast('Finish your current recording first.'); return; }
    const stamp = Date.now(), id = 'manual-e-' + stamp, now = new Date(stamp);
    const startedAt = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + 'T' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    const encounter = {patientId:state.patientId,identifier:'HE-' + String(stamp).slice(-8),title:'Ad hoc appointment',kind:'Appointment encounter',date:prettyDate(startedAt.slice(0,10)),startedAt,source:'Heidi',location:'',status:'Active',sort:Number(startedAt.slice(0,10).replaceAll('-',''))};
    encounters[id] = encounter; customEncounters[id] = encounter; syncManualEncounterLists(); newSession(id); return;
  }

  if (a === 'close-modal' && target.classList.contains('sheet-backdrop') && ev.target !== target) return;
  if (a === 'session-view') { session(state.sessionId).workspaceView = id; render(); document.getElementById('session-tab-' + id)?.focus({preventScroll:true}); return; }
  if (a === 'begin-dictation' || a === 'stop-dictation') { state.dictationPhase = a === 'begin-dictation' ? 'capturing' : 'review'; render(); document.querySelector(state.dictationPhase === 'review' ? '#sessionDictation' : '[data-action="stop-dictation"]')?.focus({preventScroll:true}); return; }
  if (['open-documents', 'new-document', 'edit-document', 'dictate-session', 'document-actions'].includes(a)) {
    if (a === 'dictate-session') { state.dictationPhase = 'ready'; state.dictationReturnScroll = document.querySelector('.app-scroll').scrollTop; }
    state.modal = a === 'open-documents' ? 'documents' : a; render();
    document.querySelector('.hui-sheet button, .sheet button')?.focus(); return;
  }
  if (a === 'select-document') { const s = session(state.sessionId); s.activeDocumentId = id; s.workspaceView = 'documents'; state.modal = null; save(); render(); document.getElementById('doc-tab-' + id)?.focus({preventScroll:true}); return; }
  if (state.modal === 'session-details' && ['open-history', 'open-encounter', 'open-session'].includes(a)) state.modal = null;
  if (a === 'open-session-details') {
    const scrollTop = document.querySelector('.app-scroll').scrollTop;
    state.modal = 'session-details'; render();
    document.querySelector('.app-scroll').scrollTop = scrollTop;
    document.querySelector('.hui-sheet button, .session-details-sheet .sheet-top button')?.focus(); return;
  }
  if (a === 'copy-session-note') {
    const note = activeDocument(session(state.sessionId))?.body;
    if (!note) return;
    const sourceSessionId = state.sessionId;
    if (state.modal === 'document-actions') state.modal = null;
    const feedback = message => {
      if (state.screen !== 'session' || state.sessionId !== sourceSessionId) return;
      const scrollTop = document.querySelector('.app-scroll').scrollTop;
      toast(message);
      document.querySelector('.app-scroll').scrollTop = scrollTop;
      document.querySelector('[data-action="copy-session-note"]')?.focus({ preventScroll: true });
    };
    if (!navigator.clipboard?.writeText) { feedback('Couldn’t copy the note. Try again.'); return; }
    navigator.clipboard.writeText(note).then(() => feedback('Note copied.'), () => feedback('Couldn’t copy the note. Try again.')); return;
  }
  if (a === 'open-quick-add') { state.modal = 'quick-add'; render(); return; }
  if (a === 'quick-add-session') {
    if (activeCareContext().patientId) { state.modal = 'new-session-context'; render(); }
    else { state.modal = null; newSession(null); }
    return;
  }
  if (a === 'start-context-session') {
    const care = activeCareContext(), e = encounters[care.encounterId];
    state.modal = null;
    newSession(e && e.status !== 'Complete' ? care.encounterId : null, care.patientId); return;
  }
  if (a === 'start-unassigned-session') { state.modal = null; newSession(null); return; }
  if (a === 'quick-add-patient') { state.patientCreationOrigin = 'quick-add'; state.assignSearch = ''; state.modal = 'new-patient'; render(); return; }
  if (a === 'quick-add-encounter') {
    state.encounterCreationOrigin = 'standalone'; state.quickAddPatientId = activeCareContext().patientId;
    state.newEncounterType = state.screen === 'today' && state.todayMode === 'round' ? 'inpatient' : 'appointment';
    state.encounterDraft = null; state.assignSearch = '';
    state.modal = state.quickAddPatientId ? 'new-encounter' : 'encounter-patient'; render(); return;
  }
  if (a === 'quick-encounter-change-patient') { state.assignSearch = ''; state.modal = 'encounter-patient'; render(); return; }
  if (a === 'back-from-encounter-patient') { state.modal = state.quickAddPatientId ? 'new-encounter' : 'quick-add'; render(); return; }
  if (a === 'quick-encounter-select-patient') { state.quickAddPatientId = id; state.modal = 'new-encounter'; render(); return; }
  if (a === 'quick-encounter-new-patient') { state.patientCreationOrigin = 'encounter'; state.modal = 'new-patient'; render(); return; }
  if (a === 'quick-add-work') {
    const care = activeCareContext();
    state.workDraft = { title: '', detail: '', context: care.sessionId ? 'session:' + care.sessionId : care.encounterId ? 'encounter:' + care.encounterId : '' };
    state.modal = 'new-work'; render(); return;
  }
  if (a === 'quick-work-ask-heidi') {
    const draft = state.workDraft || {}, [kind, contextId] = (draft.context || '').split(':');
    const context = kind === 'session' ? session(contextId) : encounters[contextId];
    const person = context?.patientId && patients[context.patientId];
    state.chatDraft = [draft.title, draft.detail, context ? 'Context: ' + (person ? person.name + ' · ' : '') + context.title + (context.identifier ? ' · ' + context.identifier : '') : ''].filter(Boolean).join(' — ');
    state.chatContext = person ? person.name : 'Work'; state.chatVoiceNotice = false; state.modal = null; state.chatOpen = true; render(); document.getElementById('chatInput')?.focus(); return;
  }
  if (a === 'open-chat' || a === 'open-voice-chat') { state.chatContext = chatContextLabel(); state.chatVoiceNotice = a === 'open-voice-chat'; state.chatOpen = true; render(); if (state.chatVoiceNotice) document.getElementById('chatInput')?.focus(); return; }
  if (a === 'close-chat') { state.chatOpen = false; render(); return; }
  if (a === 'close-modal' && ev.target.closest('.sheet') && target.classList.contains('sheet-backdrop')) return;
  if (a === 'nav-today' || a === 'go-today') { state.stack = []; state.screen = 'today'; render(); return; }
  if (a === 'nav-scribe') { state.stack = []; state.screen = 'scribe'; if (state.patientView === 'all') state.patientView = 'appointments'; render(); return; }
  if (a === 'nav-sessions' && isScribeExploration) { state.stack = []; state.screen = 'scribe'; state.patientView = 'sessions'; render(); return; }
  if (a === 'nav-sessions') { state.stack = []; state.screen = 'sessions'; render(); return; }
  if (a === 'nav-tasks') { state.stack = []; state.screen = 'tasks'; render(); return; }
  if (a === 'nav-patients') { state.stack = []; state.screen = 'patients'; render(); return; }
  if (a === 'set-today-mode') { state.todayMode = target.dataset.mode; render(); return; }
  if (a === 'toggle-work-group') { state.collapsedWorkGroups[id] = !state.collapsedWorkGroups[id]; renderWorkChange('[data-action="toggle-work-group"][data-id="' + id + '"]'); return; }
  if (a === 'toggle-work-detail') { state.expandedWorkId = state.expandedWorkId === id ? null : id; renderWorkChange('[data-action="toggle-work-detail"][data-id="' + id + '"]'); return; }
  if (a === 'toggle-work-done') {
    const item = workItems.find(item => item.id === id);
    if (!item || item.owner !== 'you') return;
    const nextStatus = workStatus(item) === 'done' ? 'todo' : 'done';
    state.workStatuses[id] = nextStatus;
    state.collapsedWorkGroups[nextStatus] = false;
    save(); renderWorkChange('[data-action="toggle-work-done"][data-id="' + id + '"]', ev.detail === 0); return;
  }
  if (a === 'back') { const last = state.stack.pop(); if (last) Object.assign(state, last); else state.screen = 'today'; render(); if (isScribeExploration) document.querySelector('.app-scroll').scrollTop = last?.returnScroll || 0; return; }
  if (a === 'search') { state.search = ''; navigate('search'); return; }
  if (a === 'open-worklist') { navigate('worklist', { worklistType: target.dataset.type, wardFilter: 'All wards' }); return; }
  if (a === 'filter-ward') { state.wardFilter = target.dataset.filter; render(); return; }
  if (a === 'open-encounter') { navigate('encounter', { encounterId: id, patientId: encounters[id].patientId }); return; }
  if (a === 'open-history') { const pid = state.patientId || (state.sessionId && session(state.sessionId).patientId); if (pid) navigate('history', { patientId: pid }); return; }
  if (a === 'history-patient') { navigate('history', { patientId: id }); return; }
  if (a === 'open-session') { const s = session(id); navigate('session', { sessionId: id, patientId: s.patientId, encounterId: s.encounterId }); return; }
  if (a === 'configure-session') { const s = session(id); state.assignSearch = ''; state.modal = s.patientId ? 'encounter-picker' : 'patient-picker'; navigate('session', { sessionId: id, patientId: s.patientId, encounterId: s.encounterId }); return; }
  if (a === 'new-session') { newSession(null); return; }
  if (a === 'start-encounter-session') { newSession(state.encounterId); return; }
  if (a === 'return-record') { navigate('record', { sessionId: state.recordingSessionId }); return; }
  if (a === 'resume-session') {
    const s = session(id);
    if (!s) return;
    if (state.recording) { toast('Finish your current recording first.'); return; }
    state.resumeSessionId = s.id; state.paused = false; state.startedAt = null; state.elapsedBeforePause = 0;
    navigate('record',{sessionId:s.id,patientId:s.patientId,encounterId:s.encounterId}); return;
  }
  if (a === 'begin-record') { state.recording = true; state.recordingSessionId = state.sessionId; state.paused = false; state.startedAt = Date.now(); render(); return; }
  if (a === 'pause-record') { if (state.paused) { state.paused = false; state.startedAt = Date.now(); } else { state.elapsedBeforePause += Math.floor((Date.now() - state.startedAt) / 1000); state.paused = true; state.startedAt = null; } render(); return; }
  if (a === 'end-record') { state.recording = false; state.recordingSessionId = null; state.paused = false; state.startedAt = null; const s = session(state.sessionId); s.status = 'Note ready'; const resumed = state.resumeSessionId === s.id; if (resumed) { s.captureNeedsReview = true; state.resumeSessionId = null; if (state.stack.at(-1)?.screen === 'session' && state.stack.at(-1)?.sessionId === s.id) state.stack.pop(); } else s.date = 'Today · just now'; save(); state.screen = 'session'; render(); toast(resumed ? 'Resume preview ended. Existing notes preserved; review before sending again.' : 'Session captured. Review the draft note.'); return; }
  if (a === 'open-patient-picker' || a === 'open-encounter-picker') { state.assignSearch = ''; state.modal = a === 'open-encounter-picker' && session(state.sessionId).patientId ? 'encounter-picker' : 'patient-picker'; render(); return; }
  if (a === 'show-new-patient') { state.patientCreationOrigin = 'session'; state.modal = 'new-patient'; render(); return; }
  if (a === 'create-patient-profile') { state.patientCreationOrigin = 'standalone'; state.assignSearch = state.search; state.modal = 'new-patient'; render(); return; }
  if (a === 'back-to-patients') { state.modal = state.patientCreationOrigin === 'quick-add' ? 'quick-add' : state.patientCreationOrigin === 'encounter' ? 'encounter-patient' : state.patientCreationOrigin === 'standalone' ? null : 'patient-picker'; render(); return; }
  if (a === 'select-patient') { attachPatient(id); return; }
  if (a === 'show-new-encounter') { state.encounterCreationOrigin = 'session'; state.encounterDraft = null; state.newEncounterType = 'appointment'; state.modal = 'new-encounter'; render(); return; }
  if (a === 'back-to-encounters') { state.modal = 'encounter-picker'; render(); return; }
  if (a === 'set-encounter-type') { if (state.encounterDraft && ['Ad hoc appointment', 'Inpatient care'].includes(state.encounterDraft.title)) delete state.encounterDraft.title; state.newEncounterType = target.dataset.type; render(); return; }
  if (a === 'link-existing-encounter') { attachEncounter(id); return; }
  if (a === 'unlink-encounter') { const s = session(state.sessionId); s.encounterId = null; state.encounterId = null; state.modal = null; save(); toast('Session kept at patient level.'); return; }
  if (a === 'close-modal') closeCurrentModal();
});
document.addEventListener('submit', ev => {
  if (ev.target.id === 'homeCaptureForm') {
    ev.preventDefault();
    const form = new FormData(ev.target), title = String(form.get('title') || '').trim();
    if (!title) { document.getElementById('homeCaptureText').focus(); return; }
    state.homeCaptured = state.homeCaptured || [];
    state.homeCaptured.push({title,context:String(form.get('context') || 'General') + ' · Added by you'});
    render(); document.getElementById('homeCaptureText').focus({preventScroll:true}); return;
  }

  if (ev.target.id === 'patientContextForm') {
    ev.preventDefault(); const id = state.patientId;
    patientDetails[id] = {...patientDetails[id],context:ev.target.elements.context.value.trim()};
    save(); state.modal = null; toast('Patient context saved.'); return;
  }
  if (ev.target.id === 'patientDetailsForm') {
    ev.preventDefault(); const form = ev.target, id = state.patientId, name = form.elements.name.value.trim();
    if (!name) return;
    const changes = {};
    ['gender','email','phone','history','medications','allergies','additionalNotes'].forEach(key => changes[key] = form.elements[key].value.trim());
    patientDetails[id] = {...patientDetails[id],...changes};
    patients[id] = {...patients[id],name,dob:prettyDate(form.elements.dob.value),initials:name.split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase()};
    customPatients[id] = {...patients[id]}; save(); state.modal = 'patient-details'; toast('Patient details saved.'); return;
  }

  if (ev.target.id === 'createDocumentForm') { ev.preventDefault(); createSessionDocument(ev.target.elements.documentType.value); return; }
  if (ev.target.id === 'editDocumentForm') {
    ev.preventDefault(); const s = session(state.sessionId), d = activeDocument(s), form = ev.target;
    if (!form.elements.title.value.trim() || !form.elements.body.value.trim()) return;
    d.title = form.elements.title.value.trim(); d.body = form.elements.body.value.trim(); d.edited = true;
    if (d.id === 'clinical') s.note = d.body;
    save(); state.modal = null; toast('Document saved.'); return;
  }
  if (ev.target.id === 'sessionDictationForm') {
    ev.preventDefault(); useSessionDictation(ev.target.elements.dictation.value); return;
  }

  if (ev.target.id === 'newPatientForm') {
    ev.preventDefault();
    const form = ev.target, name = form.elements.name.value.trim(), dob = form.elements.dob.value;
    if (!name) return;
    const id = 'manual-p-' + Date.now();
    const identifier = 'HW-' + String(Date.now()).slice(-6);
    const initialsText = name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
    const person = { name, dob: prettyDate(dob), initials: initialsText, avatar: 'blue', identifier };
    patients[id] = person; customPatients[id] = person;
    if (state.patientCreationOrigin === 'encounter') {
      save(); state.quickAddPatientId = id; state.modal = 'new-encounter'; render();
    } else if (state.patientCreationOrigin !== 'session') {
      save(); state.modal = null; navigate('history', { patientId: id });
    } else attachPatient(id);
    return;
  }
  if (ev.target.id === 'newEncounterForm') {
    ev.preventDefault();
    const form = ev.target, standalone = state.encounterCreationOrigin === 'standalone', s = standalone ? null : session(state.sessionId), appointment = state.newEncounterType === 'appointment';
    const patientId = standalone ? state.quickAddPatientId : s?.patientId;
    if (!patientId || !patients[patientId]) return;
    const title = form.elements.title.value.trim(), date = form.elements.date.value, location = form.elements.location.value.trim();
    if (!title || !date) return;
    const startTime = appointment ? form.elements.startTime.value : '';
    const endTime = appointment ? form.elements.endTime.value : '';
    if (appointment && endTime && endTime <= startTime) { form.elements.endTime.setCustomValidity('End time must be after start time.'); form.reportValidity(); return; }
    const stamp = Date.now();
    const id = 'manual-e-' + stamp;
    const dateLabel = prettyDate(date) + (appointment ? ' · ' + startTime + (endTime ? '–' + endTime : '') : ' – ongoing');
    const startedAt = date + (appointment ? 'T' + startTime : '');
    const e = { patientId, identifier: 'HE-' + String(stamp).slice(-8), title, kind: appointment ? 'Appointment encounter' : 'Inpatient encounter', date: dateLabel, startedAt, source: 'Heidi', location, status: appointment && startedAt > '2026-10-02T09:41' ? 'Upcoming' : 'Active', sort: Number(date.replaceAll('-', '')) };
    encounters[id] = e; customEncounters[id] = e;
    syncManualEncounterLists();
    if (standalone) { save(); state.modal = null; navigate('encounter', { patientId, encounterId: id }); }
    else attachEncounter(id);
    return;
  }
  if (ev.target.id === 'newWorkForm') {
    ev.preventDefault();
    const form = ev.target, title = form.elements.title.value.trim(), detail = form.elements.detail.value.trim();
    if (!title) return;
    const [kind, contextId] = form.elements.context.value.split(':');
    const item = { id: 'manual-work-' + Date.now(), title, detail, status: 'todo', owner: 'you', origin: 'Added by you' };
    if (kind === 'session' && session(contextId)) item.sessionId = contextId;
    else if (kind === 'encounter' && encounters[contextId]) item.encounterId = contextId;
    workItems.unshift(item); customWorkItems.unshift(item); save();
    state.modal = null; state.collapsedWorkGroups.todo = false; state.expandedWorkId = item.id;
    navigate('tasks'); return;
  }
  if (ev.target.id !== 'chatForm') return;
  ev.preventDefault();
  const input = document.getElementById('chatInput');
  const message = input?.value.trim();
  if (!message) return;
  state.chatMessages.push({ role: 'user', text: message });
  state.chatDraft = '';
  state.chatMessages.push({ role: 'heidi', text: 'This is a local design prototype. Heidi 2 is not connected here, so I cannot act on this request.' });
  render();
  document.getElementById('chatInput')?.focus();
  const messages = document.querySelector('.chat-body');
  if (messages) messages.scrollTop = messages.scrollHeight;
});
document.addEventListener('input', ev => {
  if (ev.target.form?.id === 'newEncounterForm') {
    state.encounterDraft = { ...(state.encounterDraft || {}), [ev.target.name]: ev.target.value };
    ev.target.form.elements.endTime?.setCustomValidity('');
  }
  if (ev.target.form?.id === 'newWorkForm') state.workDraft = { ...(state.workDraft || {}), [ev.target.name]: ev.target.value };
  if (ev.target.id === 'chatInput') state.chatDraft = ev.target.value;
  if (ev.target.name === 'endTime') ev.target.setCustomValidity('');
  if (ev.target.id === 'assignSearch') {
    const pos = ev.target.selectionStart;
    state.assignSearch = ev.target.value;
    render();
    const next = document.getElementById('assignSearch');
    next.focus(); next.setSelectionRange(pos, pos);
  }
  if (ev.target.id === 'patientSearch') {
    const pos = ev.target.selectionStart;
    state.search = ev.target.value;
    render();
    const next = document.getElementById('patientSearch');
    next.focus(); next.setSelectionRange(pos, pos);
  }
  if (ev.target.id === 'patientsTabSearch') {
    const pos = ev.target.selectionStart;
    state.patientSearch = ev.target.value;
    render();
    const next = document.getElementById('patientsTabSearch');
    next.focus(); next.setSelectionRange(pos, pos);
  }
});
document.addEventListener('keydown', ev => { if (ev.key !== 'Escape') return; if (state.chatOpen) { state.chatOpen = false; render(); } else if (state.modal) { closeCurrentModal(); } });
render();

// Match the tab pattern for keyboard navigation as well as touch.
document.addEventListener('keydown', ev => {
  if (!ev.target.matches('.hui-workspace-tabs [role="tab"]') || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) return;
  ev.preventDefault();
  const tabs = [...document.querySelectorAll('.hui-workspace-tabs [role="tab"]')];
  const index = tabs.indexOf(ev.target);
  const next = ev.key === 'Home' ? 0 : ev.key === 'End' ? tabs.length - 1 : (index + (ev.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].click();
});

document.addEventListener('keydown', ev => {
  const sheet = document.querySelector('.hui-sheet');
  if (!sheet || ev.key !== 'Tab') return;
  const controls = [...sheet.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex="0"]')];
  const first = controls[0], last = controls[controls.length - 1];
  if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last?.focus(); }
  else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first?.focus(); }
});

document.addEventListener('change', event => { if (event.target.id === 'patientDay' && event.target.value) { state.patientDay = event.target.value; render(); document.getElementById('patientDay')?.focus(); } });
