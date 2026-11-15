import Image from "next/image";

export default function RootLoading() {
  return (
    <div className="flex min-h-140 flex-col items-center justify-center gap-4 p-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-20 animate-ping rounded-full bg-primary/10" />
        <div className="relative size-16 animate-pulse">
          <Image
            src="/images/logo-mark.png"
            alt="Bongaon Bazar"
            fill
            sizes="64px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
