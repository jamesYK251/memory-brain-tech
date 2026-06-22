"use client";

export default function ContourBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--yk-green)" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--yk-data-sea-blue)" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--yk-royal-blue)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--yk-green)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Primary contour cluster — organic topo lines, top-right */}
        <g fill="none" stroke="var(--yk-royal-blue)" opacity="0.07">
          <path d="M750,80 Q890,120 920,260 Q950,400 830,480 Q710,560 580,500 Q450,440 470,300 Q490,160 620,100 Q750,40 750,80Z" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="rotate" values="0 750 300;3 750 300;0 750 300;-3 750 300;0 750 300" dur="25s" repeatCount="indefinite" />
          </path>
          <path d="M760,130 Q870,160 890,270 Q910,380 810,440 Q710,500 610,460 Q510,420 520,320 Q530,220 630,170 Q730,120 760,130Z" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="rotate" values="0 720 290;-2 720 290;0 720 290;2 720 290;0 720 290" dur="20s" repeatCount="indefinite" />
          </path>
          <path d="M770,190 Q845,210 860,290 Q875,370 800,410 Q725,450 660,420 Q595,390 600,310 Q605,230 660,200 Q715,170 770,190Z" strokeWidth="1.2" />
          <path d="M775,240 Q820,255 830,310 Q840,365 790,385 Q740,405 700,385 Q660,365 665,310 Q670,255 715,240 Q760,225 775,240Z" strokeWidth="1" />
          <path d="M760,280 Q790,290 795,325 Q800,360 775,370 Q750,380 730,365 Q710,350 715,320 Q720,290 740,280 Q760,270 760,280Z" strokeWidth="0.8" />
        </g>

        {/* Secondary cluster — bottom-left, green tinted */}
        <g fill="none" stroke="var(--yk-green)" opacity="0.06">
          <path d="M150,500 Q280,460 350,540 Q420,620 360,720 Q300,800 180,780 Q60,760 30,660 Q0,560 80,510 Q150,460 150,500Z" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="rotate" values="0 200 650;-4 200 650;0 200 650;4 200 650;0 200 650" dur="30s" repeatCount="indefinite" />
          </path>
          <path d="M170,540 Q270,510 320,570 Q370,630 330,700 Q290,770 200,750 Q110,730 90,660 Q70,590 120,550 Q170,510 170,540Z" strokeWidth="1.3">
            <animateTransform attributeName="transform" type="rotate" values="0 210 640;3 210 640;0 210 640;-3 210 640;0 210 640" dur="22s" repeatCount="indefinite" />
          </path>
          <path d="M190,580 Q255,560 290,600 Q325,640 300,690 Q275,740 220,730 Q165,720 150,670 Q135,620 160,590 Q185,560 190,580Z" strokeWidth="1" />
          <path d="M210,620 Q245,610 260,640 Q275,670 255,690 Q235,710 215,700 Q195,690 190,660 Q185,630 200,620 Q210,610 210,620Z" strokeWidth="0.8" />
        </g>

        {/* Tertiary cluster — top-left, subtle */}
        <g fill="none" stroke="var(--yk-royal-blue)" opacity="0.04">
          <path d="M100,50 Q220,20 280,100 Q340,180 280,260 Q220,340 120,300 Q20,260 10,170 Q0,80 60,50 Q100,30 100,50Z" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="rotate" values="0 150 170;2 150 170;0 150 170;-2 150 170;0 150 170" dur="35s" repeatCount="indefinite" />
          </path>
          <path d="M120,90 Q200,70 240,130 Q280,190 240,240 Q200,290 140,270 Q80,250 70,190 Q60,130 90,100 Q120,70 120,90Z" strokeWidth="1.2" />
          <path d="M140,130 Q185,120 200,155 Q215,190 195,210 Q175,230 150,220 Q125,210 120,175 Q115,140 130,130 Q140,120 140,130Z" strokeWidth="0.8" />
        </g>

        {/* Mid-right flowing lines */}
        <g fill="none" stroke="var(--yk-data-sea-blue)" opacity="0.04">
          <path d="M1000,200 Q1100,250 1120,370 Q1140,490 1050,550 Q960,610 870,560 Q780,510 800,400 Q820,290 900,240 Q980,190 1000,200Z" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="rotate" values="0 980 400;-3 980 400;0 980 400;3 980 400;0 980 400" dur="28s" repeatCount="indefinite" />
          </path>
          <path d="M1010,270 Q1070,300 1080,380 Q1090,460 1030,500 Q970,540 910,510 Q850,480 860,400 Q870,320 920,285 Q970,250 1010,270Z" strokeWidth="1" />
          <path d="M1010,340 Q1040,355 1045,395 Q1050,435 1020,450 Q990,465 965,445 Q940,425 945,390 Q950,355 975,340 Q1000,325 1010,340Z" strokeWidth="0.7" />
        </g>

        {/* Scattered accent dots — like contour peaks */}
        <g fill="var(--yk-green)" opacity="0.08">
          <circle cx="760" cy="310" r="3">
            <animate attributeName="r" values="3;4;3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="210" cy="650" r="2.5">
            <animate attributeName="r" values="2.5;3.5;2.5" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="145" cy="165" r="2">
            <animate attributeName="r" values="2;3;2" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="1010" cy="390" r="2">
            <animate attributeName="r" values="2;3;2" dur="4.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Long flowing lines connecting clusters — like contour ridgelines */}
        <g fill="none" stroke="var(--yk-royal-blue)" opacity="0.035" strokeWidth="1">
          <path d="M0,400 Q200,350 400,380 Q600,410 800,350 Q1000,290 1200,320">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0;0,8;0,0" dur="18s" repeatCount="indefinite" />
          </path>
          <path d="M0,450 Q250,410 500,440 Q750,470 950,400 Q1100,350 1200,380">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0;0,-10;0,0" dur="22s" repeatCount="indefinite" />
          </path>
        </g>
        <g fill="none" stroke="var(--yk-green)" opacity="0.025" strokeWidth="0.8">
          <path d="M0,200 Q150,180 350,220 Q550,260 700,210 Q900,150 1200,190">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,6;0,0;0,-6;0,0" dur="20s" repeatCount="indefinite" />
          </path>
          <path d="M0,600 Q300,570 500,610 Q700,650 900,590 Q1050,540 1200,570">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-7;0,0;0,7;0,0" dur="24s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
}
