<template>
  <!-- Typing field -->
  <div class="container">

    <div class="columns">
      <!-- Load side menu component -->
      <SideMenu :language="language"></SideMenu>

      <div class="column is-8">
        <div class="box">
          <div v-show="startFlag">
            <div class="question">{{question}}</div>
            <!-- <div class="trans">{{trans}}</div> show translation or explanation. currently not available-->
            <textarea ref="typedarea" class="textarea typedtxt" wrap="soft" placeholder="type here" autofocus readonly>{{typed}}</textarea>
          </div>

          <div v-show="!startFlag">
            <p class="is-size-2">Ready?</p>
            <p class="is-size-5">Change your keyboard language to {{language}}.</p>
            <button class="button is-danger is-medium is-rounded mt-5" v-on:click="start">Go! - Press Enter Key</button>
          </div>

          <form>

            <div class="mistyped">{{mistyped}}</div>
          </form>
        </div>



      </div>
      <div class="column">
        <div class="box">
          <div class="">No: {{ qNumber }} / 15 </div>
          <div class="">Rate: {{ fineRate }} %</div>
          <div class="">Total: {{ totalTime/10 }} sec</div>
          <div class="">Rap: 10 sec </div>

          <progress class="progress is-success" v-bind:value="sec" max="100">{{ sec }}</progress>
          <div class="buttons">
            <button class="button is-info is-fullwidth" v-on:click="stop">
              <span class="icon">
                <i class="fas fa-pause"></i>
              </span>
              <span>Stop</span>
            </button>
            <button class="button is-success is-fullwidth" v-on:click="skip">
              <span class="icon">
                <i class="fas fa-forward"></i>
              </span>
              <span>Skip</span>
            </button>
            <button class="button is-warning is-fullwidth" v-on:click="reset">
              <span class="icon">
                <i class="fas fa-redo-alt"></i>
              </span>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-bind:class="modal">
      <div class="modal-background" @click="modalOff"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Result</p>
          <button class="delete" aria-label="close" @click="modalOff"></button>
        </header>
        <section class="modal-card-body">
          <p class="is-size-5">CPM(characters per minute): {{cpm}}</p>
          <p class="is-size-5">Accuracy Rate: {{fineRate}} %</p>
          <p class="is-size-5">Keys that you've often mistyped:</p>
                <ul class="result_ul">
                <li v-for="(item, index) in ngTotal" class="result_mistype">
                {{ item.key }}
              </li>
            </ul>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="modalOff">OK</button>
          <button class="button is-info" @click="shareResult">
            <span class="icon">
              <i class="fas fa-share-alt"></i>
            </span>
            <span>Share to Twitter</span>
          </button>

        </footer>
      </div>


    </div>

  </div>



</template>

