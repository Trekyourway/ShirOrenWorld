# Coaching

Coaching world homepage.
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>לכבוש פסגות — גרסה 6.1</title>
  <style>
    :root {
      --night-0: #07110c;
      --night-1: #0c1812;
      --night-2: #13241c;
      --night-3: #193126;
      --night-4: #224334;

      --mint-light: #dceadf;
      --mint: #95bf9b;
      --sage: #7fa08a;
      --dusty-sage: #647d6d;
      --antique-green: #556b5f;

      --text: #f4f8f4;
      --muted: rgba(244,248,244,0.72);
      --muted-soft: rgba(244,248,244,0.46);
      --line: rgba(255,255,255,0.09);

      --spark: #f2fbf3;
      --spark-soft: rgba(220,234,223,0.52);
      --route: rgba(239, 249, 240, 0.92);
      --route-soft: rgba(149,191,155,0.28);
      --branch: rgba(220,234,223,0.52);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: "Heebo", "Assistant", "Rubik", Arial, sans-serif;
      color: var(--text);
      overflow-x: hidden;
      background:
        radial-gradient(circle at 14% 16%, rgba(220,234,223,0.08), transparent 16%),
        radial-gradient(circle at 84% 14%, rgba(149,191,155,0.10), transparent 16%),
        radial-gradient(circle at 18% 56%, rgba(127,160,138,0.08), transparent 18%),
        radial-gradient(circle at 82% 74%, rgba(85,107,95,0.10), transparent 18%),
        radial-gradient(circle at 46% 92%, rgba(220,234,223,0.08), transparent 22%),
        linear-gradient(180deg, var(--night-0) 0%, var(--night-1) 14%, var(--night-2) 36%, var(--night-3) 62%, var(--night-4) 100%);
      letter-spacing: -0.01em;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 18%, transparent 82%, rgba(255,255,255,0.02)),
        radial-gradient(circle at center, rgba(255,255,255,0.02), transparent 56%);
      z-index: 0;
    }

    .page {
      position: relative;
      min-height: 100vh;
      isolation: isolate;
    }

    .mist,
    .glow {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }

    .mist {
      filter: blur(120px);
      opacity: 0.35;
    }

    .mist.one {
      width: 440px;
      height: 440px;
      top: 90px;
      right: -80px;
      background: rgba(220,234,223,0.10);
      animation-name: driftA;
      animation-duration: 11s;
    }

    .mist.two {
      width: 560px;
      height: 560px;
      top: 1200px;
      left: -140px;
      background: rgba(149,191,155,0.08);
      animation-name: driftB;
      animation-duration: 14s;
    }

    .mist.three {
      width: 540px;
      height: 540px;
      bottom: 120px;
      right: 18%;
      background: rgba(127,160,138,0.10);
      animation-name: driftA;
      animation-duration: 13s;
    }

    .glow {
      filter: blur(55px);
      opacity: 0.22;
    }

    .glow.one {
      width: 200px;
      height: 200px;
      top: 240px;
      left: 10%;
      background: rgba(220,234,223,0.18);
      animation-name: driftC;
      animation-duration: 8s;
    }

    .glow.two {
      width: 220px;
      height: 220px;
      top: 1650px;
      left: 8%;
      background: rgba(149,191,155,0.16);
      animation-name: driftB;
      animation-duration: 9s;
    }

    .glow.three {
      width: 180px;
      height: 180px;
      bottom: 320px;
      left: 20%;
      background: rgba(220,234,223,0.14);
      animation-name: driftC;
      animation-duration: 10s;
    }

    .ridge,
    .route-layer,
    .spark-layer {
      position: absolute;
      inset-inline: 0;
      pointer-events: none;
    }

    .ridge {
      z-index: 1;
      opacity: 0.95;
    }

    .ridge.top {
      top: 0;
      height: 560px;
    }

    .ridge.bottom {
      bottom: 0;
      height: 780px;
    }

    .route-layer {
      inset: 0;
      z-index: 2;
    }

    .spark-layer {
      inset: 0;
      z-index: 2;
    }

    .ridge svg,
    .route-layer svg,
    .spark-layer svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .route-shadow {
      fill: none;
      stroke: rgba(0,0,0,0.30);
      stroke-width: 16;
      filter: blur(6px);
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .route-glow {
      fill: none;
      stroke: var(--route-soft);
      stroke-width: 10;
      filter: blur(4px);
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .route-main {
      fill: none;
      stroke: var(--route);
      stroke-width: 3.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .route-dash {
      fill: none;
      stroke: rgba(255,255,255,0.18);
      stroke-width: 1.2;
      stroke-dasharray: 7 14;
      opacity: 0.65;
      animation: dashMove 18s linear infinite;
    }

    .route-point {
      fill: var(--spark);
      filter: drop-shadow(0 0 12px rgba(220,234,223,0.38));
      animation: pulsePoint 3.2s ease-in-out infinite;
    }

    .branch {
      fill: none;
      stroke: var(--branch);
      stroke-width: 1.7;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0.72;
      filter: drop-shadow(0 0 8px rgba(220,234,223,0.12));
    }

    .branch.soft {
      stroke-width: 5.5;
      opacity: 0.12;
      filter: blur(3px);
    }

    .branch.animated {
      stroke-dasharray: 8 20;
      animation: dashMoveSlow 24s linear infinite;
    }

    .spark-star {
      fill: rgba(239,249,240,0.96);
      filter: drop-shadow(0 0 12px rgba(220,234,223,0.28));
      transform-origin: center;
      animation: twinkle 2.8s ease-in-out infinite;
    }

    .spark-small {
      fill: rgba(220,234,223,0.72);
      animation: flicker 3.5s ease-in-out infinite;
    }

    .spark-float {
      animation: floatSpark 7s ease-in-out infinite;
    }

    .content {
      position: relative;
      z-index: 3;
      width: min(1160px, calc(100% - 40px));
      margin: 0 auto;
      padding: 30px 0 100px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 6px 0 34px;
    }

    .brand {
      font-size: 0.9rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(244,248,244,0.92);
    }

    nav {
      display: flex;
      gap: 22px;
      flex-wrap: wrap;
    }

    nav a {
      text-decoration: none;
      color: rgba(244,248,244,0.66);
      font-size: 0.96rem;
      transition: 0.25s ease;
    }

    nav a:hover {
      color: #ffffff;
    }

    .hero {
      min-height: 100vh;
      display: grid;
      align-items: center;
      padding: 70px 0 40px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.16fr 0.84fr;
      gap: 36px;
      align-items: end;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--mint-light);
      font-size: 0.84rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-bottom: 22px;
      opacity: 0.9;
    }

    .eyebrow::before {
      content: "";
      width: 38px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(220,234,223,0.9));
    }

    h1 {
      font-size: clamp(3.3rem, 6vw, 7.3rem);
      line-height: 0.88;
      letter-spacing: -0.065em;
      max-width: 7.6ch;
      margin-bottom: 22px;
      color: #f7fbf7;
    }

    .subhero {
      display: grid;
      gap: 7px;
      margin-bottom: 28px;
    }

    .subhero strong {
      font-size: 1.28rem;
      color: #ffffff;
      font-weight: 700;
    }

    .subhero span {
      font-size: 1.08rem;
      color: rgba(244,248,244,0.76);
    }

    .hero p {
      font-size: 1.02rem;
      line-height: 2;
      color: var(--muted);
      max-width: 53ch;
      margin-bottom: 30px;
    }

    .cta-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn {
      min-height: 52px;
      padding: 0 22px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-weight: 700;
      transition: 0.25s ease;
      border: 1px solid transparent;
    }

    .btn-primary {
      background: linear-gradient(135deg, #eef8ef, #95bf9b);
      color: #13241c;
      box-shadow: 0 16px 34px rgba(149,191,155,0.20);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: rgba(255,255,255,0.03);
      color: var(--text);
      border-color: var(--line);
      backdrop-filter: blur(10px);
    }

    .hero-side {
      display: grid;
      gap: 26px;
      padding-bottom: 18px;
    }

    .micro {
      border-top: 1px solid var(--line);
      padding-top: 16px;
      max-width: 360px;
    }

    .micro-label {
      font-size: 0.8rem;
      color: var(--muted-soft);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .micro-title {
      font-size: 1.45rem;
      line-height: 1.18;
      color: #f7fbf7;
      margin-bottom: 8px;
    }

    .micro p {
      color: var(--muted);
      font-size: 0.96rem;
      line-height: 1.85;
    }

    section {
      position: relative;
      padding: 130px 0;
    }

    .story-grid {
      display: grid;
      grid-template-columns: 0.92fr 1.08fr;
      gap: 36px;
      align-items: start;
    }

    h2 {
      font-size: clamp(2.2rem, 4vw, 4.2rem);
      line-height: 0.96;
      letter-spacing: -0.055em;
      max-width: 8ch;
      color: #f7fbf7;
    }

    .story-copy p {
      color: var(--muted);
      line-height: 2;
      max-width: 56ch;
      font-size: 1rem;
    }

    .divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
      margin-top: 38px;
    }

    .principles {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      margin-top: 42px;
    }

    .principle {
      position: relative;
      padding-top: 22px;
    }

    .principle::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 56px;
      height: 1px;
      background: linear-gradient(90deg, rgba(220,234,223,0.9), transparent);
    }

    .principle-index {
      font-size: 0.8rem;
      color: rgba(220,234,223,0.72);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .principle h3 {
      font-size: 1.34rem;
      line-height: 1.14;
      color: #f4faf5;
      margin-bottom: 10px;
      max-width: 11ch;
    }

    .principle p {
      color: var(--muted);
      font-size: 0.96rem;
      line-height: 1.9;
      max-width: 28ch;
    }

    .quote-section {
      padding-top: 42px;
    }

    .quote-box {
      text-align: center;
      padding: 24px 0;
      position: relative;
    }

    .quote-box::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 160px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(220,234,223,0.8), transparent);
    }

    .quote-box p {
      font-size: clamp(1.9rem, 3.1vw, 3.8rem);
      line-height: 1.34;
      letter-spacing: -0.055em;
      color: #f7fbf7;
      max-width: 16ch;
      margin: 0 auto;
    }

    .quote-box span {
      display: inline-block;
      margin-top: 18px;
      color: var(--muted-soft);
      font-size: 0.96rem;
      letter-spacing: 0.08em;
    }

    .cta-section {
      padding-bottom: 120px;
    }

    .cta-panel {
      border-top: 1px solid var(--line);
      padding-top: 34px;
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 24px;
      flex-wrap: wrap;
    }

    .cta-panel h3 {
      font-size: clamp(1.9rem, 3vw, 3.3rem);
      line-height: 1.02;
      letter-spacing: -0.05em;
      max-width: 12ch;
      color: #f7fbf7;
    }

    .cta-panel p {
      color: var(--muted);
      max-width: 55ch;
      line-height: 1.95;
      margin-top: 10px;
    }

    footer {
      padding-bottom: 34px;
      color: rgba(244,248,244,0.44);
      font-size: 0.9rem;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.45; transform: scale(0.92); }
      50% { opacity: 1; transform: scale(1.18); }
    }

    @keyframes flicker {
      0%, 100% { opacity: 0.35; }
      50% { opacity: 0.9; }
    }

    @keyframes pulsePoint {
      0%, 100% { opacity: 0.78; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.16); }
    }

    @keyframes dashMove {
      to { stroke-dashoffset: -140; }
    }

    @keyframes dashMoveSlow {
      to { stroke-dashoffset: -180; }
    }

    @keyframes floatSpark {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(-10px) translateX(4px); }
    }

    @keyframes driftA {
      0% { transform: translate3d(0,0,0) scale(1); }
      100% { transform: translate3d(18px,-16px,0) scale(1.05); }
    }

    @keyframes driftB {
      0% { transform: translate3d(0,0,0) scale(1); }
      100% { transform: translate3d(-22px,14px,0) scale(1.06); }
    }

    @keyframes driftC {
      0% { transform: translate3d(0,0,0); opacity: 0.18; }
      100% { transform: translate3d(10px,-12px,0); opacity: 0.28; }
    }

    @media (max-width: 980px) {
      .hero-grid,
      .story-grid,
      .principles {
        grid-template-columns: 1fr;
      }

      h1 {
        max-width: 9ch;
      }

      h2 {
        max-width: none;
      }
    }

    @media (max-width: 640px) {
      .content {
        width: min(100% - 24px, 1160px);
      }

      header {
        flex-direction: column;
        align-items: flex-start;
      }

      .hero {
        min-height: auto;
        padding-top: 26px;
      }

      section {
        padding: 90px 0;
      }

      .cta-panel {
        padding-top: 24px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="mist one"></div>
    <div class="mist two"></div>
    <div class="mist three"></div>

    <div class="glow one"></div>
    <div class="glow two"></div>
    <div class="glow three"></div>

    <div class="ridge top" aria-hidden="true">
      <svg viewBox="0 0 1440 560" preserveAspectRatio="none">
        <path d="M0,294 C124,272 210,214 306,194 C404,174 484,228 584,228 C684,228 770,176 874,156 C1008,132 1104,204 1212,212 C1312,220 1382,178 1440,140 L1440,0 L0,0 Z"
              fill="rgba(255,255,255,0.03)" />
        <path d="M0,352 C120,336 214,292 324,274 C430,256 526,302 632,302 C734,302 816,250 922,242 C1052,232 1148,282 1250,278 C1320,274 1378,246 1440,214 L1440,0 L0,0 Z"
              fill="rgba(149,191,155,0.05)" />
      </svg>
    </div>

    <div class="route-layer" aria-hidden="true">
      <svg viewBox="0 0 1440 4300" preserveAspectRatio="none">
        <!-- main route -->
        <path class="route-shadow"
          d="M1126 182
             C1038 210, 944 282, 848 378
             C760 466, 750 560, 842 620
             C936 682, 1048 718, 1062 820
             C1078 944, 968 1028, 804 1098
             C634 1170, 430 1248, 384 1372
             C342 1488, 452 1562, 646 1628
             C842 1696, 1080 1748, 1100 1866
             C1122 1992, 978 2072, 774 2144
             C558 2220, 336 2308, 318 2434
             C300 2564, 430 2636, 658 2708
             C908 2786, 1120 2826, 1138 2940
             C1158 3060, 1036 3142, 820 3214
             C598 3288, 390 3378, 402 3500
             C416 3628, 596 3706, 846 3778
             C1022 3828, 1104 3898, 1068 3998
             C1030 4100, 918 4168, 794 4222" />
        <path class="route-glow"
          d="M1126 182
             C1038 210, 944 282, 848 378
             C760 466, 750 560, 842 620
             C936 682, 1048 718, 1062 820
             C1078 944, 968 1028, 804 1098
             C634 1170, 430 1248, 384 1372
             C342 1488, 452 1562, 646 1628
             C842 1696, 1080 1748, 1100 1866
             C1122 1992, 978 2072, 774 2144
             C558 2220, 336 2308, 318 2434
             C300 2564, 430 2636, 658 2708
             C908 2786, 1120 2826, 1138 2940
             C1158 3060, 1036 3142, 820 3214
             C598 3288, 390 3378, 402 3500
             C416 3628, 596 3706, 846 3778
             C1022 3828, 1104 3898, 1068 3998
             C1030 4100, 918 4168, 794 4222" />
        <path class="route-main"
          d="M1126 182
             C1038 210, 944 282, 848 378
             C760 466, 750 560, 842 620
             C936 682, 1048 718, 1062 820
             C1078 944, 968 1028, 804 1098
             C634 1170, 430 1248, 384 1372
             C342 1488, 452 1562, 646 1628
             C842 1696, 1080 1748, 1100 1866
             C1122 1992, 978 2072, 774 2144
             C558 2220, 336 2308, 318 2434
             C300 2564, 430 2636, 658 2708
             C908 2786, 1120 2826, 1138 2940
             C1158 3060, 1036 3142, 820 3214
             C598 3288, 390 3378, 402 3500
             C416 3628, 596 3706, 846 3778
             C1022 3828, 1104 3898, 1068 3998
             C1030 4100, 918 4168, 794 4222" />
        <path class="route-dash"
          d="M1126 182
             C1038 210, 944 282, 848 378
             C760 466, 750 560, 842 620
             C936 682, 1048 718, 1062 820
             C1078 944, 968 1028, 804 1098
             C634 1170, 430 1248, 384 1372
             C342 1488, 452 1562, 646 1628
             C842 1696, 1080 1748, 1100 1866
             C1122 1992, 978 2072, 774 2144
             C558 2220, 336 2308, 318 2434
             C300 2564, 430 2636, 658 2708
             C908 2786, 1120 2826, 1138 2940
             C1158 3060, 1036 3142, 820 3214
             C598 3288, 390 3378, 402 3500
             C416 3628, 596 3706, 846 3778
             C1022 3828, 1104 3898, 1068 3998
             C1030 4100, 918 4168, 794 4222" />

        <!-- branch 1 -->
        <path class="branch soft"
          d="M804 1098
             C700 1124, 600 1176, 540 1260
             C490 1330, 492 1410, 562 1460" />
        <path class="branch animated"
          d="M804 1098
             C700 1124, 600 1176, 540 1260
             C490 1330, 492 1410, 562 1460" />
        <path class="branch"
          d="M804 1098
             C700 1124, 600 1176, 540 1260
             C490 1330, 492 1410, 562 1460" />

        <!-- branch 2 -->
        <path class="branch soft"
          d="M774 2144
             C690 2190, 610 2260, 586 2342
             C566 2410, 594 2478, 658 2528" />
        <path class="branch animated"
          d="M774 2144
             C690 2190, 610 2260, 586 2342
             C566 2410, 594 2478, 658 2528" />
        <path class="branch"
          d="M774 2144
             C690 2190, 610 2260, 586 2342
             C566 2410, 594 2478, 658 2528" />

        <!-- left dramatic branch -->
        <path class="branch soft"
          d="M658 2708
             C548 2758, 436 2828, 378 2924
             C330 3002, 348 3090, 436 3150" />
        <path class="branch animated"
          d="M658 2708
             C548 2758, 436 2828, 378 2924
             C330 3002, 348 3090, 436 3150" />
        <path class="branch"
          d="M658 2708
             C548 2758, 436 2828, 378 2924
             C330 3002, 348 3090, 436 3150" />

        <!-- final small return branch -->
        <path class="branch soft"
          d="M846 3778
             C930 3830, 972 3890, 964 3956
             C956 4016, 902 4068, 820 4100" />
        <path class="branch animated"
          d="M846 3778
             C930 3830, 972 3890, 964 3956
             C956 4016, 902 4068, 820 4100" />
        <path class="branch"
          d="M846 3778
             C930 3830, 972 3890, 964 3956
             C956 4016, 902 4068, 820 4100" />

        <circle class="route-point" cx="946" cy="274" r="5.5" />
        <circle class="route-point" cx="1062" cy="820" r="6.5" />
        <circle class="route-point" cx="384" cy="1372" r="6.5" />
        <circle class="route-point" cx="1100" cy="1866" r="6.5" />
        <circle class="route-point" cx="318" cy="2434" r="7" />
        <circle class="route-point" cx="1138" cy="2940" r="6.5" />
        <circle class="route-point" cx="402" cy="3500" r="6.5" />
        <circle class="route-point" cx="1068" cy="3998" r="5.5" />
      </svg>
    </div>

    <div class="spark-layer" aria-hidden="true">
      <svg viewBox="0 0 1440 4300" preserveAspectRatio="none">
        <!-- left side sparkling field -->
        <g class="spark-float" style="animation-delay:0s;">
          <g class="spark-star" style="animation-delay:.2s;">
            <circle cx="320" cy="820" r="2.2"/>
            <circle cx="326" cy="820" r="0.9"/>
            <circle cx="314" cy="820" r="0.9"/>
            <circle cx="320" cy="814" r="0.9"/>
            <circle cx="320" cy="826" r="0.9"/>
          </g>
        </g>

        <g class="spark-float" style="animation-delay:1.2s;">
          <g class="spark-star" style="animation-delay:1s;">
            <circle cx="270" cy="1410" r="2.5"/>
            <circle cx="276" cy="1410" r="1"/>
            <circle cx="264" cy="1410" r="1"/>
            <circle cx="270" cy="1404" r="1"/>
            <circle cx="270" cy="1416" r="1"/>
          </g>
        </g>

        <g class="spark-float" style="animation-delay:2.1s;">
          <g class="spark-star" style="animation-delay:1.4s;">
            <circle cx="246" cy="2280" r="2.2"/>
            <circle cx="252" cy="2280" r="0.9"/>
            <circle cx="240" cy="2280" r="0.9"/>
            <circle cx="246" cy="2274" r="0.9"/>
            <circle cx="246" cy="2286" r="0.9"/>
          </g>
        </g>

        <g class="spark-float" style="animation-delay:.8s;">
          <g class="spark-star" style="animation-delay:.6s;">
            <circle cx="292" cy="3028" r="2.3"/>
            <circle cx="298" cy="3028" r="0.9"/>
            <circle cx="286" cy="3028" r="0.9"/>
            <circle cx="292" cy="3022" r="0.9"/>
            <circle cx="292" cy="3034" r="0.9"/>
          </g>
        </g>

        <g class="spark-float" style="animation-delay:1.6s;">
          <g class="spark-star" style="animation-delay:1.1s;">
            <circle cx="360" cy="3594" r="2.2"/>
            <circle cx="366" cy="3594" r="0.9"/>
            <circle cx="354" cy="3594" r="0.9"/>
            <circle cx="360" cy="3588" r="0.9"/>
            <circle cx="360" cy="3600" r="0.9"/>
          </g>
        </g>

        <!-- along the main route -->
        <g class="spark-star" style="animation-delay:.4s;">
          <circle cx="1048" cy="244" r="2.2"/>
          <circle cx="1054" cy="244" r="0.9"/>
          <circle cx="1042" cy="244" r="0.9"/>
          <circle cx="1048" cy="238" r="0.9"/>
          <circle cx="1048" cy="250" r="0.9"/>
        </g>

        <g class="spark-star" style="animation-delay:1.6s;">
          <circle cx="726" cy="1074" r="2.4"/>
          <circle cx="732" cy="1074" r="1"/>
          <circle cx="720" cy="1074" r="1"/>
          <circle cx="726" cy="1068" r="1"/>
          <circle cx="726" cy="1080" r="1"/>
        </g>

        <g class="spark-star" style="animation-delay:2.4s;">
          <circle cx="1014" cy="2038" r="2.4"/>
          <circle cx="1020" cy="2038" r="1"/>
          <circle cx="1008" cy="2038" r="1"/>
          <circle cx="1014" cy="2032" r="1"/>
          <circle cx="1014" cy="2044" r="1"/>
        </g>

        <g class="spark-star" style="animation-delay:.9s;">
          <circle cx="430" cy="2748" r="2.3"/>
          <circle cx="436" cy="2748" r="0.9"/>
          <circle cx="424" cy="2748" r="0.9"/>
          <circle cx="430" cy="2742" r="0.9"/>
          <circle cx="430" cy="2754" r="0.9"/>
        </g>

        <g class="spark-star" style="animation-delay:1.9s;">
          <circle cx="932" cy="3258" r="2.5"/>
          <circle cx="938" cy="3258" r="1"/>
          <circle cx="926" cy="3258" r="1"/>
          <circle cx="932" cy="3252" r="1"/>
          <circle cx="932" cy="3264" r="1"/>
        </g>

        <g class="spark-star" style="animation-delay:2.8s;">
          <circle cx="864" cy="3888" r="2.3"/>
          <circle cx="870" cy="3888" r="0.9"/>
          <circle cx="858" cy="3888" r="0.9"/>
          <circle cx="864" cy="3882" r="0.9"/>
          <circle cx="864" cy="3894" r="0.9"/>
        </g>

        <!-- tiny spark field -->
        <circle class="spark-small" cx="1180" cy="380" r="1.2" style="animation-delay:.2s;"/>
        <circle class="spark-small" cx="1148" cy="520" r="1" style="animation-delay:1.2s;"/>
        <circle class="spark-small" cx="878" cy="930" r="1.1" style="animation-delay:.8s;"/>
        <circle class="spark-small" cx="650" cy="1240" r="1" style="animation-delay:2.1s;"/>
        <circle class="spark-small" cx="548" cy="1722" r="1.2" style="animation-delay:1.7s;"/>
        <circle class="spark-small" cx="1046" cy="2248" r="1" style="animation-delay:.5s;"/>
        <circle class="spark-small" cx="562" cy="2528" r="1.1" style="animation-delay:2.3s;"/>
        <circle class="spark-small" cx="1098" cy="3060" r="1.2" style="animation-delay:1.1s;"/>
        <circle class="spark-small" cx="706" cy="3380" r="1" style="animation-delay:2.7s;"/>
        <circle class="spark-small" cx="986" cy="4016" r="1.1" style="animation-delay:.9s;"/>

        <!-- left small spark cloud -->
        <circle class="spark-small" cx="220" cy="980" r="1.1" style="animation-delay:.4s;"/>
        <circle class="spark-small" cx="300" cy="1180" r="1" style="animation-delay:1.8s;"/>
        <circle class="spark-small" cx="210" cy="1640" r="1.2" style="animation-delay:.7s;"/>
        <circle class="spark-small" cx="280" cy="1860" r="1" style="animation-delay:2.5s;"/>
        <circle class="spark-small" cx="196" cy="2460" r="1.2" style="animation-delay:1.4s;"/>
        <circle class="spark-small" cx="242" cy="2860" r="1" style="animation-delay:2.9s;"/>
        <circle class="spark-small" cx="260" cy="3320" r="1.1" style="animation-delay:.6s;"/>
        <circle class="spark-small" cx="322" cy="3720" r="1.2" style="animation-delay:1.5s;"/>
      </svg>
    </div>

    <div class="ridge bottom" aria-hidden="true">
      <svg viewBox="0 0 1440 780" preserveAspectRatio="none">
        <path d="M0,554 C148,504 246,528 352,482 C468,432 530,336 664,308 C818,276 910,392 1040,420 C1166,448 1240,384 1328,336 C1382,308 1416,300 1440,306 L1440,780 L0,780 Z"
              fill="rgba(255,255,255,0.03)" />
        <path d="M0,620 C142,592 248,608 360,568 C484,522 548,434 674,404 C828,368 922,456 1058,488 C1182,518 1262,472 1344,432 C1394,408 1422,406 1440,412 L1440,780 L0,780 Z"
              fill="rgba(0,0,0,0.13)" />
      </svg>
    </div>

    <div class="content">
      <header>
        <div class="brand">לכבוש פסגות</div>
        <nav>
          <a href="#hero">ראשי</a>
          <a href="#story">הדרך</a>
          <a href="#spark">הניצוץ</a>
          <a href="#contact">יציאה לדרך</a>
        </nav>
      </header>

      <section class="hero" id="hero">
        <div class="hero-grid">
          <div>
            <div class="eyebrow">Mountain route / inner spark / personal ascent</div>
            <h1>לכבוש פסגות בחיים ובהרים</h1>

            <div class="subhero">
              <strong>ליצור חיים שרוצים לחיות בהם.</strong>
              <span>בדרך שלך.</span>
            </div>

            <p>
              יש אנשים שלא צריכים עוד השראה. הם צריכים למצוא מחדש את הניצוץ.
              את אותו רגע פנימי שמחזיר תנועה, כיוון ואומץ. לכן הדף הזה לא רק נראה
              כמו מסע — הוא מרגיש כמו עלייה: קו מדויק של דרך, עומק ירוק כהה,
              הבלחות מינט עתיק, ניצוצות חיים, והסתעפויות קטנות שמזכירות שגם בדרך
              לפסגה יש בחירות, סטיות, ותנועה שחוזרת הביתה.
            </p>

            <div class="cta-row">
              <a href="#contact" class="btn btn-primary">להתחיל את הדרך</a>
              <a href="#story" class="btn btn-secondary">להמשיך במסע</a>
            </div>
          </div>

          <div class="hero-side">
            <div class="micro">
              <div class="micro-label">01 / direction</div>
              <div class="micro-title">למצוא שוב כיוון</div>
              <p>כשהניצוץ נדלק, הדרך מפסיקה להרגיש מעורפלת ומתחילה לקבל צורה.</p>
            </div>

            <div class="micro">
              <div class="micro-label">02 / ascent</div>
              <div class="micro-title">לנוע כלפי מעלה</div>
              <p>לא שינוי רועש ומהיר, אלא טיפוס מדויק שנבנה עם נוכחות, חוסן ובחירה.</p>
            </div>

            <div class="micro">
              <div class="micro-label">03 / spark</div>
              <div class="micro-title">להצית מחדש את מה שחי בפנים</div>
              <p>לפעמים לא צריך להמציא דרך חדשה. רק לפגוש מחדש את מה שכבר מבקש לצאת.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="story">
        <div class="story-grid">
          <div>
            <h2>הדרך נבנית מגובה. השינוי מתחיל מניצוץ.</h2>
          </div>
          <div class="story-copy">
            <p>
              זו לא שפה של טבע רך, ולא שפה של וולנס גנרי. זו שפה של עלייה,
              פסגות, נשימה, והבזק פנימי שמתחיל להאיר את הדרך. גווני המינט והירוקים
              העתיקים לא יושבים כאן כרקע קישוטי, אלא כשכבות אור עמוקות:
              כמו ערפל קריר של בוקר הרים, כמו זיכרון של דרך, כמו ניצוץ שנשמר
              ומחכה לרגע הנכון להתגלות.
            </p>
            <div class="divider"></div>
          </div>
        </div>

        <div class="principles">
          <div class="principle">
            <div class="principle-index">01 / ניצוץ</div>
            <h3>לזהות את מה שעוד חי בפנים</h3>
            <p>גם כשנדמה שהדרך התרחקה, תמיד נשאר משהו קטן שמבקש להידלק מחדש.</p>
          </div>
          <div class="principle">
            <div class="principle-index">02 / מסלול</div>
            <h3>לתת לניצוץ להפוך לכיוון</h3>
            <p>השראה לבד לא מספיקה. הדרך נוצרת כשיש תנועה, מבנה, קצב ודיוק.</p>
          </div>
          <div class="principle">
            <div class="principle-index">03 / פסגה</div>
            <h3>לבנות חיים שבאמת רוצים לחיות בהם</h3>
            <p>לא רק להגיע רחוק יותר, אלא להגיע למקום שמרגיש נכון, עמוק ואמיתי יותר.</p>
          </div>
        </div>
      </section>

      <section id="spark" class="quote-section">
        <div class="quote-box">
          <p>
            למצוא את הניצוץ.<br>
            ולבנות ממנו דרך.
          </p>
          <span>לכבוש פסגות — בחיים ובהרים</span>
        </div>
      </section>

      <section id="contact" class="cta-section">
        <div class="cta-panel">
          <div>
            <h3>מוכנים למצוא את הניצוץ — ולצאת איתו לדרך?</h3>
            <p>
              הגרסה הזאת מתאימה במיוחד למותג אישי עמוק ויוקרתי, לתהליכי ליווי,
              ריטריטים, סדנאות שטח, מסעות התפתחות, או כל מרחב שמחבר בין פסגה חיצונית
              לפסגה פנימית.
            </p>
          </div>

          <div class="cta-row">
            <a href="#" class="btn btn-primary">לקביעת שיחת היכרות</a>
            <a href="#" class="btn btn-secondary">לקבל פרטים</a>
          </div>
        </div>
      </section>

      <footer>
        גרסה 6.1 — animated sparks / branching route / dark editorial luxury
      </footer>
    </div>
  </div>
</body>
</html>
