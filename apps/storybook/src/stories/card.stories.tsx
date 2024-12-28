import type { Meta, StoryObj } from "@storybook/react";
import { BellRing, Check } from "lucide-react";

import { Button } from "@projects/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@projects/ui/card";
import { Checkbox } from "@projects/ui/checkbox";
import { TextField, TextFieldInput } from "@projects/ui/input";
import { Label } from "@projects/ui/label";
import { Link } from "@projects/ui/link";

const meta = {
  title: "Components/Card",
  component: Card,
  subcomponents: {
    CardHeader: CardHeader as unknown as React.ComponentType<unknown>,
    CardTitle: CardTitle as unknown as React.ComponentType<unknown>,
    CardContent: CardContent as unknown as React.ComponentType<unknown>,
    CardDescription: CardDescription as unknown as React.ComponentType<unknown>,
    CardFooter: CardFooter as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "surfaces"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const notifications = [
  {
    id: "1",
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    id: "2",
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    id: "3",
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export const Basic: Story = {
  render: () => {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-fg">
                Send notifications to device.
              </p>
            </div>
          </div>
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-fg">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full space-x-2">
            <Check />
            <span>Mark all as read</span>
          </Button>
        </CardFooter>
      </Card>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Don't loose the level, just keep on going.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <TextField type="text" isRequired>
            <Label>Email</Label>
            <TextFieldInput placeholder="Enter your email" />
          </TextField>
          <TextField type="password" isRequired>
            <Label>Password</Label>
            <TextFieldInput placeholder="Enter your password" />
          </TextField>
          <div className="flex items-center justify-between">
            <Checkbox>Remember me</Checkbox>
            <Link intent="primary" className="text-sm" href="#">
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    );
  },
};
