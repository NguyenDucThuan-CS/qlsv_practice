function DanhSachSinhVien()
{
    this.list = [];
    this.themSinhVien = function(sinhVien){
        this.list.push(sinhVien);
    };

    this.timViTri = function(maSV){
        for(var i = 0;i<this.list.length;i++)
        {
            if(this.list[i].maSV == maSV) return i;
        }
        return i;
    }
    this._xoaSinhVien = function(maSV){
        var index = this.timViTri(maSV);
        if(index!==-1){
            this.list.splice(index,1);
        }
    }

    this.layThongTinSinhVien = function(maSV){
        var index = this.timViTri(maSV);
        if(index!==-1)
        {
            return this.list[index];
        }
    }

    this.capNhatThongTin = function(sinhVien){
        var index = this.timViTri(sinhVien.maSV);
        /* this.list[index].tenSV = sinhVien.tenSV;
        this.list[index].email = sinhVien.email;
        this.list[index].matKhau = sinhVien.matKhau;
        this.list[index].ngaySinh = sinhVien.ngaySinh;
        this.list[index].khoaHoc = sinhVien.khoaHoc;
        this.list[index].diemToan = sinhVien.diemToan;
        this.list[index].diemLy = sinhVien.diemLy;
        this.list[index].diemHoa = sinhVien.diemHoa; */
        this.list[index] = sinhVien;
    }
   /*  this.timKiemSinhVien = function(keyWord){

    } */
}

DanhSachSinhVien.prototype.timKiemSinhVien = function(keyWord){
    var listTimKiem = [];
    for(var i = 0;i<this.list.length;i++)
    {
        if(this.list[i].tenSV.toLowerCase().indexOf(keyWord.toLowerCase())!==-1)
        {
            listTimKiem.push(this.list[i]);
        }
    }
    return listTimKiem;
}