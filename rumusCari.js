const resep = [
  {
    nama: 'nasi goreng',
    bahan: ['nasi', 'ayam', 'ubi']
  },
  {
    nama: 'ayam bakar',
    bahan: ['ayam', 'arang']
  }
];

const query = ['nasi'];

const cariResep = (reseps, query) => {
  return reseps.map(resep => {
    const { bahan, nama } = resep;
    const count = bahan.reduce((total, item) => {
      return query.indexOf(item) >= 0 ? total + 1 : total;
    }, 0);
    return {
      nama,
      count
    };
  });
};

const app = new Vue({
  el: '#app',
  data: {
    testSoal: resep,
    testJawaban: [],
    query: [],
    newBahan: ''
  },
  methods: {
    tambahBahan() {
      this.query.push(this.newBahan);
    },
    hapusBahan(index) {
      this.query.splice(index, 1);
    },
    cariResep1() {
      this.testJawaban.splice(0);
      this.testJawaban.push(cariResep(resep, this.query));
    }
  }
});
