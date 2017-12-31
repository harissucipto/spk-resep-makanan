const App = new Vue({
  el: '#app',
  data: {
    namaResep: '',
    descResep: '',
    kesulitanResep: '',
    lamaResep: '',
    bahanResep: [],
    langkahResep: [],
    storeResep: []
  },
  methods: {
    tambahBahan() {
      this.bahanResep.push({});
    },
    kurangiBahan() {
      if (this.bahanResep.length <= 0) return;
      this.bahanResep.pop();
    },
    tambahLangkah() {
      this.langkahResep.push({});
    },
    kurangiLangkah() {
      if (this.bahanResep.length <= 0) return;
      this.langkahResep.pop();
    },
    tambahResep() {
      const {
        namaResep,
        descResep,
        kesulitanResep,
        lamaResep,
        bahanResep,
        langkahResep
      } = this;

      const resepBaru = {
        namaResep,
        descResep,
        kesulitanResep,
        lamaResep,
        bahanResep,
        langkahResep
      };

      this.storeResep.push(resepBaru);
    }
  }
});
