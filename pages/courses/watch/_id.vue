<template>
  <main class="container">


    <!-- Player do vídeo -->
    <div class="grid-8">
      <video id="video" width="98%" height="500" preload="auto" poster="https://lh3.googleusercontent.com/06BCcW6rW0Lh0f8Wa51IJPuAfXzmmVmj6ip6r9whuRgG-dJQjBdytmZ0K1EMxF8CGy4" controls >
         <source :src="url"  type="video/mp4">
         Your browser does not support the video tag.
      </video>

      <p class="name-video-atual"  v-if="nameVideo">{{ nameVideo | nameFilter }}</p>
    </div>

    <!--  Lista de vídeos do curso -->
    <div class="grid-4">
      <button @click="activeForm()" class="btn" v-once>Upload</button>
      <div class="info-course">
        <h1 class="nameCourse">{{ nameCourse }}</h1>
        <p class="qtd-videos">{{ videosAssistidos }}/{{totalVideos  }}</p>
      </div>
      <ul class="lista-videos">
        <li v-for="video of videos" :key="video.id">

          <span class="nameVideo" @click="newVideo(video.url, video.name, video.id),
          getComments(id_video_atual), videoActive($event)">{{ video.name | nameFilter }}</span>

          <button class="btn-completed" :class="{'btn-completed-color': video.completed}"
            @click="complete($event.srcElement.offsetParent, video.id, video.completed, video.course_id)">
            <i class="fa fa-check ckeck" aria-hidden="true"></i>
          </button>

        </li>
      </ul>
    </div>

    <!-- Compoenente para upload de vídeos para o curso atual -->
    <div class="grid-12">
      <uploadVideoComponent @newvideos="show" style="display: none" :idCourse="id" :nameCourse="nameCourse"></uploadVideoComponent>
    </div>

    <!-- Adiciona um comentário ao vídeo que está em execução -->
    <div class="grid-12" >
      <formComments v-if="id_video_atual"  :video_id="id_video_atual"
       @newcomments="getComments(id_video_atual)"></formComments>
    </div>

    <!-- Lista os comentários do vídeo em execução -->
    <!-- <div v-if="comments.length > 0">
      <videoComments :comments="comments"></videoComments>
    </div> -->

  <div class="list-comments grid-8">

    <div class="box-comment" v-for="comment of comments" :key="comment.id">
      <h2 class="title">{{ comment.title }}</h2>
      <span class="date-comment">{{ comment.created_at }}</span>
      <div class="content" v-html="comment.content"></div>
    </div>
  </div>

  </main>
</template>

<script>

import uploadVideoComponent from '~/components/uploadVideoComponent';
import formComments from '~/components/formComments';
import videoComments from '~/components/videoComments';

