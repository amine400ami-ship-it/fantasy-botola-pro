import { useId } from 'react';
import type { Kit } from '@/lib/fantasy/rules';
export function KitShirt({ kit, team, large=false }: { kit?: Kit | undefined; team: string; large?: boolean }) {
 const id=useId().replace(/:/g,'');
 return <svg viewBox="0 0 100 105" className={large?'kit-shirt kit-large':'kit-shirt'} aria-label={`Maillot ${team}`} role="img">
 <defs><clipPath id={`body-${id}`}><path d="M28 12 40 6Q50 15 60 6L72 12 73 88Q50 94 27 88Z"/></clipPath><linearGradient id={`shade-${id}`} x1="0" x2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".18"/><stop offset=".45" stopColor="currentColor" stopOpacity="0"/><stop offset="1" stopColor="currentColor" stopOpacity=".18"/></linearGradient></defs>
 <path d="M28 12 12 20 3 44 20 51 28 34 27 88Q50 94 73 88L72 34 80 51 97 44 88 20 72 12 60 6Q50 15 40 6Z" fill={kit?.base??'var(--muted)'}/>
 <path d="M28 12 12 20 3 44 20 51 28 34ZM72 12 88 20 97 44 80 51 72 34Z" fill={kit?.sleeves??'var(--muted)'}/>
 <g clipPath={`url(#body-${id})`} fill={kit?.patternColor}>
 {kit?.pattern==='stripes'&&[32,48,64].map(x=><rect key={x} x={x} y="8" width="8" height="88"/>)}
 {kit?.pattern==='hoops'&&[28,46,64,82].map(y=><rect key={y} x="24" y={y} width="53" height="8"/>)}
 {kit?.pattern==='sash'&&<path d="M21 4 84 76 75 88 16 18Z"/>}
 </g>
 <path d="M40 6Q50 17 60 6L58 13Q50 23 42 13Z" fill={kit?.trim??'var(--muted-foreground)'}/>
 <path d="M4 42 20 48 19 52 2 46ZM80 48 96 42 98 46 81 52Z" fill={kit?.trim}/>
 <path d="M28 12 12 20 3 44 20 51 28 34 27 88Q50 94 73 88L72 34 80 51 97 44 88 20 72 12 60 6Q50 15 40 6Z" fill={`url(#shade-${id})`}/>
 <path d="M61 30h10v11l-5 4-5-4Z" fill={kit?.trim} opacity=".9"/><path d="m32 35 5-3 5 3-5 2Z" fill={kit?.trim}/>
 <text x="50" y="62" textAnchor="middle" fill={kit?.trim??'var(--foreground)'} fontSize="10" fontWeight="800" fontFamily="Arial">{team}</text>
 </svg>;
}
