import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254705186502";

interface CTAButtonProps {
  text: string;
  variant?: "cta" | "hero" | "hero-outline" | "whatsapp" | "default";
  size?: "default" | "lg" | "xl";
  showIcon?: boolean;
  iconType?: "whatsapp" | "arrow";
  className?: string;
}

const CTAButton = ({
  text,
  variant = "cta",
  size = "lg",
  showIcon = true,
  iconType = "whatsapp",
  className = "",
}: CTAButtonProps) => {
  const Icon = iconType === "whatsapp" ? MessageCircle : ArrowRight;

  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
      <Button variant={variant} size={size} className={className}>
        {showIcon && <Icon className="w-5 h-5" />}
        {text}
      </Button>
    </a>
  );
};

export default CTAButton;
