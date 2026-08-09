/* =========================================================
   AMAZON CLONE — script.js
   Handles: product rendering, search, filter, sort,
   cart (localStorage), wishlist, carousel, sidebar/drawer UI
   ========================================================= */

/* ---------- 1. PRODUCT DATA ---------- */
const PRODUCTS = [
  {id:1, name:"Wireless Bluetooth Headphones, Over-Ear, 40H Battery", category:"electronics", price:1799, mrp:3499, rating:4.3, reviews:2140, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", badge:"Best Seller", tag:"new"},
  {id:2, name:"Smart Watch with Heart Rate & SpO2 Monitor", category:"electronics", price:2299, mrp:4999, rating:4.1, reviews:986, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", badge:"Limited Deal"},
  {id:3, name:"27-inch 4K UHD Monitor, HDR, 144Hz", category:"electronics", price:18999, mrp:24999, rating:4.6, reviews:512, img:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"},
  {id:4, name:"Mechanical Gaming Keyboard, RGB Backlit", category:"electronics", price:2499, mrp:3999, rating:4.4, reviews:1320, img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", tag:"new"},
  {id:5, name:"Men's Slim Fit Casual Cotton Shirt", category:"fashion", price:699, mrp:1499, rating:4.0, reviews:764, img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80"},
  {id:6, name:"Women's Running Shoes, Lightweight Mesh", category:"fashion", price:1399, mrp:2999, rating:4.2, reviews:1890, img:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80", badge:"Best Seller"},
  {id:7, name:"Classic Leather Analog Wrist Watch", category:"fashion", price:1099, mrp:2499, rating:4.3, reviews:640, img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80"},
  {id:8, name:"Unisex Travel Backpack, 35L Water Resistant", category:"fashion", price:1299, mrp:2199, rating:4.5, reviews:2210, img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", tag:"new"},
  {id:9, name:"Non-Stick Cookware Set, 5-Piece", category:"home", price:1899, mrp:3499, rating:4.1, reviews:455, img:"https://images.unsplash.com/photo-1584990347449-a5d9f800a783?w=500&q=80"},
  {id:10, name:"Memory Foam Pillow, Orthopedic Cervical", category:"home", price:799, mrp:1599, rating:4.0, reviews:1120, img:"https://images.unsplash.com/photo-1592789705501-f9ae4287c4a9?w=500&q=80"},
  {id:11, name:"Smart LED Desk Lamp with Wireless Charging", category:"home", price:1199, mrp:1999, rating:4.4, reviews:389, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", badge:"Limited Deal"},
  {id:12, name:"Stainless Steel Insulated Water Bottle, 1L", category:"home", price:449, mrp:899, rating:4.6, reviews:3120, img:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80"},
  {id:13, name:"Vitamin C Brightening Face Serum, 30ml", category:"beauty", price:499, mrp:999, rating:4.2, reviews:1780, img:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", tag:"new"},
  {id:14, name:"Professional Hair Dryer, 2000W", category:"beauty", price:1399, mrp:2799, rating:4.0, reviews:520, img:"https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80"},
  {id:15, name:"Matte Lipstick Combo Set, 6 Shades", category:"beauty", price:599, mrp:1199, rating:4.3, reviews:940, img:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80"},
  {id:16, name:"Atomic Habits — Paperback Bestseller", category:"books", price:349, mrp:599, rating:4.8, reviews:9800, img:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80", badge:"Best Seller"},
  {id:17, name:"The Psychology of Money — Paperback", category:"books", price:299, mrp:499, rating:4.7, reviews:6400, img:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80"},
  {id:18, name:"Rich Dad Poor Dad — Paperback", category:"books", price:279, mrp:450, rating:4.6, reviews:5200, img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80"},
  {id:19, name:"Yoga Mat, Anti-Slip 6mm Extra Thick", category:"sports", price:699, mrp:1299, rating:4.4, reviews:1340, img:"https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80", tag:"new"},
  {id:20, name:"Adjustable Dumbbell Set, 20kg", category:"sports", price:2999, mrp:4999, rating:4.5, reviews:670, img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80"},
  {id:21, name:"Cricket Bat, English Willow", category:"sports", price:3499, mrp:5999, rating:4.3, reviews:210, img:"https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&q=80"},
  {id:22, name:"Football, Size 5 Match Ball", category:"sports", price:899, mrp:1499, rating:4.2, reviews:430, img:"https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&q=80", badge:"Limited Deal"},
];

/* ---------- 2. STATE ---------- */
let state = {
  filter: "all",
  search: "",
  sort: "relevance",
  cart: JSON.parse(localStorage.getItem("clone_cart") || "{}"),      // {id: qty}
  wishlist: JSON.parse(localStorage.getItem("clone_wishlist") || "[]"), // [id,...]
};

const fmt = n => "₹" + n.toLocaleString("en-IN");

/* ---------- 3. RENDER: CATEGORY GRID ---------- */
function renderCategoryGrid(){
  const cats = [
    {key:"electronics", label:"Electronics essentials", imgs:["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80","https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80","https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80","https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"]},
    {key:"fashion", label:"Refresh your wardrobe", imgs:["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&q=80","https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&q=80","https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&q=80","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80"]},
    {key:"home", label:"Upgrade your home", imgs:["https://images.unsplash.com/photo-1584990347449-a5d9f800a783?w=300&q=80","https://images.unsplash.com/photo-1592789705501-f9ae4287c4a9?w=300&q=80","https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80","https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80"]},
    {key:"beauty", label:"Beauty picks for you", imgs:["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80","https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=300&q=80","https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80","https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80"]},
  ];
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = cats.map(c => `
    <div class="cat-card">
      <h3>${c.label}</h3>
      <div class="cat-img-grid">
        ${c.imgs.map(i=>`<img src="${i}" alt="" loading="lazy">`).join("")}
      </div>
      <button class="cat-link nav-link" data-filter="${c.key}">Shop now</button>
    </div>
  `).join("");
}

/* ---------- 4. RENDER: PRODUCT GRID ---------- */
function stars(rating){
  const full = Math.round(rating);
  return '<span class="stars">' + "★".repeat(full) + "☆".repeat(5-full) + "</span>";
}

function getVisibleProducts(){
  let list = [...PRODUCTS];

  if(state.filter === "new"){
    list = list.filter(p => p.tag === "new");
  } else if(state.filter !== "all"){
    list = list.filter(p => p.category === state.filter);
  }

  if(state.search.trim()){
    const q = state.search.trim().toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q));
  }

  switch(state.sort){
    case "price-asc": list.sort((a,b)=>a.price-b.price); break;
    case "price-desc": list.sort((a,b)=>b.price-a.price); break;
    case "rating": list.sort((a,b)=>b.rating-a.rating); break;
  }
  return list;
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const list = getVisibleProducts();
  const noResults = document.getElementById("noResults");
  const title = document.getElementById("productsTitle");

  const titles = {all:"Deals for you", electronics:"Electronics", fashion:"Fashion", home:"Home & Kitchen", beauty:"Beauty", books:"Books", sports:"Sports & Outdoors", new:"New Arrivals"};
  title.textContent = state.search.trim() ? `Results for "${state.search.trim()}"` : (titles[state.filter] || "Deals for you");

  if(list.length === 0){
    grid.innerHTML = "";
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  grid.innerHTML = list.map(p => {
    const discount = Math.round((1 - p.price/p.mrp) * 100);
    const inCart = !!state.cart[p.id];
    const wished = state.wishlist.includes(p.id);
    return `
    <div class="product-card" data-id="${p.id}">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <button class="wish-toggle ${wished?"active":""}" data-wish="${p.id}" aria-label="Add to wishlist">
        <i class="fa-${wished?"solid":"regular"} fa-heart"></i>
      </button>
      <div class="product-img-wrap"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="product-title">${p.name}</div>
      <div class="product-rating">${stars(p.rating)} <span>${p.rating} (${p.reviews.toLocaleString("en-IN")})</span></div>
      <div class="product-price-row">
        <span class="product-price">${fmt(p.price)}</span>
        <span class="product-mrp">${fmt(p.mrp)}</span>
        <span class="product-discount">${discount}% off</span>
      </div>
      <div class="product-delivery"><i class="fa-solid fa-truck-fast"></i> Free delivery tomorrow</div>
      <button class="add-cart-btn ${inCart?"added":""}" data-add="${p.id}">
        ${inCart ? `In Cart (${state.cart[p.id]})` : "Add to Cart"}
      </button>
    </div>`;
  }).join("");
}

/* ---------- 5. CART LOGIC ---------- */
function saveState(){
  localStorage.setItem("clone_cart", JSON.stringify(state.cart));
  localStorage.setItem("clone_wishlist", JSON.stringify(state.wishlist));
}

function addToCart(id){
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveState();
  updateCartUI();
  renderProducts();
  const p = PRODUCTS.find(x=>x.id===id);
  showToast(`Added "${p.name.slice(0,32)}${p.name.length>32?"…":""}" to cart`);
}

function changeQty(id, delta){
  if(!state.cart[id]) return;
  state.cart[id] += delta;
  if(state.cart[id] <= 0) delete state.cart[id];
  saveState();
  updateCartUI();
  renderProducts();
}

function removeFromCart(id){
  delete state.cart[id];
  saveState();
  updateCartUI();
  renderProducts();
}

function toggleWishlist(id){
  const idx = state.wishlist.indexOf(id);
  if(idx === -1){ state.wishlist.push(id); showToast("Added to your wishlist"); }
  else { state.wishlist.splice(idx,1); showToast("Removed from wishlist"); }
  saveState();
  document.getElementById("wishlistCount").textContent = state.wishlist.length;
  renderProducts();
}

function cartTotalItems(){
  return Object.values(state.cart).reduce((a,b)=>a+b, 0);
}
function cartSubtotal(){
  return Object.entries(state.cart).reduce((sum,[id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===Number(id));
    return sum + (p ? p.price*qty : 0);
  }, 0);
}

function updateCartUI(){
  document.getElementById("cartCount").textContent = cartTotalItems();
  document.getElementById("cartItemCount").textContent = cartTotalItems();
  document.getElementById("cartSubtotal").textContent = fmt(cartSubtotal());

  const wrap = document.getElementById("cartItemsWrap");
  const entries = Object.entries(state.cart);
  if(entries.length === 0){
    wrap.innerHTML = `<p class="cart-empty" id="cartEmptyMsg">Your cart is empty. Start adding products you love!</p>`;
    return;
  }
  wrap.innerHTML = entries.map(([id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===Number(id));
    if(!p) return "";
    return `
    <div class="cart-item" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-item-info">
        <div class="name">${p.name}</div>
        <div class="price">${fmt(p.price)}</div>
        <div class="qty-row">
          <button data-qty="dec" data-id="${p.id}">−</button>
          <span>${qty}</span>
          <button data-qty="inc" data-id="${p.id}">+</button>
          <button class="remove-btn" data-remove="${p.id}">Remove</button>
        </div>
      </div>
    </div>`;
  }).join("");
}

/* ---------- 6. TOAST ---------- */
let toastTimer;
function showToast(msg){
  const toast = document.getElementById("toast");
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove("show"), 2200);
}

/* ---------- 7. CAROUSEL ---------- */
function initCarousel(){
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsWrap = document.getElementById("carouselDots");
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if(i===0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i){
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    resetTimer();
  }
  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(()=> goTo(current+1), 5000);
  }

  document.getElementById("nextSlide").addEventListener("click", ()=> goTo(current+1));
  document.getElementById("prevSlide").addEventListener("click", ()=> goTo(current-1));
  resetTimer();
}

/* ---------- 8. EVENT WIRING ---------- */
function initEvents(){
  // filter clicks (nav links, category cards, sidebar, hero CTA) — event delegation
  document.body.addEventListener("click", (e) => {
    const filterBtn = e.target.closest("[data-filter]");
    if(filterBtn){
      state.filter = filterBtn.dataset.filter;
      state.search = "";
      document.getElementById("searchInput").value = "";
      renderProducts();
      document.getElementById("productsSection")?.scrollIntoView({behavior:"smooth"});
      closeSidebar();
      window.scrollTo({top: document.querySelector(".products-section").offsetTop - 90, behavior:"smooth"});
    }
    const addBtn = e.target.closest("[data-add]");
    if(addBtn) addToCart(Number(addBtn.dataset.add));

    const wishBtn = e.target.closest("[data-wish]");
    if(wishBtn) toggleWishlist(Number(wishBtn.dataset.wish));

    const qtyBtn = e.target.closest("[data-qty]");
    if(qtyBtn) changeQty(Number(qtyBtn.dataset.id), qtyBtn.dataset.qty === "inc" ? 1 : -1);

    const removeBtn = e.target.closest("[data-remove]");
    if(removeBtn) removeFromCart(Number(removeBtn.dataset.remove));
  });

  // search
  document.getElementById("searchForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    state.search = document.getElementById("searchInput").value;
    state.filter = "all";
    renderProducts();
    window.scrollTo({top: document.querySelector(".products-section").offsetTop - 90, behavior:"smooth"});
  });

  // sort
  document.getElementById("sortSelect").addEventListener("change", (e)=>{
    state.sort = e.target.value;
    renderProducts();
  });

  // sidebar open/close
  document.getElementById("hamburgerBtn").addEventListener("click", openSidebar);
  document.getElementById("closeSidebar").addEventListener("click", closeSidebar);
  document.getElementById("sidebarOverlay").addEventListener("click", closeSidebar);

  // cart drawer open/close
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);

  document.getElementById("checkoutBtn").addEventListener("click", ()=>{
    if(cartTotalItems() === 0){ showToast("Your cart is empty"); return; }
    showToast("This is a demo — checkout isn't wired to a payment system.");
  });

  document.getElementById("backToTop").addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));

  document.getElementById("wishlistBtn").addEventListener("click", ()=>{
    state.filter = "all"; state.search = "";
    const wished = PRODUCTS.filter(p=>state.wishlist.includes(p.id));
    if(wished.length === 0){ showToast("Your wishlist is empty"); return; }
    // quick inline filter to wishlist items
    const grid = document.getElementById("productGrid");
    document.getElementById("productsTitle").textContent = "Your Wishlist";
    document.getElementById("noResults").hidden = true;
    grid.innerHTML = wished.map(p=>{
      const discount = Math.round((1-p.price/p.mrp)*100);
      const inCart = !!state.cart[p.id];
      return `
      <div class="product-card" data-id="${p.id}">
        <button class="wish-toggle active" data-wish="${p.id}"><i class="fa-solid fa-heart"></i></button>
        <div class="product-img-wrap"><img src="${p.img}" alt="${p.name}"></div>
        <div class="product-title">${p.name}</div>
        <div class="product-rating">${stars(p.rating)} <span>${p.rating}</span></div>
        <div class="product-price-row"><span class="product-price">${fmt(p.price)}</span><span class="product-mrp">${fmt(p.mrp)}</span><span class="product-discount">${discount}% off</span></div>
        <button class="add-cart-btn ${inCart?"added":""}" data-add="${p.id}">${inCart?`In Cart (${state.cart[p.id]})`:"Add to Cart"}</button>
      </div>`;
    }).join("");
    window.scrollTo({top: document.querySelector(".products-section").offsetTop - 90, behavior:"smooth"});
  });
}

function openSidebar(){ document.getElementById("sidebar").classList.add("open"); document.getElementById("sidebarOverlay").classList.add("show"); }
function closeSidebar(){ document.getElementById("sidebar").classList.remove("open"); document.getElementById("sidebarOverlay").classList.remove("show"); }
function openCart(){ document.getElementById("cartDrawer").classList.add("open"); document.getElementById("cartOverlay").classList.add("show"); }
function closeCart(){ document.getElementById("cartDrawer").classList.remove("open"); document.getElementById("cartOverlay").classList.remove("show"); }

/* ---------- 9. INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".products-section").id = "productsSection";
  renderCategoryGrid();
  renderProducts();
  updateCartUI();
  document.getElementById("wishlistCount").textContent = state.wishlist.length;
  initCarousel();
  initEvents();
});
