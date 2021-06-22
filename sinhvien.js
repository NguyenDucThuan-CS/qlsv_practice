function SinhVien(
  _maSV,
  _tenSV,
  _email,
  _matkhau,
  _ngaysinh,
  _khoahoc,
  _diemtoan,
  _diemly,
  _diemhoa
) 
{
    this.maSV = _maSV;
    this.tenSV =  _tenSV;
    this.email = _email;
    this.matKhau = _matkhau;
    this.ngaySinh = _ngaysinh;
    this.khoaHoc = _khoahoc;
    this.diemToan = _diemtoan;
    this.diemLy = _diemly;
    this.diemHoa = _diemhoa;
    this.diemTB = 0;

    this.tinhDTB = function () {
        this.diemTB = (
          (parseFloat(this.diemLy) +
            parseFloat(this.diemToan) +
            parseFloat(this.diemHoa)) /
          3
        );
        return this.diemTB;
      };
}
