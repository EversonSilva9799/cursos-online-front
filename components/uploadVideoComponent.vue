<template>

  <div class="box-upload">
    <h1 class="title">Faça Upload para Este Curso</h1>
    <span @click="closeForm()" class="close">X</span>
    <form class="formUpload" @submit.prevent="submitFiles" action=""  enctype="multipart/form-data">
        <label for="file" class="selecionar">Selecionar</label>
        <input type="file" id="file" style="display: none" ref="myFiles" class="file" multiple @change="previewFiles">
        <input class="btn" type="submit" value="Upload">
        {{ uploadPercentage }}
    </form>



  </div>




</template>

<script>
export default {

  props: {
    idCourse: {
      required: true
    }
  },

  data() {
    return {
      files: null,
      uploadPercentage: 0,
      videos: []
    }
  },

  methods: {
      closeForm() {
        const boxUpload = document.getElementsByClassName('box-upload')[0];
        boxUpload.style.display = 'none';
      },

    async submitFiles(){
        /*
          Initialize the form data
        */
        let formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          formData.append('files[' + i + ']', file);
        }



        // for (var value of formData.values()) {
        //   console.log(value);
        // }
        // return true;





        /*
          Make the request to the POST /multiple-files URL
        */
       //for (var value of formData.values()) {
       try {
         await this.$axios.post( `http://127.0.0.1:3333/courses/${this.idCourse}/videos`,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function( progressEvent ) {
              this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
            }.bind(this)
          });
          this.$emit('newvideos');

       }

       catch (error) {
         console.log(error);
       }

      },

      previewFiles() {
        this.files = this.$refs.myFiles.files;

      },


  }

}
</script>

<style scoped>

.title {
  padding: 10px 0 30px 0;
  text-align: center;
  font-size: 1.3em;
}

.close {
  color: red;
  font-size: 1.4em;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  background: #fff;
  padding: 4px;
}

.close:hover {
  font-weight: 600;
}

.box-upload {
  width: 400px;
  max-width: 100%;
  background: #eff3f9;
  /* height: 140px; */
  padding: 10px 0 0 0;
  box-shadow: 1px 2px 5px black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

  .formUpload {
    width: calc(100%);
    margin: 0 auto;
  }
  .selecionar {
    /* text-align: center; */
    padding: 12px 15px;
    margin: 0 auto;
    display: block;
    width: 120px;
    border-radius: 10px;
    color: #fff;
    font-size: 1.2em;
    cursor: pointer;
    background: rgb(29, 26, 26);
  }

  .formUpload input {
    /* display: block;
    height: 37px;
    margin: 0 auto 30px auto; */
  }


.btn {
  width: 100%;
  max-width: 100%;
  border: none;
  height: 40px;
  text-align: center;
  padding-top: 5px;
  font-size: 1.1em;
  background: #4280f4;
  color: white;
  margin: 20px auto 0 auto;
  cursor: pointer;
}



</style>


