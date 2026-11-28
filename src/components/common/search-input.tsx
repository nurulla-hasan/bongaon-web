"use client";

import { Suspense } from "react";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNextFilter } from "@/hooks/useNextFilter";
import { cn } from "@/lib/utils";

const DEFAULT_SEARCH_KEY = "searchTerm";
const DEBOUNCE_MS = 300;

interface SearchInputProps {
  searchKey?: string;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

function SearchInputInner({
  searchKey = DEFAULT_SEARCH_KEY,
  placeholder,
  ariaLabel,
  className,
}: SearchInputProps) {
  const t = useTranslations("Common");
  const { getFilter, updateFilter } = useNextFilter<string>();
  const value = getFilter(searchKey);

  return (
    <div className={cn("relative w-full sm:max-w-64", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        type="text"
        value={value}
        onChange={(event) =>
          updateFilter(searchKey, event.target.value, {
            debounce: DEBOUNCE_MS,
          })
        }
        placeholder={placeholder ?? t("searchPlaceholder")}
        aria-label={ariaLabel ?? t("searchLabel")}
        className="pr-8 pl-9"
      />

      {value && (
        <button
          type="button"
          onClick={() => updateFilter(searchKey, null)}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
          aria-label={t("searchClear")}
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export function SearchInput(props: SearchInputProps = {}) {
  return (
    <Suspense
      fallback={
        <Skeleton className="h-8 w-full rounded-lg sm:max-w-64" />
      }
    >
      <SearchInputInner {...props} />
    </Suspense>
  );
}
