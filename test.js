const steaming = paragrahp => {
  const abaikan = ['of', 'an', 'in', 'a'];
  return paragrahp.split(' ').filter(term => {
    return abaikan.indexOf(term) < 0; // abaikan term yang ada pada kata
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
  const { id, description } = doc;
  const docSteaming = steaming(description);
  return {
    id,
    description,
    docSteaming
  };
});

const terms = [
  {
    term: 'indonesia',
    location: ['dok1', 'dok2', 'dok3']
  }
];

const app = new Vue({
  el: '#app',
  data: {
    testSoal: documents,
    testJawaban: jawaban
  }
});
