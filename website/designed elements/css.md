the design seems basic really read into the design for the slm and llm  look at the subtle animations here and ill add more context for u consider look at this css learnnand come up with new ways to display content not just blocks  this macs a floaty macbook /* From Uiverse.io by Ashon-G */ 
.macbook {
  width: 150px;
  height: 96px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -85px 0 0 -78px;
  perspective: 500px;
}

.shadow {
  position: absolute;
  width: 60px;
  height: 0px;
  left: 40px;
  top: 160px;
  transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
  box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  animation: shadow infinite 7s ease;
}

.inner {
  z-index: 20;
  position: absolute;
  width: 150px;
  height: 96px;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
  animation: rotate infinite 7s ease;
}

.screen {
  width: 150px;
  height: 96px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 7px;
  background: #ddd;
  transform-style: preserve-3d;
  transform-origin: 50% 93px;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  animation: lid-screen infinite 7s ease;
  background-image: linear-gradient(45deg, rgba(0,0,0,0.34) 0%,rgba(0,0,0,0) 100%);
  background-position: left bottom;
  background-size: 300px 300px;
  box-shadow: inset 0 3px 7px rgba(255,255,255,0.5);
}

.screen .logo {
  position: absolute;
  width: 20px;
  height: 24px;
  left: 50%;
  top: 50%;
  margin: -12px 0 0 -10px;
  transform: rotateY(180deg) translateZ(0.1px);
}

