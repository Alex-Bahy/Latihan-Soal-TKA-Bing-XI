/**
 * Backend Ujian TKA (Format TKA, 28 soal) v2 - Google Apps Script.
 * Lock singkat, SID stabil, jalur GET/JSONP cadangan, cache config, menu pemulihan guru.
 */
const SS_ID = '1Cjyy_JaxD7fwSkt5AmCbkMTuCxj3URnVeVnYorEP2yI';
const L = 'ABCD', BS = ['Benar', 'Salah'], ST = ['Sesuai', 'Tidak Sesuai'];

const BANK = [
 {s:"Notice: Industrial Visit to Prima Hotel. Meet in front of the school office at 7:30 a.m. on Friday. Wear the school uniform. Bring your student ID.",q:[
  [1,'A',"Where do the students meet?",["At Prima Hotel","In front of the school office","In the canteen","In the workshop"],'B'],
  [2,'A',"What should the students wear?",["Sports clothes","A hotel uniform","The school uniform","Workshop overalls"],'C'],
  [3,'A',"What must the students bring?",["Student ID","Passport","Laptop","Lunch box"],'A']]},
 {s:"Class survey: 18 students like short videos. 10 students like worksheets. 7 students like group discussion.",q:[
  [4,'A',"Which method is the most popular?",["Worksheets","Group discussion","All methods are equal","Short videos"],'D'],
  [5,'A',"Which method is chosen by the fewest students?",["Group discussion","Worksheets","Short videos","None of them"],'A'],
  [6,'A',"How many students joined the survey?",["33","35","30","38"],'B']]},
 {s:"Rani: \"Could you help me carry these books?\"\nDito: \"Sure. I'll help you.\"",q:[
  [7,'A',"What does Dito show?",["Refusal","Apology","Agreement to help","Congratulations"],'C']]},
 {s:"First, put sugar in a glass. Next, add warm tea. Then, add ice and lemon. Finally, serve it cold.",q:[
  [8,'A',"What type of text is this?",["Narrative","Recount","Report","Procedure"],'D']]},
 {s:"Announcement: \"The computer lab is closed on Wednesday for network maintenance.\"",q:[
  [9,'A',"Why is the lab closed?",["A competition","Network maintenance","A meeting","Cleaning the library"],'B']]},
 {s:"Poster: \"SAVE ELECTRICITY. Turn off lights and computers when you leave.\"",q:[
  [10,'A',"What is the purpose of the poster?",["To advertise computers","To invite students to a meeting","To encourage saving electricity","To describe a classroom"],'C']]},
 {s:"Notice: \"Bring safety glasses and closed shoes. No safety equipment, no entry.\"",q:[
  [11,'A',"Why is there this rule?",["To make students look formal","To make the workshop quiet","To reduce the number of students","To keep students safe"],'D']]},
 {s:"Nina: \"I'm sorry I submitted the assignment late.\"",q:[
  [12,'A',"What does Nina express?",["Apology","Permission","Congratulations","Warning"],'A']]},
 {s:"The canteen opens at 7:00 a.m. and closes at 2:00 p.m. Students can buy rice, noodles, and fruit. Please put your trash in the bins.",q:[
  [13,'B',"Which 2 statements are correct?",["The canteen opens at 7:00 a.m.","The canteen closes at 3:00 p.m.","Students can buy fruit.","Students cannot buy rice."],['A','C']],
  [14,'B',"Which 2 things can students buy?",["Safety shoes","Noodles","Printed books","Rice"],['B','D']]]},
 {s:null,q:[[15,'B',"Making iced lemon tea. Which 2 are the correct steps?",["Put sugar in a glass.","Add hot oil.","Add warm tea.","Boil lemon peel for an hour."],['A','C']]]},
 {s:null,q:[[16,'B',"A strong password. Which 2 tips are correct?",["Use your birthday.","Never share it with others.","Use letters, numbers, and symbols.","Share it with friends."],['B','C']]]},
 {s:"Email: \"Hi Maya, I attached the new internship schedule. Please check your dates and tell me if there is a mistake. Best, Riko\"",q:[
  [17,'B',"What does Riko ask Maya to do? (pilih 2 jawaban)",["Check her dates","Delete the file","Report any mistake","Send a job application"],['A','C']],
  [18,'B',"Which 2 statements are correct?",["Maya wrote the email.","The schedule is attached.","The email is about a holiday.","Riko wrote the email."],['B','D']]]},
 {s:null,q:[[19,'B',"Lala's accounting totals do not balance. She checks the records instead of changing numbers randomly. Which 2 can we say about Lala?",["She changes numbers randomly.","She works carefully.","She has no records.","She wants to find the error."],['B','D']]]},
 {s:null,q:[[20,'B',"A caf\u00e9 uses paper straws but still uses many plastic cups. Which 2 conclusions are correct?",["The action may help.","One change solves all waste problems.","Other waste must also be reduced.","Paper straws are useless."],['A','C']]]},
 {s:"Supervisor: \"The customer is waiting for the quotation.\"\nStudent: \"I'm still checking the price list.\"\nSupervisor: \"Please finish it in ten minutes.\"",q:[
  [21,'C',"Tentukan Benar atau Salah.",BS,[["The student has finished the price list.","Salah"],["The customer is waiting for the quotation.","Benar"],["The supervisor gives a deadline.","Benar"]]],
  [22,'C',"Tentukan Sesuai atau Tidak Sesuai dengan dialog.",ST,[["The supervisor offers a holiday.","Tidak Sesuai"],["The student must finish in ten minutes.","Sesuai"],["The student is still checking the price list.","Sesuai"]]]]},
 {s:"Reno sees a \"Wet Floor\" sign in the workshop. He takes another route.",q:[
  [23,'C',"Tentukan Benar atau Salah.",BS,[["Reno ignores the sign.","Salah"],["Reno knows the floor is dangerous.","Benar"],["Reno avoids the wet area.","Benar"]]]]},
 {s:"Student: \"May I use your charger?\"\nFriend: \"Sure, but please return it before the next class.\"",q:[
  [24,'C',"Tentukan Benar atau Salah.",BS,[["The student asks for permission.","Benar"],["The friend refuses.","Salah"],["The friend gives a condition.","Benar"]]]]},
 {s:"Notice: The school server will be unavailable from 15:00 to 17:00. Teachers should download files before 15:00.",q:[
  [25,'C',"Tentukan Benar atau Salah.",BS,[["The server is unavailable for two hours.","Benar"],["Teachers should download files after 17:00.","Salah"],["Files may not open during maintenance.","Benar"]]]]},
 {s:"Internship attendance: Monday 96%, Tuesday 92%, Wednesday 88%, Thursday 94%, Friday 90%. The supervisor wants to find the reason for the low attendance before changing the schedule.",q:[
  [26,'C',"Tentukan Benar atau Salah.",BS,[["Friday attendance is higher than Thursday.","Salah"],["Monday has the highest attendance.","Benar"],["Wednesday has the lowest attendance.","Benar"]]],
  [27,'C',"Tentukan Sesuai atau Tidak Sesuai sebagai tindak lanjut.",ST,[["Cancel the internship.","Tidak Sesuai"],["Ask interns why Wednesday attendance is low.","Sesuai"],["Guess the reason without checking.","Tidak Sesuai"]]]]},
 {s:"Method A saves 10% energy but makes production slower. Method B saves 7% energy and keeps the same production speed.",q:[
  [28,'C',"Tentukan Benar atau Salah.",BS,[["Method A keeps the same production speed.","Salah"],["Method A saves more energy than Method B.","Benar"],["Method B keeps the same production speed.","Benar"]]]]}
];
const TOTAL = 28;

