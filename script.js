
function updateTotal() {
    const productPrice = parseFloat(document.getElementById('product').value);
    const sizePrice = parseFloat(document.getElementById('size').value);
    
    let totalAddOns = 0;
    const addOns = document.querySelectorAll('input[name="add-ons"]:checked');

    addOns.forEach(addOn => {
        const quantity = parseInt(document.getElementById(addOn.id + '-qty').value);
        totalAddOns += parseFloat(addOn.value) * quantity;
    });

    const totalPrice = productPrice + sizePrice + totalAddOns;

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

document.getElementById('order-form').addEventListener('change', updateTotal);

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const productPrice = parseFloat(document.getElementById('product').value);
    const sizePrice = parseFloat(document.getElementById('size').value);
    
    let totalAddOns = 0;
    const addOns = document.querySelectorAll('input[name="add-ons"]:checked');

    let selectedAddOns = [];
    addOns.forEach(addOn => {
        const quantity = parseInt(document.getElementById(addOn.id + '-qty').value);
        const addOnTotal = parseFloat(addOn.value) * quantity;
        totalAddOns += addOnTotal;
        selectedAddOns.push(`${addOn.labels[0].textContent} (x${quantity})`);
    });

    const totalPrice = productPrice + sizePrice + totalAddOns;

    const orderDetails = {
        name: name,
        address: address,
        productPrice: productPrice.toFixed(2),
        sizePrice: sizePrice.toFixed(2),
        totalAddOns: totalAddOns.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        addOns: selectedAddOns.join(", ")
    };

    console.log("Detalhes do Pedido:", orderDetails);
    alert('Pedido enviado com sucesso! Total: R$' + totalPrice.toFixed(2));
});

$(document).ready(function(){
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000, 
        fade: true, 
        cssEase: 'linear', 

        prevArrow: '<button type="button" class="slick-prev">',
        nextArrow: '<button type="button" class="slick-next"><span>&rarr;</span></button>'
    });
});

document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', function() {
        const productValue = this.getAttribute('data-product-value');
        document.getElementById('product').value = productValue;

        document.querySelectorAll('.product-item').forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');
        
        
        updateTotal();
    });
});