const App = new Vue({
  el: '#app',
  data: {
    // status page
    lihatTambahResep: false,
    lihatListResep: true,

    // form tambah resep
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
    ],

    // pencarian berdasrakan bahan
    newBahan: '',
    queryBahan: [],
    hasilQueryBahan: []
  },
  methods: {
    // fungsi untuk halaman tambah resep
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
    },

    // fungsi untuk pencarian berdarakan bahan
    masukanBahan() {
      this.queryBahan.push(this.newBahan);
      this.newBahan = '';
    },
    hapusBahan(index) {
      this.queryBahan.splice(index, 1);
    },
    cariResepBahan() {
      this.hasilQueryBahan.splice(0);
      this.hasilQueryBahan.push(
        ...this.algoCariResepBahan(this.storeResep, this.queryBahan)
      );
    },
    algoCariResepBahan(listResep, queryBahan) {
      return listResep.map(resep => {
        const { bahanResep, namaResep } = resep;
        const count = bahanResep.reduce((total, item) => {
          return queryBahan.indexOf(item.nama) >= 0 ? total + 1 : total;
        }, 0);
        return {
          namaResep,
          count
        };
      });
    }
  }
});
