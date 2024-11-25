import { Button } from "@/components/ui/button"

const ButtonNext = ({onclick, text}: {onclick: () => void ,text? : string}) => {
    
  return (
       <Button
          onClick={onclick} variant={"primary"} size={"lg"}
        >
          {text}
        </Button>
  )
}

export default ButtonNext
