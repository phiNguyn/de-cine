import { Button } from "@/components/ui/button"

const BookingInfo = ({ title }: { title?: string }) => {
    return (
        <div className="col-span-1 ">
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
  scale-100 blur-0 grayscale-0)"  src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-750_1727843732360.jpg" />

                    </div>
                    <div className="flex-1 col-span-2 ml-4 md:col-span-1 row-span-1 xl:col-span-2">
                        <h3 className="text-sm xl:text-base font-bold xl:mb-2">Movie Title</h3>
                        <p className="text-sm inline-block">Additional Info</p>
                    </div>
                    <div className="col-span-2 md:col-span-1 xl:col-span-3"><div className="my-4 border-t border-gray-500 border-dashed xl:block hidden"></div></div>
                    <div className="xl:flex hidden justify-between col-span-3"><strong className="text-base">Tổng cộng</strong><span className="inline-block font-bold text-primary ">0&nbsp;₫</span></div>
                </div>

                <div className="mt-8 flex">
                    <button className="w-1/2 mr-2 py-2 border border-yellow-500 rounded text-yellow-500" >
                        Quay lại
                    </button>
                    <Button variant={"primary"} size={"default"} className="w-full" >
                        {title}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BookingInfo