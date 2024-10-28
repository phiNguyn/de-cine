import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

const BookingInformation = () => {
    const active_progress = "after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-yellow-500 after:w-1/2 after:w-full";
        const active_li = "text-yellow-500";

        const [activeStep, setActiveStep] = useState(0);

        const progress_menu = ["Chọn Phim/Rạp/Suất", "Ghế", "Thức ăn", "Thanh toán", "Xác nhận"];

         const handleStepClick = (index: SetStateAction<number>) => {
    if (index > activeStep) {
      setActiveStep(index); 
    }
  };
    const Location = ["TP. Hồ Chí Minh", "Hà Nội"];

    const Movie = [
        { id: "1", name: "Venom Last Dance", image: "https://cdn.galaxycine.vn/media/2024/10/16/venom-sneak-500_1729048419589.jpg" },
        { id: "2", name: "Cô Dâu Hào Môn", image: "https://cdn.galaxycine.vn/media/2024/10/18/co-dau-hao-mon-500_1729221052856.jpg" },
        { id: "3", name: "Tee Yod 2", image: "https://cdn.galaxycine.vn/media/2024/10/10/tee-yod-2-500_1728531355521.jpg" }
    ];
    const showTime = [
        {id:"1" , date: "2024-12-10" , start_time: "20:10" , end_time: "22:00"}, 
        {id:"2" , date: "2024-14-10" , start_time: "22:10" , end_time: "01:00"}, 
        {id:"3" , date: "2024-15-10" , start_time: "18:10" , end_time: "20:00"}, 
        {id:"4" , date: "2024-21-10" , start_time: "15:10" , end_time: "17:00"}, 

    ]

    const handleNextStep = () => {
        setActiveStep((prevStep) => prevStep + 1); 
    };
    const handlePrevStep = () => {
        setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
    };    
    return (
        <>
            <div className="booking__progress-bar flex justify-center items-center flex-nowrap bg-transparent relative md:mb-8 mb-0 w-full overflow-auto">
      <ul className="flex justify-center items-center text-[#d0d0d0] md:text-base text-[12px] font-semibold w-full flex-nowrap">
        {progress_menu.map((label, index) => (
          <li key={index} className={`pt-4 mb-4 pl-0 ${index <= activeStep ? active_li : ""}`}>
            <button
              className="md:mx-3 mx-1 ml-0"
              onClick={() => handleStepClick(index)}
            >
              {label}
            </button>
            <div
              className={`relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-grey-30 ${
                index <= activeStep ? active_progress : ""
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
    <div className="md:container md:mx-auto grid xl:grid-cols-3 grid-cols-1">
      <div className="col-span-2 order-[-9999]">
        <div className="booking__select-session">
          <Accordion type="single" collapsible>
            <AccordionItem value="location">
              <AccordionTrigger>
                <h2 className="font-bold text-xl">Chọn vị trí</h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-row gap-2 flex-wrap">
                  {Location.map((location) => (
                    <button
                      key={location}
                      className="py-2 px-4 border rounded text-[14px] font-normal hover:bg-blue-10 transition-all duration-500 ease-in-out hover:bg-yellow-500 text-white-10"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible >
            <AccordionItem value="movie">
              <AccordionTrigger>
                <h2 className="font-bold text-xl">Chọn phim</h2>
              </AccordionTrigger>
              <AccordionContent>
              <Carousel>
  <CarouselContent className="-ml-2 md:-ml-4">
    {Movie.map((movie) => (
    <CarouselItem className="pl-2 md:pl-4 basis-1/5">
      <div
      key={movie.id}
      className="relative"
      tabIndex={-1}
      style={{ width: "100%", display: "inline-block" }}
    >
      <div className="text-sm text-black  transition-all duration-300 cursor-pointer h-full min-h-[350px] max-h-[400px] px-1">
        <div className="activeMovie relative css-jekrqv">
          <img
            alt="Tee Yod: Quỷ Ăn Tạng Phần 2"
            loading="lazy"
            width={160}
            height={240}
            decoding="async"
            data-nimg={1}
            className='w-full h-full rounded object-cover object-cover duration-500 ease-in-out group-hover:opacity-100"
                        scale-100 blur-0 grayscale-0)'
            src={movie.image}
            style={{ color: "transparent" }}
          />
          <div />
        </div>
        <h3 className="screen375:px-0 screen425:px-4 px-1 text-gray-50 text-base">
            {movie.name}
        </h3>
      </div>
    </div> 
    </CarouselItem>
     ))}
  </CarouselContent>
</Carousel>

              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Session Accordion */}
          <Accordion type="single" collapsible>
            <AccordionItem value="session">
              <AccordionTrigger>
                <h2 className="font-bold text-xl">Chọn suất</h2>
              </AccordionTrigger>
              <AccordionContent>
              <div className="flex flex-row gap-2 flex-wrap">
                  {showTime.map((showTime) => (
                    <button
                      key={showTime.id}
                      className="py-2 px-4 border rounded text-[14px] font-normal hover:bg-blue-10 transition-all duration-500 ease-in-out hover:bg-yellow-500 text-white-10"
                    >
                      {showTime.start_time}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="col-span-1 ml-7">
        <div className="booking__summary">
          <div className="h-[6px] bg-yellow-500 rounded-t-lg" />
          <div className="bg-transparent p-4 grid grid-cols-3 items-center">
            <div className="row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block">
              <img
                alt=""
                width={100}
                height={150}
                className="w-full h-full rounded object-cover"
                src="https://www.galaxycine.vn/_next/static/media/img-blank.bb695736.svg"
              />
            </div>
            <div className="row-span-2 md:row-span-1 xl:row-span-2 hidden md:block xl:hidden">
            <img alt="Robot Hoang Dã" loading="lazy" width="100" height="150" decoding="async" data-nimg="1" className=" w-[220px] h-[150px] rounded  object-cover duration-500 ease-in-out group-hover:opacity-100&quot;
      scale-100 blur-0 grayscale-0)"  src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-750_1727843732360.jpg"/>

      </div>
            <div className="flex-1 col-span-2 ml-4 md:col-span-1 row-span-1 xl:col-span-2">
              <h3 className="text-sm xl:text-base font-bold xl:mb-2">Movie Title</h3>
              <p className="text-sm inline-block">Additional Info</p>
            </div>
            <div className="col-span-2 md:col-span-1 xl:col-span-3"><div className="my-4 border-t border-gray-500 border-dashed xl:block hidden"></div></div>
            <div className="xl:flex hidden justify-between col-span-3"><strong className="text-base">Tổng cộng</strong><span className="inline-block font-bold text-primary ">0&nbsp;₫</span></div>
          </div>

          <div className="mt-8 flex">
            <button className="w-1/2 mr-2 py-2 border border-yellow-500 rounded text-yellow-500" onClick={handlePrevStep}>
              Quay lại
            </button>
            <Link to={`/Seat`} className=" text-center w-1/2 ml-2 py-2 bg-yellow-500 text-white border rounded-md" onClick={handleNextStep}>
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </div>
        </>
    );
};

export default BookingInformation;
