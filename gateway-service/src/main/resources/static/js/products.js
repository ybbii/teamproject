document.addEventListener('DOMContentLoaded', function() {
    loadProductList();
});

// ============================
// 🔹 상품 목록 조회
// ============================
async function loadProductList() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('상품 목록 불러오기 실패');
        const products = await response.json();

        const tbody = document.getElementById('productListTableBody');
        tbody.innerHTML = '';

        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString()} 원</td>
                <td>
                <div class="input-group input-group-sm" style="width:150px;">
                <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${product.id}, -1)">−</button>
                <input type="text" id="qty-${product.id}" class="form-control text-center" value="1" readonly>
                <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${product.id}, 1)">+</button>
                <button class="btn btn-success ms-2" onclick="addToCart(${product.id})">담기</button>
                </div>

                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error('상품 목록 조회 오류:', error);
        alert('상품 목록을 불러오는데 실패했습니다.');
    }
}

function changeQuantity(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    let current = parseInt(input.value);
    current = isNaN(current) ? 1 : current + delta;
    if (current < 1) current = 1; // 최소 1개 유지
    input.value = current;
}


// ============================
// 🔹 장바구니 담기 (수량 포함)
// ============================
async function addToCart(productId) {
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    try {
        const response = await fetch(`/api/carts/${productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }) // ✅ 수량 전달
        });

        if (!response.ok) throw new Error('장바구니 담기 실패');
        alert('장바구니에 추가되었습니다.');
    } catch (error) {
        console.error('장바구니 담기 실패:', error);
        alert(error.message);
    }
}