<script>
import SideMenu from '@/components/SideMenu'
export default {
  name: 'game',
  components: {
    SideMenu,
  },
  data () {
    return {
      language: '',
      question: '',
      questions_all: [],
      trans: '',//translation or explanation currently not available
      trans_all: '', //translation or explanation currently not available
      typed: '',
      mistyped: '',
      charnum: 0,
      maxchar: 0,
      wordtoArray: "",
      typeCount: 0,
      qNumber: 0,
      mistypedKeys: [],
      ngTotal: [],
      startTime: null,
      totalTime: 0,
      rapTime: 0,
      sec: null,
      timerId: 0,
      totalCharnum: 0,
      okCount: 0,
      totalNg: 0,
      startFlag: false,
      stopFlag: false,
      fineRate: 100,
      cpm: 0,
      modal: "",
      languageList: false,
    }
  },
  created: function() {
    this.language = this.$route.params.lang;
    if(!this.language){
      this.language = "English";
    }
    this.language = this.language.charAt(0).toUpperCase() + this.language.slice(1);
    //Load csv file for questions
    fetch('/static/' + this.language + '.csv')
    .then(res => res.text())
    .then(data => (this.questions_all = this.convertCsvStringToArray(data)));

  },
  mounted: function() {
    document.addEventListener('keydown', this.onKeyDown);
  },
  methods: {
    //extract randomly 15 words from all words
    convertCsvStringToArray(str) {
      str = str.split("\n").filter(Boolean);
      var arr = [];
      for (let i = 0 ; i < 15 ; i++){
        let num = Math.floor(Math.random() * str.length) + 1;
        arr.push(str[num]);
      }
      return arr;
    },
    newQuestion: function() {
        if(this.qNumber == this.questions_all.length){
          this.completeWindow();
        } else {
        this.question = this.questions_all[this.qNumber];
        this.typed = "";
        this.charnum = 0;
        this.maxchar = this.question.length;
        this.wordtoArray = this.question.split("");
      }
    },
    modalOff: function() {
      if (this.modal == "is-active"){
        this.modal = "";
        this.reset();
      }else{
        this.modal = "is-active";
      }

    },
    start: function() {
      this.startFlag = true;
      this.newQuestion();
      this.run();
    },
    selectLanguage: function() {
      if(this.languageList){
        this.languageList = false;
      } else {
        this.languageList = true;
      }
    },
    completeWindow: function() {
      //count mistyped keys by characters
      var count = {};
      for (var i = 0; i < this.mistypedKeys.length; i++) {
        var elm = this.mistypedKeys[i]['key'];
        count[elm] = (count[elm] || 0) + 1;
      }
      //sort mistyped keys
      this.ngTotal = this.sortObject(count);
      this.ngTotal.splice(3,this.ngTotal.length - 3);
      //show Modal
      this.modal = "is-active";
    },
    sortObject: function(obj) {
            var arr = [];
            var prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arr.push({
                        'key': prop,
                        'value': obj[prop]
                    });
                }
            }
            arr.sort(function(a, b) {
                return a.value - b.value;
            });
            arr.reverse();
            return arr; // returns array
    },
    shareResult: function() {
      var txt = "[Language]" + this.language + " [CPM]" + this.cpm + " [Accuracy Rate]" + this.fineRate;
      window.open('https://twitter.com/share?hashtags=TypingUpPro&url=https%3A%2F%2Ftyping-up.pro&text='+ txt, '_blank');
    },
    skip: function(){
      if(this.startFlag){
        this.qNumber += 1;
        this.sec = 0;
        this.newQuestion();
      }
    },
    reset: function(){
      window.location.reload() ;
    },
    //time count
    run: function() {
        this.timerId = setTimeout(() => {
          if(this.sec > 100){
            this.totalTime += 100;
            this.sec = 0;
            this.run();
          } else {
            this.sec += 1;
            this.run();
          }
        }, 100)

    },
    stop: function() { //stop timecount
      if(this.stopFlag && this.startFlag){
        this.stopFlag = false;
        this.run();
      } else {
        this.stopFlag = true;
        window.clearTimeout(this.timerId);
      }
    },
    onKeyDown: function(e) {
      //before game start
      if(!this.startFlag){
        if(e.key == "Enter"){
          this.start();
        }
      } else if(!this.stopFlag) {
        this.totalCharnum += 1;
        //if typed character is correct
        if(this.wordtoArray[this.charnum] == e.key){
          this.typed += e.key;
          this.mistyped = "";
          this.charnum += 1;
          this.okCount +=1;

          //success: last character is typed
           if(this.charnum == this.maxchar){
             this.qNumber += 1;
             this.fineRate = Math.floor(this.okCount/this.totalCharnum *100);
             this.totalTime += this.sec;
             this.cpm = Math.floor(this.okCount/(this.totalTime/10/60));
             this.sec = 0;
             this.newQuestion();
           }
           //if key is mistyped
        } else if(e.key != "Enter") {
          this.mistyped = e.key;
          this.totalNg += 1;
          this.mistypedKeys.push({ key: e.key})
        }

      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
