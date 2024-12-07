import { defineStore } from 'pinia';
import { gsap } from "gsap";
import anime from 'animejs';

export const useStore = defineStore('store', {
    state: () => ({
      intro: true,
      loaded: false,
      svgStates: {},
      images: []
    }),
    getters: {
    },
    actions: {
        async fetchData() {
            try {
                let response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=9twcaEJf3S-ul_8A6aqE4ZYmxd6NSK0huAoKNw6uPDiBCX5Asi8oiEVqxLHKWtefY1U9iIeCbYaw1kmMWw6tKyuHq_ENEMNUm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAYaHezN6Hztce_sYVcfiBZ9Imyfq85sl3M396_M5SM1wMullZNm8-S2NN7k6spnv9-2jSqTPWlMKHtRAb8WIkbU69YuRbM8Vw&lib=MKb_74J-mqDSAmHmvozzKOofY3cMdV-Io");
                let data = await response.json();
                console.log(data);
                this.images = data['Chicle'];

               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.images)
                this.loaded = true
                console.log(this.loaded)
              }
          },
        drawSVG(svgElement, speed) {
          const chicleDrawing = anime({
              targets: svgElement.querySelectorAll('path'),
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: 'easeInOutCubic',
              duration: speed,
              begin: function (anim) {
                  console.log("Animation started");
              },
              complete: function (anim) {
                  console.log("Animation completed");
              },
              autoplay: false,
          });
          chicleDrawing.restart();
      },
      // observeVisibility() {
      //     const observer = new IntersectionObserver(
      //         (entries) => {
      //             entries.forEach((entry) => {
      //                 if (entry.isIntersecting) {
      //                     this.drawSVG();
      //                 }
      //             });
      //         },
      //         { threshold: 0.1 } // Ejecutar cuando el 10% del componente esté visible
      //     );
      //     observer.observe(this.$el); // Observa el elemento raíz del componente
      // },
      setSvgState(svgName, value) {
        this.svgStates[svgName] = value;  // This will correctly update the state
      },
      setIntro(value) {
        this.intro = value;
      },
    },
    
})