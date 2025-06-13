// bai_6_t_speed_company/js/t_speed_script.js

document.addEventListener("DOMContentLoaded", function () {
  // 1. Lấy các phần tử cần tương tác
  const txtMuaVao = document.getElementById("txtMuaVao");
  const txtBanRa = document.getElementById("txtBanRa");
  const selectLoaiXe = document.getElementById("selectLoaiXe");
  const radioVang = document.getElementById("radioVang");
  const radioUSD = document.getElementById("radioUSD");
  const btnUpdate = document.getElementById("btnUpdate");
  const btnState = document.getElementById("btnState");
  const carImage = document.getElementById("carImage");
  const carPriceDisplay = document.getElementById("carPriceDisplay");
  const marketTableVangMua = document.getElementById("marketTableVangMua");
  const marketTableVangBan = document.getElementById("marketTableVangBan");
  const marketTableUSDMua = document.getElementById("marketTableUSDMua");
  const marketTableUSDBan = document.getElementById("marketTableUSDBan");

  // Dữ liệu xe (đường dẫn hình ảnh và giá)
  // Các đường dẫn này giả định ảnh nằm trong thư mục ../images/
  const carData = {
    Toyota: { image: "img/car1.jpg", price: 35000 },
    KIA: { image: "img/car2.jpg", price: 15000 },
    Ford: { image: "img/car3.jpg", price: 40000 },
    Civic: { image: "img/car4.jpg", price: 32000 },
    Ferrari: { image: "img/car5.jpg", price: 50000 },
    Mercedes: { image: "img/car6.jpg", price: 45000 },
  };

  // 2. Yêu cầu xử lý 1: Khi trang load lên thì con trỏ nhập liệu trong trường ‘Mua vào’ và nút State ở chế độ không cho phép chọn.
  txtMuaVao.focus();
  btnState.disabled = true;

  // 3. Yêu cầu xử lý 2: Khi di chuyển con trỏ ra khỏi trường ‘Mua vào’ nếu giá trị trường này là số và không rỗng thì nút State sáng lên.
  txtMuaVao.addEventListener("blur", function () {
    const muaVaoValue = parseFloat(txtMuaVao.value);
    if (!isNaN(muaVaoValue) && txtMuaVao.value.trim() !== "") {
      btnState.disabled = false;
    } else {
      btnState.disabled = true;
    }
  });

  // 4. Yêu cầu xử lý 3: Khi Click vào mục chọn loại xe thì sẽ thể hiện hình và giá của loại đó sang vùng bên phải. (tách chuỗi)
  selectLoaiXe.addEventListener("change", function () {
    const selectedCarName = this.value; // Lấy tên xe từ value của option
    const carInfo = carData[selectedCarName]; // Lấy thông tin xe từ đối tượng carData

    if (carInfo) {
      carImage.src = carInfo.image;
      carPriceDisplay.textContent =
        "Giá: " + carInfo.price.toLocaleString("en-US") + " USD"; // Format giá có dấu phẩy
    } else {
      carImage.src = ""; // Xóa ảnh nếu không tìm thấy
      carPriceDisplay.textContent = "Không có thông tin xe này.";
    }
  });
  // Gọi một lần khi tải trang để hiển thị xe mặc định
  selectLoaiXe.dispatchEvent(new Event("change"));

  // 5. Yêu cầu xử lý 4: Khi bấm vào nút Update và nếu nút radio ‘Vàng’ được chọn thì cập dữ liệu ở ‘Bảng tin thị trường’ trong mục ‘Vàng’ còn ngược lại thì cập nhật ở mục ‘USD’ tương ứng với trường ‘Mua vào’ của cột ‘Mua vào’ và trường ‘Bán ra’ của cột ‘Bán ra’ (Dùng inner để cập nhật).
  btnUpdate.addEventListener("click", function () {
    const muaVao = parseFloat(txtMuaVao.value);
    const banRa = parseFloat(txtBanRa.value);

    if (isNaN(muaVao) || isNaN(banRa)) {
      alert("Vui lòng nhập giá trị số hợp lệ cho Mua vào và Bán ra.");
      return;
    }

    const muaVaoFormatted = muaVao.toLocaleString("en-US");
    const banRaFormatted = banRa.toLocaleString("en-US");

    if (radioVang.checked) {
      marketTableVangMua.textContent = muaVaoFormatted;
      marketTableVangBan.textContent = banRaFormatted;
    } else if (radioUSD.checked) {
      marketTableUSDMua.textContent = muaVaoFormatted;
      marketTableUSDBan.textContent = banRaFormatted;
    } else {
      alert('Vui lòng chọn "Vàng" hoặc "USD" để cập nhật.');
    }

    // Cập nhật thông tin xe theo loại xe được chọn
    const selectedCar = selectLoaiXe.value;
    carImage.src = carPrices[selectedCar].img;
    carPriceDisplay.textContent = `Giá: ${carPrices[selectedCar].price} USD`;
  });

  // Hàm hiển thị trạng thái hiện tại khi nhấn nút State
  btnState.addEventListener("click", function () {
    // Hiển thị thông tin trạng thái lên alert
    const currency = radioVang.checked ? 'Vàng' : 'USD';
    const selectedCar = selectLoaiXe.value;
    alert(
        `Loại tiền: ${currency}\n` +
        `Mua vào: ${txtMuaVao.value}\n` +
        `Bán ra: ${txtBanRa.value}\n` +
        `Loại xe: ${selectedCar}\n` +
        `Giá xe: ${carPrices[selectedCar].price} USD`
    );
  });
});
