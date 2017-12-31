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
      const inputanBahan = { nama: '', banyak: '' };
      this.bahanResep.push({ inputanBahan });
    },
    kurangiBahan() {
      if (this.bahanResep.length <= 0) return;
      this.bahanResep.pop();
    },
    tambahLangkah() {
      const inputanLangkah = { nama: '' };
      this.langkahResep.push({ inputanLangkah });
    },
    kurangiLangkah() {
      if (this.bahanResep.length <= 0) return;
      this.langkahResep.pop();
    },
    tambahResep() {}
  }
});
