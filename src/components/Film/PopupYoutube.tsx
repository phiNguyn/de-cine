import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

const PopupYoutube = ({ title, ytSlug }: { title: string, ytSlug: string | undefined }) => {
    return (
        <div className="w-full cccccccc">
            <Dialog >
                <DialogTrigger asChild>
                    <Button variant={"trailer"}>{title}</Button>
                </DialogTrigger>
                <DialogContent className="lg:max-w-[1200px] lg:h-[700px] ">
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytSlug}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default PopupYoutube