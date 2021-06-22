function getEle(id) {
  return document.getElementById(id);
}
//var list = [];
var dssv = new DanhSachSinhVien();
var validation = new Validation();
getLocalStorage();

function layDuLieuDauVao(isAdd)
{
  var _maSV = getEle("txtMaSV").value;
  var _tenSV = getEle("txtTenSV").value;
  var _email = getEle("txtEmail").value;
  var _matkhau = getEle("txtPass").value;
  var _ngaysinh = getEle("txtNgaySinh").value;
  var _khoahoc = getEle("khSV").value;
  var _diemtoan = getEle("txtDiemToan").value;
  var _diemly = getEle("txtDiemLy").value;
  var _diemhoa = getEle("txtDiemHoa").value;

  var isValid = true;
  if(isAdd){
    isValid =
    validation.kiemTraRong(
      _maSV,
      "divMaErr",
      "(*)Ma sinh vien khong dc rong"
    ) &&
    validation.kiemTraDoDaiKiTu(
      _maSV,
      "divMaErr",
      "(*)Do dai ki tu tu 4 den 10",
      4,
      10
    ) &&
    validation.kiemTraTrungMaSV(
      _maSV,
      "divMaErr",
      "(*)Ma sinh vien trung",
      dssv.list
    );
  }
  
  isValid &=
    validation.kiemTraRong(
      _tenSV,
      "divTenErr",
      "(*)Ten sinh vien khong dc rong"
    ) &&
    validation.kiemTraKiTuChuoi(
      _tenSV,
      "divTenErr",
      "(*)Ten sinh vien phai la chu"
    );
  isValid &=
    validation.kiemTraRong(
      _email,
      "divEmailErr",
      "(*)Email sinh vien khong dc rong"
    ) &&
    validation.kiemTraEmail(_email, "divEmailErr", "(*)Email khong hop le");
  isValid &=
    validation.kiemTraRong(
      _matkhau,
      "divMatKhauErr",
      "(*)Mat khau khong dc rong"
    ) &&
    validation.kiemTraMatKhau(
      _matkhau,
      "divMatKhauErr",
      "(*)Mat khau khong hop le"
    );
  isValid &=
    validation.kiemTraRong(
      _ngaysinh,
      "divNgaySinhErr",
      "(*)Ngay sinh khong dc rong"
    ) &&
    validation.kiemTraNgaySinh(
      _ngaysinh,
      "divNgaySinhErr",
      "(*)Ngay sinh chua dung du=inh dang"
    );
  //validation.kiemTraRong(_khoahoc,"divKhErr","(*)Khoa hoc khong dc rong");
  isValid &= validation.kiemTraKhoaHoc(
    "khSV",
    "divKhErr",
    "(*)Vui long chon khoa hoc"
  );
  isValid &=
    validation.kiemTraRong(
      _diemtoan,
      "divToanErr",
      "(*)Diem toan khong dc rong"
    ) &&
    validation.kiemTraDiem(
      _diemtoan,
      "divToanErr",
      "(*)Diem khong dung dinh dang"
    );
  isValid &=
    validation.kiemTraRong(_diemly, "divLyErr", "(*)Diem ly khong dc rong") &&
    validation.kiemTraDiem(_diemly, "divLyErr", "(*)Diem khong dung dinh dang");
  isValid &=
    validation.kiemTraRong(
      _diemhoa,
      "divHoaErr",
      "(*)Diem hoa khong dc rong"
    ) &&
    validation.kiemTraDiem(
      _diemhoa,
      "divHoaErr",
      "(*)Diem khong dung dinh dang"
    );
    if(isValid){
      var sinhVien = new SinhVien(
        _maSV,
        _tenSV,
        _email,
        _matkhau,
        _ngaysinh,
        _khoahoc,
        _diemtoan,
        _diemly,
        _diemhoa
      );
      return sinhVien;
    }
    return null;
}



getEle("btnAdd").addEventListener("click", function () {
  /*  */
  //console.log(sinhVien);

  /* function kiemTraRong(input,divId,mess) {
    if (input.trim() === "") {
      getEle(divId).innerHTML = mess;
      //getEle("divMaErr").style.color = "red";
      //getEle("divMaErr").classList.add("alert");
      //getEle("divMaErr").classList.add("alert-danger");
      getEle(divId).className = "alert alert-danger";
      return false;
    } else {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true
    }
  } */
  //console.log(isValid);
  //isValid = true
  //console.log(123);
  var sinhVien = layDuLieuDauVao(true);
  if (sinhVien) {
    sinhVien.tinhDTB();
    dssv.themSinhVien(sinhVien);
    //console.log(dssv);
    taoBang(dssv.list);
    setLocalStorage();
  }
});

