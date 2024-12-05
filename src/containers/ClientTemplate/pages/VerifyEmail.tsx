import { AuthAPI } from "@/apis/auth"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const VerifyEmail = () => {
    const [isLoading, setIsloading] = useState(false)
    const { code } = useParams()
    const navigate = useNavigate()
    const handleVerifyEmail = async () => {
        setIsloading(true)
        try {
            if (code) {
                const resp = await AuthAPI.verifyEmail(code)
                if (resp?.status == 200) {
                    toast.success(resp.data.message)
                    setTimeout(() => {
                        navigate('/')
                    }, 500);
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { message } = error.response.data
            toast.error(message)
            setTimeout(() => {
                navigate('/')
            }, 500);

        } finally {
            setIsloading(false)
        }
    }
    return (
        <div className="w-full flex justify-center items-center h-[80vh]">
            <Button disabled={isLoading} onClick={handleVerifyEmail} size="lg">
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang Xác thực
                    </>
                ) : (
                    'Xác thực ngay'
                )}
            </Button>
            <Toaster />
        </div>
    )
}

export default VerifyEmail