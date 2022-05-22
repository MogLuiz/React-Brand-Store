import { Server } from "miragejs"

const usersSeeder = (server: Server) => {
  /*
   * This will create in the in memory DB 10 objects
   * of the Factory `user`. Moreover it creates a
   * random number of messages and assign to each
   * and every user, making use of relationships.
   */
  server.createList("user", 10);
};

const productsSeeder = (server: Server) => {
  server.createList("product", 25);
};

export default function seeds(server: Server) {
  usersSeeder(server);
  productsSeeder(server);
}
