const getSavedCartItems = (item) =>
  (localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : null);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
