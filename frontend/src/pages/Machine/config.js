export const fields = {
  name: {
    type: 'string',
<<<<<<< HEAD
=======
    label: 'Nama Mesin',
    required: true,
  },
  function: {
    type: 'string',
    label: 'Fungsi Mesin',
    required: true,
>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
  },
  capacity: {
    type: 'number',
    label: 'Kapasitas Maksimum',
    required: true,
  },
<<<<<<< HEAD
  item: {
    type: 'search',
    // dataIndex: ['item', 'name'],
    entity: 'item',
    displayLabels: ['name'],
    searchFields: 'name',
    withRedirect: true,
    urlToRedirect: '/item',
    redirectLabel: 'Add New Item',
    filter: { type: 'finish good' },

    // options: [
    //   { label: 'Finish Goods', value: 'finish good' },
    //   { label: 'Raw Material', value: 'raw material' },
    // ],
  },
=======
>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
};
