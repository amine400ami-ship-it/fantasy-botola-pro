import { describe, expect, it } from 'vitest';
import { discoverySquad, scorePlayer, scoreSquad, swapPlayers, validateSquad, validFormation, getSquadPlayers, type Player, type Stats } from './rules';
import rawPlayers from '../../../public/data/players.json';
const players=rawPlayers as Player[];
const base:Stats={minutes:90,goals:0,assists:0,clean_sheet:false,yellow:0,red:0};
describe('Squad rules',()=>{
 it('builds a valid 15-player discovery team with real players',()=>{const s=discoverySquad(players);expect(s.ids).toHaveLength(15);expect(validateSquad(s,players,true)).toBeNull();});
 it('rejects duplicates and unknown players',()=>{const s=discoverySquad(players);expect(validateSquad({...s,ids:[0,0]},players)).toContain('déjà');expect(validateSquad({...s,ids:[99999]},players)).toContain('introuvable');});
 it('enforces budget, club and positional quotas',()=>{const s=discoverySquad(players);expect(validateSquad(s,players.map(p=>({...p,price:10})))).toContain('budget');const four=players.filter(p=>p.team==='RCA'&&p.pos==='DEF').slice(0,4);expect(validateSquad({...s,ids:four.map(p=>p.id)},players)).toContain('3 joueurs');expect(validateSquad({...s,ids:players.filter(p=>p.pos==='GKP').slice(0,3).map(p=>p.id)},players)).toContain('2 gardiens');});
 it('swaps keepers and rejects illegal position swaps',()=>{const s=discoverySquad(players);const a=s.ids[0],b=s.ids[11],d=s.ids[12];if(a===undefined||b===undefined||d===undefined)throw Error('fixture');const result=swapPlayers(s,players,a,b);expect(typeof result).toBe('object');if(typeof result!=='string')expect(validateSquad(result,players,true)).toBeNull();expect(typeof swapPlayers(s,players,a,d)).toBe('string');});
 it('requires legal starting formations and distinct captains',()=>{const s=discoverySquad(players);expect(validFormation(getSquadPlayers(s,players).slice(0,11))).toBe(true);expect(validateSquad({...s,vice:s.captain},players,true)).toContain('distincts');});
});
describe('FPL scoring',()=>{
 it('awards appearance points at 0, 1, 59, 60 minutes',()=>{expect([0,1,59,60].map(minutes=>scorePlayer('FWD',{...base,minutes}))).toEqual([0,1,1,2]);});
 it('scores goals by position and clean sheets after 60 minutes',()=>{expect(['GKP','DEF','MID','FWD'].map(pos=>scorePlayer(pos as Player['pos'],{...base,goals:1,clean_sheet:true}))).toEqual([12,12,8,6]);expect(scorePlayer('DEF',{...base,minutes:59,clean_sheet:true})).toBe(1);});
 it('scores assists and card deductions',()=>{expect(scorePlayer('MID',{...base,assists:1,yellow:1,red:1})).toBe(1);});
 it('applies captain, triple captain and bench boost',()=>{const s=discoverySquad(players);const points=Object.fromEntries(s.ids.map(id=>[id,2]));expect(scoreSquad(s,points)).toBe(24);expect(scoreSquad({...s,chip:'Triple Captain'},points)).toBe(26);expect(scoreSquad({...s,chip:'Bench Boost'},points)).toBe(32);});
});
