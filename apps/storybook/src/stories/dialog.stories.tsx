import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@projects/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@projects/ui/dialog";
import { Label } from "@projects/ui/form";
import { TextField, TextFieldInput } from "@projects/ui/input";

const meta = {
  title: "Components/Dialog",
  component: DialogTrigger,
  subcomponents: {
    DialogClose: DialogClose as unknown as React.ComponentType<unknown>,
    DialogContent: DialogContent as unknown as React.ComponentType<unknown>,
    DialogDescription:
      DialogDescription as unknown as React.ComponentType<unknown>,
    DialogFooter: DialogFooter as unknown as React.ComponentType<unknown>,
    DialogHeader: DialogHeader as unknown as React.ComponentType<unknown>,
    DialogOverlay: DialogOverlay as unknown as React.ComponentType<unknown>,
    DialogTitle: DialogTitle as unknown as React.ComponentType<unknown>,
    DialogTrigger: DialogTrigger as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DialogTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: null,
  },
  render: () => {
    return (
      <DialogTrigger>
        <Button appearance="outline">Sign up</Button>
        <DialogOverlay>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign up</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <TextField autoFocus>
                <Label>First Name</Label>
                <TextFieldInput />
              </TextField>
              <TextField>
                <Label>Last Name</Label>
                <TextFieldInput />
              </TextField>
            </div>
            <DialogFooter>
              <DialogClose type="submit">Save Changes</DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
    );
  },
};

export const AlertDialog: Story = {
  args: {
    children: null,
  },
  render: () => {
    // This also has an example of Custom Close Button
    return (
      <DialogTrigger>
        <Button appearance="outline">Delete</Button>
        <DialogOverlay isDismissable={false}>
          <DialogContent role="alertdialog" className="sm:max-w-[425px]">
            {({ close }) => (
              <>
                <DialogHeader>
                  <DialogTitle>Delete file</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  This will permanently delete the selected file. Continue?
                </DialogDescription>
                <DialogFooter>
                  <Button onPress={close}>Cancel</Button>
                  <Button variant="danger" onPress={close}>
                    Delete
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
    );
  },
};

export const ModalSheet: Story = {
  args: {
    children: null,
  },
  render: () => {
    return (
      <DialogTrigger>
        <Button appearance="outline">Edit Profile</Button>
        <DialogOverlay>
          <DialogContent side="right" className="sm:max-w-[425px]">
            {({ close }) => (
              <>
                <DialogHeader>
                  <DialogTitle>Sign up</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <TextField autoFocus>
                    <Label>First Name</Label>
                    <TextFieldInput />
                  </TextField>
                  <TextField>
                    <Label>Last Name</Label>
                    <TextFieldInput />
                  </TextField>
                </div>
                <DialogFooter>
                  <Button onPress={close} type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
    );
  },
};
