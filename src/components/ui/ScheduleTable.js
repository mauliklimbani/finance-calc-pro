import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Button } from "./button";
import { Download } from "lucide-react";
import { formatCurrency } from "../lib/format";

export default function ScheduleTable({ 
  schedule, 
  title = "Amortization Schedule",
  currency = "INR",
  onExport
}) {
  const exportToCSV = () => {
    const headers = ['Month', 'Opening Balance', 'EMI Payment', 'Interest', 'Principal', 'Closing Balance'];
    const csvContent = [
      headers.join(','),
      ...schedule.map(row => [
        row.month,
        row.openingBalance,
        row.emiPayment,
        row.interestPayment,
        row.principalPayment,
        row.closingBalance
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization-schedule.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
      <CardHeader className="pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">{title}</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToCSV}
            className="gap-2 hover:bg-amber-50 hover:border-amber-300 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-slate-50/80 backdrop-blur-sm">
              <TableRow>
                <TableHead className="text-center font-semibold">Month</TableHead>
                <TableHead className="text-right font-semibold">Opening Balance</TableHead>
                <TableHead className="text-right font-semibold">EMI</TableHead>
                <TableHead className="text-right font-semibold">Interest</TableHead>
                <TableHead className="text-right font-semibold">Principal</TableHead>
                <TableHead className="text-right font-semibold">Closing Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((row, index) => (
                <TableRow 
                  key={row.month} 
                  className={`hover:bg-slate-50/50 transition-colors text-[#09090B] ${
                    index % 12 === 0 ? 'bg-amber-50/30' : ''
                  }`}
                >
                  <TableCell className="text-center font-medium text-[#09090B]">{row.month}</TableCell>
                  <TableCell className="text-right font-mono text-sm text-[#09090B]">
                    {formatCurrency(row.openingBalance, currency)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-[#09090B]">
                    {formatCurrency(row.emiPayment, currency)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-red-600">
                    {formatCurrency(row.interestPayment, currency)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-green-600">
                    {formatCurrency(row.principalPayment, currency)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium text-[#09090B]">
                    {formatCurrency(row.closingBalance, currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}