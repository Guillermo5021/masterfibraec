const CART_KEY='mf_cart_v1';const USER_KEY='mf_user_v1';
const $=s=>document.querySelector(s); const $$=s=>document.querySelectorAll(s);
function loadCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(e){return []}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));updateCartBadge();}
function cartTotal(c){return c.reduce((s,i)=>s+i.price*i.qty,0)}
function updateCartBadge(){const c=loadCart();const el=document.getElementById('cart-count'); if(el) el.textContent=c.reduce((n,i)=>n+i.qty,0)}
function addToCart(item){const c=loadCart();const i=c.find(x=>x.id===item.id); if(i){i.qty+=item.qty||1}else{c.push({...item,qty:item.qty||1})} saveCart(c); alert('Producto agregado al carrito')}
function removeFromCart(id){let c=loadCart().filter(i=>i.id!==id); saveCart(c); if(typeof renderCart==='function') renderCart()}
function setQty(id,qty){let c=loadCart();const i=c.find(x=>x.id===id); if(!i) return; i.qty=Math.max(1,qty); saveCart(c); if(typeof renderCart==='function') renderCart()}
function loadUser(){try{return JSON.parse(localStorage.getItem(USER_KEY))||{}}catch(e){return{}}}
function saveUser(u){localStorage.setItem(USER_KEY,JSON.stringify(u))}
function paypalLink(total){const amount=total.toFixed(2); return `https://paypal.me/ElvisGomez1985/${amount}`}
// NÚMERO DE WHATSAPP CORREGIDO AL CONTACTO OFICIAL
function whatsappLink(total){const c=loadCart();let msg='🛒 Pedido Master Fibra\n'; c.forEach(i=>msg+=`• ${i.name} x${i.qty} — $${(i.price*i.qty).toFixed(2)}\n`); msg+=`Total: $${total.toFixed(2)}\n`; const u=loadUser(); if(u&&u.nombre){msg+=`\nCliente: ${u.nombre}\nID/RUC: ${u.identificacion||''}\nEmail: ${u.email||''}\nTel: ${u.telefono||''}\nDirección: ${u.direccion||''}`} return `https://wa.me/593995783624?text=${encodeURIComponent(msg)}`}
document.addEventListener('DOMContentLoaded',updateCartBadge);

// Función que construye la URL del formulario de Google Forms con los datos del carrito pre-rellenados
function googleFormsLink(total){
  const c=loadCart();
  
  // 1. Construir el detalle del pedido como un string
  let productDetails='';
  c.forEach(i=>productDetails+=`• ${i.name} x${i.qty} — $${(i.price*i.qty).toFixed(2)}\n`); 
  
  // 2. Definir los IDs de entrada de tu formulario de Google
  // entry.2051015095 = Detalle del Pedido / Productos
  // entry.221250886 = Total
  const ENTRY_PRODUCTOS = 'entry.2051015095'; 
  const ENTRY_TOTAL = 'entry.221250886';         
  
  // 3. Codificar los datos
  const encodedProducts = encodeURIComponent(productDetails);
  const encodedTotal = encodeURIComponent(total.toFixed(2));
  
  // 4. Construir la URL base
  const formBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc6iMGlHH8EkdgJauXrWEshzZaBYoQ3NE5svLq12hZk-ObbYA/viewform';
  
  // 5. Construir la URL completa con los parámetros pre-rellenados
  return `${formBaseUrl}?usp=pp_url&${ENTRY_PRODUCTOS}=${encodedProducts}&${ENTRY_TOTAL}=${encodedTotal}`;
}