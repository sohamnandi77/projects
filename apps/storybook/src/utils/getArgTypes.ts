type variant = {
  variants: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

type argTypes = {
  [key: string]: {
    options: string[];
    control: {
      type: string;
    };
  };
};

export const getArgTypes = (variant: variant) => {
  const argTypes: argTypes = {};
  Object.keys(variant.variants).forEach((key) => {
    argTypes[key] = {
      options: Object.keys(variant.variants[key]!),
      control: { type: "select" },
    };
  });

  return argTypes;
};
