const WHATSAPP_NUMBER = '2290141190408';
const STORAGE_KEY = '2ka-juice-cart-v1';

const products = [
  { id: 'pasteque', name: 'Jus de pastèque', type: 'Jus frais', category: 'jus', description: 'Une saveur fruitée, colorée et rafraîchissante.', image: '/assets/pasteque.webp', alt: 'Verre de jus de pastèque rouge de l’affiche 2KA Juice' },
  { id: 'ananas-gingembre', name: 'Ananas-gingembre', type: 'Jus frais', category: 'jus', description: 'L’accord vif de l’ananas et du gingembre.', image: '/assets/ananas-gingembre.webp', alt: 'Verre de jus ananas-gingembre de l’affiche 2KA Juice' },
  { id: 'detox', name: 'Jus Detox', type: 'Jus frais', category: 'jus', description: 'Une option fraîche et pleine de couleur.', image: '/assets/detox.webp', alt: 'Verre de jus vert detox de l’affiche 2KA Juice' },
  { id: 'bissap', name: 'Bissap · clou de girofle · gingembre', type: 'Jus frais', category: 'jus', description: 'Le bissap relevé de clou de girofle et de gingembre.', image: '/assets/bissap.webp', alt: 'Verre de bissap à la couleur intense de l’affiche 2KA Juice' },
  { id: 'ananas', name: 'Jus d’ananas', type: 'Jus frais', category: 'jus', description: 'La saveur généreuse de l’ananas, tout simplement.', image: '/assets/ananas.webp', alt: 'Verre de jus d’ananas doré de l’affiche 2KA Juice' },
  { id: 'tamarin', name: 'Jus de tamarin', type: 'Nouveauté', category: 'nouveaute', isNew: true, description: 'Une nouvelle saveur acidulée à découvrir.', image: '/assets/tamarin.webp', alt: 'Verre de jus de tamarin de l’affiche 2KA Juice' },
  { id: 'cafe', name: 'Café au lait', type: 'Nouveauté', category: 'autre', isNew: true, description: 'Une pause douce et gourmande.', image: '/assets/cafe-au-lait.webp', alt: 'Tasse de café au lait de l’affiche 2KA Juice' }
];

const grid = document.querySelector('#product-grid');
const cartPanel = document.querySelector('#cart-panel');
const backdrop = document.querySelector('#cart-backdrop');
const cartItems = document.querySelector('#cart-items');
const cartEmpty = document.querySelector('#cart-empty');
const cartCheckout = document.querySelector('#cart-checkout');
const toast = document.querySelector('#toast');
let cart = readCart();
let toastTimer;
let lastFocus;

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.filter(item => products.some(product => product.id === item.id) && Number.isInteger(item.qty) && item.qty > 0);
  } catch {
    return [];
  }
}

function saveCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* Panier encore utilisable pendant cette visite. */ }
}

