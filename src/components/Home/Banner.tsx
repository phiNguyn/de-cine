import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Banner = () => {
  const fakeBanner = [
    { "id": 1, "year": 2024, "time": "97", "title": "Joker: Folie à Deux Điên Có Đôi", "url": "https://cdn.galaxycine.vn/media/2024/8/13/transformers-2048_1723544458749.jpg", "description": "Dựa trên sự kiện có thật năm 1971, một người đã dùng lựu đạn khống chế cả máy bay, buộc đổi hướng bay sang Triều Tiên. Ở tình thế nguy cấp đó, cơ trưởng, cơ phó vẫn quyết bảo vệ hành khách tới cùng." },
    { "id": 2, "year": 2024, "time": "100", "title": "Hello", "url": "https://cdn.galaxycine.vn/media/2024/9/24/joker-folie-a-duex-2048_1727174135210.jpg", "description" : "cc" },
    { "id": 3, "year": 2024, "time": "65", "title": "Robot hoang dã", "url": "https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-2048_1727843744548.jpg" , "description" : "TTTTTTTTTTTTTTTTTTTT"}

  ]
  return (
    <div className="w-full my-5">
      <Carousel className="h-full cursor-pointer active:cursor-grab"
      >
        <CarouselContent>
          {fakeBanner.map((item) => (

            <CarouselItem  className="h-full" key={item.id}>
              <div className="relative">
              <img className="h-full" src={item.url} alt="" />
              <div className="absolute bottom-5 left-5 text-white">
            <div className="">{item.title}</div>
            <div className="flex gap-x-4">
              <span className=" pr-4 border-r">{item.year}</span>
              <span>{item.time}</span>
            </div>
              </div>
              </div>
            </CarouselItem>
          ))}

        </CarouselContent>
        <CarouselPrevious  variant={"default"}  />
        <CarouselNext  variant={"default"}    />
      </Carousel>

    </div>
  )
}

export default Banner