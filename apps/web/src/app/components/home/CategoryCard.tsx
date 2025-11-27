/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/app/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/category/${category.id}`}>
      <Card className="p-6 text-center hover:shadow-lg transition bg-white cursor-pointer">
        {category.iconUrl && (
          <div className="w-full flex justify-center mb-3">
            <Image src={category.iconUrl} width={48} height={48} alt={category.name} />
          </div>
        )}

        <p className="font-medium">{category.name}</p>
      </Card>
    </Link>
  );
}
