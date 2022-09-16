const saveCartItems = (itens) => {
  const itemsToSave = typeof itens === 'string' ? itens : JSON.stringify(itens);
  localStorage.setItem('cartItem', itemsToSave);
};
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