function renderProducts(filter = 'tous') {
  const visible = products.filter(product => filter === 'tous' || product.category === filter || (filter === 'nouveaute' && product.isNew));
  grid.innerHTML = visible.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 45}ms">
      ${product.isNew ? '<span class="new-badge">NOUVEAU</span>' : ''}
      <div class="product-card__image"><img src="${product.image}" alt="${product.alt}" loading="lazy"></div>
      <div class="product-card__meta">
        <span class="product-card__type">${product.type}</span>
        <h3>${product.name}</h3>
        <p class="product-card__desc">${product.description}</p>
        <div class="product-card__foot"><span class="product-card__price">Prix sur demande</span><button class="product-add" type="button" data-add="${product.id}" aria-label="Ajouter ${product.name} au panier">Ajouter +</button></div>
      </div>
    </article>`).join('');
}

function totalQuantity() { return cart.reduce((sum, item) => sum + item.qty, 0); }
function productFor(id) { return products.find(product => product.id === id); }

function renderCart() {
  const count = totalQuantity();
  document.querySelector('#cart-count').textContent = count;
  document.querySelector('#cart-count').setAttribute('aria-label', `${count} article${count > 1 ? 's' : ''}`);
  document.querySelector('#cart-title-count').textContent = `(${count})`;
  cartEmpty.hidden = count > 0;
  cartCheckout.hidden = count === 0;
  cartItems.innerHTML = cart.map(item => {
    const product = productFor(item.id);
    if (!product) return '';
    return `<article class="cart-row">
      <img src="${product.image}" alt="" loading="lazy">
      <div class="cart-row__main"><h3>${product.name}</h3><p>Prix à confirmer</p><div class="qty-control" aria-label="Quantité de ${product.name}"><button type="button" data-qty="${product.id}" data-delta="-1" aria-label="Retirer une unité de ${product.name}">−</button><span>${item.qty}</span><button type="button" data-qty="${product.id}" data-delta="1" aria-label="Ajouter une unité de ${product.name}">+</button></div></div>
      <button class="cart-remove" type="button" data-remove="${product.id}" aria-label="Supprimer ${product.name} du panier">Retirer</button>
    </article>`;
  }).join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2300);
}

function addToCart(id) {
  if (!productFor(id)) return;
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  showToast(`${productFor(id).name} ajouté au panier`);
}

function updateQuantity(id, delta) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(entry => entry.id !== id);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  const name = productFor(id)?.name;
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  if (name) showToast(`${name} retiré du panier`);
}

function openCart() {
  lastFocus = document.activeElement;
  cartPanel.hidden = false;
  backdrop.hidden = false;
  cartPanel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('cart-open');
  requestAnimationFrame(() => {
    cartPanel.classList.add('is-visible');
    backdrop.classList.add('is-visible');
    document.querySelector('#cart-close').focus();
  });
}

function closeCart() {
  cartPanel.classList.remove('is-visible');
  backdrop.classList.remove('is-visible');
  cartPanel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cart-open');
  setTimeout(() => {
    cartPanel.hidden = true;
    backdrop.hidden = true;
  }, 260);
  if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
}

function makeWhatsAppMessage(form) {
  const data = new FormData(form);
  const lines = [
    'Bonjour 2KA Juice ! Je souhaite préparer cette commande :',
    '',
    ...cart.map(item => `• ${productFor(item.id).name} — quantité : ${item.qty}`),
    '',
    `Nom : ${String(data.get('name') || '').trim()}`,
    `Téléphone : ${String(data.get('phone') || '').trim()}`
  ];
  const location = String(data.get('location') || '').trim();
  const note = String(data.get('note') || '').trim();
  if (location) lines.push(`Lieu / adresse : ${location}`);
  if (note) lines.push(`Précision : ${note}`);
  lines.push('', 'Merci de me confirmer les prix, les formats disponibles et les modalités de commande.');
  return lines.join('\n');
}

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (button) addToCart(button.dataset.add);
});

document.querySelector('.product-filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const active = chip === button;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
  });
  renderProducts(button.dataset.filter);
});

document.querySelectorAll('[data-add]').forEach(button => {
  if (!grid.contains(button)) button.addEventListener('click', () => addToCart(button.dataset.add));
});
cartItems.addEventListener('click', event => {
  const qtyButton = event.target.closest('[data-qty]');
  const removeButton = event.target.closest('[data-remove]');
  if (qtyButton) updateQuantity(qtyButton.dataset.qty, Number(qtyButton.dataset.delta));
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

document.querySelector('#cart-open').addEventListener('click', openCart);
document.querySelector('#cart-close').addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);
document.querySelector('#cart-empty-cta').addEventListener('click', () => {
  closeCart();
  document.querySelector('#nos-jus').scrollIntoView({ behavior: 'smooth' });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !cartPanel.hidden) closeCart();
  if (event.key === 'Tab' && !cartPanel.hidden) {
    const focusable = [...cartPanel.querySelectorAll('button:not([disabled]),input:not([disabled]),textarea:not([disabled]),a[href]')].filter(el => !el.closest('[hidden]'));
    if (!focusable.length) return;
    if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
  }
});

document.querySelector('#order-form').addEventListener('submit', event => {
  event.preventDefault();
  if (cart.length === 0 || !event.currentTarget.reportValidity()) return;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(makeWhatsAppMessage(event.currentTarget))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelector('#menu-toggle').addEventListener('click', event => {
  const button = event.currentTarget;
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  button.setAttribute('aria-label', expanded ? 'Ouvrir le menu' : 'Fermer le menu');
  document.querySelector('#navigation').classList.toggle('is-open', !expanded);
});
document.querySelectorAll('#navigation a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#menu-toggle').setAttribute('aria-expanded', 'false');
  document.querySelector('#menu-toggle').setAttribute('aria-label', 'Ouvrir le menu');
  document.querySelector('#navigation').classList.remove('is-open');
}));
document.querySelector('#year').textContent = String(new Date().getFullYear());
renderProducts();
renderCart();
