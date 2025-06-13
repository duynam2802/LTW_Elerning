document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");
  const birthdate = document.getElementById("birthdate");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const hobby = document.getElementById("hobby");

  if (username.value.length < 6) {
    alert("Tên đăng nhập phải có ít nhất 6 ký tự!");
    return username.focus();
  }

  if (password.value !== confirm.value) {
    alert("Xác nhận mật khẩu không đúng!");
    return confirm.focus();
  }

  if (phone.value && !/^\d+$/.test(phone.value)) {
    alert("Điện thoại phải là số!");
    return phone.focus();
  }

  if (email.value && !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email.value)) {
    alert("Email không hợp lệ!");
    return email.focus();
  }

  const params = new URLSearchParams({
    fullname: fullname.value,
    username: username.value,
    birthdate: birthdate.value,
    phone: phone.value,
    address: address.value,
    email: email.value,
    hobby: hobby.value
  });
if (birthdate.value) {
  const year = parseInt(birthdate.value.substring(0, 4)); 
  if (year < 1900 || year > 2025) {
    alert("Năm sinh phải nằm trong khoảng từ 1900 đến 2025!");
    return birthdate.focus();
  }
} else {
  alert("Vui lòng chọn ngày sinh!");
  return birthdate.focus();
}

  window.location.href = "thongtin.htm?" + params.toString();
});
