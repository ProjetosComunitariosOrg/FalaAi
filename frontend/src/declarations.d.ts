declare module "*.css";
declare module "*.png";

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.png" {
  const src: string;
  export default src;
}
