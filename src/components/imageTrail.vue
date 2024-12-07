
  
  <script>
  import { ImageTrail }  from '../classes/ImageTrail.js';
  import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/store.js'

  export default {
    name: 'ImageTrailComponent',
    props: {
      images: Object,
    },
    computed: {
      ...mapState( useStore, ['loaded', 'image'])
    },
    data() {
      return {
          photoUrl: 'https://drive.google.com/thumbnail?id=',
      }
    },
    created() {
      console.log(this.images)
    },
    mounted() {
      // La variable cambió a true
      this.$nextTick(() => {
            // Obtén el contenedor del rastro desde el DOM
      const imageTrailElement = this.$refs.imageTrail;
  
      // Inicializa la clase ImageTrail
      new ImageTrail(imageTrailElement);
      });
      
    },
    
  };
  </script>

<template>
  <div class="absolute top-0 left-0 w-full h-full">
      <div ref="imageTrail" class="image-trail">
    <!-- Inserta las imágenes que formarán parte del rastro -->
    <img v-for="image in this.images" class="content__img" :src="this.photoUrl + image.image + '&sz=w600-h600'" />
    <!-- <img class="content__img" src="../assets/image.png" alt="Image 2" />
    <img class="content__img" src="../assets/image.png" alt="Image 3" />
    <img class="content__img" src="../assets/image.png" alt="Image 1" />
    <img class="content__img" src="../assets/image.png" alt="Image 2" />
    <img class="content__img" src="../assets/image.png" alt="Image 3" />
    <img class="content__img" src="../assets/image.png" alt="Image 1" />
    <img class="content__img" src="../assets/image.png" alt="Image 2" />
    <img class="content__img" src="../assets/image.png" alt="Image 3" /> -->
    <!-- Agrega más imágenes según sea necesario -->
  </div>
  </div>
  
</template>
  
  <style>
  .image-trail {
    position: relative;
    overflow: hidden;
    height: 100dvh;
    width: 100vw;
    overflow: hidden;
  }
  .content__img {
    position: absolute;
    @apply
    w-96
    origin-center;
    will-change: transform, opacity;
  }
  </style>