import type { UseEmblaCarouselType } from "embla-carousel-react";
import type { ListBoxItemProps, SectionProps } from "react-aria-components";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ListBox, ListBoxItem, ListBoxSection } from "react-aria-components";

import type { ButtonProps } from "@projects/ui/button";
import { Button } from "@projects/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
};

interface CarouselRootProps {
  CarouselContent?: typeof CarouselContent;
  CarouselHandler?: typeof CarouselButtonHandler;
  CarouselItem?: typeof CarouselItem;
  CarouselButton?: typeof CarouselButton;
}

interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CarouselRootProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

const Carousel = (props: CarouselProps) => {
  const {
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...rest
  } = props;
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const value = useMemo(
    () => ({
      carouselRef,
      api: api,
      opts,
      orientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [
      api,
      canScrollNext,
      canScrollPrev,
      carouselRef,
      opts,
      orientation,
      scrollNext,
      scrollPrev,
    ],
  );

  return (
    <CarouselContext value={value}>
      <section
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        aria-label="carousel"
        {...rest}>
        {children}
      </section>
    </CarouselContext>
  );
};

const CarouselContent = <T extends object>(props: SectionProps<T>) => {
  const { className, ...rest } = props;
  const { carouselRef, orientation } = useCarousel();

  return (
    <ListBox
      layout={orientation === "vertical" ? "stack" : "grid"}
      aria-label="Slides"
      orientation={orientation}
      ref={carouselRef}
      className="overflow-hidden">
      <ListBoxSection
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...rest}
      />
    </ListBox>
  );
};

const CarouselItem = (props: ListBoxItemProps) => {
  const { className, ...rest } = props;
  const { orientation } = useCarousel();

  return (
    <ListBoxItem
      aria-label={`Slide ${props.id}`}
      aria-roledescription="slide"
      className={composeTailwindRenderProps(
        cn([
          "min-w-0 shrink-0 grow-0 basis-full focus:outline-none focus-visible:outline-none",
          orientation === "horizontal" ? "pl-4" : "pt-4",
        ]),
        className,
      )}
      {...rest}
    />
  );
};

const CarouselButtonHandler = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  const { orientation } = useCarousel();
  return (
    <div
      className={cn(
        "relative z-10 mt-6 flex items-center gap-x-2",
        orientation === "horizontal" ? "justify-end" : "justify-center",
        className,
      )}
      {...rest}
    />
  );
};
CarouselButtonHandler.displayName = "CarouselButtonHandler";

type CarouselButtonProps = ButtonProps & { slot: "previous" | "next" };

const CarouselButton = (props: CarouselButtonProps) => {
  const {
    slot,
    className,
    variant = "secondary",
    appearance = "outline",
    shape = "circle",
    size = "icon",
    ...rest
  } = props;
  const { orientation, scrollPrev, canScrollPrev, scrollNext, canScrollNext } =
    useCarousel();
  const isNext = slot === "next";
  const canScroll = isNext ? canScrollNext : canScrollPrev;
  const scroll = isNext ? scrollNext : scrollPrev;
  const Icon = isNext ? ChevronRight : ChevronLeft;

  return (
    <Button
      aria-label={isNext ? "Next slide" : "Previous slide"}
      slot={slot}
      variant={variant}
      appearance={appearance}
      size={size}
      shape={shape}
      className={composeTailwindRenderProps(
        orientation === "vertical" ? "rotate-90" : "",
        className,
      )}
      isDisabled={!canScroll}
      onPress={scroll}
      {...rest}>
      <Icon className="size-4" />
    </Button>
  );
};

export {
  Carousel,
  CarouselContent,
  CarouselButtonHandler,
  CarouselItem,
  CarouselButton,
};

export type { CarouselApi };
