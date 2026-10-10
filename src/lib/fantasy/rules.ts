export type Position = 'GKP' | 'DEF' | 'MID' | 'FWD';
export interface Player { id: number; name: string; pos: Position; team: string; price: number; star?: boolean; team_name?: string }
export interface Team { code: string; name: string; logo: string; colors: string[] }
export interface Kit { base: string; sleeves: string; pattern: string; patternColor: string; trim: string }
export type Chip = 'Wildcard' | 'Free Hit' | 'Bench Boost' | 'Triple Captain';
export interface Squad { ids: number[]; captain: number | null; vice: number | null; chip: Chip | null }
export const POSITIONS: Position[] = ['GKP', 'DEF', 'MID', 'FWD'];
export const QUOTAS: Record<Position, number> = { GKP: 2, DEF: 5, MID: 5, FWD: 3 };
export const POSITION_NAMES: Record<Position, string> = { GKP: 'Gardiens', DEF: 'Défenseurs', MID: 'Milieux', FWD: 'Attaquants' };
export function getSquadPlayers(squad: Squad, players: Player[]) { return squad.ids.flatMap(id => { const player = players.find(p => p.id === id); return player ? [player] : []; }); }
export function validFormation(starters: Player[]) { const count = (pos:Position) => starters.filter(p => p.pos === pos).length; return starters.length === 11 && count('GKP') === 1 && count('DEF') >= 3 && count('DEF') <= 5 && count('MID') >= 2 && count('MID') <= 5 && count('FWD') >= 1 && count('FWD') <= 3; }
export function validateSquad(squad: Squad, players: Player[], complete = false): string | null {
 const chosen = getSquadPlayers(squad, players);
 if (chosen.length !== squad.ids.length) return 'Un joueur est introuvable.';
 if (new Set(squad.ids).size !== squad.ids.length) return 'Ce joueur est déjà dans votre équipe.';
 if (chosen.length > 15) return 'Votre équipe ne peut pas dépasser 15 joueurs.';
 if (Math.round(chosen.reduce((n,p) => n+p.price,0)*10) > 1000) return 'Votre budget de 100,0 est dépassé.';
 for (const pos of POSITIONS) if (chosen.filter(p=>p.pos===pos).length > QUOTAS[pos]) return `Maximum ${QUOTAS[pos]} ${POSITION_NAMES[pos].toLowerCase()}.`;
 for (const team of new Set(chosen.map(p=>p.team))) if (chosen.filter(p=>p.team===team).length>3) return `Maximum 3 joueurs du club ${team}.`;
 if (complete) {
  if (chosen.length !== 15) return 'Sélectionnez 15 joueurs pour compléter votre équipe.';
  if (!validFormation(chosen.slice(0,11))) return 'Votre formation doit compter 1 gardien, 3–5 défenseurs, 2–5 milieux et 1–3 attaquants.';
  if (chosen[11]?.pos !== 'GKP') return 'Le premier remplaçant doit être un gardien.';
  if (squad.captain === null || squad.vice === null || squad.captain === squad.vice || !squad.ids.slice(0,11).includes(squad.captain) || !squad.ids.slice(0,11).includes(squad.vice)) return 'Choisissez un capitaine et un vice-capitaine titulaires distincts.';
 }
 return null;
}
export function swapPlayers(squad: Squad, players: Player[], a: number, b: number): Squad | string {
 const i=squad.ids.indexOf(a), j=squad.ids.indexOf(b); if(i<0 || j<0) return 'Joueur introuvable.';
 const ids=[...squad.ids]; ids[i]=b; ids[j]=a;
 const selected=getSquadPlayers({...squad,ids},players);
 if(!validFormation(selected.slice(0,11)) || selected[11]?.pos!=='GKP') return 'Ce remplacement ne respecte pas une formation valide.';
 let captain=squad.captain, vice=squad.vice;
 if(captain!==null && !ids.slice(0,11).includes(captain)) captain= i<11?b:a;
 if(vice!==null && !ids.slice(0,11).includes(vice)) vice= i<11?b:a;
 return {...squad,ids,captain,vice};
}
export function discoverySquad(players: Player[]): Squad {
 const requested: [string, Position, number][] = [['WAC','GKP',0],['RCA','DEF',1],['FAR','DEF',0],['RSB','DEF',1],['WAC','DEF',3],['RCA','MID',0],['MAS','MID',0],['FAR','MID',0],['FUS','MID',0],['RSB','FWD',0],['WAC','FWD',0],['FUS','GKP',0],['IRT','DEF',0],['DHJ','MID',0],['MAS','FWD',0]];
 const ids=requested.flatMap(([team,pos,index]) => { const p=players.filter(x=>x.team===team&&x.pos===pos)[index]; return p ? [p.id]:[]; });
 const squad={ids,captain:ids[9]??null,vice:ids[5]??null,chip:null};
 if(!validateSquad(squad,players,true)) return squad;
 const chosen:Player[]=[]; for(const pos of POSITIONS) for(let n=0;n<QUOTAS[pos];n++) { const p=[...players].filter(x=>x.pos===pos&&!chosen.some(y=>y.id===x.id)&&chosen.filter(y=>y.team===x.team).length<3).sort((a,b)=>a.price-b.price)[0]; if(p) chosen.push(p); }
 const starters=[...chosen.filter(p=>p.pos==='GKP').slice(0,1),...chosen.filter(p=>p.pos==='DEF').slice(0,4),...chosen.filter(p=>p.pos==='MID').slice(0,4),...chosen.filter(p=>p.pos==='FWD').slice(0,2)];
 const bench=chosen.filter(p=>!starters.includes(p)).sort((a,b)=>Number(b.pos==='GKP')-Number(a.pos==='GKP'));
 return {ids:[...starters,...bench].map(p=>p.id),captain:starters[9]?.id??null,vice:starters[5]?.id??null,chip:null};
}
export interface Stats { minutes: number; goals: number; assists: number; clean_sheet: boolean; yellow: number; red: number }
export function scorePlayer(pos: Position, stats: Stats): number { const appearance=stats.minutes>=60?2:stats.minutes>0?1:0; const goals={GKP:6,DEF:6,MID:5,FWD:4}[pos]*stats.goals; const clean=stats.clean_sheet&&stats.minutes>=60?{GKP:4,DEF:4,MID:1,FWD:0}[pos]:0; return appearance+goals+3*stats.assists+clean-stats.yellow-3*stats.red; }
export function scoreSquad(squad: Squad, points: Record<number, number>): number { const ids=squad.chip==='Bench Boost'?squad.ids:squad.ids.slice(0,11); return ids.reduce((sum,id)=>sum+(points[id]??0)*(id===squad.captain?(squad.chip==='Triple Captain'?3:2):1),0); }
