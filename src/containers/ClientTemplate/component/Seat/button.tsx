import { Button } from "@/components/ui/button";


interface ButtonNextProps {
  onClick: () => void;
  text?: string;
  disabled?: boolean; 
  type?: "button" | "submit" | "reset"
}

const ButtonNext: React.FC<ButtonNextProps> = ({ onClick, text, disabled , type }) => {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      size="lg"
      disabled={disabled} 
      type={type}
    >
      {text}
    </Button>
  );
};

export default ButtonNext;
