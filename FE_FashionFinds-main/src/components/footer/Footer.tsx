import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2a2a86] text-white">
      <div className="px-5 footer page-container">
        <div className="grid grid-cols-4 py-10 gap-4">
          <div className="flex flex-col">
            <p className="block mb-10 text-sm">
              “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
              hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn
              cùng YODY tiến bước
            </p>
            <h3 className="mb-2">ĐĂNG KÝ NHẬN THÔNG TIN</h3>
            <div>
              <form className="flex items-center ">
                <input
                  className="block h-10 border duration-300 transition-all px-5 py-2 outline-none bg-slate-700 hover:border-secondary hover:border rounded-s-lg"
                  type="text"
                  placeholder="Nhập email..."
                />
                <button
                  type="submit"
                  className="h-10 px-2 duration-300 transition-all text-sm transition-all bg-white rounded-r-lg text-secondary hover:bg-secondary hover:text-white"
                  aria-label="Justify"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col">
            <h5>VỀ YODY</h5>
            <Link to="" className="hover:text-secondary duration-300 transition-all text-gray-300">Giới thiệu</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all text-gray-300">Liên hệ</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all text-gray-300">Tuyển dụng</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all text-gray-300">Tin tức</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all text-gray-300">Hệ thống cửa hàng</Link>
            <Link to="" className="hover:text-secondary duration-300 transition-all text-gray-300">Hàng mới về</Link>
          </div>
          <div className="flex flex-col">
            <h5>Chính sách Sử dụng Cookies</h5>
            <span className="text-[15px] text-gray-300">Hướng dẫn Chọn size</span>
            <span className="text-[15px] text-gray-300">Chính sách Khách hàng thân thiết</span>
            <span className="text-[15px] text-gray-300">Chính sách Bảo hành, đổi/trả</span>
            <span className="text-[15px] text-gray-300">Chính sách Thanh toán, giao nhận</span>
            <span className="text-[15px] text-gray-300">Chính sách Đồng phục</span>
            <span className="text-[15px] text-gray-300">Chính sách Bảo mật thông tin khách hàng</span>
            <span className="text-[15px] text-gray-300">Chính sách Sử dụng Cookies</span>
          </div>
          <div className="flex flex-col">
            <h5>CÔNG TY CP THỜI TRANG YODY</h5>
            <span className="text-[15px] text-gray-300">Công ty cổ phần Thời trang YODY</span>
            <span className="text-[15px] text-gray-300">Mã số thuế: 0801206940</span>
            <span className="text-[15px] text-gray-300">
              Địa chỉ: Đường An Định - Phường Việt Hòa - Thành phố Hải Dương -
              Hải Dương
            </span>
            <span className="text-[15px] text-gray-300">Tìm cửa hàng gần bạn nhất</span>
            <span className="text-[15px] text-gray-300"> Liên hệ đặt hàng: 024 999 86 999.</span>
            <span className="text-[15px] text-gray-300">Thắc mắc đơn hàng: 024 999 86 999.</span>
            <span className="text-[15px] text-gray-300">Góp ý khiếu nại: 1800 2086.</span>
          </div>
        </div>
        <div className=" copyright">
          <hr />
          <h3 className="py-5 text-sm text-center text-white">
            © YODY - Bản quyền thuộc về Công ty cổ phần thời trang YODY
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
