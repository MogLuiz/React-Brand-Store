import { Model, hasMany, belongsTo } from "miragejs";

type TUser = {
  name: string;
  mobile: string;
};

type TProduct = {
  title: string;
  price: string;
  image: string;
};

const model = {
  user: Model.extend<Partial<TUser>>({}),
  product: Model.extend<Partial<TProduct>>({}),
};

export default model;
