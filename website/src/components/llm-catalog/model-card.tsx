import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ModelCardProps {
  name: string;
  description: string;
  parameterCount: string;
  contextWindow: string;
  specialties: string[];
  tier: "Standard" | "Premium" | "Enterprise";
}

export default function ModelCard({
  name,
  description,
  parameterCount,
  contextWindow,
  specialties,
  tier,
}: ModelCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Standard":
        return "text-green-500";
      case "Premium":
        return "text-[#00cddd]";
      case "Enterprise":
        return "text-purple-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      className="border border-border/40 rounded-lg p-6 bg-card/30 hover:border-[#00cddd]/50 transition-colors h-full flex flex-col"
      data-oid="753v.3c"
    >
      <div className="flex justify-between items-start mb-2" data-oid="kjug2if">
        <h3 className="text-xl font-mono font-bold" data-oid="-1tcg7m">
          {name}
        </h3>
        <div
          className={`text-xs px-2 py-1 rounded-full border ${getTierColor(tier)} border-current`}
          data-oid="giqzese"
        >
          {tier}
        </div>
      </div>

      <p
        className="text-muted-foreground text-sm mb-4 flex-grow"
        data-oid="gqda769"
      >
        {description}
      </p>

      <div className="space-y-4 mb-6" data-oid="6fh-r83">
        <div className="grid grid-cols-2 gap-2 text-sm" data-oid="-sdoa_o">
          <div className="text-muted-foreground" data-oid="60zwsv2">
            Parameters:
          </div>
          <div className="text-right font-mono" data-oid="c791yc-">
            {parameterCount}
          </div>

          <div className="text-muted-foreground" data-oid="i0joesm">
            Context:
          </div>
          <div className="text-right font-mono" data-oid="ay:_hus">
            {contextWindow}
          </div>
        </div>

        <div className="text-sm" data-oid="5n0kkqv">
          <div className="text-muted-foreground mb-2" data-oid="04fi9ec">
            Best for:
          </div>
          <ul className="space-y-1" data-oid="ktduxnr">
            {specialties.map((specialty, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
                data-oid="tpc9y4x"
              >
                <span className="text-[#00cddd]" data-oid="5bre88y">
                  *
                </span>
                <span data-oid="_s6x4p-">{specialty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-2 mt-auto" data-oid="t0fqpbh">
        <Button
          className="flex-1 bg-[#00cddd] hover:bg-[#00cddd]/90 text-black"
          data-oid="yfz4jfb"
        >
          Try Now
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-[#00cddd] text-[#00cddd] hover:bg-[#00cddd]/10"
          data-oid="blgguy3"
        >
          <ExternalLink className="h-4 w-4" data-oid="o7t-xky" />
        </Button>
      </div>
    </div>
  );
}
