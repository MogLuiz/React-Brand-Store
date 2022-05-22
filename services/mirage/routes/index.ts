export default function routes(this: any) {
  this.namespace = "api";
  this.timing = 750;

  this.resource('users');
  this.resource('products');
}

