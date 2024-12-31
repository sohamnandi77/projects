import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@projects/ui/button";
import { Form } from "@projects/ui/form";
import { TextField, TextFieldInput } from "@projects/ui/input";
import { Label } from "@projects/ui/label";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@projects/ui/modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  subcomponents: {
    ModalBody,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTrigger,
  },
  args: {
    children: <></>,
  },
  tags: ["autodocs", "overlays"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <Modal>
      <Button>Turn on 2FA</Button>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Nice! Let's beef up your account.</ModalTitle>
          <ModalDescription>
            2FA beefs up your account's defense. Pop in your password to keep
            going.
          </ModalDescription>
        </ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <ModalBody>
            <TextField isRequired autoFocus type="password">
              <Label>Password</Label>
              <TextFieldInput placeholder="Enter your password" />
            </TextField>
          </ModalBody>
          <ModalFooter>
            <ModalClose>Cancel</ModalClose>
            <Button type="submit">Turn on 2FA</Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  ),
};
