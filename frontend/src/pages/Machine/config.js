export const fields = {
  name: {
    type: 'string',
  },
  capacity: {
    type: 'number',
    label: 'Kapasitas Maksimum',
    required: true,
  },
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
};
