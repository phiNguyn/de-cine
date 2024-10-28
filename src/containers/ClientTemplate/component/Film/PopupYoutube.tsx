import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { Circle, Play } from "lucide-react"

const PopupYoutube = ({ title, ytSlug }: { title: string, ytSlug: string | undefined }) => {
    return (
        <div className="w-full sm:max-w-[300px]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"trailer"} className="w-full">{title}</Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] h-[50vh] sm:w-[90vw] sm:h-[50vh] md:w-[70vw] md:h-[50vh] lg:max-w-[1200px] lg:h-[70vh]">

                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${ytSlug}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    >
                    </iframe>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const PopupYoutubeDetail = ({ ytSlug }: { ytSlug: string | undefined }) => {
    return (
        <div className="w-full sm:max-w-[300px]">
            <Dialog>
                <DialogTrigger>
                    <div className="relative group">
                        <Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-all duration-300" absoluteStrokeWidth size={70} />
                        <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-all duration-300" size={30} />

                    </div>
                </DialogTrigger>
                <DialogContent className="w-[90vw] h-[50vh] sm:w-[90vw] sm:h-[50vh] md:w-[70vw] md:h-[50vh] lg:max-w-[1200px] lg:h-[70vh]">

                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${ytSlug}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    >
                    </iframe>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PopupYoutube