"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { HeroBannerSlide } from "@/types";

interface HeroBannerSliderProps {
  banners: HeroBannerSlide[];
  fallbackAlt: string;
}

const FALLBACK_IMAGE = "/images/hero-village-seamless.jpg";

export function HeroBannerSlider({
  banners,
  fallbackAlt,
}: HeroBannerSliderProps) {
  const activeSlides = React.useMemo(
    () => banners.filter((slide) => slide.isActive && slide.imageUrl.trim()),
    [banners],
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || activeSlides.length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [api, activeSlides.length, paused]);

  if (activeSlides.length === 0) {
    return (
      <div className="group relative h-72 overflow-hidden rounded-2xl border border-border shadow-md sm:h-96 lg:h-125">
        <Image
          src={FALLBACK_IMAGE}
          alt={fallbackAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-right transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border shadow-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: activeSlides.length > 1 }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {activeSlides.map((slide, index) => {
            const imageNode = (
              <Image
                src={slide.imageUrl}
                alt={slide.title || fallbackAlt}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
            );

            return (
              <CarouselItem key={slide.id} className="pl-0">
                <div className="group relative h-72 w-full overflow-hidden sm:h-96 lg:h-125">
                  {slide.linkUrl ? (
                    <Link
                      href={slide.linkUrl}
                      className="relative block size-full"
                    >
                      {imageNode}
                    </Link>
                  ) : (
                    imageNode
                  )}

                  {(slide.title || slide.subtitle) && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 via-background/70 to-transparent p-5 pt-14 text-foreground">
                      {slide.title && (
                        <p className="text-base font-semibold leading-snug sm:text-lg">
                          {slide.title}
                        </p>
                      )}
                      {slide.subtitle && (
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {activeSlides.length > 1 && (
          <>
            <CarouselPrevious className="left-3 z-20" />
            <CarouselNext className="right-3 z-20" />
          </>
        )}
      </Carousel>

      {activeSlides.length > 1 && (
        <div className="absolute right-4 bottom-4 z-20 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1.5 backdrop-blur-xs">
          {activeSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all",
                index === current
                  ? "w-5 bg-primary"
                  : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
