import React, { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Thermometer, RotateCw, X, Globe, Sparkles } from 'lucide-react'


interface GoldSphereProps { className?: string }

/* ─── Procedural texture helpers ─── */
function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = w; c.height = h; return c
}

// Simple value noise
function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const h = (n: number, m: number) => {
    let s = Math.sin(n * 127.1 + m * 311.7) * 43758.5453; return s - Math.floor(s)
  }
  return (h(ix,iy)*(1-ux)+h(ix+1,iy)*ux)*(1-uy)+(h(ix,iy+1)*(1-ux)+h(ix+1,iy+1)*ux)*uy
}
function fbm(x: number, y: number, oct=5): number {
  let v=0, a=0.5, f=1
  for (let i=0;i<oct;i++){v+=a*valueNoise(x*f,y*f);a*=0.5;f*=2.1}
  return v
}

/* ─── Texture generators — realistic planet colors ─── */

// ☀️ Sun: fiery orange-yellow plasma with turbulent convection cells
function genSunTexture(): THREE.CanvasTexture {
  const W=512, H=256, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*5,y/H*5,4)
    const t2=fbm(x/W*10+3,y/H*10+3,3)
    const i=(y*W+x)*4
    // Core color: bright yellow-white -> orange -> deep orange
    d[i]=255
    d[i+1]=Math.round(Math.min(255, 160+t*80+t2*15))
    d[i+2]=Math.round(Math.max(0, 10+t*50-t2*20))
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  const tex=new THREE.CanvasTexture(cv); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; return tex
}

// 🌍 Earth: vivid deep blue oceans + lush green-brown continents + polar ice caps
function genEarthDayTexture(): THREE.CanvasTexture {
  const W=1024, H=512, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const lat=(y/H-0.5)*Math.PI
    const t=fbm(x/W*5+10,y/H*5+10,5)
    const i=(y*W+x)*4
    const pole=Math.abs(lat)>1.1 // polar ice
    if (pole) {
      const ice=Math.round(220+fbm(x/W*8,y/H*8,3)*35)
      d[i]=ice;d[i+1]=ice;d[i+2]=Math.min(255,ice+15);d[i+3]=255
    } else if (t>0.51) { // land
      const g=fbm(x/W*10+3,y/H*10+3,4)
      // Mix forest green, savanna tan, mountain brown
      if(g>0.6){ d[i]=Math.round(130+g*40);d[i+1]=Math.round(95+g*30);d[i+2]=Math.round(45+g*20) } // mountains
      else if(g>0.3){ d[i]=Math.round(34+g*30);d[i+1]=Math.round(100+g*40);d[i+2]=Math.round(22+g*15) } // forest
      else { d[i]=Math.round(160+g*50);d[i+1]=Math.round(140+g*35);d[i+2]=Math.round(60+g*20) } // desert/savanna
    } else { // ocean
      const g2=fbm(x/W*4,y/H*4,3)
      d[i]=Math.round(8+g2*20);d[i+1]=Math.round(60+g2*50);d[i+2]=Math.round(160+g2*60)
    }
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  const tex=new THREE.CanvasTexture(cv); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; return tex
}

function genEarthNightTexture(): THREE.CanvasTexture {
  const W=1024, H=512, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*5+10,y/H*5+10,5) // same land mask
    const i=(y*W+x)*4
    if (t>0.51) { // only on land
      const city=fbm(x/W*18,y/H*18,3)
      if (city>0.62) {
        const bright=Math.round((city-0.62)*500)
        d[i]=Math.min(255,255); d[i+1]=Math.min(255,200+bright); d[i+2]=Math.min(255,80)
        d[i+3]=Math.round(Math.min(255,(city-0.62)*900))
      } else { d[i]=0;d[i+1]=0;d[i+2]=0;d[i+3]=0 }
    } else { d[i]=0;d[i+1]=0;d[i+2]=0;d[i+3]=0 }
  }
  c.putImageData(id,0,0)
  const tex=new THREE.CanvasTexture(cv); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; return tex
}

function genEarthCloudsTexture(): THREE.CanvasTexture {
  const W=1024, H=512, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*6+20,y/H*6+20,4), alpha=Math.max(0,(t-0.44)*2.5)
    const i=(y*W+x)*4
    d[i]=255;d[i+1]=255;d[i+2]=255;d[i+3]=Math.round(Math.min(255,alpha*255))
  }
  c.putImageData(id,0,0)
  const tex=new THREE.CanvasTexture(cv); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; return tex
}

function genEarthBumpTexture(): THREE.CanvasTexture {
  const W=1024, H=512, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*5+10,y/H*5+10,5)
    const bump=t>0.51?Math.round(t*200):0
    const i=(y*W+x)*4; d[i]=bump;d[i+1]=bump;d[i+2]=bump;d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

// 🌕 Moon: silver-gray with dark maria (volcanic plains) and bright crater rims
function genMoonTexture(): THREE.CanvasTexture {
  const W=512, H=256, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*6,y/H*6,4)
    const t2=fbm(x/W*14,y/H*14,3) // fine crater detail
    const maria=fbm(x/W*2.5,y/H*2.5,3) // large dark regions
    const i=(y*W+x)*4
    // Dark maria regions at low noise, bright highlands at high
    const base=maria>0.52
      ? Math.round(80+t*30+t2*15) // highlands: brighter gray
      : Math.round(40+t*25+t2*10) // maria: dark basalt
    d[i]=base+5;d[i+1]=base+3;d[i+2]=base;d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

