import { Button } from "@/components/ui/button"

const ButtonNext = ({ onclick, text, type }: { onclick: () => void, text?: string, type?: "button" | "submit" | "reset" }) => {

  return (
    <Button type={type}
      onClick={onclick} variant={"primary"} size={"lg"}
    >
      {text}
    </Button>
  )
}

export default ButtonNext
