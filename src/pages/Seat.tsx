const SeatSelection = () => {
    const seats = Array(84).fill("H1"); 
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white m-2">
        <div className="w-full text-center py-4 bg-red-600 text-white">
          Theo quy định của cục điện ảnh, phim không dành cho trẻ dưới 18 tuổi
        </div>
  
        <div className="flex mt-10 w-11/12">
          <div className="w-3/4">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 mr-2"></div>
                  Ghế đã bán
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 mr-2"></div>
                  Ghế trống
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 mr-2"></div>
                  Ghế đang chọn
                </div>
              </div>
            </div>
            <img
              src="/img/ic-screen.png"
              alt="sceen"
              className="w-auto mt-6"
            />
            <div className="grid grid-cols-12 gap-2  w-fit justify-center pl-52 pt-10">
           
              {seats.map((seat, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded bg-gray-300 hover:bg-yellow-400 hover:text-black text-gray-900 transition-colors duration-200"
                >
                  {seat}
                </button>
              ))}
            
            </div>
          </div>
  
          <div className="w-1/4 p-6 bg-white text-black rounded-lg ml-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Làm Giàu Với Ma</h3>
              <span className="bg-yellow-400 text-black px-2 py-1 rounded">
                T18
              </span>
            </div>
            
            <img
              src="/img/images.jpg"
              alt="Poster"
              className="mb-4 w-full rounded-lg"
            />
            <p className="text-sm mb-1">DeCine: <b>Rạp Decine 12</b></p>
            <p className="text-sm mb-1">Suất: <b>20:00</b> - Chủ Nhật, 20/10/2024</p>
            <hr className="my-4" />
            <p className="text-sm mb-1">2 Ghế: H1, H2</p>
            <p className="font-bold text-lg">120.000 đ</p>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded mt-4 hover:bg-yellow-500 transition-colors duration-200">
              Quay Lại 
            </button>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded mt-4 hover:bg-yellow-500 transition-colors duration-200 ml-16">
              Tiếp tục
            </button>
          </div>    
        </div>
      </div>
    );
  };
  
  export { SeatSelection };
  