// 🔴 Mars: vivid rust-red iron oxide surface, polar ice, dark highlands
function genMarsTexture(): THREE.CanvasTexture {
  const W=512, H=256, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const lat=(y/H-0.5)*Math.PI
    const t=fbm(x/W*4,y/H*4,5)
    const t2=fbm(x/W*9,y/H*9,3)
    const i=(y*W+x)*4
    const pole=Math.abs(lat)>1.25
    if(pole){
      const ice=Math.round(210+t2*40)
      d[i]=ice;d[i+1]=Math.round(200+t2*35);d[i+2]=Math.round(195+t2*30);d[i+3]=255
    } else {
      // Rust red base with variation: bright orange highlands, dark brown lowlands
      d[i]=Math.round(185+t*55)    // R: 185-240 vivid orange-red
      d[i+1]=Math.round(55+t*45)  // G: 55-100 earthy orange
      d[i+2]=Math.round(18+t2*22) // B: minimal, keeps it red
    }
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

// 🟠 Jupiter: rich orange-tan-brown banded atmosphere with Great Red Spot
function genJupiterTexture(): THREE.CanvasTexture {
  const W=512, H=256, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  // Band color palette: alternating light tan / dark orange-brown / white zones
  const bands=[
    [232,190,140],[180,110,60],[235,205,160],[155,88,42],
    [228,185,130],[200,130,70],[240,215,175],[170,100,50],
    [220,175,120],[185,115,60]
  ]
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const lat=y/H
    const t=fbm(x/W*8,y/H*3,4)
    const t2=fbm(x/W*4+5,y/H*8+5,3)
    // Wavy band edge
    const bandY=(lat*10+t*0.25)%1
    const bi=Math.floor(bandY*bands.length)%bands.length
    const bc=bands[bi]
    const i=(y*W+x)*4
    // Great Red Spot: oval near y≈0.65, x≈0.55
    const gx=(x/W-0.55)*4, gy=(y/H-0.65)*8
    const grs=Math.exp(-(gx*gx+gy*gy))
    d[i]=Math.round(Math.min(255, bc[0]+t2*18 + grs*60))
    d[i+1]=Math.round(Math.max(0, bc[1]+t2*12 - grs*40))
    d[i+2]=Math.round(Math.max(0, bc[2]+t2*8  - grs*30))
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

// 🪐 Saturn: pale golden-cream bands, warm honey tones
function genSaturnTexture(): THREE.CanvasTexture {
  const W=512, H=256, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const lat=y/H
    const t=fbm(x/W*5,y/H*2,3)
    const t2=fbm(x/W*3+2,y/H*6,3)
    // Subtle horizontal bands: pale gold / warm cream / light tan
    const bandV=Math.sin(lat*Math.PI*14+t*0.3)*0.5+0.5
    const i=(y*W+x)*4
    d[i]=Math.round(210+bandV*35+t2*10)         // R: 210-255 warm
    d[i+1]=Math.round(175+bandV*28+t2*8)        // G: 175-215 golden
    d[i+2]=Math.round(90+bandV*18+t2*6)         // B: 90-115 warm honey
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

function genSaturnRingTexture(): THREE.CanvasTexture {
  const W=256, H=1, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const grd=c.createLinearGradient(0,0,W,0)
  grd.addColorStop(0,'rgba(0,0,0,0)')
  grd.addColorStop(0.15,'rgba(195,158,80,0.18)')
  grd.addColorStop(0.28,'rgba(215,178,95,0.55)')
  grd.addColorStop(0.40,'rgba(195,158,80,0.30)')
  grd.addColorStop(0.50,'rgba(170,135,65,0.70)')
  grd.addColorStop(0.62,'rgba(195,158,80,0.35)')
  grd.addColorStop(0.75,'rgba(215,178,95,0.58)')
  grd.addColorStop(0.88,'rgba(175,140,68,0.22)')
  grd.addColorStop(1,'rgba(0,0,0,0)')
  c.fillStyle=grd; c.fillRect(0,0,W,H)
  const tex=new THREE.CanvasTexture(cv); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; return tex
}

// 🩵 Uranus: bright blue-green mint (methane ice giant)
function genUranusTexture(): THREE.CanvasTexture {
  const W=256, H=128, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const lat=y/H
    const t=fbm(x/W*3,y/H*4,3)
    const bandV=Math.sin(lat*Math.PI*8)*0.06
    const i=(y*W+x)*4
    d[i]=Math.round(65+bandV*30+t*20)     // R: low — gives cyan
    d[i+1]=Math.round(210+bandV*20+t*25)  // G: high — teal-green
    d[i+2]=Math.round(225+bandV*15+t*20)  // B: very high — icy blue
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

// 💙 Neptune: deep vivid cobalt blue (methane + unknown compounds)
function genNeptuneTexture(): THREE.CanvasTexture {
  const W=256, H=128, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*5,y/H*5,4)
    const t2=fbm(x/W*3+1,y/H*3+1,3)
    const bandV=Math.sin(y/H*Math.PI*10+t*0.4)*0.5+0.5
    const i=(y*W+x)*4
    // Deep royal blue with subtle darker storm bands
    d[i]=Math.round(18+bandV*20+t2*12)    // R: very low
    d[i+1]=Math.round(50+bandV*35+t2*20)  // G: medium-low
    d[i+2]=Math.round(210+bandV*40+t2*30) // B: vivid deep blue
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

// ⚫ Mercury: dark warm gray with cratered highlands and bright ray craters
function genMercuryTexture(): THREE.CanvasTexture {
  const W=256, H=128, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*8,y/H*8,4)
    const t2=fbm(x/W*18,y/H*18,3) // fine crater texture
    const plain=fbm(x/W*3,y/H*3,3) // smooth plains vs highland
    const i=(y*W+x)*4
    const base=plain>0.52
      ? Math.round(100+t*50+t2*20) // bright cratered highlands
      : Math.round(55+t*35+t2*15) // dark smooth plains (like Caloris)
    d[i]=Math.round(base*1.05);d[i+1]=Math.round(base*0.98);d[i+2]=Math.round(base*0.90);d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

// 🟡 Venus: thick cream-yellow sulfuric acid cloud deck with swirling patterns
function genVenusTexture(): THREE.CanvasTexture {
  const W=256, H=128, cv=makeCanvas(W,H), c=cv.getContext('2d')!
  const id=c.createImageData(W,H), d=id.data
  for (let y=0;y<H;y++) for (let x=0;x<W;x++) {
    const t=fbm(x/W*4,y/H*4,4)
    const t2=fbm(x/W*8+2,y/H*8+2,3)
    // Swirling horizontal cloud bands: creamy yellow to warm orange
    const bandV=Math.sin(y/H*Math.PI*10+t*0.5)*0.5+0.5
    const i=(y*W+x)*4
    d[i]=Math.round(230+bandV*18+t2*8)   // R: bright warm
    d[i+1]=Math.round(200+bandV*15+t2*6) // G: golden yellow
    d[i+2]=Math.round(100+bandV*25+t2*10)// B: lower — gives the golden tone
    d[i+3]=255
  }
  c.putImageData(id,0,0)
  return new THREE.CanvasTexture(cv)
}

/* ─── Planet info ─── */
const PLANET_INFO: Record<string, {title:string,subtitle:string,desc:string,temp:string,period:string,index:string,velocity:string,distance:string}> = {
  sun:     { title:'The Sun',   subtitle:'G-type Yellow Dwarf',        desc:'The heart of our solar system — a nearly perfect plasma sphere heated by nuclear fusion in its core, radiating energy across 8 planets.',                     temp:'5,500 °C', period:'—',        index:'00', velocity:'220 km/s', distance:'0 AU' },
  mercury: { title:'Mercury',   subtitle:'Terrestrial Planet',          desc:'The smallest planet, closest to the Sun. No atmosphere means extreme temperature swings between searing day and freezing night.',                             temp:'-173 → 427 °C', period:'88 days', index:'01', velocity:'47.4 km/s', distance:'0.39 AU' },
  venus:   { title:'Venus',     subtitle:'Greenhouse World',            desc:'Earth\'s toxic twin. A runaway greenhouse effect keeps the surface hotter than Mercury, wrapped in sulfuric acid clouds.',                          temp:'462 °C',       period:'225 days', index:'02', velocity:'35.0 km/s', distance:'0.72 AU' },
  earth:   { title:'Earth',     subtitle:'The Blue Oasis',              desc:'Our living world. The only known planet harboring life — vast oceans, tectonic plates, a breathable atmosphere, and glowing city lights at night.',           temp:'15 °C',        period:'365 days', index:'03', velocity:'29.8 km/s', distance:'1.00 AU' },
  moon:    { title:'The Moon',  subtitle:'Earth\'s Satellite',          desc:'Tidally locked so one face always watches Earth. Its gravity controls our tides and has stabilized Earth\'s axial tilt for billions of years.',              temp:'-130 → 120 °C',period:'27.3 days', index:'03A', velocity:'1.0 km/s', distance:'384k km' },
  mars:    { title:'Mars',      subtitle:'The Rusty Desert',            desc:'Iron-oxide dust gives Mars its red hue. It hosts Olympus Mons, the tallest volcano in the solar system, and a thin carbon-dioxide atmosphere.',            temp:'-62 °C',       period:'687 days', index:'04', velocity:'24.1 km/s', distance:'1.52 AU' },
  jupiter: { title:'Jupiter',   subtitle:'Gas Giant',                   desc:'More than twice the mass of all other planets combined. Iconic cloud bands and the Great Red Spot — a storm raging for centuries.',                         temp:'-108 °C',      period:'12 years', index:'05', velocity:'13.1 km/s', distance:'5.20 AU' },
  saturn:  { title:'Saturn',    subtitle:'Ringed Jewel',                desc:'Its spectacular rings are made of billions of ice chunks ranging from dust grains to house-sized boulders, spanning 282,000 km across.',                    temp:'-139 °C',      period:'29 years', index:'06', velocity:'9.7 km/s', distance:'9.58 AU' },
  uranus:  { title:'Uranus',    subtitle:'Ice Giant',                   desc:'Rotates on a 98° tilt — essentially rolling on its side. Its pale cyan colour comes from methane absorbing red wavelengths in the upper atmosphere.',       temp:'-197 °C',      period:'84 years', index:'07', velocity:'6.8 km/s', distance:'19.2 AU' },
  neptune: { title:'Neptune',   subtitle:'Windy Blue World',            desc:'The most distant planet, with supersonic winds reaching 2,100 km/h. Its deep blue is also caused by methane and unknown atmospheric compounds.',           temp:'-201 °C',      period:'165 years', index:'08', velocity:'5.4 km/s', distance:'30.1 AU' },
}

const GoldSphere: React.FC<GoldSphereProps> = ({ className='' }) => {
  const mountRef   = useRef<HTMLDivElement>(null)
  const rendererRef= useRef<THREE.WebGLRenderer|null>(null)
  const sceneRef   = useRef<THREE.Scene|null>(null)
  const cameraRef  = useRef<THREE.PerspectiveCamera|null>(null)
  const frameRef   = useRef<number>(0)
  const clockRef   = useRef(new THREE.Clock())
  const audioCtxRef= useRef<AudioContext|null>(null)
  const oscRef     = useRef<OscillatorNode|null>(null)
  const gainRef    = useRef<GainNode|null>(null)

  const [hovered,  setHovered ] = useState<string|null>(null)
  const [selected, setSelected] = useState<string|null>(null)
  const [sound,    setSound   ] = useState(false)

  /* ─── Stable ref snapshots ─── */
  const hoveredRef  = useRef<string|null>(null)
  const selectedRef = useRef<string|null>(null)
  hoveredRef.current  = hovered
  selectedRef.current = selected

  /* ─── Sound helpers ─── */
  const playPing = useCallback((freq=440)=>{
    const ac=audioCtxRef.current; if(!ac) return
    const play = () => {
      const o=ac.createOscillator(), g=ac.createGain()
      o.type='sine'; o.frequency.setValueAtTime(freq,ac.currentTime)
      o.frequency.exponentialRampToValueAtTime(freq*0.45,ac.currentTime+0.4)
      g.gain.setValueAtTime(0.13,ac.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.4)
      o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime+0.4)
    }
    if(ac.state==='suspended') {
      ac.resume().then(play)
    } else {
      play()
    }
  },[])

  const toggleSound = useCallback(()=>{
    if(!sound){
      try {
        const AC=window.AudioContext||(window as any).webkitAudioContext
        const ac=new AC()
        audioCtxRef.current=ac
        
        const startHum = () => {
          const o=ac.createOscillator(), filt=ac.createBiquadFilter(), g=ac.createGain()
          o.type='triangle'; o.frequency.setValueAtTime(55,ac.currentTime)
          filt.type='lowpass'; filt.frequency.setValueAtTime(120,ac.currentTime)
          g.gain.setValueAtTime(0,ac.currentTime)
          g.gain.linearRampToValueAtTime(0.22,ac.currentTime+1.5)
          o.connect(filt); filt.connect(g); g.connect(ac.destination); o.start()
          oscRef.current=o; gainRef.current=g
          setSound(true); playPing(520)
        }

        if (ac.state === 'suspended') {
          ac.resume().then(startHum)
        } else {
          startHum()
        }
      } catch(e){ console.warn('AudioContext failed',e) }
    } else {
      const g=gainRef.current,ac=audioCtxRef.current
      if(g&&ac){ g.gain.linearRampToValueAtTime(0,ac.currentTime+0.5); setTimeout(()=>{oscRef.current?.stop();ac.close();oscRef.current=null;audioCtxRef.current=null;gainRef.current=null},600) }
      setSound(false)
    }
  },[sound,playPing])

  /* ─── Main Three.js setup ─── */
  useEffect(()=>{
    const mount=mountRef.current; if(!mount) return
    const W=mount.clientWidth, H=mount.clientHeight

    /* Renderer */
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'})
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    renderer.setSize(W,H)
    renderer.shadowMap.enabled=true
    renderer.shadowMap.type=THREE.PCFSoftShadowMap
    renderer.toneMapping=THREE.LinearToneMapping
    renderer.toneMappingExposure=1.4
    renderer.setClearColor(0x000000,0)
    mount.appendChild(renderer.domElement)
    rendererRef.current=renderer

    /* Scene */
    const scene=new THREE.Scene()
    sceneRef.current=scene

    /* Camera */
    const camera=new THREE.PerspectiveCamera(55,W/H,0.1,5000)
    camera.position.set(0,30,180)
    cameraRef.current=camera

    /* ─── Lights ─── */
    // Sun point light — main source of illumination
    const sunLight=new THREE.PointLight(0xfff5c8,12,3000,1.0)
    sunLight.position.set(0,0,0); sunLight.castShadow=true
    sunLight.shadow.mapSize.set(1024,1024)
    scene.add(sunLight)

    // Bright ambient so dark sides still show color (not pitch black)
    const ambient=new THREE.AmbientLight(0xffffff,2.2)
    scene.add(ambient)

    // Hemisphere light: sky color from above, ground fill from below
    const hemi=new THREE.HemisphereLight(0x8ab4d4,0x2a3a5c,1.2)
    scene.add(hemi)

    // Rim fill from opposite side
    const rimLight=new THREE.DirectionalLight(0x4488bb,0.8)
    rimLight.position.set(-200,80,-200)
    scene.add(rimLight)

    /* ─── Stars ─── */
    const starGeo=new THREE.BufferGeometry()
    const starPos: number[]=[]
    for(let i=0;i<3500;i++){
      const phi=Math.acos(2*Math.random()-1), theta=2*Math.PI*Math.random(), r=400+Math.random()*600
      starPos.push(r*Math.sin(phi)*Math.cos(theta), r*Math.sin(phi)*Math.sin(theta), r*Math.cos(phi))
    }
    starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPos,3))
    const starMat=new THREE.PointsMaterial({size:0.9,color:0xffffff,sizeAttenuation:true,transparent:true,opacity:0.85})
    scene.add(new THREE.Points(starGeo,starMat))

    // Colored bright stars
    const brightColors=[0xadd8ff,0xffddbb,0xffffff,0xbbccff,0xffccaa]
    const brightGeo=new THREE.BufferGeometry()
    const brightPos: number[]=[]
    for(let i=0;i<120;i++){
      const phi=Math.acos(2*Math.random()-1), theta=2*Math.PI*Math.random(), r=500+Math.random()*400
      brightPos.push(r*Math.sin(phi)*Math.cos(theta), r*Math.sin(phi)*Math.sin(theta), r*Math.cos(phi))
    }
    brightGeo.setAttribute('position',new THREE.Float32BufferAttribute(brightPos,3))
    const brightMat=new THREE.PointsMaterial({size:2.2,vertexColors:false,sizeAttenuation:true,transparent:true,opacity:0.95})
    brightMat.color=new THREE.Color(brightColors[Math.floor(Math.random()*brightColors.length)])
    scene.add(new THREE.Points(brightGeo,brightMat))

    /* ─── Sun ─── */
    const sunGeo=new THREE.SphereGeometry(8,64,64)
    const sunMat=new THREE.MeshStandardMaterial({
      map:genSunTexture(), emissive:new THREE.Color(0xff8c10), emissiveIntensity:1.8,
      emissiveMap:genSunTexture(), roughness:1, metalness:0
    })
    const sun=new THREE.Mesh(sunGeo,sunMat); sun.castShadow=false; sun.name='sun'
    scene.add(sun)

    // Sun corona glow sprite
    const coronaCanvas=makeCanvas(256,256)
    const cc=coronaCanvas.getContext('2d')!
    const cGrd=cc.createRadialGradient(128,128,0,128,128,128)
    cGrd.addColorStop(0,'rgba(255,220,80,0.9)'); cGrd.addColorStop(0.25,'rgba(255,160,30,0.4)')
    cGrd.addColorStop(0.5,'rgba(255,100,10,0.15)'); cGrd.addColorStop(1,'rgba(0,0,0,0)')
    cc.fillStyle=cGrd; cc.fillRect(0,0,256,256)
    const coronaTex=new THREE.CanvasTexture(coronaCanvas)
    const coronaMat=new THREE.SpriteMaterial({map:coronaTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})
    const corona=new THREE.Sprite(coronaMat); corona.scale.set(60,60,1)
    sun.add(corona)

    /* ─── Shared sphere geometry ─── */
    const geo32=new THREE.SphereGeometry(1,64,64)
    const geo16=new THREE.SphereGeometry(1,48,48)

    /* ─── Build planet helper ─── */
    type PlanetCfg = {
      name: string; radius: number; orbitRadius: number; orbitSpeed: number;
      tilt: number; spinSpeed: number; initAngle: number
      mat: THREE.Material | THREE.Material[]
      hasAtmo?: boolean; atmoColor?: THREE.Color; atmoOpacity?: number
      hasClouds?: boolean; cloudsTex?: THREE.Texture
      hasRings?: boolean
      hasNightLayer?: boolean
    }

    // Shooting star group
    const shooters: {mesh:THREE.Mesh;life:number;maxLife:number;vel:THREE.Vector3}[]=[]
    let nextShoot=3

    /* ─── Orbit lines ─── */
    const makeOrbitLine=(r:number)=>{
      const pts: THREE.Vector3[]=[]
      for(let i=0;i<=128;i++) pts.push(new THREE.Vector3(Math.cos(i/128*Math.PI*2)*r,0,Math.sin(i/128*Math.PI*2)*r))
      const g=new THREE.BufferGeometry().setFromPoints(pts)
      const m=new THREE.LineBasicMaterial({color:0x3e8fa8,transparent:true,opacity:0.06,depthWrite:false})
      return new THREE.Line(g,m)
    }

    /* ─── Atmosphere helper ─── */
    const makeAtmo=(radius:number,color:THREE.Color,opacity:number)=>{
      const geo=new THREE.SphereGeometry(radius*1.06,32,32)
      const mat=new THREE.MeshPhongMaterial({color,transparent:true,opacity,side:THREE.FrontSide,depthWrite:false,blending:THREE.AdditiveBlending})
      return new THREE.Mesh(geo,mat)
    }

    /* ─── Saturn rings helper ─── */
    const makeSaturnRings=(innerR:number,outerR:number)=>{
      const ringGeo=new THREE.RingGeometry(innerR,outerR,128)
      const pos=ringGeo.attributes.position
      const uv=ringGeo.attributes.uv
      for(let i=0;i<pos.count;i++){
        const v=new THREE.Vector3().fromBufferAttribute(pos,i)
        const len=v.length()
        uv.setXY(i,(len-innerR)/(outerR-innerR),0)
      }
      const ringMat=new THREE.MeshBasicMaterial({
        map:genSaturnRingTexture(), transparent:true, side:THREE.DoubleSide, depthWrite:false,
        blending:THREE.NormalBlending,opacity:0.85
      })
      const rings=new THREE.Mesh(ringGeo,ringMat)
      rings.rotation.x=Math.PI/2
      return rings
    }

    /* ─── Create all planets ─── */
    const planetMeshes: {name:string;pivot:THREE.Object3D;body:THREE.Mesh;orbitSpeed:number;spinSpeed:number;clouds?:THREE.Mesh;nightLayer?:THREE.Mesh}[]=[]

    const addPlanet=(cfg:PlanetCfg)=>{
      const pivot=new THREE.Object3D(); pivot.rotation.y=cfg.initAngle
      pivot.rotation.z=cfg.tilt*(Math.PI/180)
      scene.add(pivot)

      const bodyGeo= cfg.radius>=4 ? geo32.clone() : geo16.clone()
      bodyGeo.scale(cfg.radius,cfg.radius,cfg.radius)
      const body=new THREE.Mesh(bodyGeo,cfg.mat)
      body.position.x=cfg.orbitRadius
      body.castShadow=true; body.receiveShadow=true
      body.name=cfg.name
      pivot.add(body)

      // Orbit line
      scene.add(makeOrbitLine(cfg.orbitRadius))

      // Atmosphere
      if(cfg.hasAtmo && cfg.atmoColor){
        const atmo=makeAtmo(cfg.radius,cfg.atmoColor,cfg.atmoOpacity??0.18)
        atmo.position.x=cfg.orbitRadius; pivot.add(atmo)
      }

      // Cloud layer
      let cloudsMesh: THREE.Mesh|undefined
      if(cfg.hasClouds && cfg.cloudsTex){
        const cloudGeo=new THREE.SphereGeometry(cfg.radius*1.02,48,48)
        const cloudMat=new THREE.MeshPhongMaterial({map:cfg.cloudsTex,transparent:true,opacity:0.75,depthWrite:false,side:THREE.FrontSide})
        cloudsMesh=new THREE.Mesh(cloudGeo,cloudMat)
        cloudsMesh.position.x=cfg.orbitRadius; pivot.add(cloudsMesh)
      }

      // Night city lights (Earth only)
      let nightMesh: THREE.Mesh|undefined
      if(cfg.hasNightLayer){
        const nightGeo=new THREE.SphereGeometry(cfg.radius*1.001,64,64)
        const nightMat=new THREE.MeshBasicMaterial({
          map:genEarthNightTexture(), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false, opacity:1.0
        })
        nightMesh=new THREE.Mesh(nightGeo,nightMat)
        nightMesh.position.x=cfg.orbitRadius; pivot.add(nightMesh)
      }

      // Saturn rings
      if(cfg.hasRings){
        const rings=makeSaturnRings(cfg.radius*1.35,cfg.radius*2.4)
        rings.position.x=cfg.orbitRadius; rings.rotation.x=Math.PI/2.2
        pivot.add(rings)
      }

      planetMeshes.push({name:cfg.name,pivot,body,orbitSpeed:cfg.orbitSpeed,spinSpeed:cfg.spinSpeed,clouds:cloudsMesh,nightLayer:nightMesh})
    }

    // Mercury
    addPlanet({name:'mercury',radius:1.2,orbitRadius:22,orbitSpeed:0.35,tilt:0.03,spinSpeed:0.3,initAngle:0.8,
      mat:new THREE.MeshPhongMaterial({map:genMercuryTexture(),shininess:5,specular:new THREE.Color(0x222222)})})

    // Venus
    addPlanet({name:'venus',radius:2.2,orbitRadius:35,orbitSpeed:0.22,tilt:177,spinSpeed:0.08,initAngle:2.8,
      mat:new THREE.MeshPhongMaterial({map:genVenusTexture(),shininess:18,specular:new THREE.Color(0x554422)}),
      hasAtmo:true,atmoColor:new THREE.Color(0xf0c878),atmoOpacity:0.28})

    // Earth
    addPlanet({name:'earth',radius:2.5,orbitRadius:50,orbitSpeed:0.16,tilt:23.4,spinSpeed:0.5,initAngle:4.5,
      mat:new THREE.MeshPhongMaterial({map:genEarthDayTexture(),bumpMap:genEarthBumpTexture(),bumpScale:0.5,specular:new THREE.Color(0x5588aa),shininess:28}),
      hasAtmo:true,atmoColor:new THREE.Color(0x3e8fa8),atmoOpacity:0.20,
      hasClouds:true,cloudsTex:genEarthCloudsTexture(),
      hasNightLayer:true})

    // Moon
    addPlanet({name:'moon',radius:0.7,orbitRadius:56.5,orbitSpeed:1.28,tilt:5.1,spinSpeed:0.04,initAngle:1.0,
      mat:new THREE.MeshPhongMaterial({map:genMoonTexture(),shininess:2,specular:new THREE.Color(0x111111)})})

    // Mars
    addPlanet({name:'mars',radius:1.6,orbitRadius:72,orbitSpeed:0.12,tilt:25,spinSpeed:0.42,initAngle:1.0,
      mat:new THREE.MeshPhongMaterial({map:genMarsTexture(),shininess:8,specular:new THREE.Color(0x331100)}),
      hasAtmo:true,atmoColor:new THREE.Color(0xc84820),atmoOpacity:0.10})

    // Asteroid belt (instanced for performance)
    const BELT=350
    const beltGeo=new THREE.SphereGeometry(0.08,4,4)
    const beltMat=new THREE.MeshStandardMaterial({color:0x8a7860,roughness:1})
    const beltInst=new THREE.InstancedMesh(beltGeo,beltMat,BELT)
    beltInst.castShadow=false; beltInst.receiveShadow=false
    const dummy=new THREE.Object3D()
    const beltData=Array.from({length:BELT},()=>({angle:Math.random()*Math.PI*2,r:85+Math.random()*16,y:(Math.random()-0.5)*3,s:0.002+Math.random()*0.004}))
    beltData.forEach((b,idx)=>{ dummy.position.set(Math.cos(b.angle)*b.r,b.y,Math.sin(b.angle)*b.r); dummy.updateMatrix(); beltInst.setMatrixAt(idx,dummy.matrix) })
    beltInst.instanceMatrix.needsUpdate=true
    scene.add(beltInst)

    // Jupiter
    addPlanet({name:'jupiter',radius:5.5,orbitRadius:110,orbitSpeed:0.075,tilt:3.1,spinSpeed:1.2,initAngle:3.2,
      mat:new THREE.MeshPhongMaterial({map:genJupiterTexture(),shininess:12,specular:new THREE.Color(0x443322)})})

    // Saturn
    addPlanet({name:'saturn',radius:4.8,orbitRadius:145,orbitSpeed:0.05,tilt:26.7,spinSpeed:0.9,initAngle:5.5,
      mat:new THREE.MeshPhongMaterial({map:genSaturnTexture(),shininess:10,specular:new THREE.Color(0x443322)}),
      hasRings:true})

    // Uranus
    addPlanet({name:'uranus',radius:3.5,orbitRadius:178,orbitSpeed:0.035,tilt:98,spinSpeed:0.6,initAngle:0.5,
      mat:new THREE.MeshPhongMaterial({map:genUranusTexture(),shininess:22,specular:new THREE.Color(0x88ddee)})})

    // Neptune
    addPlanet({name:'neptune',radius:3.2,orbitRadius:210,orbitSpeed:0.024,tilt:28,spinSpeed:0.55,initAngle:2.3,
      mat:new THREE.MeshPhongMaterial({map:genNeptuneTexture(),shininess:20,specular:new THREE.Color(0x2244aa)}),
      hasAtmo:true,atmoColor:new THREE.Color(0x2255ee),atmoOpacity:0.18})

    /* ─── Raycaster for hover/click ─── */
    const raycaster=new THREE.Raycaster()
    const mouse=new THREE.Vector2()

    const getPickables=()=>[sun,...planetMeshes.map(p=>p.body)]

    const onMouseMove=(e:MouseEvent)=>{
      const rect=renderer.domElement.getBoundingClientRect()
      mouse.x=((e.clientX-rect.left)/rect.width)*2-1
      mouse.y=-((e.clientY-rect.top)/rect.height)*2+1
      raycaster.setFromCamera(mouse,camera)
      const hits=raycaster.intersectObjects(getPickables())
      setHovered(hits.length>0?hits[0].object.name:null)
      renderer.domElement.style.cursor=hits.length>0?'pointer':'default'
    }

    const onClick=(e:PointerEvent)=>{
      // Resume context immediately on user pointer down to satisfy mobile browsers
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      const rect=renderer.domElement.getBoundingClientRect()
      mouse.x=((e.clientX-rect.left)/rect.width)*2-1
      mouse.y=-((e.clientY-rect.top)/rect.height)*2+1
      raycaster.setFromCamera(mouse,camera)
      const hits=raycaster.intersectObjects(getPickables())
      if(hits.length>0){
        const name=hits[0].object.name
        setSelected(prev=>{
          if(prev===name){
            selectedRef.current=null; return null
          }
          selectedRef.current=name
          const info=PLANET_INFO[name]; if(info){
            const freqMap: Record<string,number>={sun:110,mercury:220,venus:280,earth:330,moon:380,mars:440,jupiter:520,saturn:580,uranus:660,neptune:720}
            playPing(freqMap[name]??440)
          }
          return name
        })
      } else {
        setSelected(null); selectedRef.current=null
      }
    }

    renderer.domElement.addEventListener('mousemove',onMouseMove)
    renderer.domElement.addEventListener('pointerdown',onClick)

    /* ─── Camera smooth target ─── */
    let camTarget=new THREE.Vector3(0,30,180)
    let camLookTarget=new THREE.Vector3(0,0,0)
    const camCurrent=new THREE.Vector3(0,30,180)
    const camLookCurrent=new THREE.Vector3(0,0,0)
    let baseRotation=0

    /* ─── Animation loop ─── */
    const animate=()=>{
      frameRef.current=requestAnimationFrame(animate)
      const dt=clockRef.current.getDelta()
      const t=clockRef.current.getElapsedTime()

      // Animate Sun
      sun.rotation.y+=dt*0.04

      // Animate belt
      beltData.forEach((b,idx)=>{
        b.angle+=b.s*dt
        dummy.position.set(Math.cos(b.angle)*b.r,b.y,Math.sin(b.angle)*b.r)
        const sc=0.6+Math.sin(b.angle*3)*0.2
        dummy.scale.set(sc,sc,sc); dummy.updateMatrix()
        beltInst.setMatrixAt(idx,dummy.matrix)
      })
      beltInst.instanceMatrix.needsUpdate=true

      // Animate planets
      planetMeshes.forEach(p=>{
        p.pivot.rotation.y+=p.orbitSpeed*dt
        p.body.rotation.y+=p.spinSpeed*dt
        if(p.clouds) p.clouds.rotation.y+=p.spinSpeed*dt*1.08
        // Night layer: slowly fade based on camera angle (simulated)
        if(p.nightLayer){
          // Night side opacity increases when facing away from sun light
          p.nightLayer.rotation.y+=p.spinSpeed*dt
        }
      })

      // Sun corona shimmer
      corona.scale.set(60+Math.sin(t*1.7)*3, 60+Math.cos(t*2.1)*3, 1)

      // Sun light pulse
      sunLight.intensity=6+Math.sin(t*0.8)*0.4

      // Shooting stars
      nextShoot-=dt
      if(nextShoot<=0){
        const shootGeo=new THREE.SphereGeometry(0.12,4,4)
        const shootMat=new THREE.MeshBasicMaterial({color:0xffffff})
        const sm=new THREE.Mesh(shootGeo,shootMat)
        const phi=Math.random()*Math.PI*2, theta=Math.random()*Math.PI
        const R=280
        sm.position.set(R*Math.sin(theta)*Math.cos(phi),R*Math.cos(theta)*0.4,R*Math.sin(theta)*Math.sin(phi))
        const vel=new THREE.Vector3(-Math.cos(phi)*180,-Math.cos(theta)*60,-Math.sin(phi)*180)
        scene.add(sm)
        shooters.push({mesh:sm,life:0,maxLife:0.4+Math.random()*0.3,vel})
        nextShoot=4+Math.random()*8
      }
      for(let i=shooters.length-1;i>=0;i--){
        const s=shooters[i]; s.life+=dt
        if(s.life>s.maxLife){ scene.remove(s.mesh); s.mesh.geometry.dispose(); shooters.splice(i,1); continue }
        s.mesh.position.addScaledVector(s.vel,dt)
        const prog=1-s.life/s.maxLife;(s.mesh.material as THREE.MeshBasicMaterial).opacity=prog
        ;(s.mesh.material as THREE.MeshBasicMaterial).transparent=true
        s.mesh.scale.set(1+prog*2,1+prog*2,1)
      }

      // Camera logic: smooth follow + slow base orbit
      const sel=selectedRef.current
      if(sel){
        let targetPos=new THREE.Vector3(0,0,0)
        let targetLook=new THREE.Vector3(0,0,0)
        const currentPos=new THREE.Vector3(0,0,0)
        if(sel==='sun'){
          targetPos.set(0,12,40); targetLook.set(0,0,0)
          // Sun is static at origin
          currentPos.set(0,0,0)
        } else {
          const pm=planetMeshes.find(p=>p.name===sel)
          if(pm){
            const wp=new THREE.Vector3(); pm.body.getWorldPosition(wp)
            currentPos.copy(wp)
            const rMag=pm.body.geometry.boundingSphere?.radius||3
            const scale=pm.body.scale.x||1
            const r=rMag*scale
            targetPos.copy(wp).add(new THREE.Vector3(r*5,r*2,r*5))
            targetLook.copy(wp)
          }
        }
        camTarget=targetPos; camLookTarget=targetLook

        // Output coordinate updates to sci-fi telemetry element at 60fps
        const telEl=document.getElementById('sci-fi-coords')
        if(telEl){
          telEl.textContent=`X:${currentPos.x.toFixed(1)} Y:${currentPos.y.toFixed(1)} Z:${currentPos.z.toFixed(1)}`
        }
      } else {
        baseRotation+=dt*0.03
        camTarget.set(Math.sin(baseRotation)*180,30+Math.sin(t*0.1)*8,Math.cos(baseRotation)*180)
        camLookTarget.set(0,0,0)
      }

      camCurrent.lerp(camTarget,0.04)
      camLookCurrent.lerp(camLookTarget,0.04)
      camera.position.copy(camCurrent)
      camera.lookAt(camLookCurrent)

      // Star twinkle
      starMat.opacity=0.75+Math.sin(t*0.5)*0.10

      renderer.render(scene,camera)
    }
    animate()

    /* ─── Resize ─── */
    const onResize=()=>{
      const W2=mount.clientWidth, H2=mount.clientHeight
      camera.aspect=W2/H2; camera.updateProjectionMatrix()
      renderer.setSize(W2,H2)
    }
    window.addEventListener('resize',onResize)

    return ()=>{
      cancelAnimationFrame(frameRef.current)
      renderer.domElement.removeEventListener('mousemove',onMouseMove)
      renderer.domElement.removeEventListener('pointerdown',onClick)
      window.removeEventListener('resize',onResize)
      if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  },[playPing])

  const info = selected ? PLANET_INFO[selected] : null

  const PLANET_EMOJI: Record<string,string> = {
    sun:'☀️', mercury:'⚫', venus:'🟡', earth:'🌍', moon:'🌕',
    mars:'🔴', jupiter:'🟠', saturn:'🪐', uranus:'🩵', neptune:'💙'
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={{minHeight:'100%'}}>
      {/* WebGL canvas mount */}
      <div ref={mountRef} className="w-full h-full" style={{background:'transparent'}} />

      {/* ── Premium Sound Button ── */}
      <button
        onClick={toggleSound}
        title={sound ? 'Mute cosmic hum' : 'Enable cosmic hum'}
        style={{
          position:'absolute', top:'14px', right:'14px', zIndex:20,
          display:'flex', alignItems:'center', gap:'8px',
          padding:'8px 14px',
          borderRadius:'999px',
          border: sound ? '1px solid rgba(34,211,238,0.45)' : '1px solid rgba(34,211,238,0.18)',
          background: sound
            ? 'linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(8,47,73,0.55) 100%)'
            : 'rgba(7,17,31,0.65)',
          backdropFilter:'blur(16px)',
          WebkitBackdropFilter:'blur(16px)',
          boxShadow: sound ? '0 0 18px rgba(34,211,238,0.22), inset 0 1px 0 rgba(255,255,255,0.06)' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
          cursor:'pointer',
          transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Animated waveform bars */}
        <span style={{display:'flex', alignItems:'center', gap:'2px', height:'14px'}}>
          {[0.4,0.7,1,0.65,0.85,0.5,0.9].map((h,i) => (
            <span key={i} style={{
              display:'inline-block',
              width:'2px',
              borderRadius:'2px',
              background: sound ? 'rgba(34,211,238,0.9)' : 'rgba(100,130,150,0.5)',
              height: sound ? `${Math.round(h*14)}px` : '5px',
              transformOrigin:'bottom',
              animation: sound ? `soundbar 0.${7+i}s ease-in-out infinite alternate` : 'none',
              animationDelay:`${i*0.09}s`,
              transition:'height 0.3s ease, background 0.3s ease',
            }} />
          ))}
        </span>
        <span style={{
          fontFamily:'Inter, sans-serif',
          fontSize:'11px',
          fontWeight:600,
          letterSpacing:'0.08em',
          color: sound ? 'rgba(34,211,238,0.95)' : 'rgba(148,180,195,0.8)',
          transition:'color 0.3s ease',
          userSelect:'none',
        }}>{sound ? 'LIVE' : 'SOUND'}</span>
      </button>

      {/* Hover planet name pill */}
      {hovered && !selected && (
        <div style={{
          position:'absolute', top:'14px', left:'50%', transform:'translateX(-50%)',
          zIndex:20, padding:'5px 16px',
          borderRadius:'999px',
          border:'1px solid rgba(34,211,238,0.25)',
          background:'rgba(7,17,31,0.7)',
          backdropFilter:'blur(12px)',
          fontSize:'10px', fontWeight:700, letterSpacing:'0.18em',
          textTransform:'uppercase', color:'rgba(34,211,238,0.9)',
          pointerEvents:'none', userSelect:'none',
          fontFamily:'Inter, sans-serif',
          boxShadow:'0 2px 12px rgba(0,0,0,0.3)',
        }}>
          {PLANET_EMOJI[hovered]} {PLANET_INFO[hovered]?.title ?? hovered}
        </div>
      )}

      {/* ── Inline keyframe styles ── */}
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes soundbar {
          from { transform: scaleY(0.35); opacity:0.7; }
          to   { transform: scaleY(1);    opacity:1; }
        }
        @keyframes cardScan {
          0%   { top:-5%; opacity:0; }
          8%   { opacity:1; }
          92%  { opacity:1; }
          100% { top:105%; opacity:0; }
        }
        .card-scan-line {
          position:absolute; left:0; width:100%; height:1px;
          background: linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 40%, rgba(120,230,255,0.9) 50%, rgba(34,211,238,0.6) 60%, transparent 100%);
          animation: cardScan 5s linear infinite;
          pointer-events:none; z-index:2;
        }
        @keyframes cornerPulse {
          0%,100% { opacity:0.6; } 50% { opacity:1; }
        }
        .card-corner { animation: cornerPulse 3s ease-in-out infinite; }
        @keyframes statBar {
          from { width:0; } to { width:var(--bar-w); }
        }
      `}} />

      {/* ── Premium Agency Planet Info Card ── */}
      <AnimatePresence>
        {info && (
          <motion.div
            key={selected}
            initial={{ opacity:0, y:50, scale:0.94 }}
            animate={{ opacity:1, y:0,  scale:1 }}
            exit={{    opacity:0, y:40, scale:0.95 }}
            transition={{ type:'spring', damping:26, stiffness:200 }}
            style={{
              position:'absolute',
              bottom:'16px', left:'12px', right:'12px',
              zIndex:30,
              borderRadius:'20px',
              overflow:'hidden',
              border:'1px solid rgba(34,211,238,0.22)',
              background:'linear-gradient(160deg, rgba(4,14,28,0.88) 0%, rgba(3,10,22,0.96) 100%)',
              backdropFilter:'blur(28px)',
              WebkitBackdropFilter:'blur(28px)',
              boxShadow:'0 24px 64px rgba(0,0,0,0.75), 0 0 0 0.5px rgba(34,211,238,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Corner brackets */}
            {[{t:0,l:0,bt:'border-t',bl:'border-l'},{t:0,r:0,bt:'border-t',bl:'border-r'},{b:0,l:0,bt:'border-b',bl:'border-l'},{b:0,r:0,bt:'border-b',bl:'border-r'}].map((_,i) => (
              <div key={i} className="card-corner" style={{
                position:'absolute',
                ...(i===0?{top:0,left:0}:i===1?{top:0,right:0}:i===2?{bottom:0,left:0}:{bottom:0,right:0}),
                width:14, height:14, zIndex:5, pointerEvents:'none',
                borderTop: i<2 ? '2px solid rgba(34,211,238,0.9)' : 'none',
                borderBottom: i>=2 ? '2px solid rgba(34,211,238,0.9)' : 'none',
                borderLeft: (i===0||i===2) ? '2px solid rgba(34,211,238,0.9)' : 'none',
                borderRight: (i===1||i===3) ? '2px solid rgba(34,211,238,0.9)' : 'none',
                borderRadius: i===0?'6px 0 0 0':i===1?'0 6px 0 0':i===2?'0 0 0 6px':'0 0 6px 0',
              }} />
            ))}

            {/* Scanning line */}
            <div className="card-scan-line" />

            {/* ── Header gradient band ── */}
            <div style={{
              padding:'14px 16px 12px',
              background:'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(34,211,238,0.04) 60%, transparent 100%)',
              borderBottom:'1px solid rgba(34,211,238,0.1)',
              display:'flex', alignItems:'center', gap:'12px',
              position:'relative',
            }}>
              {/* Status dot + label */}
              <div style={{ position:'absolute', top:'10px', right:'12px', display:'flex', alignItems:'center', gap:'5px' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee', boxShadow:'0 0 6px #22d3ee', animation:'cornerPulse 2s ease-in-out infinite', display:'inline-block' }} />
                <span style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'0.14em', color:'rgba(34,211,238,0.7)', textTransform:'uppercase' }}>TELEMETRY ON</span>
              </div>

              {/* Planet emoji in glowing circle */}
              <div style={{
                width:44, height:44, borderRadius:'50%', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'22px',
                background:'radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(6,182,212,0.05) 60%, transparent 100%)',
                border:'1px solid rgba(34,211,238,0.2)',
                boxShadow:'0 0 16px rgba(34,211,238,0.12)',
              }}>{PLANET_EMOJI[selected!] ?? '🌌'}</div>

              {/* Title block */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:'clamp(15px,4vw,20px)', fontWeight:700, color:'#f0f4f8', letterSpacing:'-0.01em', lineHeight:1.15 }}>
                  {info.title}
                </div>
                <div style={{ fontFamily:'Inter, sans-serif', fontSize:'9px', fontWeight:600, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(34,211,238,0.65)', marginTop:'2px' }}>
                  {info.subtitle}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => { setSelected(null); selectedRef.current = null }}
                style={{
                  flexShrink:0, width:28, height:28, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:'rgba(34,211,238,0.08)',
                  border:'1px solid rgba(34,211,238,0.25)',
                  color:'rgba(34,211,238,0.8)', cursor:'pointer',
                  transition:'all 0.2s ease',
                }}
                onMouseEnter={e=>(e.currentTarget.style.background='rgba(34,211,238,0.18)')}
                onMouseLeave={e=>(e.currentTarget.style.background='rgba(34,211,238,0.08)')}
                title="Close"
              >
                <X style={{width:12,height:12}} />
              </button>
            </div>

            {/* ── Body ── */}
            <div style={{ padding:'12px 16px 0' }}>

              {/* Description */}
              <p style={{
                fontFamily:'Inter, sans-serif',
                fontSize:'clamp(10px,2.5vw,12px)',
                color:'rgba(180,210,225,0.88)',
                lineHeight:1.75,
                borderLeft:'2px solid rgba(34,211,238,0.3)',
                paddingLeft:'10px',
                margin:0,
              }}>{info.desc}</p>

              {/* ── Stats row ── */}
              <div style={{
                display:'grid',
                gridTemplateColumns:'1fr 1fr 1fr',
                gap:'8px',
                marginTop:'12px',
                paddingBottom:'14px',
                borderTop:'1px solid rgba(34,211,238,0.08)',
                paddingTop:'10px',
              }}>
                {[
                  { label:'SURFACE TEMP', value:info.temp, color:'#fb923c', bg:'rgba(251,146,60,0.08)', border:'rgba(251,146,60,0.2)' },
                  { label:'ORBIT PERIOD', value:info.period, color:'#38bdf8', bg:'rgba(56,189,248,0.08)', border:'rgba(56,189,248,0.2)' },
                  { label:'VELOCITY',     value:info.velocity, color:'#a78bfa', bg:'rgba(167,139,250,0.08)', border:'rgba(167,139,250,0.2)' },
                ].map(s => (
                  <div key={s.label} style={{
                    borderRadius:'10px',
                    border:`1px solid ${s.border}`,
                    background:s.bg,
                    padding:'8px 8px 7px',
                    display:'flex', flexDirection:'column', gap:'3px',
                  }}>
                    <span style={{ fontFamily:'monospace', fontSize:'7px', fontWeight:700, letterSpacing:'0.14em', color:'rgba(150,180,200,0.6)', textTransform:'uppercase' }}>{s.label}</span>
                    <span style={{ fontFamily:'Inter, sans-serif', fontSize:'clamp(9px,2vw,11px)', fontWeight:700, color:s.color, lineHeight:1.2 }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* ── Velocity / Distance strip ── */}
              <div style={{
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'8px 0 12px',
                borderTop:'1px solid rgba(34,211,238,0.07)',
              }}>
                <div style={{ fontFamily:'monospace', fontSize:'8px', color:'rgba(120,160,180,0.7)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  DIST: <span style={{ color:'rgba(34,211,238,0.9)', fontWeight:700 }}>{info.distance}</span>
                </div>
                {/* Mini waveform */}
                <svg width="70" height="18" viewBox="0 0 70 18" fill="none">
                  <path d="M0 9 Q8 1,16 9 T32 9 T48 9 T64 9 T70 9" stroke="rgba(34,211,238,0.35)" strokeWidth="1" />
                  <circle cx="35" cy="9" r="2" fill="#22d3ee" opacity="0.8">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div style={{ fontFamily:'monospace', fontSize:'7px', display:'flex', alignItems:'center', gap:'4px', color:'rgba(34,211,238,0.5)', letterSpacing:'0.12em' }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'#22d3ee', display:'inline-block', animation:'cornerPulse 2s infinite' }} />
                  LIVE
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tip */}
      {!selected && (
        <div style={{
          position:'absolute', bottom:'14px', left:0, right:0,
          textAlign:'center',
          fontFamily:'Inter, sans-serif',
          fontSize:'9px', fontWeight:600,
          letterSpacing:'0.22em', textTransform:'uppercase',
          color:'rgba(100,140,160,0.55)',
          pointerEvents:'none', userSelect:'none',
        }}>✦ Tap any planet to explore ✦</div>
      )}
    </div>
  )
}

export default GoldSphere
