import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, Filter } from "lucide-react";
import type { BookStatsProps } from "@/types/types";

export function BookStats({ total, filtered }: BookStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Livros</CardTitle>
          <Library className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">Na sua biblioteca</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Listados</CardTitle>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filtered}</div>
          <p className="text-xs text-muted-foreground">
            {filtered === total ? "Exibindo todos" : "Filtrados pela busca"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}