function taoBang(arr) {
  getEle("tbodySinhVien").innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    var tagTR = document.createElement("tr");
    var tagTD_MaSV = document.createElement("td");
    var tagTD_TenSV = document.createElement("td");
    var tagTD_Email = document.createElement("td");
    var tagTD_NgaySinh = document.createElement("td");
    var tagTD_KhoaHoc = document.createElement("td");
    var tagTD_DTB = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");
    

    tagTD_MaSV.innerHTML = arr[i].maSV;
    tagTD_TenSV.innerHTML = arr[i].tenSV;
    tagTD_Email.innerHTML = arr[i].email;
    tagTD_NgaySinh.innerHTML = arr[i].ngaySinh;
    tagTD_KhoaHoc.innerHTML = arr[i].khoaHoc;
    //arr[i].tinhDTB();
    tagTD_DTB.innerHTML = /* arr[i].diemTB */ arr[i].diemTB;
    tagTD_Button_Edit.innerHTML =  '<button class="btn btn-info" onclick = "suaSinhVien(\''+arr[i].maSV+'\')">Sua</button>';
    tagTD_Button_Delete.innerHTML = '<button class="btn btn-danger" onclick = "xoaSinhVien(\''+arr[i].maSV+'\')">Xoa</button>';

    tagTR.appendChild(tagTD_MaSV);
    tagTR.appendChild(tagTD_TenSV);
    tagTR.appendChild(tagTD_Email);
    tagTR.appendChild(tagTD_NgaySinh);
    tagTR.appendChild(tagTD_KhoaHoc);
    tagTR.appendChild(tagTD_DTB);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);


    getEle("tbodySinhVien").appendChild(tagTR);
  }
}

/* getEle("btnDelete").addEventListener("click",function(){
  console.log("123");
}); */


function xoaSinhVien(maSV){
  //console.log(maSV);
  dssv._xoaSinhVien(maSV);
  taoBang(dssv.list);
  setLocalStorage();
}

function suaSinhVien(maSV)
{
  //console.log(maSV);
  var sinhVien = dssv.layThongTinSinhVien(maSV);
  //console.log(sinhVien);
  getEle("txtMaSV").value = sinhVien.maSV;
  getEle("txtMaSV").disabled = true;
  getEle("txtTenSV").value = sinhVien.tenSV;
  getEle("txtEmail").value = sinhVien.email;
  getEle("txtPass").value = sinhVien.matKhau;
  getEle("txtNgaySinh").value = sinhVien.ngaySinh;
  getEle("khSV").value = sinhVien.khoaHoc;
  getEle("txtDiemToan").value = sinhVien.diemToan;
  getEle("txtDiemLy").value = sinhVien.diemLy;
  getEle("txtDiemHoa").value = sinhVien.diemHoa;

  getEle("btnUpdate").style.display = "inline-block";

}


getEle("btnUpdate").addEventListener("click",function(){
  //console.log(123);
 /*  var _maSV = getEle("txtMaSV").value;
  var _tenSV = getEle("txtTenSV").value;
  var _email = getEle("txtEmail").value;
  var _matkhau = getEle("txtPass").value;
  var _ngaysinh = getEle("txtNgaySinh").value;
  var _khoahoc = getEle("khSV").value;
  var _diemtoan = getEle("txtDiemToan").value;
  var _diemly = getEle("txtDiemLy").value;
  var _diemhoa = getEle("txtDiemHoa").value; */

  var sinhVien = layDuLieuDauVao(false);
  sinhVien.tinhDTB();
  //console.log(sinhVien);
  dssv.capNhatThongTin(sinhVien);
  taoBang(dssv.list);
  setLocalStorage();
});


getEle("btnReset").addEventListener("click",function(){


});

getEle("txtSearch").addEventListener("keyup",function(){
  var keyWord = getEle("txtSearch").value;
  console.log(keyWord);
  var mangTimKiem =  dssv.timKiemSinhVien(keyWord);
  taoBang(mangTimKiem);

});

function setLocalStorage() {
  var arrString = JSON.stringify(dssv.list);
  localStorage.setItem("DSSV1", arrString);
}

function getLocalStorage() {
  if (localStorage.getItem("DSSV1")) {
    dssv.list = JSON.parse(localStorage.getItem("DSSV1"));
    //localStorage.getItem("DSV1");
    taoBang(dssv.list);
  }
}
