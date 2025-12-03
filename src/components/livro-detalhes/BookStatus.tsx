import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type BookStatus } from "@/types/types";
import { CheckCircle2, Clock, BookOpen } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookStatusProps {
    currentStatus?: BookStatus;
    onUpdate: (status: BookStatus) => void;
}

const statusConfig = {
    ler_depois: { label: "Ler depois", color: "text-slate-500", activeBg: "bg-slate-500/10 border-slate-500", icon: Clock },
    lendo: { label: "Lendo", color: "text-blue-500", activeBg: "bg-blue-500/10 border-blue-500", icon: BookOpen },
    lido: { label: "Lido", color: "text-green-500", activeBg: "bg-green-500/10 border-green-500", icon: CheckCircle2 },
};

export function BookStatusSelector({ currentStatus = 'ler_depois', onUpdate }: BookStatusProps) {
    return (
        <div className="space-y-3">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
            </Label>

            <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={100}>
                    {(Object.keys(statusConfig) as BookStatus[]).map((st) => {
                        const config = statusConfig[st];
                        const isActive = currentStatus === st;

                        return (
                            <Tooltip key={st}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`
                                            flex-1 h-12 transition-all duration-300 border-2
                                            ${isActive
                                                ? `${config.activeBg} ${config.color}`
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}
                                                `}
                                        onClick={() => onUpdate(st)}
                                    >
                                        <config.icon className={`w-6 h-6 ${isActive ? "scale-110" : "scale-100"}`} strokeWidth={isActive ? 2.5 : 2} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{config.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </TooltipProvider>
            </div>
        </div>
    );
}