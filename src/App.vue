<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/store.js'
import ImageTrailComponent from './components/imageTrail.vue'
import svg_chicle from './components/svg_chicle.vue'
import svg_pink_line from './components/svg_pink_line.vue'
import svg_yes from './components/svg_yes.vue'
import svg_no from './components/svg_no.vue'
import svg_no_white from './components/svg_no_white.vue'
import svg_garabato_1 from './components/svg_garabato_1.vue'
import svg_garabato_2 from './components/svg_garabato_2.vue'
import svg_garabato_3 from './components/svg_garabato_3.vue'
import gsap from 'gsap';

export default {
  components: {
    ImageTrailComponent,
    svg_chicle,
    svg_pink_line,
    svg_yes,
    svg_no,
    svg_no_white,
    svg_garabato_1,
    svg_garabato_2,
    svg_garabato_3
  },
  computed: {
      ...mapState( useStore, ['intro', 'svgStates', 'images', 'loaded'])
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.animateIntro()
  },
  methods: {
    ...mapActions( useStore, ['setSvgState', 'setIntro', 'fetchData']),

    animateIntro(){
      const intro = gsap.timeline({});

      // Animate hate

      const text1C = document.querySelectorAll(".text1")
      const text1 = document.querySelectorAll(".text1 div div")
      const introBack = document.querySelectorAll(".intro")
      const brand = document.querySelector(".brand")
      const brand_chicle = document.querySelector(".brand_chicle")
      const brand_studio = document.querySelector(".brand_studio")
      const header = document.querySelectorAll("header *")
      

      gsap.set(text1, {
        yPercent: 100,
      })

      gsap.set(brand, {
        yPercent: 100,
      })

      gsap.set(header, {
        autoAlpha: 0,
      })

      intro.to(text1, {
        delay: .5,
        yPercent: 0,
        duration: .8,
        stagger: .08,
        ease: "power4.out",
        onStart: () => {
          this.setSvgState('svg_chicle', true); 
       
        },
        
      }).to(introBack, {
        duration:1,
        onStart: () => {
          this.setSvgState('svg_pinkline', true);
       
        }
      }, '-=0.4').to(introBack, {
        backgroundColor: 'black',
        duration:0,
        
      }).to(text1, {
        color: '#F9FF00',
        onStart: () => {
          this.setSvgState('svg_pinkline', false);
          this.setSvgState('svg_chicle', false);
          this.setSvgState('svg_yes', true);
        }
      }, '<').to(introBack, {
        backgroundColor: '#FF92F0',
        duration:0,
      }).to(introBack, {
        backgroundColor: '#FF92F0',
        duration:.5,
        onStart: () => {
          this.setSvgState('svg_yes', false);
          this.setSvgState('svg_no', true);
        },
        
      }).to(introBack, {
        duration: .2,
        onStart: () => {
          this.setSvgState('svg_no', false);
          this.setSvgState('svg_no_white', true);
        }
      }).to(introBack, {
        duration: .2,
        onStart: () => {
          this.setSvgState('svg_garabato_1', true);
        }
      }).to(introBack, {
        duration: .2,
        onStart: () => {
          this.setSvgState('svg_garabato_2', true);
        }
      }).to(introBack, {

        duration:1,
        onStart: () => {
          this.setSvgState('svg_garabato_3', true);
        }
      }).to(introBack, {
        backgroundColor: '#F9FF00',
        duration:.2,
      }, '-=0.7').to(text1, {
        duration: 0,
        color: '#FF92F0',
      }).to(text1C, {
        duration: 0,
        zIndex: '10',
      }, '-=2').to(brand, {
        delay: .4,
        yPercent: 0,
        duration: 1.3,
        ease: "power4.out",
      }).to(brand_studio, {
        autoAlpha:0,
        overflow: "hidden",
        width: 0,
        display: "none",
        ease: "power4.out",
      }).to(brand_chicle, {
        
        height: "23vw",
        transformOrigin: "center bottom",
        ease: "power4.out",
        onComplete: () => {
          this.setSvgState('svg_no_white', false);
          this.setSvgState('svg_garabato_1', false);
          this.setSvgState('svg_garabato_2', false);
          this.setSvgState('svg_garabato_3', false);
        }
      }, '<').to(text1, {
        yPercent: 100,
        duration: 1,
        ease: "power4.in",
      }, '<-=1.5').to(introBack, {
        backgroundColor: "white",
        duration: 1,
        ease: "power4.inOut",
      }).to(header, {
        autoAlpha: 1,
        stagger: .01,
        onComplete: () => {
          this.setIntro(false)
        }
      })
    }
  }
};
</script>