// ---------- Menu & setup ----------
function onOpen() {
  SpreadsheetApp.getUi().createMenu('TKA')
    .addItem('Setup Awal', 'setup')
    .addItem('Reset Sesi Siswa (izinkan ulang)', 'resetSesi')
    .addSeparator()
    .addItem('Pulihkan / Kumpulkan Paksa (siswa gagal kirim)', 'pulihkan')
    .addItem('Input Jawaban dari Kode Cadangan', 'inputManual')
    .addItem('Rekap Otomatis', 'rekap').addToUi();
}

function setup() {
  const ss = SS();
  const H = {
    Hasil: ['Mulai','Selesai','Durasi (menit)','Nama','NIS','Kelas','Skor A','Skor B','Skor C','Skor Total','Nilai','Pelanggaran','Status','User Agent'],
    Jawaban_Detail: ['Timestamp','NIS','Nama','No Soal Asli','Jawaban Siswa','Kunci','Benar?'],
    Log_Pelanggaran: ['Timestamp','NIS','Nama','Jenis','Pelanggaran ke-'],
    Sesi: ['NIS','Nama','Kelas','Mulai (ms)','Status','Jawaban','Pelanggaran','SID','User Agent','Skor'],
    Config: ['KEY','VALUE']
  };
  Object.keys(H).forEach(n => {
    const s = ss.getSheetByName(n) || ss.insertSheet(n);
    if (s.getLastRow() === 0) { s.getRange(1,1,1,H[n].length).setValues([H[n]]).setFontWeight('bold'); s.setFrozenRows(1); }
  });
  ss.getSheetByName('Sesi').getRange('A:A').setNumberFormat('@');
  ss.getSheetByName('Hasil').getRange('E:E').setNumberFormat('@');
  ss.getSheetByName('Jawaban_Detail').getRange('B:B').setNumberFormat('@');
  ss.getSheetByName('Log_Pelanggaran').getRange('B:B').setNumberFormat('@');
  const c = ss.getSheetByName('Config');
  if (c.getLastRow() < 2) c.getRange(2,1,6,2).setValues([['TOKEN','TKA2026'],['DURASI_MENIT',45],['MAKS_PELANGGARAN',3],['NAVIGASI_BEBAS',true],['TAMPILKAN_NILAI',true],['UJIAN_AKTIF',true]]);
  CacheService.getScriptCache().remove('cfg');
  rekap();
}

