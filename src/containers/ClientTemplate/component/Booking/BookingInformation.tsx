import moviesAPI from "@/apis/movie";
import Loader from "@/components/loader";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { API_URL } from "@/constants/api";
import { useMovieStore } from "@/store/Movie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../Seat/ticket";
import ButtonNext from "../Seat/button";
import { useTicketStore } from "@/store/intex";
import { ShowTimeTabs } from "../Film/ShowTimeTabs";
import { Movie } from "@/types/movie";
const BookingInformation = () => {
  const { movie, setMovie } = useMovieStore((state) => state);
  const navigate = useNavigate();
  const { movieName, movieImage, selectedSeats, selectedShowDate, selectedShowTime, selectedRoomId, setTicketData, clearTicketData } = useTicketStore();
  const { data, isLoading } = useQuery({
    queryKey: ['moviesActive',],
    queryFn: () => moviesAPI.getAllMovieActive('active'),
    staleTime: 60 * 1000,
  });
  useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data, setMovie]);

  useEffect(() => {
    clearTicketData()
  }, [])
  const [MovieDetail, setMovieDetail] = useState<Movie | undefined>(undefined);
  const active_progress = "after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-yellow-500 after:w-1/2 after:w-full";
  const active_li = "text-yellow-500";
  const [activeStep, setActiveStep] = useState(0);
  const progress_menu = ["Chọn Phim/Rạp/Suất", "Ghế", "Thức ăn", "Thanh toán", "Xác nhận"];
  // const Location = ["TP. Hồ Chí Minh", "Hà Nội"];

  const handleStepClick = (index: number) => {
    if (index > activeStep) {
      setActiveStep(index);
    }
  };
  // const handleNextStep = () => {
  //   setActiveStep((prevStep) => prevStep + 1); 
  // };
  // const handlePrevStep = () => {
  //   setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  // };
  const handleMovieDetail = async (ID: number) => {
    const res = await moviesAPI.getMovieById(ID);
    setTicketData({
      movieName: {
        movie_name: res.movie_name,
        id_movie: res.id_movie
      },
      movieImage: res.image_main,
    })
    if (res) {
      setMovieDetail(res);
    };
  };
  const handleProceed = () => {
    navigate('/products', { state: { selectedShowDate, selectedShowTime, selectedRoomId, movieName, movieImage, selectedSeats } });
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
                className={`relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-grey-30 ${index <= activeStep ? active_progress : ""
                  }`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="md:container md:mx-auto grid gap-x-5 xl:grid-cols-3 grid-cols-1">
        <div className="col-span-2 order-[-9999]">
          <div className="booking__select-session">
            <Accordion type="single" collapsible >
              <AccordionItem value="movie">
                <AccordionTrigger>
                  <h2 className="font-bold text-xl" id="movie_placeholder">Chọn phim</h2>
                </AccordionTrigger>
                <AccordionContent>
                  <Carousel>
                    <CarouselContent className="-ml-2 md:-ml-4" >
                      {isLoading ? <Loader /> : movie.map((M) => (
                        <CarouselItem className="pl-2 md:pl-4 basis-2/4 sm:basis-1/4" key={M.id_movie || M.movie_name}
                          onClick={() => handleMovieDetail(M.id_movie)}>
                          <div
                            className="relative"
                            tabIndex={-1}
                            style={{ width: "100%", display: "inline-block" }}
                          >
                            <div className="text-sm text-black  transition-all duration-300 cursor-pointer h-full min-h-[350px] max-h-[400px] px-1">
                              <div className="activeMovie relative css-jekrqv">
                                <img
                                  loading="lazy"
                                  width={160}
                                  height={240}
                                  decoding="async"
                                  data-nimg={1}
                                  className='w-full h-full rounded object-cover duration-500 ease-in-out group-hover:opacity-100"
                              scale-100 blur-0 grayscale-0)'
                                  src={`${API_URL.baseUrl}/${M.image_main}`}
                                  alt={M.movie_name}
                                  style={{ color: "transparent" }}
                                />
                                <div />
                              </div>
                              <h3 className="screen375:px-0 screen425:px-4 px-1 text-gray-50 text-base">
                                {M.movie_name}
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

                  <ShowTimeTabs showDay={MovieDetail} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="col-span-1">
          <Ticket handleProceed={handleProceed}>
            <ButtonNext text="Tiếp Tục" onClick={handleProceed} />
          </Ticket>
        </div>
      </div>
    </>
  );
};

export default BookingInformation;
