export const localhost = "http://localhost";
export const vue_port = "4951";
export const react_port = "4950";

export const port = (framework: "React" | "Vue") => {
  return framework == "React" ? react_port : vue_port;
};
