<template>
  <div class="container">


    <div class="grid-8">
      <video id="video" width="100%" height="500" controls>
         <source  :src="url"  type="video/mp4">
      </video>
    </div>


    <div class="grid-4">
      <button @click="activeForm()" class="btn" >Upload</button>
      <h1 class="nameCourse">{{ nameCourse }}</h1>
      <ul class="lista-videos">
        <li v-for="video of videos" :key="video.id">
          <span class="nameVideo" @click="newVideo(video.url)">{{ video.path }}</span>
          <span class="btnCompleted" v-if="isComplete(video.completed)"
          :style="btnCompleted"  @click="complete(video.id, video.completed)">
            <i class="fa fa-check ckeck" aria-hidden="true"></i>
          </span>

        </li>


      </ul>
    </div>

    <div class="grid-12">
      <uploadVideoComponent @newvideos="show" style="display: none" :idCourse="id"></uploadVideoComponent>
    </div>
  </div>
</template>

<script>

import uploadVideoComponent from '~/components/uploadVideoComponent';

export default {
    layout: 'page',

    components: {
      uploadVideoComponent
    },

    data() {

      return {

        nameCourse: null,
        numeros: 5,
        videos: [],
        btnCompleted: "background-color: ",
        file: [],
        url: null,
        id: null

      }
    },


    created() {
      this.id = parseInt(this.$route.params.id);
      this.show();
    },

    methods: {

      //Lista todos os vídes daquele curso
      async show() {
        try {
          const res = await this.$axios.get('http://127.0.0.1:3333/courses/' + this.id);
          this.nameCourse = res.data.name;
          this.videos = res.data.videos;


          //Ordenando a lista de visualização de vídeos
          this.videos.sort(function(a ,b) {
            return (a.path.match(/[0-9]+/) - b.path.match(/[0-9]+/))
          });

        } catch (error) {
          console.log(error);
        }
      },

      //Verifica se um vídeo está concluído e marca como concluído
      async isComplete(completed) {
        if (completed == 1) {
          this.btnCompleted = "background: #42f453";
        }
        else {
          this.btnCompleted = "background: ";
        }

      },


      //Conclui um vídeo
      async complete(id, status) {

        try {
          if (status == 0) {
            const res = await this.$axios.post('http://127.0.0.1:3333/videos/completed',
            {
              "id_video" : id,
              "status": "1"
            });

          }
          else if(status == 1) {
            const res = await this.$axios.post('http://127.0.0.1:3333/videos/completed',
            {
              "id_video" : id,
              "status": "0"
             });
          }

          this.show();

        } catch (error) {
          console.log(error);
        }

      },

      //Pega a url da aula clicada e chama uma função para iniciar o player
      newVideo(url) {
        this.url = url;
        this.playVideo();
      },

      // Função responsável por iniciar o player quando o usuário clicar em uma aula
      playVideo() {
        let video = document.getElementById('video');
        video.load();
        video.play();
      },

      //Faz aparecer o modal de Upload de vídeos
      activeForm() {
        const boxUpload = document.getElementsByClassName('box-upload')[0];
        boxUpload.style.display = 'block';
      },



    },

    computed: {


      alternateActiveVideo() {

        let clicadoAnterior;
        const nameVideo = document.querySelectorAll('.nameVideo');

        for (let i = 0; i < nameVideo.length; i++) {
          nameVideo[i].addEventListener('click', function() {

            this.style.color = 'rgb(0, 160, 0)';
            this.style.fontWeight = "700";
            if (typeof clicadoAnterior ==  'undefined') {

			      }
            else {
              clicadoAnterior.style.color = '';
            }

            clicadoAnterior = nameVideo[i];

          }, false);
        }

      }
    },



}



</script>

<style scoped>

.nameCourse {
  text-align: center;
  margin: 0px 0 10px 0;
}

.btnCompleted {

  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #bec1c6;
  border-radius: 50%;
  position: absolute;
  /* margin: auto 0 auto 0;
  right: 5px; */
  top: 60%;
  left: 95%;
  transform: translate(-60%, -80%);
  cursor: pointer;
}

.ckeck {
  font-size: 0.8em;
  color: #fff;
  position: relative;
  left: 2px;
  bottom: 2px;
}

.btn {
  width: 95px;
  height: 35px;
  display: inline-block;
  text-align: center;
  padding-top: 3px;
  font-size: 1.1em;
  background: #33363a;
  color: white;
  margin-top: 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

#video {
  margin-top: 20px;
}

.lista-videos {
  height: 420px;
  overflow-y: auto;


}

.lista-videos li {
  padding: 10px 0;
  border-bottom: 2px solid #272f3d;

  font-size: 0.9;
  color: #6d6f72;
  position: relative;
}

.lista-videos .nameVideo {
  cursor: pointer;
  display: inline-block;
  max-width: 330px;
}

.lista-videos li span:hover {
  color: black;
  font-weight: 600;
}


@media only screen and (max-width: 980px) {
    .grid-8, .grid-4 {
      width: calc(100% - 20px);
    }

    #video {
      height: 300px;
    }

  }

</style>


