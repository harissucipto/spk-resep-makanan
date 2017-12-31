const App = new Vue({
  el: '#app',
  data: {
    // status page
    lihatTambahResep: false,
    lihatListResep: true,
    lihatCariResep: true,
    isJawaban: false,

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
        showResep: false,
        bahanResep: [
          { nama: 'ayam', banyak: '2 kg' },
          { nama: 'nasi', banyak: '1kg' },
          { nama: 'ubi', banyak: '1kg' }
        ],
        langkahResep: [{ nama: 'kurangi bumbu' }, { nama: 'tambah bumbu' }]
      },
      {
        namaResep: 'abu bekatul',
        descResep: 'ayam yang sangat enak',
        kesulitanResep: '1',
        lamaResep: '2',
        showResep: false,
        bahanResep: [
          { nama: 'ayam', banyak: '2 kg' },
          { nama: 'abu', banyak: '1kg' },
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
    // safe ambil object di array
    ambilObject(object) {
      return JSON.parse(JSON.stringify(object));
    },

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
      console.log(this.bahanResep);
      if (!this.namaResep) {
        alert('Nama Resep Harus dimasukan');
        return;
      }

      const { namaResep, descResep, kesulitanResep, lamaResep } = this;

      const bahanResep = this.ambilObject(this.bahanResep);
      const langkahResep = this.ambilObject(this.langkahResep);

      const resepBaru = {
        namaResep,
        descResep,
        kesulitanResep,
        lamaResep,
        bahanResep,
        langkahResep,
        showResep: false
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
      this.isJawaban = false;

      this.queryBahan.push(this.newBahan);
      this.newBahan = '';
    },
    hapusBahan(index) {
      this.isJawaban = false;

      this.queryBahan.splice(index, 1);
    },
    cariResepBahan() {
      this.isJawaban = true;
      this.hasilQueryBahan.splice(0);

      // cari hasil dan filter
      const hasil = this.algoCariResepBahan(
        this.storeResep,
        this.queryBahan
      ).filter(resep => resep.count);

      if (!hasil) return; // jika count 0 abaikan

      const sortingHasil = hasil //descent
        .sort((a, b) => {
          const x = a.count,
            y = b.count;
          return x < y ? -1 : x > y ? 1 : 0;
        })
        .reverse();

      this.hasilQueryBahan.push(...sortingHasil);
    },
    algoCariResepBahan(listResep, queryBahan) {
      return listResep.map(resep => {
        const { bahanResep, namaResep } = resep;
        const count = bahanResep.reduce((total, item) => {
          return queryBahan.indexOf(item.nama) >= 0 ? total + 1 : total;
        }, 0);
        return {
          ...resep,
          namaResep,
          count
        };
      });
    },
    lihatResep(index) {
      const kondisi = this.hasilQueryBahan[index].showResep;
      this.hasilQueryBahan[index].showResep = !kondisi;
    },
    tombolShow(status) {
      return status ? 'sembunyikan' : 'tampilkan';
    }
  }
});
