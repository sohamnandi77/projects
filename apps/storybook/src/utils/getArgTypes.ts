type argTypes = Record<
  string,
  {
    options: string[];
    control: {
      type: string;
    };
  }
>;

export const getArgTypes = (
  variant: Record<string, Record<string, string>>,
) => {
  const argTypes: argTypes = {};
  Object.keys(variant).forEach((key) => {
    argTypes[key] = {
      options: Object.keys(variant[key] ?? {}),
      control: { type: "select" },
    };
  });

  return argTypes;
};
