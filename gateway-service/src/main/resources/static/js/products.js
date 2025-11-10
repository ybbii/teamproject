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
                    <button class="btn btn-sm btn-success" onclick="addToCart(${product.id})">장바구니 담기</button>
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
// 🔹 장바구니 담기
// ============================
async function addToCart(productId) {
    try {
        // 장바구니에 담을 데이터 구성
        const cartItem = {
            productId: productId,
            productName: '',  // product-service에서 받아오든, JS에서 미리 이름 가져오기
            quantity: 1,
            price: 0           // product-service에서 가격 가져오기
        };

        // product-service에서 제품 정보 가져오기
        const productResponse = await fetch(`/api/products/${productId}`);
        if (!productResponse.ok) throw new Error('상품 정보를 가져오는데 실패했습니다.');
        const product = await productResponse.json();

        cartItem.productName = product.name;
        cartItem.price = product.price;

        // POST 요청으로 장바구니 담기
        const response = await fetch('/api/carts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItem)
        });

        if (!response.ok) throw new Error('장바구니 담기 실패');

        alert('장바구니에 추가되었습니다.');
    } catch (error) {
        console.error('장바구니 담기 실패:', error);
        alert(error.message);
    }
}


