import { Factory } from "miragejs";
import faker from "faker";

const userFactory = {
  name() {
    return faker.fake("{{name.findName}}");
  },
  mobile() {
    return faker.fake("{{phone.phoneNumber}}");
  },
};
