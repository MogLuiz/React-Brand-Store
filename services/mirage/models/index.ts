import { Model, hasMany, belongsTo } from "miragejs";

type TUser = {
  name: string;
  mobile: string;
};


const model = {
    user: Model.extend<Partial<TUser>>({})
}

export default model