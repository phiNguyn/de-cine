import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

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

export default PopupYoutube