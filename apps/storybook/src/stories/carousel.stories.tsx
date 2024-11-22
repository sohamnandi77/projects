import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent } from "@projects/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@projects/ui/carousel";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const items = Array.from({ length: 5 }, (_, i) => i);
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {items.map((id) => (
            <CarouselItem key={id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{id + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};
