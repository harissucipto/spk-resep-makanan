const steaming = paragrahp => {
  const abaikan = ['of', 'an', 'in', 'a'];
  return paragrahp.split(' ').filter(term => {
    return abaikan.indexOf(term) < 0; // abaikan term yang ada pada kata
  });
};

// cari TF dari Query Object
const getTF = ({ id, docSteaming }, term) => {
  if (docSteaming.indexOf(term) >= 0) return id;
};

// cariTF fungsi dari kumpulan query object
// syarat fungsi ini kumpulan query Object harus punya prop term
const getQuerysTF = (query, documents) => {
  return query.map(termQuery => {
    const { term } = termQuery;
    const tf = documents
      .reduce((a, b) => {
        return a.concat(getTF(b, term));
      }, []) // cari tf
      .filter(doc => doc); // abaikan null

    return {
      term,
      tf
    };
  });
};

// get df
const getDF = query => {
  return query.map(termQuery => {
    const { tf } = termQuery;
    return {
      ...termQuery,
      df: tf.length
    };
  });
};

// banyak documents dibagi documents frequensi per query
const getDperDf = (query, lengthDocuments) => {
  return query.map(termQuery => {
    const { df } = termQuery;
    return {
      ...termQuery,
      dperDf: lengthDocuments / df
    };
  });
};

//
const getIDF = (query, lengthDocuments) => {
  return query.map(termQuery => {
    const { dperDf } = termQuery;
    return {
      ...termQuery,
      idf: Math.log(dperDf) + 1
    };
  });
};

const documents = [
  {
    id: 'd1',
    description: `Shipment of gold damaged in a fire`
  },
  {
    id: 'd2',
    description: 'Delivery of silver arrived in a silver truck'
  },
  {
    id: 'd3',
    description: 'Shipment of gold arrived in a truck'
  }
];

const jawaban = documents.map(doc => {
  const { description } = doc;
  const docSteaming = steaming(description);
  return {
    ...doc,
    docSteaming
  };
});

const prosesQuery = [
  {
    term: 'gold',
    tf: [],
    df: 0
  },
  {
    term: 'silver',
    tf: [],
    df: 0
  },
  {
    term: 'truck',
    tf: [],
    df: 0
  }
];

const cariTF = getQuerysTF(prosesQuery, jawaban);
const cariDF = getDF(cariTF);
const cariDperDf = getDperDf(cariDF, jawaban.length);
const cariIDF = getIDF(cariDperDf, jawaban.length);

const app = new Vue({
  el: '#app',
  data: {
    testSoal: jawaban,
    testJawaban: cariIDF
  }
});

/*

resep1
bawah
cabe 
terigu

resep2
bawang
nasi


query: bawang, terigu

resep1.
const hasilResep = resep1.map(resep => {
  const { bahan } = resep;
  const count
  bahan.reduce((a, b) => { return query.indexOf(b) >= 0 ? a++, a} , 0)
})

*/
