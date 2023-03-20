export const colourPropTypes = {
  default: "",
  keyword: "",
  built_in: "",
  number: "",
  string: "",
  "title.function_": "",
  attr: "",
};

export type ColourTypes = Partial<typeof colourPropTypes> & { default: string };
