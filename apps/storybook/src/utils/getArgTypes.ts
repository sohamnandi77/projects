interface Variant {
  variants: Record<string, Record<string, string>>;
}

type argTypes = Record<
  string,
  {
    options: string[];
    control: {
      type: string;
    };
  }
>;

export const getArgTypes = (variant: Variant) => {
  const argTypes: argTypes = {};
  Object.keys(variant.variants).forEach((key) => {
    argTypes[key] = {
      options: Object.keys(variant.variants[key] ?? {}),
      control: { type: "select" },
    };
  });

  return argTypes;
};
