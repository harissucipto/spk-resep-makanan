const App = new Vue({
  el: '#app',
  data: {
    // status page
    lihatTambahResep: false,
    lihatListResep: false,
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
        kesulitanResep: 1,
        lamaResep: 4,
        showResep: false,
        bahanResep: [
          { nama: 'ayam', banyak: '2 kg' },
          { nama: 'nasi', banyak: '1kg' }
        ],
        langkahResep: [{ nama: 'tambah bumbu' }]
      },
      {
        namaResep: 'abu bekatul',
        descResep: 'ayam yang sangat enak',
        kesulitanResep: 2,
        lamaResep: 2,
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
    hasilQueryBahan: [],

    //filter hasil
    tipeSorting: 1,
    urutannya: 2
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
        banyakBahan: bahanResep.length,
        langkahResep,
        banyakLangkah: langkahResep.length,
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
      const resep = this.algoCariResepBahan(
        this.storeResep,
        this.queryBahan
      ).filter(resep => resep.count);

      if (!resep) return; // jika count 0 abaikan

      this.hasilQueryBahan.push(...resep);
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
    },
    renderKesulitan(angka) {
      angka = Number(angka);
      switch (angka) {
        case 1:
          return 'mudah';
        case 2:
          return 'sedang';
        case 3:
          return 'susah';
        default:
          return '-';
      }
    },

    //sorting disini
    sortingByUrutannya(sortBy, urutannya) {
      urutannya = Number(urutannya);
      return key => {
        const hasilSort = sortBy(key);
        switch (urutannya) {
          case 1:
            return hasilSort;
          case 2:
            return hasilSort.reverse();
        }
      };
    },
    sortByKey(resep) {
      return key => {
        return resep.sort((a, b) => {
          const x = a[key],
            y = b[key];
          return x < y ? -1 : x > y ? 1 : 0;
        });
      };
    }
  },
  computed: {
    sortingResep: {
      get() {
        let { tipeSorting, hasilQueryBahan } = this;
        const [...resep] = hasilQueryBahan;
        tipeSorting = Number(tipeSorting);
        const fSortBy = this.sortingByUrutannya(
          this.sortByKey(resep),
          this.urutannya
        );
        switch (tipeSorting) {
          case 1:
            return fSortBy('count');
          case 2:
            return fSortBy('lamaResep');
          case 3:
            return fSortBy('kesulitanResep');
          case 4:
            return fSortBy('banyakBahan');
          case 5:
            return fSortBy('banyakLangkah');
        }
      },
      set(indexResep) {
        const condition = this.hasilQueryBahan[indexResep].showResep;
        return (this.hasilQueryBahan[indexResep].showResep = !condition);
      }
    }
  }
});
