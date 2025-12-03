import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendingUp, BookOpen, Bookmark } from "lucide-react";

interface StatsData {
    topAuthor: string;
    topGenre: string;
    totalFavorites: number;
    totalRead: number;
}

interface HomeInsightsProps {
    stats: StatsData | null;
}

export function HomeInsights({ stats }: HomeInsightsProps) {
    if (!stats) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" /> 
                Insights Rápidos
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Insight: Gênero */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Gênero Favorito</CardDescription>
                        <CardTitle className="text-2xl text-primary">{stats.topGenre}</CardTitle>
                    </CardHeader>
                </Card>
                
                {/* Insight: Autor */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Autor Top 1</CardDescription>
                        <CardTitle className="text-xl truncate" title={stats.topAuthor}>
                            {stats.topAuthor}
                        </CardTitle>
                    </CardHeader>
                </Card>

                {/* Insight: Concluídos */}
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-emerald-200/50">
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
                            <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                            <h3 className="text-2xl font-bold">{stats.totalRead}</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Insight: Favoritos */}
                <Card className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-rose-200/50">
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-full">
                            <Bookmark className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Favoritos</p>
                            <h3 className="text-2xl font-bold">{stats.totalFavorites}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}