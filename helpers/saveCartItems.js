const saveCartItems = (itens) => {
  const itemsToSave = typeof itens === 'string' ? itens : JSON.stringify(itens);
  localStorage.setItem('cartItems', itemsToSave);
};
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