function rekap() {
  const s = SS().getSheetByName('Rekap') || SS().insertSheet('Rekap');
  s.clear();
  s.getRange('A1').setFormula('=IFERROR(QUERY(Hasil!A:N,"select F, count(D), avg(K), max(K), min(K) where F is not null group by F label F \'Kelas\', count(D) \'Jumlah\', avg(K) \'Rata-rata\', max(K) \'Tertinggi\', min(K) \'Terendah\'",1),"Belum ada data")');
}

function resetSesi() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt('Reset sesi', 'Masukkan NIS siswa:', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const o = sesi(clean(r.getResponseText()));
  if (!o.v) return ui.alert('NIS tidak ditemukan di sheet Sesi.');
  o.s.deleteRow(o.r);
  ui.alert('Sesi direset. Siswa bisa mengulang (data lama di sheet Hasil tetap ada).');
}

// Kumpulkan paksa sesi AKTIF yang waktunya habis (pakai jawaban autosave) dan lengkapi Hasil yang belum tercatat.
function pulihkan() {
  const ui = SpreadsheetApp.getUi(), c = cfg(), s = sh('Sesi'), v = s.getDataRange().getValues();
  const ada = {}; sh('Hasil').getDataRange().getValues().slice(1).forEach(r => ada[nk(r[4])] = 1);
  const batas = Number(c.DURASI_MENIT) * 60000 + 60000, now = Date.now(); let a = 0, b = 0;
  for (let i = 1; i < v.length; i++) {
    const x = v[i]; if (!nk(x[0])) continue;
    const o = { r: i + 1, s, v: x }, j = safeJson(x[5]);
    if (x[4] === 'AKTIF') { if (now > Number(x[3]) + batas) { catat(o, j, 'DIKUMPULKAN GURU (waktu habis)'); a++; } }
    else if (!ada[nk(x[0])]) { catat(o, j, 'DIPULIHKAN', true); b++; }
  }
  ui.alert('Selesai.\nDikumpulkan paksa: ' + a + ' siswa\nHasil dipulihkan: ' + b + ' siswa');
}

// Tempel "kode cadangan" dari layar siswa yang gagal kirim.
function inputManual() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt('Input kode cadangan', 'Tempel kode cadangan siswa:', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  try {
    const k = JSON.parse(Utilities.newBlob(Utilities.base64Decode(r.getResponseText().trim())).getDataAsString());
    const o = sesi(clean(k.n));
    if (!o.v) return ui.alert('NIS tidak ditemukan di sheet Sesi.');
    if (o.v[4] !== 'AKTIF') return ui.alert('Siswa ini sudah tercatat selesai.');
    catat(o, k.j || {}, 'DIINPUT GURU');
    ui.alert('Jawaban ' + o.v[1] + ' berhasil dicatat.');
  } catch (e) { ui.alert('Kode tidak valid.'); }
}

