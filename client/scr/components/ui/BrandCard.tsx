import { Card, CardContent } from "@/components/ui/card";
import { Brand } from "@shared/schema";
import { Link } from "wouter";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.name.toLowerCase()}`}>
      <Card className="bg-gray-800 border-gray-700 hover:border-emerald-500 transition-colors cursor-pointer">
        <CardContent className="p-4 flex items-center justify-center min-h-[80px]">
          <span className="text-xl font-bold text-white">{brand.name}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
