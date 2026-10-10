import { Link, useRouterState } from '@tanstack/react-router';
import { ChevronDown, CircleHelp, Clock3, LogIn, Shield, Shirt, Trophy, ChartNoAxesColumnIncreasing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
export function Brand({compact=false}:{compact?:boolean}) {return <span className={`brand ${compact?'brand-compact':''}`}><span className="brand-mark"><Shield strokeWidth={1.7}/><span>F</span></span><span>fantasy<span className="brand-botola">botola<span className="brand-dot">.</span></span></span></span>;}
export function FantasyShell({children}:{children:ReactNode}) {
 const path=useRouterState({select:s=>s.location.pathname});const [help,setHelp]=useState(false);
 const links=[{to:'/' as const,label:'Équipe',icon:Shirt},{to:'/points' as const,label:'Points',icon:ChartNoAxesColumnIncreasing},{to:'/classement' as const,label:'Classement',icon:Trophy}];
 return <div className="fantasy-app"><header className="topbar"><div className="topbar-inner"><Link to="/" aria-label="Fantasy Botola, accueil"><Brand compact/></Link><nav className="desktop-nav" aria-label="Navigation principale">{links.map(({to,label,icon:Icon})=><Button key={to} asChild variant="nav" className={path===to?'is-active':''}><Link to={to}><Icon/>{label}</Link></Button>)}</nav><div className="topbar-actions"><span className="season-pill">SAISON 2026/27</span><Button variant="header" size="icon" aria-label="Règles du jeu" onClick={()=>setHelp(true)}><CircleHelp/></Button><Button variant="header" asChild className="login-link"><Link to="/auth"><LogIn/><span>Connexion</span></Link></Button></div></div></header>
 <div className="gameweek-strip"><div className="gameweek-inner"><div className="manager"><span className="manager-avatar">FB</span><span><strong>Mon équipe Botola</strong><span className="manager-sub">Mode découverte</span></span><ChevronDown size={14}/></div><div className="deadline"><span className="gameweek-pill">J1</span><span><span className="deadline-label">DATE LIMITE</span><strong><Clock3 size={12}/> À venir</strong></span></div></div></div>
 {children}
 <footer className="site-footer"><Brand compact/><span>Botola Pro · Saison 2026/27</span><span>Le football marocain. Votre équipe.</span></footer>
 <nav className="bottom-nav" aria-label="Navigation mobile">{links.map(({to,label,icon:Icon})=><Button key={to} asChild variant="tab" className={path===to?'is-active':''}><Link to={to}><Icon/><span>{label}</span></Link></Button>)}</nav>
 <Dialog open={help} onOpenChange={setHelp}><DialogContent><DialogTitle>Les règles Fantasy Botola</DialogTitle><DialogDescription>15 joueurs, un budget de 100,0 et au maximum 3 joueurs par club.</DialogDescription><div className="rules-list"><p>2 gardiens · 5 défenseurs · 5 milieux · 3 attaquants</p><p>11 titulaires : 1 gardien, 3 à 5 défenseurs, 2 à 5 milieux et 1 à 3 attaquants.</p><p>Votre capitaine double ses points. Le vice-capitaine prend le relais si le capitaine ne joue pas.</p><p>Les compositions sont verrouillées à la date limite de chaque journée.</p><p>Participation : 1–2 pts · But : 6/6/5/4 pts · Passe : 3 pts · Clean sheet : 4/4/1/0 pts · Jaune : −1 pt · Rouge : −3 pts.</p></div></DialogContent></Dialog>
 </div>;
}