// ---------- Utilitas ----------
let _ss; const SS = () => _ss || (_ss = SpreadsheetApp.openById(SS_ID));
function sh(n) {
  let s = SS().getSheetByName(n);
  if (!s) { setup(); s = SS().getSheetByName(n); }
  return s;
}
const bool = v => String(v).toUpperCase() === 'TRUE';
const fail = m => ({ ok: false, msg: m });
const out = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const nk = s => String(s == null ? '' : s).trim().replace(/^0+(?=.)/, '');
const safeJson = s => { try { return JSON.parse(s || '{}'); } catch (e) { return {}; } };
function clean(s) { s = String(s == null ? '' : s).trim().slice(0, 100); return /^[=+\-@]/.test(s) ? "'" + s : s; }
function cfg() {
  const ca = CacheService.getScriptCache(), h = ca.get('cfg');
  if (h) return JSON.parse(h);
  const c = {}; sh('Config').getDataRange().getValues().slice(1).forEach(r => c[r[0]] = r[1]);
  ca.put('cfg', JSON.stringify(c), 30);
  return c;
}
function sesi(nis) { // baca hanya kolom NIS, lalu satu baris
  const s = sh('Sesi'), n = s.getLastRow(), k = nk(nis);
  if (n > 1) {
    const a = s.getRange(2, 1, n - 1, 1).getValues();
    for (let i = 0; i < a.length; i++) if (nk(a[i][0]) === k) return { r: i + 2, s, v: s.getRange(i + 2, 1, 1, 10).getValues()[0] };
  }
  return { s };
}
function chk(d) {
  const o = sesi(clean(d.nis));
  if (!o.v || String(o.v[7]) !== String(d.sid)) return { err: fail('Sesi tidak valid. Muat ulang halaman lalu login lagi dengan data yang sama.') };
  if (o.v[4] !== 'AKTIF') return { err: { ok: false, selesai: true, msg: 'Ujian sudah dikumpulkan.' } };
  return o;
}
function soalKlien() { // tanpa kunci
  return BANK.map(g => ({ s: g.s, q: g.q.map(x => x[1] === 'C'
    ? { no: x[0], tipe: 'C', teks: x[2], label: x[3], p: x[4].map(p => p[0]) }
    : { no: x[0], tipe: x[1], teks: x[2], opsi: Object.fromEntries(x[3].map((o, i) => [L[i], o])) }) }));
}
function nilai(j) {
  const d = []; let a = 0, b = 0, c = 0;
  BANK.forEach(g => g.q.forEach(x => {
    const no = x[0], t = x[1], u = j[no]; let ok, key, ans;
    if (t === 'A') { key = x[4]; ans = u || ''; ok = ans === key; }
    else if (t === 'B') { key = x[4].join(','); ans = Array.isArray(u) ? u.slice().sort().join(',') : ''; ok = ans === key; }
    else { const r = Array.isArray(u) ? u : []; key = x[4].map(p => p[1]).join(' | '); ans = [0,1,2].map(i => r[i] || '-').join(' | '); ok = x[4].every((p, i) => r[i] === p[1]); }
    if (ok) { if (t === 'A') a++; else if (t === 'B') b++; else c++; }
    d.push([no, ans, key, ok ? 1 : 0]);
  }));
  return { a, b, c, d };
}
const hasil = (tampil, skor) => ({ ok: true, tampil, skor, nilai: Math.round(skor / TOTAL * 10000) / 100, total: TOTAL });
function kunci(fn) { const k = LockService.getScriptLock(); k.waitLock(30000); try { return fn(); } finally { k.releaseLock(); } }

