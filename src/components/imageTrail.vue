<template>
    <div class="absolute top-0 left-0 w-full h-full">
        <div ref="imageTrail" class="image-trail">
      <!-- Inserta las imágenes que formarán parte del rastro -->
      <img class="content__img" src="../assets/image.png" alt="Image 1" />
      <img class="content__img" src="../assets/image.png" alt="Image 2" />
      <img class="content__img" src="../assets/image.png" alt="Image 3" />
      <img class="content__img" src="../assets/image.png" alt="Image 1" />
      <img class="content__img" src="../assets/image.png" alt="Image 2" />
      <img class="content__img" src="../assets/image.png" alt="Image 3" />
      <img class="content__img" src="../assets/image.png" alt="Image 1" />
      <img class="content__img" src="../assets/image.png" alt="Image 2" />
      <img class="content__img" src="../assets/image.png" alt="Image 3" />
      <!-- Agrega más imágenes según sea necesario -->
    </div>
    </div>
    
  </template>
  
  <script>
  import { ImageTrail } from '../classes/ImageTrail.js';
  
  export default {
    name: 'ImageTrailComponent',
    mounted() {
      // Obtén el contenedor del rastro desde el DOM
      const imageTrailElement = this.$refs.imageTrail;
  
      // Inicializa la clase ImageTrail
      new ImageTrail(imageTrailElement);
    },
  };
  </script>
  
  <style>
  .image-trail {
    position: relative;
    overflow: hidden;
    height: 100dvh;
    width: 100vw;
  }
  .content__img {
    position: absolute;
    @apply
    w-96
    origin-center;
    will-change: transform, opacity;
  }
  </style>