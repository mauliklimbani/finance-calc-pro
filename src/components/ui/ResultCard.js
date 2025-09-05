import React from "react";
import { Card, CardContent } from "./card";
import { formatCurrency, formatPercent } from "../lib/format";

export default function ResultCard({ 
  title, 
  value, 
  subtitle, 
  type = "currency", 
  currency = "INR",
  trend,
  icon: Icon,
  gradient = "from-blue-500 to-blue-600"
}) {
  const formatValue = () => {
    switch (type) {
      case 'currency':
        return formatCurrency(value, currency);
      case 'percent':
        return formatPercent(value);
      case 'number':
        return value?.toLocaleString() || '0';
      default:
        return value;
    }
  };

  return (
    <Card className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300 group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full transform translate-x-8 -translate-y-8`} />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
              {formatValue()}
            </p>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
            )}
            {trend && (
              <p className={`text-xs font-medium mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </p>
            )}
          </div>
          {Icon && (
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
              <Icon className={`w-5 h-5 text-white-600`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}