// ---------- API ----------
function route(d) {
  const F = { ping: () => ({ ok: true }), mulai, simpan, log: logP, submit };
  if (!F[d.action]) return fail('Aksi tidak dikenal.');
  try { return F[d.action](d); }
  catch (err) { return { ok: false, retry: true, msg: 'Server sedang sibuk (' + err.message + ')' }; }
}
function doPost(e) {
  let d; try { d = JSON.parse(e.postData.contents); } catch (x) { return out(fail('Data tidak valid.')); }
  return out(route(d));
}
// GET: status API, atau jalur cadangan JSONP (untuk browser/jaringan yang gagal memakai POST)
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (!p.action) return out({ ok: true, status: 'API ujian aktif' });
  let d = {}; try { d = JSON.parse(p.d || '{}'); } catch (x) {}
  d.action = p.action;
  const t = JSON.stringify(route(d));
  if (!p.cb) return ContentService.createTextOutput(t).setMimeType(ContentService.MimeType.JSON);
  return ContentService.createTextOutput(String(p.cb).replace(/[^\w.$]/g, '') + '(' + t + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function mulai(d) {
  const c = cfg();
  if (!bool(c.UJIAN_AKTIF)) return fail('Ujian belum dibuka.');
  if (String(d.token).trim().toUpperCase() !== String(c.TOKEN).trim().toUpperCase()) return fail('Token salah.');
  const nis = clean(d.nis), nama = clean(d.nama);
  if (!nis || !nama) return fail('Nama dan NIS wajib diisi.');
  return kunci(() => {
    let o = sesi(nis), sid;
    if (!o.v) {
      sid = Utilities.getUuid();
      const r = o.s.getLastRow() + 1;
      o.s.getRange(r, 1).setNumberFormat('@');
      o.s.getRange(r, 1, 1, 10).setValues([[nis, nama, clean(d.kelas), Date.now(), 'AKTIF', '{}', 0, sid, clean(d.ua), '']]);
      o = sesi(nis);
    } else if (o.v[4] !== 'AKTIF') return { ok: false, selesai: true, msg: 'Anda sudah mengerjakan ujian ini.' };
    else { sid = String(o.v[7] || '') || Utilities.getUuid(); if (!o.v[7]) o.s.getRange(o.r, 8).setValue(sid); } // SID tetap -> bisa lanjut di perangkat lain
    return { ok: true, sid, now: Date.now(), mulai: Number(o.v[3]), durasi: Number(c.DURASI_MENIT), nav: bool(c.NAVIGASI_BEBAS),
      maks: Number(c.MAKS_PELANGGARAN), soal: soalKlien(), jawaban: safeJson(o.v[5]), pel: Number(o.v[6]) };
  });
}

function simpan(d) { // tanpa lock: ringan & sering dipanggil
  const o = chk(d); if (o.err) return o.err;
  o.s.getRange(o.r, 6).setValue(JSON.stringify(d.jawaban || {}));
  return { ok: true };
}

function logP(d) {
  return kunci(() => {
    const o = chk(d); if (o.err) return o.err;
    const n = Number(o.v[6]) + 1;
    o.s.getRange(o.r, 7).setValue(n);
    sh('Log_Pelanggaran').appendRow([new Date(), o.v[0], o.v[1], clean(d.jenis), n]);
    return { ok: true, pel: n };
  });
}

function submit(d) {
  const tampil = bool(cfg().TAMPILKAN_NILAI);
  return kunci(() => {
    const o = sesi(clean(d.nis));
    if (!o.v || String(o.v[7]) !== String(d.sid)) return fail('Sesi tidak valid. Muat ulang, login lagi, lalu kumpulkan. Jika tetap gagal, serahkan kode cadangan ke guru.');
    if (o.v[4] !== 'AKTIF') return hasil(tampil, Number(o.v[9]) || 0); // idempotent
    const lewat = Date.now() > Number(o.v[3]) + Number(cfg().DURASI_MENIT) * 60000 + 60000;
    const st = d.auto === 'pelanggaran' ? 'AUTO-SUBMIT PELANGGARAN' : (lewat ? 'TERLAMBAT' : 'SELESAI');
    return hasil(tampil, catat(o, d.jawaban || {}, st));
  });
}

// Status Sesi ditulis lebih dulu agar jawaban pasti aman; jika Hasil/Detail gagal, jalankan menu "Pulihkan".
function catat(o, j, st, sudah) {
  const r = nilai(j), skor = r.a + r.b + r.c, nl = Math.round(skor / TOTAL * 10000) / 100;
  const now = Date.now(), mulai = Number(o.v[3]);
  if (!sudah) o.s.getRange(o.r, 5, 1, 6).setValues([['SELESAI', JSON.stringify(j), Number(o.v[6]), o.v[7], o.v[8] || '', skor]]);
  try {
    sh('Hasil').appendRow([new Date(mulai), new Date(now), Math.round((now - mulai) / 600) / 100, o.v[1], o.v[0], o.v[2], r.a, r.b, r.c, skor, nl, Number(o.v[6]), st, o.v[8] || '']);
    const det = sh('Jawaban_Detail'), ts = new Date();
    const rows = r.d.map(x => [ts, o.v[0], o.v[1], x[0], x[1], x[2], x[3]]);
    det.getRange(det.getLastRow() + 1, 1, rows.length, 7).setValues(rows);
  } catch (e) {}
  return skor;
}
