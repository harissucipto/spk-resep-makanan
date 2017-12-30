const steaming = paragrahp => {
  const abaikan = ['of', 'an', 'in', 'a'];
  return paragrahp.split(' ').filter(term => {
    return abaikan.indexOf(term) < 0; // abaikan term yang ada pada kata
  });
};

// abaiakn banyaknya
const getTF = ({ id, docSteaming }, term) => {
  if (docSteaming.indexOf(term) >= 0) return id;
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
  const { id, description } = doc;
  const docSteaming = steaming(description);
  return {
    id,
    description,
    docSteaming
  };
});

const prosesQuery = [
  {
    term: 'gold',
    tf: []
  },
  {
    term: 'silver',
    tf: []
  },
  {
    term: 'truck',
    tf: []
  }
];

const hasilProsesQuery = prosesQuery.map(termQuery => {
  const { term } = termQuery;
  const tf = jawaban
    .reduce((a, b) => {
      return a.concat(getTF(b, term));
    }, [])
    .filter(doc => doc);

  return {
    term,
    tf
  };
});

const app = new Vue({
  el: '#app',
  data: {
    testSoal: documents,
    testJawaban: hasilProsesQuery
  }
});
