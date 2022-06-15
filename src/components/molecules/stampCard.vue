<template>
<div id="stampCard" class="card">
    <!-- Cover -->
    <div class="card__cover">
        StampName
        <img class="card_image" src="../../assets/IMG_1122.JPG"/>
        <!--<img src="data:image/png;base64,{{ info.image }}" />-->
    </div>

    <!-- Content -->
    <div class="card__content">
        updated: {{ info.data.time.updated }}
        
    </div>
    
</div>
</template>


<script>
import axios from 'axios'

export default {
    data(){
    return{
      info: [],
      error: [],
    }
  },
  mounted(){
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then( response =>  this.info = response )
      .catch( e => this.error = e )
  }
}
</script>

<style>
.card {
    display: flex;
    flex-direction: column;
    margin: 10px;
}

.card__cover {
    height: 200px;
    width: 170px;
    background-color: #6B818E;
}

.card__content {
    width: 170px;
    /* Take available height */
    flex: 1;
    background-color: azure;
}

.card_image {
    flex: 1;
    padding: 5px;
}
</style>