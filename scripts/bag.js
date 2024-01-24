let bagItemsObjects;
onload();
function onload(){
  loadBagItemObjects();
  displayBagItems();
  displayBagsummary();
}

function displayBagsummary(){
  let bagSummary=document.querySelector('.bag-summary');

let totalItem=bagItemsObjects.length;
let totalMrp=0;
let totalDiscount=0;
bagItemsObjects.forEach(item=>{
  totalMrp+=item.original_price;
  totalDiscount+=item.original_price-item.current_price;
})
let finalPayment=totalMrp-totalDiscount+99;

  bagSummary.innerHTML=`<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs${totalMrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${finalPayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
}


function loadBagItemObjects(){
    bagItemsObjects=bagItems.map(itemId=>{
      for(let i=0;i<items.length;i++){
        if(itemId==items[i].id){
          return items[i];
        }
      }
    })
  }


function displayBagItems(){

  let container=document.querySelector('.bag-items-container');
  let innerHtml="";
  bagItemsObjects.forEach(bagItem => {
    innerHtml += generateItemHtml(bagItem);
  });
  container.innerHTML=innerHtml;
}

function removeItem(itemId){
    bagItems=bagItems.filter(bagitem=> bagitem != itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagItemCount();
    displayBagItems();
    displayBagsummary()
}
function generateItemHtml(item){
    return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>
  
    <div class="remove-from-cart" onclick="removeItem(${item.id})">X</div>
  </div>`;
}