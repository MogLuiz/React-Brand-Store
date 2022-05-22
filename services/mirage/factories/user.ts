import { Factory } from "miragejs";
import faker from "faker";

const userFactory = {
  user: Factory.extend({
    name() {
      return faker.fake("{{name.findName}}");
    },
    mobile() {
      return faker.fake("{{phone.phoneNumber}}");
    },
  }),
};

export default userFactory;
