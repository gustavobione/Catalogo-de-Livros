import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, Filter, Star } from "lucide-react";
import type { BookStatsProps } from "@/types/types";

export function BookStats({ total, filtered, favorites }: BookStatsProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      {/* 1. TOTAL DE LIVROS */}
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

      {/* 2. FAVORITOS (NOVO) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{favorites}</div>
          <p className="text-xs text-muted-foreground">Livros destacados</p>
        </CardContent>
      </Card>

      {/* 3. LISTADOS */}
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