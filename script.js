const modal = document.getElementById("pedidoInfo");
const cartButton = document.getElementById("cartBtn");
const items = document.getElementById("itemsCart");
const precoTotal = document.getElementById("precoTotal");
const finalizar = document.getElementById("finalizarBtn");
const fecharModal = document.getElementById("fecharBtn");
const numeroPedidos = document.getElementById("cartCount");
const mesaNumero = document.getElementById("mesaNumero");
const mesaWarn = document.getElementById("inputWarn");
const cardapio = document.getElementById("cardapio");

let carrinho = [];





cartButton.addEventListener("click", function(){
    atualizarCarrinho();
    modal.style.display = "flex";
});

fecharModal.addEventListener("click", function(){
    modal.style.display = "none";
});

modal.addEventListener("click", function(event){
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

cardapio.addEventListener("click", function(event){
    let parentButton = event.target.closest(".addBtn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        
        addToCart(name, price);

    }
});


function addToCart(name, price) {
    const mesmoItem = carrinho.find(item => item.name === name);
    if (mesmoItem) {
        mesmoItem.quantity += 1;
    }else{


    carrinho.push({ name,
        price,
        quantity: 1 });

    }

    atualizarCarrinho();

};


function atualizarCarrinho() {
    items.innerHTML = "";
    let total = 0;
    

    carrinho.forEach(item => {
        
        const itemElement = document.createElement("div");
        itemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        
        itemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p class="font-medium">Preço: R$ ${item.price.toFixed(2)}</p>
            </div>

            <div class="flex items-center border-radius-md bg-red-500 text-white px-2 py-1 cursor-pointer hover:bg-red-700 hover:scale-105 duration-200 rounded">
                <button class="removerItemBtn" data-name="${item.name}">
                    Remover
                </button>
            </div>
        </div>
        `
        total += item.price * item.quantity;
        items.appendChild(itemElement);
    });

    precoTotal.textContent = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    numeroPedidos.innerHTML = carrinho.length;


};


    items.addEventListener("click", function(event){
        if (event.target.classList.contains("removerItemBtn")) {
            const itemNome = event.target.getAttribute("data-name");
        
        removerItemCarrinho(itemNome);
        }
    });



function removerItemCarrinho(name) {
    const index = carrinho.findIndex(item => item.name === name);
    if (index !== -1) {
        const item = carrinho[index];
        
        if(item.quantity > 1) {
            item.quantity -= 1;
            atualizarCarrinho();
            return;
        }

        carrinho.splice(index, 1);
        atualizarCarrinho();
    }
};