export function roleFromPersonalnummer(nr=''){
  if(nr.startsWith('LV')) return 'verwaltung';
  if(nr.startsWith('L')) return 'lehrer';
  if(nr.startsWith('B')) return 'buchhaltung';
  return 'unbekannt';
}
export function greeting(){
  const h = new Date().getHours();
  if(h < 11) return 'Guten Morgen';
  if(h < 18) return 'Guten Tag';
  return 'Guten Abend';
}
export function lastSchoolDayBavaria(year){ return `${year}-07-31`; }
