import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/schema";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = buildBreadcrumbSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-600">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-ink-300 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="text-ink-900 font-medium truncate max-w-[200px]"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded truncate max-w-[200px]"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
