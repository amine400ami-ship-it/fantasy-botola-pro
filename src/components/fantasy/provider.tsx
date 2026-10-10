import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { discoverySquad, type Player, type Team, type Kit, type Squad } from '@/lib/fantasy/rules';
interface FantasyState { players:Player[]; teams:Team[]; kits:Record<string,Kit>; squad:Squad; setSquad:(s:Squad)=>void; loading:boolean; error:string|null; reload:()=>void }
const FantasyContext=createContext<FantasyState|null>(null);
export function FantasyProvider({children}:{children:ReactNode}) {
 const [players,setPlayers]=useState<Player[]>([]),[teams,setTeams]=useState<Team[]>([]),[kits,setKits]=useState<Record<string,Kit>>({});
 const [squad,setSquad]=useState<Squad>({ids:[],captain:null,vice:null,chip:null});
 const [loading,setLoading]=useState(true),[error,setError]=useState<string|null>(null),[attempt,setAttempt]=useState(0);
 useEffect(()=>{ const controller=new AbortController(); setLoading(true); setError(null);
 async function load(){try {const fetchJson=async(name:string)=>{try {const response=await fetch(`https://botola-fantasy.netlify.app/${name}.json`,{signal:controller.signal});if(response.ok)return await response.json();}catch{if(controller.signal.aborted)throw new Error('Chargement annulé.');} const fallback=await fetch(`/data/${name}.json`,{signal:controller.signal});if(!fallback.ok)throw new Error('Le catalogue des joueurs est momentanément indisponible.');return fallback.json();};const [p,t,k]=await Promise.all([fetchJson('players'),fetchJson('teams'),fetchJson('kits')]);if(!Array.isArray(p)||!Array.isArray(t)||!k||typeof k!=='object')throw new Error('Les données reçues sont invalides.');setPlayers(p);setTeams(t);setKits(k);setSquad(discoverySquad(p));}catch(e){if(!controller.signal.aborted)setError('Impossible de charger les joueurs. Réessayez dans un instant.');}finally{if(!controller.signal.aborted)setLoading(false);}}
 void load();return()=>controller.abort();},[attempt]);
 return <FantasyContext.Provider value={{players,teams,kits,squad,setSquad,loading,error,reload:()=>setAttempt(n=>n+1)}}>{children}</FantasyContext.Provider>;
}
export function useFantasy(){const context=useContext(FantasyContext);if(!context)throw new Error('FantasyProvider manquant');return context;}