.screen .face-one {
  width: 150px;
  height: 96px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 7px;
  background: #d3d3d3;
  transform: translateZ(2px);
  background-image: linear-gradient(45deg,rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
}

.screen .face-one .camera {
  width: 3px;
  height: 3px;
  border-radius: 100%;
  background: #000;
  position: absolute;
  left: 50%;
  top: 4px;
  margin-left: -1.5px;
}

.screen .face-one .display {
  width: 130px;
  height: 74px;
  margin: 10px;
  background-color: #000;
  background-size: 100% 100%;
  border-radius: 1px;
  position: relative;
  box-shadow: inset 0 0 2px rgba(0,0,0,1);
}

.screen .face-one .display .shade {
  position: absolute;
  left: 0;
  top: 0;
  width: 130px;
  height: 74px;
  background: linear-gradient(-135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 47%,rgba(255,255,255,0) 48%);
  animation: screen-shade infinite 7s ease;
  background-size: 300px 200px;
  background-position: 0px 0px;
}

.screen .face-one span {
  position: absolute;
  top: 85px;
  left: 57px;
  font-size: 6px;
  color: #666
}

.macbody {
  width: 150px;
  height: 96px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 7px;
  background: #cbcbcb;
  transform-style: preserve-3d;
  transform-origin: 50% bottom;
  transform: rotateX(-90deg);
  animation: lid-macbody infinite 7s ease;
  background-image: linear-gradient(45deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
}

.macbody .face-one {
  width: 150px;
  height: 96px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 7px;
  transform-style: preserve-3d;
  background: #dfdfdf;
  animation: lid-keyboard-area infinite 7s ease;
  transform: translateZ(-2px);
  background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
}

.macbody .touchpad {
  width: 40px;
  height: 31px;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 4px;
  margin: -44px 0 0 -18px;
  background: #cdcdcd;
  background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
  box-shadow: inset 0 0 3px #888;
}

.macbody .keyboard {
  width: 130px;
  height: 45px;
  position: absolute;
  left: 7px;
  top: 41px;
  border-radius: 4px;
  transform-style: preserve-3d;
  background: #cdcdcd;
  background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
  box-shadow: inset 0 0 3px #777;
  padding: 0 0 0 2px;
}

.keyboard .key {
  width: 6px;
  height: 6px;
  background: #444;
  float: left;
  margin: 1px;
  transform: translateZ(-2px);
  border-radius: 2px;
  box-shadow: 0 -2px 0 #222;
  animation: keys infinite 7s ease;
}

.key.space {
  width: 45px;
}

.key.f {
  height: 3px;
}

.macbody .pad {
  width: 5px;
  height: 5px;
  background: #333;
  border-radius: 100%;
  position: absolute;
}

.pad.one {
  left: 20px;
  top: 20px;
}

.pad.two {
  right: 20px;
  top: 20px;
}

.pad.three {
  right: 20px;
  bottom: 20px;
}

.pad.four {
  left: 20px;
  bottom: 20px;
}

@keyframes rotate {
  0% {
    transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
  }

  5% {
    transform: rotateX(-20deg) rotateY(-20deg) rotateZ(0deg);
  }

  20% {
    transform: rotateX(30deg) rotateY(200deg) rotateZ(0deg);
  }

  25% {
    transform: rotateX(-60deg) rotateY(150deg) rotateZ(0deg);
  }

  60% {
    transform: rotateX(-20deg) rotateY(130deg) rotateZ(0deg);
  }

  65% {
    transform: rotateX(-20deg) rotateY(120deg) rotateZ(0deg);
  }

  80% {
    transform: rotateX(-20deg) rotateY(375deg) rotateZ(0deg);
  }

  85% {
    transform: rotateX(-20deg) rotateY(357deg) rotateZ(0deg);
  }

  87% {
    transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
  }
}

@keyframes lid-screen {
  0% {
    transform: rotateX(0deg);
    background-position: left bottom;
  }

  5% {
    transform: rotateX(50deg);
    background-position: left bottom;
  }

  20% {
    transform: rotateX(-90deg);
    background-position: -150px top;
  }

  25% {
    transform: rotateX(15deg);
    background-position: left bottom;
  }

  30% {
    transform: rotateX(-5deg);
    background-position: right top;
  }

  38% {
    transform: rotateX(5deg);
    background-position: right top;
  }

  48% {
    transform: rotateX(0deg);
    background-position: right top;
  }

  90% {
    transform: rotateX(0deg);
    background-position: right top;
  }

  100% {
    transform: rotateX(0deg);
    background-position: right center;
  }
}

@keyframes lid-macbody {
  0% {
    transform: rotateX(-90deg);
  }

  50% {
    transform: rotateX(-90deg);
  }

  100% {
    transform: rotateX(-90deg);
  }
}

@keyframes lid-keyboard-area {
  0% {
    background-color: #dfdfdf;
  }

  50% {
    background-color: #bbb;
  }

  100% {
    background-color: #dfdfdf;
  }
}

@keyframes screen-shade {
  0% {
    background-position: -20px 0px;
  }

  5% {
    background-position: -40px 0px;
  }

  20% {
    background-position: 200px 0;
  }

  50% {
    background-position: -200px 0;
  }

  80% {
    background-position: 0px 0px;
  }

  85% {
    background-position: -30px 0;
  }

  90% {
    background-position: -20px 0;
  }

  100% {
    background-position: -20px 0px;
  }
}

@keyframes keys {
  0% {
    box-shadow: 0 -2px 0 #222;
  }

  5% {
    box-shadow: 1 -1px 0 #222;
  }

  20% {
    box-shadow: -1px 1px 0 #222;
  }

  25% {
    box-shadow: -1px 1px 0 #222;
  }

  60% {
    box-shadow: -1px 1px 0 #222;
  }

  80% {
    box-shadow: 0 -2px 0 #222;
  }

  85% {
    box-shadow: 0 -2px 0 #222;
  }

  87% {
    box-shadow: 0 -2px 0 #222;
  }

  100% {
    box-shadow: 0 -2px 0 #222;
  }
}

@keyframes shadow {
  0% {
    transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }

  5% {
    transform: rotateX(80deg) rotateY(10deg) rotateZ(0deg);
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }

  20% {
    transform: rotateX(30deg) rotateY(-20deg) rotateZ(-20deg);
    box-shadow: 0 0 50px 30px rgba(0,0,0,0.3);
  }

  25% {
    transform: rotateX(80deg) rotateY(-20deg) rotateZ(50deg);
    box-shadow: 0 0 35px 15px rgba(0,0,0,0.1);
  }

  60% {
    transform: rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px);
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }

  100% {
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }
}
 and the code is <!-- From Uiverse.io by Ashon-G --> 
<div class="macbook">
  <div class="inner">
    <div class="screen">
      <div class="face-one">
        <div class="camera"></div>
        <div class="display">
          <div class="shade"></div>
        </div>
        <span>MacBook Air</span>
      </div>
  <title>Layer 1</title>
  </div>
    <div class="macbody">
      <div class="face-one">
        <div class="touchpad">
        </div>
        <div class="keyboard">
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key space"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
          <div class="key f"></div>
        </div>
      </div>
      <div class="pad one"></div>
      <div class="pad two"></div>
      <div class="pad three"></div>
      <div class="pad four"></div>
    </div>
  </div>
  <div class="shadow"></div>
</div>
 and than is refelection effect its used on a button but u can use it in other sections /* From Uiverse.io by ShrinilDhorda */ 
.btn {
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: rgb(14, 14, 26);
  color: rgb(234, 234, 234);
  font-weight: 700;
  transition: 0.6s;
  box-shadow: 0px 0px 60px #1f4c65;
  -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4));
}

.btn:active {
  scale: 0.92;
}

.btn:hover {
  background: rgb(2,29,78);
  background: linear-gradient(270deg, rgba(2, 29, 78, 0.681) 0%, rgba(31, 215, 232, 0.873) 60%);
  color: rgb(4, 4, 38);
} this for cool logos /* From Uiverse.io by 0xnihilism */ 
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* Common styles for both buttons */
.brutalist-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 142px;
  height: 142px;
  color: #e5dede;
  font-weight: bold;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Styles for the first button */
.button-1 {
  background-color: #063525;
  border: 3px solid #42c498;
  border-radius: 12px;
  box-shadow: 4px 4px 1px #000000;
}

