import { Button } from "@/components/ui/button"

const ButtonNext = ({onclick}: {onclick: () => void }) => {
    
  return (
       <Button
          onClick={onclick} variant={"primary"} size={"lg"}
        >
          Tiếp tục
        </Button>
  )
}

export default ButtonNext
