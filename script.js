// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const classCartItem = '.cart__items';
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText, onClick) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (onClick) {
    e.addEventListener('click', onClick);
  }
  return e;
};
const cartItemClickListener = (li) => {
  li.parentNode.removeChild(li);
};
/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => cartItemClickListener(li));
  return li;
};

const addtoLocalStorage = () => {
  const cartItems = document.querySelector(classCartItem);
  saveCartItems(cartItems.innerHTML);
};

const onClick = async (id) => {
  const cartItems = document.querySelector(classCartItem);
  const productData = await fetchItem(id);
  const productInformation = createCartItemElement(productData);
  cartItems.appendChild(productInformation);

  addtoLocalStorage();
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', () =>
      onClick(id)),
  );

  return section;
};

const addProducts = async () => {
  const produtos = await fetchProducts('computador');
  produtos.forEach((element) => {
    const items = document.querySelector('.items');
    items.appendChild(createProductItemElement(element));
  });
};

const refreshCartItens = () => {
  const cartItems = document.querySelector(classCartItem);
  const items = getSavedCartItems('cartItems');
  cartItems.innerHTML = items;
};

const esvaziarCarrinho = () => {
  const botaoEsvaziarCarrinho = document.querySelector('.empty-cart');
  console.log(botaoEsvaziarCarrinho);
  botaoEsvaziarCarrinho.addEventListener('click', () => {
    const carrinho = document.querySelector('.cart__items');
    carrinho.innerHTML = '';
  });
};

esvaziarCarrinho();

window.onload = async () => {
  addProducts();
  refreshCartItens();
};