.button-1:hover {
  background-color: #1a5c46;
  border-color: #030504;
  transform: translate(-6px, -6px) rotate(1deg);
  box-shadow: 10px 10px 0 #000000, 15px 15px 20px rgba(64, 164, 122, 0.2);
}

.button-1::before,
.button-1::after {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: 0.6s;
}

.button-1::before {
  left: -100%;
}
.button-1::after {
  left: 100%;
}

.button-1:hover::before {
  animation: swipeRight 1.5s infinite;
}
.button-1:hover::after {
  animation: swipeLeft 1.5s infinite;
}

@keyframes swipeRight {
  100% {
    transform: translateX(200%) skew(-45deg);
  }
}

@keyframes swipeLeft {
  100% {
    transform: translateX(-200%) skew(-45deg);
  }
}

/* Hover effects */
.brutalist-button:hover .openai-logo {
  transform: translateY(-10px);
}

.brutalist-button:hover .openai-icon {
  width: 40px;
  height: 40px;
}

.bruta.brutalist-button:hover .openai-text {
  opacity: 1;
  max-height: 60px;
  margin-top: 8px;
}

/* Styles for the OpenAI logo and text */
.openai-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 3;
}

.openai-icon {
  width: 64px;
  height: 64px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.openai-text {
  font-size: 24px;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.button-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
  text-align: center;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 3;
}

.button-text span:first-child {
  font-size: 12px;
  font-weight: normal;
}

.button-text span:last-child {
  font-size: 16px;
}

/* Hover effects */
.brutalist-button:hover .openai-logo {
  transform: translateY(-10px);
}

.brutalist-button:hover .openai-icon {
  width: 40px;
  height: 40px;
}

.brutalist-button:hover .button-text,
.brutalist-button:hover .openai-text {
  opacity: 1;
  max-height: 60px;
  margin-top: 8px;
}

/* Animation for the OpenAI logo */
@keyframes spin-and-zoom {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.brutalist-button:hover .openai-icon {
  animation: spin-and-zoom 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
}

.brutalist-button:hover .openai-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.brutalist-button:active .openai-icon,
.brutalist-button:active .openai-text,
.brutalist-button:active .button-text {
  transform: scale(0.95);
}
 and the code is <!-- From Uiverse.io by 0xnihilism --> 
<div class="button-container">
  <button class="brutalist-button openai button-1">
    <div class="openai-logo">
      <svg
        class="openai-icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
          fill="#10A37F"
        ></path>
      </svg>
    </div>
    <div class="button-text">
      <span>Powered By</span>
      <span>GPT-Omni</span>
    </div>
  </button>
</div>
 and than last will be position content instead of a button /* From Uiverse.io by SelfMadeSystem */ 
.button {
  position: relative;
  cursor: pointer;
  border: none;
  width: 80px;
  height: 40px;
  background: #111;
  color: #fff;
}

.text {
  position: relative;
  z-index: 1;
}

.button::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(
      circle at 50% 50%,
      #0000 0,
      #0000 20%,
      #111111aa 50%
    ),
    radial-gradient(ellipse 100% 100%, #fff, #fff0);
  background-size:
    3px 3px,
    auto auto;
  transition: 0.3s;
}

.button:hover::before {
  opacity: 0.3;
}

.a {
  pointer-events: none;
  position: absolute;
  --w: 2px;
  --t: -40px;
  --s: calc(var(--t) * -1);
  --e: calc(100% + var(--t));
  --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
    #fff3 var(--e), #fff0;
}

.a::before {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(4px) url(#unopaq);
  z-index: -2;
}

.a::after {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(10px) url(#unopaq);
  opacity: 0;
  z-index: -2;
  transition: 0.3s;
}

.button:hover .a::after {
  opacity: 1;
}

.l {
  left: -2px;
}

.r {
  right: -2px;
}

.l,
.r {
  background: linear-gradient(var(--g));
  top: var(--t);
  bottom: var(--t);
  width: var(--w);
}

.t {
  top: -2px;
}

.b {
  bottom: -2px;
}

.t,
.b {
  background: linear-gradient(90deg, var(--g));
  left: var(--t);
  right: var(--t);
  height: var(--w);
}

.backdrop {
  position: absolute;
  inset: -9900%;
  background: radial-gradient(
    circle at 50% 50%,
    #0000 0,
    #0000 20%,
    #111111aa 50%
  );
  background-size: 3px 3px;
  z-index: -1;
}
 but this example using a button <!-- From Uiverse.io by SelfMadeSystem --> 
<svg style="position: absolute; width: 0; height: 0;">
  <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
    <feColorMatrix
      values="1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 3 0"
    ></feColorMatrix>
  </filter>
</svg>

<div class="backdrop"></div>
<button class="button">
  <div class="a l"></div>
  <div class="a r"></div>
  <div class="a t"></div>
  <div class="a b"></div>
  <div class="text">Button</div>
</button>




