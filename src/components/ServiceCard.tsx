import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  iconBgClass?: string;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  link,
  iconBgClass = "gradient-primary",
}: ServiceCardProps) => {
  return (
    <Link to={link} className="group block">
      <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full">
        <div className={`w-14 h-14 rounded-xl ${iconBgClass} flex items-center justify-center mb-5`}>
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