export default {
    layout: 'page',

    components: {
      uploadVideoComponent,
      formComments,
      videoComments
    },

    data() {

      return {

        nameCourse: null, // Nome do curso atual
        totalVideos: null,  // Total de vídeos no curso
        videosAssistidos: null, // Total de vídeos que já foram assistidos
        videos: [], // lista de vídeos do curso
        id_video_atual: null, // ID do vídeo que está em execução
        beforeEventNameCourse: null, // Guarda o evento do nome do curso clicado
        nameVideo: null, // Nome do vídeo que está em execução
        comments: [], // Comentários do vídeo em execução
        url: null, // Url do vídeo em execução
        id: null // Id do curso

      }
    },

    filters: {

      /**
       * Melhora a visualização do nome do vídeo
       */
      nameFilter: function(name) {
        name = name.toLowerCase()
        return name.replace('.mp4', '');
      }

  },


    created() {
      this.id = parseInt(this.$route.params.id);
      this.show();

    },

    methods: {

      /**
       *  Pega todos os vídeos daquele curso no banco de dados
       */
      async show() {
        try {
          const res = await this.$axios.get('courses/' + this.id);
          this.nameCourse = res.data.name;

          // pegando a lista de vídeos do curso
          this.videos = res.data.videos

          // Pegando o total de vídeos e o total de vídeos assistidos
          this.totalVideos = res.data.qtd_videos;
          this.videosAssistidos = res.data.complete_videos;


          //Ordenando a lista de visualização de vídeos
          this.orderVideos(this.videos);

          // Carrega o primeiro vídeo da lista de cursos quando o curso é clicado
          if (this.id_video_atual == null) {
            this.loadFistVideo();
          }

        } catch (error) {
          console.log(error);
        }
      },

      async loadFistVideo() {
        if (this.videos.length > 0) {
            this.url = this.videos[0].url;
            this.nameVideo = this.videos[0].name;
            if (process.client) {
              this.loadVideo();
            }

            this.id_video_atual = await this.videos[0].id
            this.getComments(this.id_video_atual);
          }

      },

      async orderVideos(videos) {
        videos.sort(function(a ,b) {
          return (a.path.match(/[0-9]+/) - b.path.match(/[0-9]+/))
        });
      },

      /**
       * Pega os comentários daquele vídeo
       */
      async getComments(id_video) {
        try {
          const res = await this.$axios.get('videos/comments/' + id_video);
          this.comments = res.data.comments;

        } catch (error) {
          console.log(error);
        }

      },

      //Verifica se um vídeo está concluído e marca como concluído
      async isComplete(completed) {
        if (completed == 1) {
           return await true;
        }

      },


      /**
       * Método para enviar o status atual de um vídeo para o servidor
       * se status enviado for 1, o vídeo foi concluído,
       * se status enviado for 0, o vídeo foi desmarcado
       *
       * params: id - Id do vídeo clicado
       * params: status - Status atual do video
       * params: course_id - Id do curso ao qual pertence o vídeo
       */
      async complete(button, id, status, course_id) {
        //console.log(event);

        try {
          button.classList.add("hide-button");


          if (status == 0) {
            const res = await this.$axios.post('videos/completed',
            {
              "id_video" : id,
              "status": "1",
              "course_id": course_id
            });

          }
          else if(status == 1) {
            const res = await this.$axios.post('videos/completed',
            {
              "id_video" : id,
              "status": "0",
              "course_id": course_id
             });
          }

          // Este método é chamado para atualizar a lista de vídeos,
          // marcando como concluído ou não depois de chamada a
          this.show();

        } catch (error) {
          console.log(error);
        }
        finally {

        }

      },


      /**
       * Pega a url da aula clicada e chama uma função para iniciar o player
       *
       * params: url - url do vídeo clicado
       * params: nameVideo - Nome do vídeo clicado
       */
      newVideo(url, nameVideo, video_id) {
        this.url = url;
        this.id_video_atual = video_id;
        this.nameVideo = nameVideo;
        this.playVideo();
      },


      /**
       * Função responsável por iniciar o player quando o usuário clicar em uma aula
       */
      playVideo() {
        let video = document.getElementById('video');
        video.load();
        video.play();
      },

       loadVideo() {
        let video = document.getElementById('video');
        video.load();

      },

      /**
       * Muda a aparência do nome do vídeo em execução
       */
      async videoActive(event) {

        if (this.beforeEventNameCourse === null) {
           this.beforeEventNameCourse = event.target;
           event.target.setAttribute('id', 'video-active');
        }
        else {
          event.target.setAttribute('id', 'video-active');
          this.beforeEventNameCourse.removeAttribute("id");
          this.beforeEventNameCourse = event.target;

        }
      },


      /**
       * Faz aparecer o modal de Upload de vídeos
       */
      activeForm() {
        const boxUpload = document.getElementsByClassName('box-upload')[0];
        boxUpload.style.display = 'block';
      },







    },

    computed: {

    },



}



</script>

<style scoped>

.info-course {
  width: 100%;
  border-radius: 3px;
  padding: 20px 0;
  margin-top: 8px;
}

.nameCourse {
  text-align: center;
  color: rgb(156, 154, 154);
  font-size: 1.8em;
  font-weight: 500;
  text-shadow: 1px 2px 3px #4286f4;
  margin: 0px 0 10px 0;
}

.qtd-videos {
  text-align: center;
  font-weight: 500;
  font-size: 1.3em;
}

#video-active {
  color: rgb(66, 64, 64);
  font-weight: 700;
}

.btn-completed {

  display: inline-block;
  width: 23px;
  height: 23px;
  border: 1px solid #bec1c6;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  cursor: pointer;
}

.btn-completed-color {
  background-color: #42f453;
}

.ckeck {
  font-size: 1em;
  color: #fff;
  position: relative;
  left: -1px;
  bottom: 0px;
}

.hide-button {
  display: none;
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
  outline:none;
}


.name-video-atual {
  font-size: 1.3em;
  font-weight: 400;
}

.icon-full-video {
  position: relative;
  bottom: 260px;
  padding: 10px 0;
  cursor: pointer;
}

.lista-videos {
  height: 368px;
  overflow-y: auto;
}


.lista-videos::-webkit-scrollbar { width:13px; background:#e3e0d6; } /* configurando scroll */
.lista-videos::-webkit-scrollbar-track { background: rgba(228, 213, 213, 0.1); }
.lista-videos::-webkit-scrollbar-thumb { border-radius:10px; background:#4286f4;  }

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

/* component comments */

.list-comments {
    padding-top: 60px;
}

  .box-comment {
    margin-bottom: 20px;
  }

  .date-comment {
    font-size: 1em !important;
    margin-bottom: 22px;
    display: block;
  }

  .title {
    color: rgb(124, 125, 127);
    font-size: 1.8em;
    font-family: Arial, Helvetica, sans-serif;

  }

  .content {
    max-width: 100%;
    border-bottom: 2px solid #4286f4;
    padding-bottom: 15px;
    font-size: 1.1em;
    line-height: 1.4em;
  }



@media only screen and (max-width: 980px) {
    .grid-8 {
      width: calc(100%);
      margin: 0;
    }

    .grid-4 {
      width: calc(100% - 20px);
    }

    #video {
      height: 320px;
      width: 100%;
      margin-top: 0;
      border: 1px solid #000;


    }

    .lista-videos .nameVideo {
      max-width: 300px;
    }

}

</style>


