import { defineStore } from 'pinia';
import { gsap } from "gsap";
import anime from 'animejs';

export const useStore = defineStore('store', {
    state: () => ({
      intro: true,
      svgStates: {}
     
    }),
    getters: {
    },
    actions: {
        // async fetchData() {
        //     try {
        //         let response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=KB69RUqjZ8gBYSrEzYC38njuPOL5JxHeKyOfgTHKXDKVHPHDQW2lKXB3b6-mYJSaN1pj2i57mkjt1FEL7Q-aPNIX9OIyPVtSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPBJTDxdTFGd_7xWdUp2pRcUMOkvhJras2m57cyH16Q7r33u9qjxKHtlvE9_oyKsOMyD4Btlz2tsuxptRjGWTtPLmBTVK5tbAtz9Jw9Md8uu&lib=MK7W_QqRaw6yysaSkdZIloXe3xnvQUYfV");
        //         let data = await response.json();
        //         console.log(data);
        //         this.dataLorenzo = data['Lorenzo de Nicola'];
        //         this.dataSanti = data['Santi Sánchez'];
        //         this.dataPaula = data['Paula Grácia'];
        //         this.dataDuna = data['Duna Vallés'];
        //         this.autores =  data['Autorxs'];
               
        //       }
        //       catch(error) {
        //         console.log(error);
        //       }
        //       finally {
        //         this.dataReel = [...this.dataLorenzo,...this.dataDuna,...this.dataSanti,...this.dataPaula],
        //         this.dataReelRandom = this.dataReel.sort((a, b) => Math.random() - 0.5);
        //         console.log("done")
        //         // console.log(this.loading)
        //         this.loading = false;
        //       }
        //   },
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