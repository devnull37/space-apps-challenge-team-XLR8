import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Placeholder accuracies for the three models we evaluate. These will be replaced
// with live evaluation numbers when available from model runs/datasets.
const accuracyData = [
  { name: "Random Forest", accuracy: 90 },
  { name: "Gradient Boosting", accuracy: 93 },
  { name: "LightGBM", accuracy: 95 },
];

const COLORS = ["hsl(190, 100%, 50%)", "hsl(280, 80%, 55%)", "hsl(320, 90%, 55%)", "hsl(200, 100%, 60%)", "hsl(260, 80%, 60%)"];

export const DataVisualization = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Data <span className="bg-gradient-secondary bg-clip-text text-transparent">Insights</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Accuracy Comparison */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Model Performance Comparison</CardTitle>
              <CardDescription>Accuracy scores across evaluated models</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={accuracyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 15% 25%)" />
                  <XAxis dataKey="name" stroke="hsl(200 20% 65%)" tick={{ fill: "hsl(200 20% 65%)", fontSize: 12 }} />
                  <YAxis stroke="hsl(200 20% 65%)" tick={{ fill: "hsl(200 20% 65%)", fontSize: 12 }} domain={[80, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(240 18% 12%)", border: "1px solid hsl(240 15% 25%)", borderRadius: "8px", color: "hsl(200 100% 95%)" }} />
                  <Line type="monotone" dataKey="accuracy" stroke="hsl(190, 100%, 50%)" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* (Pie chart and distribution removed - dataset view provides distribution when available) */}
        </div>

        {/* Summary removed per request */}
      </div>
    </section>
  );
};
