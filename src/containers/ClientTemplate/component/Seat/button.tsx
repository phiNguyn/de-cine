import { Button } from "@/components/ui/button";

interface ButtonNextProps {
  onClick: () => void;
  text?: string;
  disabled?: boolean; 
}

const ButtonNext: React.FC<ButtonNextProps> = ({ onClick, text, disabled }) => {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      size="lg"
      disabled={disabled} 
    >
      {text}
    </Button>
  );
};

export default ButtonNext;
