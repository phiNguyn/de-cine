import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#333] text-[#d0d0d0] py-8">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-wrap justify-between px-4 sm:px-6 md:px-8">
          {/* Section 1 - About */}
          <div className="w-full md:w-1/4 mb-6">
            <h3 className="text-white mb-4">Giới thiệu</h3>
            <ul className="space-y-2">
              <li><a href="/ve-chung-toi/" className="hover:text-yellow-500 transition duration-300">Về chúng tôi</a></li>
              <li><a href="/thoa-thuan-su-dung/" className="hover:text-yellow-500 transition duration-300">Thoả thuận sử dụng</a></li>
              <li><a href="/quy-che-hoat-dong/" className="hover:text-yellow-500 transition duration-300">Quy chế hoạt động</a></li>
              <li><a href="/chinh-sach-bao-mat/" className="hover:text-yellow-500 transition duration-300">Chính sách bảo mật</a></li>
            </ul>
          </div>
  
          {/* Section 2 - Film Corner */}
          <div className="w-full md:w-1/4 mb-6">
            <h3 className="text-white mb-4">Góc điện ảnh</h3>
            <ul className="space-y-2">
              <li><a href="/dien-anh/" className="hover:text-yellow-500 transition duration-300">Thể loại phim</a></li>
              <li><a href="/binh-luan-phim/" className="hover:text-yellow-500 transition duration-300">Bình luận phim</a></li>
              <li><a href="/movie-blog/" className="hover:text-yellow-500 transition duration-300">Blog điện ảnh</a></li>
              <li><a href="/phim-hay/" className="hover:text-yellow-500 transition duration-300">Phim hay tháng</a></li>
              <li><a href="/phim-imax/" className="hover:text-yellow-500 transition duration-300">Phim IMAX</a></li>
            </ul>
          </div>
  
          {/* Section 3 - Support */}
          <div className="w-full md:w-1/4 mb-6">
            <h3 className="text-white mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="/gop-y/" className="hover:text-yellow-500 transition duration-300">Góp ý</a></li>
              <li><a href="/sale-and-service/" className="hover:text-yellow-500 transition duration-300">Sale & Services</a></li>
              <li><a href="/rap-gia-ve/" className="hover:text-yellow-500 transition duration-300">Rạp / Giá vé</a></li>
              <li><a href="https://tuyendung-daotao.galaxystudio.vn/" target="_blank" className="hover:text-yellow-500 transition duration-300">Tuyển dụng</a></li>
              <li><a href="/hoi-dap/" className="hover:text-yellow-500 transition duration-300">FAQ</a></li>
            </ul>
          </div>
  
          {/* Section 4 - Connect */}
          <div className="w-full md:w-1/4 mb-6 flex flex-col items-center">
            <div className="footer__logo mb-5">
              <img
                alt="Dev - Cinema"
                loading="lazy"
                width={94}
                height={42}
                decoding="async"
                data-nimg={1}
                style={{ color: "transparent" }}
                src="/img/logoDecine.png"
              />
            </div>
            <div className="flex space-x-4 justify-center mb-5">
              <a href="https://www.facebook.com/galaxycinevn" target="_blank" className="hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 drop-shadow-lg" />
              </a>
              <a href="https://www.youtube.com/user/galaxymovies" target="_blank" className="hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faYoutube} className="w-6 h-6 drop-shadow-lg" />
              </a>
              <a href="https://www.instagram.com/galaxycinema" target="_blank" className="hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 drop-shadow-lg" />
              </a>
            </div>
            <div>
              <a href="http://online.gov.vn/Home/WebDetails/5005" target="_blank">
                <img src="/path-to-trade-logo.png" alt="Trade Logo" className="w-32" />
              </a>
            </div>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left">
              <img src="/img/logoDecine.png" alt="DEVCINE" className="w-24" />
              <p className="text-sm mt-2">CÔNG TY CỔ PHẦN PHIM DEV-CINE</p>
              <p className="text-sm">3/9 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, Tp. Hồ Chí Minh, Việt Nam</p>
              <p className="text-sm">Điện thoại: <a href="tel:028.39.333.303" className="hover:text-yellow-500 transition duration-300">028.39.333.303</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
