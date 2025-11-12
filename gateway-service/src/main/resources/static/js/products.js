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
                    <div class="input-group input-group-sm" style="width:140px;">
                        <input type="number" id="qty-${product.id}" class="form-control" value="1" min="1">
                        <button class="btn btn-success" onclick="addToCart(${product.id})">담기</button>
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

