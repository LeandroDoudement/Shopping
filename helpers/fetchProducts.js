const fetchProducts = async (param) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
  const data = await fetch(url);
  const response = await data.json();
  return response.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
