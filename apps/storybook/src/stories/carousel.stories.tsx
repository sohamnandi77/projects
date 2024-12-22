import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { Card, CardContent } from "@projects/ui/card";
import {
  Carousel,
  CarouselButton,
  CarouselButtonHandler,
  CarouselContent,
  CarouselItem,
} from "@projects/ui/carousel";
import Autoplay from "@projects/ui/embla-carousel";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs", "media"],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = Array.from({ length: 16 }, (_, i) => ({ id: i + 1 }));

export const Primary: Story = {
  render: () => {
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselButtonHandler>
          <CarouselButton slot="previous" />
          <CarouselContent items={items}>
            {({ id }) => (
              <CarouselItem key={id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{id}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselButton slot="next" />
        </CarouselButtonHandler>
      </Carousel>
    );
  },
};

export const Orientation: Story = {
  render: () => {
    return (
      <div className="w-96">
        <Carousel orientation="vertical" className="relative w-full max-w-xs">
          <CarouselContent items={items} className="h-64 snap-y py-4">
            {({ id }) => (
              <CarouselItem
                key={id}
                className="basis-1/2 snap-center md:basis-1/3">
                <Card className="p-1">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{id}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselButtonHandler>
            <CarouselButton slot="previous" />
            <CarouselButton slot="next" />
          </CarouselButtonHandler>
        </Carousel>
      </div>
    );
  },
};

export const Options: Story = {
  render: () => {
    return (
      <div className="w-96">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-2xl">
          <CarouselContent items={items}>
            {({ id }) => (
              <CarouselItem id={id} className="basis-1/2 lg:basis-1/3">
                <Card className="flex aspect-square items-center justify-center">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{id}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselButtonHandler>
            <CarouselButton slot="previous" />
            <CarouselButton slot="next" />
          </CarouselButtonHandler>
        </Carousel>
      </div>
    );
  },
};

export const AutoPlay: Story = {
  render: function Render() {
    const plugin = useRef(Autoplay({ delay: 2500 }));
    return (
      <div className="w-96">
        <Carousel
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          plugins={[plugin.current]}
          opts={{ loop: true, align: "center" }}
          className="w-full max-w-xs">
          <CarouselContent items={items}>
            {({ id }) => (
              <CarouselItem id={id}>
                <div className="p-1">
                  <Card>
                    <div className="relative flex-1 bg-fg/5" />
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{id}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselButtonHandler>
            <CarouselButton slot="previous" />
            <CarouselButton slot="next" />
          </CarouselButtonHandler>
        </Carousel>
      </div>
    );
  },
};
