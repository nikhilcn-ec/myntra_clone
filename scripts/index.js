let bagItems;
onload();
function onload(){
  let bagItemsstr=localStorage.getItem('bagItems');
  bagItems=bagItemsstr ? JSON.parse(bagItemsstr):[];
  displayItems();
  displayBagItemCount();
}

function addToBag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagItemCount();
}
function displayBagItemCount(){
  let item_Count=document.querySelector('.bag-item-count');
  if(bagItems.length > 0){
    item_Count.style.visibility ='visible';
    item_Count.innerText= bagItems.length;
    
  } else{
    item_Count.style.visibility = 'hidden';
  }
   
}

function displayItems(){
  let containerElement=document.querySelector('.container');
  if(!containerElement){
    return;
  }
  let innerHTML='';
  items.forEach(item=>{
    innerHTML+=`<div class="item-container">
    <img class="item-img" src="${item.image}" alt="item1">
    <div class="rating">
        ${item.rating.stars} ⭐ | ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="itme-name">${item.item_name}</div>
    <div class="price">
        <span class="cureent-price">Rs ${item.current_price}</span>
        <span class="mrp"><del>Rs ${item.original_price}</del></span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    <button onclick=" addToBag(${item.id})" class="btn-addcart">Add to Cart</button>
  </div>`;
  });
  containerElement.innerHTML=innerHTML;
}



