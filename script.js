// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const localStorageGetItem = () => {
  const item = getSavedCartItems('cartItems');
  //   if (typeof item === 'string') {
  //     return item;
  //   }
  return JSON.parse(item);
};

const localStorageSetItem = (items) => {
  const itemsToSave = typeof items === 'string' ? items : JSON.stringify(items);
  saveCartItems(itemsToSave);
};

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

// const sumOfItens = () => {
//   const totalPrice = document.querySelector('.total-price');
//   const price = totalPrice.innerHTML;
//   totalPrice.innerText = `Subtotal: R$${
//     Math.round(
//       (parseFloat(price.match(/[+-]?\d+(\.\d+)?/g)[0]) + values) * 100,
//     ) / 100
//   }`;
//   saveItems(
//     'totalPrice',
//     JSON.stringify(
//       parseFloat(totalPrice.innerHTML.match(/[+-]?\d+(\.\d+)?/g)[0]),
//     ),
//   );
// };

const loadingItems = () => {
  const items = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'loading';
  section.innerText = 'Loading...';
  items.appendChild(section);
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => {
    cartItemClickListener(li);
    const parsedIds = localStorageGetItem();
    if (!!parsedIds && Array.isArray(parsedIds)) {
      const index = parsedIds.findIndex((elem) => elem.id === id);
      parsedIds.splice(index, 1);
      localStorageSetItem(parsedIds);
    }
  });
  return li;
};

const addtoLocalStorage = (id) => {
  const parsedIds = localStorageGetItem();
  if (!!id && Array.isArray(parsedIds)) {
    parsedIds.push(id);
    localStorageSetItem(parsedIds);
  } else {
    localStorageSetItem([id]);
  }
};

const onClick = async (id, preventSavingInLocalStorage) => {
  const cartItems = document.querySelector(classCartItem);
  // const productData = await fetchItem(id);
  const productInformation = createCartItemElement(id);
  cartItems.appendChild(productInformation);
  if (!preventSavingInLocalStorage) {
    addtoLocalStorage(id);
  }
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(
    createCustomElement(
      'p',
      'item_price',
      `Valor: ${(Math.round(price * 100) / 100).toFixed(2)}`
    )
  );
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', () =>
      onClick({ id, title, price })
    )
  );

  return section;
};

const addProducts = async () => {
  loadingItems();
  const produtos = await fetchProducts('computador');
  produtos.forEach((element) => {
    const items = document.querySelector('.items');
    items.appendChild(createProductItemElement(element));
  });
  document.querySelector('.loading').remove();
};

const LoadCartItens = () => {
  const ids = localStorageGetItem();
  (ids || []).forEach((element) => {
    onClick(element, true);
  });
};

const esvaziarCarrinho = () => {
  const botaoEsvaziarCarrinho = document.querySelector('.empty-cart');
  botaoEsvaziarCarrinho.addEventListener('click', () => {
    const carrinho = document.querySelector('.cart__items');
    carrinho.innerHTML = '';
    localStorage.removeItem('cartItem');
  });
};

esvaziarCarrinho();

window.onload = async () => {
  addProducts();
  LoadCartItens();
};
