const App = new Vue({
  el: '#app',
  data: {
    lihatTambahResep: false,
    lihatListResep: true,

    namaResep: '',
    descResep: '',
    kesulitanResep: '',
    lamaResep: '',
    bahanResep: [],
    langkahResep: [],

    storeResep: [
      {
        namaResep: 'ayam bekatul',
        descResep: 'ayam yang sangat enak',
        kesulitanResep: '1',
        lamaResep: '2',
        bahanResep: [
          { nama: 'ayam', banyak: '2 kg' },
          { nama: 'nasi', banyak: '1kg' },
          { nama: 'ubi', banyak: '1kg' }
        ],
        langkahResep: [{ nama: 'kurangi bumbu' }, { nama: 'tambah bumbu' }]
      }
    ]
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
      if (!this.namaResep) {
        alert('Nama Resep Harus dimasukan');
        return;
      }

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
      this.hapusForm();
    },
    hapusForm() {
      this.namaResep = '';
      this.descResep = '';
      this.kesulitanResep = '';
      this.lamaResep = '';
      this.bahanResep.splice(0);
      this.langkahResep.splice(0);
    }
  }
});