<template>
  <header class="flex z-50 flex-row w-[100vw] justify-between uppercase text-center ">
    <div class="header_text md:w-[13vw]">
      <p class="text-left">Design</p>
      <p class="text-right indent-[4.3vw]">& thinking</p>
      <p>studio</p>
    </div>
    <div class="header_claim hidden md:block">
      <p>We hate <br>the obvious</p>
    </div>
    <nav>
      <ul class="flex flex-row gap-[2vw] md:w-[13vw] justify-end">
        <li><a target="_blank" href="https://www.instagram.com/marinaguadix/">IG</a></li>
        <li><a target="_blank" href="mailto:marinaguadix@gmail.com">MAIL</a></li>
      </ul>
    </nav>
  </header>

  <image-trail-component v-if="loaded" :images="this.images" class="transition-all duration-150" :class="this.intro ? 'opacity-0' : 'opacity-100'" ></image-trail-component>

  <div class="intro">
    <div class="text1">
      <div class="overflow-hidden"><div class="container-display"><p class="display">We hate</p></div></div>
      <div class="overflow-hidden"><div class="container-display"><p class="display">the obvious</p></div></div>
    </div>
    <svg_chicle v-if="svgStates.svg_chicle" class="graf chicle blur"></svg_chicle>
    <svg_pink_line v-if="svgStates.svg_pinkline" class="graf pink_line blur"></svg_pink_line>
    <svg_yes v-if="svgStates.svg_yes" class="graf yes blur"></svg_yes>
    <svg_no_white v-if="svgStates.svg_no_white" class="graf no blur"></svg_no_white>
    <svg_no v-if="svgStates.svg_no" class="graf no blur"></svg_no>
    
    <svg_garabato_1 v-if="svgStates.svg_garabato_1" class="graf garabato blur"></svg_garabato_1>
    <svg_garabato_2 v-if="svgStates.svg_garabato_2" class="graf garabato blur"></svg_garabato_2>
    <svg_garabato_3 v-if="svgStates.svg_garabato_3" class="graf garabato blur"></svg_garabato_3>
  </div>

  <div class="brand flex flex-row items-end absolute bottom-0 w-full">
    <div class="container-display brand_chicle flex w-full justify-center"><img src="./svg/logo_chicle.svg"></div>
    <div class="container-display brand_studio flex w-full justify-center"><img src="./svg/logo_studio.svg"></div>
  </div>

  
  
  
  
  
</template>

<style>


.container-display {
  height:  clamp(20px, 11vw, 150px);
  @apply
  px-2;

  .display {
    font-size: clamp(20px, 15vw, 200px);
    letter-spacing: clamp(-8px, -.5vw, -1px);
    line-height: 1.1;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: middle;
  }
}

header {
  font-size: clamp(26px, 2vw, 28px);
    letter-spacing: clamp(-1px, -.1vw, -1px);
    line-height: 1.1;
    @apply
    px-[3vw]
    py-[4vw]
    md:p-[2vw]
    w-full
    fixed
    top-0
    left-0;
}

.brand {
  @apply
    px-[3vw]
    py-[3vw]
    md:p-[2vw];
  div {
    height:  clamp(20px, 11vw, 160px);
  }
  p {
      
        @apply
        relative;
      }
      span {
        font-size: clamp(10px, 1.8vw, 25px);
        right: clamp(30px, 8vw, 108px);
        top: clamp(0px, 0.8vw,10px);
        @apply
        absolute;
      }
}
.intro {
    height: 100dvh;
    @apply
    w-full
    m-auto
    flex
    justify-center
    items-center
    text-center;

    .text1 {
      font-family: 'Founders';
      /* font-size: clamp(20px, 10vw, 200px);
      line-height: clamp(10px, 10vw, 200px);
      letter-spacing: -.2vw; */
     
      @apply
      flex
      flex-col
      overflow-hidden
      uppercase
      m-0;
      
    }

    svg {
      @apply
      pointer-events-none;
      g {
        
      }
      path {
        stroke-miterlimit: "0"!improtant; 
        stroke-linecap: "round";
        stroke-width: 60px;
        @media (max-width: 700px) {
          stroke-width: 70px;
        }
      }
    }

  .graf {
    @apply
    w-full
    absolute
    left-0;
  }
  .chicle {
    bottom: calc(50vh - 5vw);
    @media (max-width: 700px) {
      bottom: calc(50vh - 45vw);
    }
  }

  .pink_line {
    top: calc(50vh + 5vw);
    @apply
    absolute
    left-0;
    @media (max-width: 700px) {
      top: calc(50vh - 12vw);
    }
  }

  .garabato {
    transform: scale(5);
   @apply
   md:scale-150;
  }

  .blur {
    @apply
    blur-[3px]
    md:blur-md;
  }

   
}

a {
  @apply
  transition-all;
  &:hover {
    @apply
    blur-[1px];
  }
}



  
</style>
