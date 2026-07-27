const products = [
  { id: 1, name: "Tai nghe Bluetooth", category: "do-dien-tu", price: 350000, inStock: true },
  { id: 2, name: "Áo thun cotton", category: "quan-ao", price: 150000, inStock: true },
  { id: 3, name: "Sách Lập trình JS căn bản", category: "sach", price: 120000, inStock: false },
  { id: 4, name: "Bàn phím cơ", category: "do-dien-tu", price: 890000, inStock: true },
  { id: 5, name: "Quần jean nam", category: "quan-ao", price: 420000, inStock: false },
  { id: 6, name: "Sách Tư duy nhanh và chậm", category: "sach", price: 95000, inStock: true },
];

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const categoryFilter = document.getElementById("category-filter");
  const sortPriceBtn = document.getElementById("sort-price-btn");
  const productList = document.getElementById("product-list");
  const resultCount = document.getElementById("result-count");

  // Trạng thái sắp xếp toàn cục: 
  // 'none' (mặc định), 'asc' (thấp đến cao), 'desc' (cao đến thấp)
  let currentSortOrder = "none";

  // Hàm chuyển đổi định dạng tiền tệ (Ví dụ: 350000 -> 350.000đ)
  function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
  }

  // --- HÀM XỬ LÝ TRUNG TÂM: LỌC, SẮP XẾP VÀ RENDER DANH SÁCH ---
  function renderApp() {
    const searchText = searchBox.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    // 1. Thực hiện LỌC (Filter) đồng thời theo từ khóa và danh mục
    let filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchText);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // 2. Thực hiện SẮP XẾP (Sort) dựa trên trạng thái nút bấm
    if (currentSortOrder === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSortOrder === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    // 3. Cập nhật giao diện số lượng kết quả tìm thấy
    resultCount.textContent = `Tìm thấy ${filteredProducts.length} sản phẩm`;

    // 4. Xóa trắng nội dung cũ để render lại
    productList.innerHTML = "";

    // 5. Kiểm tra nếu không tìm thấy kết quả nào
    if (filteredProducts.length === 0) {
      productList.innerHTML = `<p class="no-result">Không tìm thấy sản phẩm nào phù hợp.</p>`;
      return;
    }

    // 6. Duyệt mảng kết quả và thêm DOM mới vào #product-list
    filteredProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-item";
      
      // Thêm class làm mờ nếu sản phẩm hết hàng
      if (!product.inStock) {
        productCard.classList.add("out-of-stock");
      }

      // Tạo cấu trúc HTML hiển thị thông tin sản phẩm
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>Danh mục: ${getCategoryName(product.category)}</p>
        <p>Giá: <strong>${formatPrice(product.price)}</strong></p>
        <p class="status">${product.inStock ? "Tình trạng: Còn hàng" : "Tình trạng: Hết hàng"}</p>
      `;

      productList.appendChild(productCard);
    });
  }

  // Hàm phụ trợ để hiển thị tên danh mục thân thiện bằng tiếng Việt
  function getCategoryName(categoryKey) {
    const categories = {
      "do-dien-tu": "Đồ điện tử",
      "quan-ao": "Quần áo",
      "sach": "Sách"
    };
    return categories[categoryKey] || categoryKey;
  }

  // --- ĐĂNG KÝ SỰ KIỆN LẮNG NGHE (EVENT LISTENERS) ---

  // Sự kiện khi đang gõ vào ô tìm kiếm
  searchBox.addEventListener("input", renderApp);

  // Sự kiện khi thay đổi bộ lọc danh mục trong thẻ select
  categoryFilter.addEventListener("change", renderApp);

  // Sự kiện khi click nút sắp xếp theo giá (Luân phiên: Thấp->Cao, Cao->Thấp)
  sortPriceBtn.addEventListener("click", () => {
    if (currentSortOrder === "none" || currentSortOrder === "desc") {
      currentSortOrder = "asc";
      sortPriceBtn.textContent = "Giá: Thấp → Cao";
    } else {
      currentSortOrder = "desc";
      sortPriceBtn.textContent = "Giá: Cao → Thấp";
    }
    renderApp(); // Chạy lại hàm xử lý để cập nhật giao diện sắp xếp mới
  });

  // --- CHẠY LẦN ĐẦU TIÊN KHI TRANG TẢI XONG ---
  renderApp();
});
