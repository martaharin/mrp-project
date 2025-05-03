export const fields = {
  name: {
    type: 'string',
  },
  type: {
    type: 'select',
    options: [
      { label: 'Finish Goods', value: 'finish_goods' },
      { label: 'Raw Material', value: 'raw_material' },
    ],
  }
};
