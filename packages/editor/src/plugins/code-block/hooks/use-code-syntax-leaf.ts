// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCodeSyntaxLeaf = ({ leaf }: { leaf: any }) => {
  return {
    tokenProps: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      className: `prism-token token ${leaf?.tokenType}`,
    },
  };
};
