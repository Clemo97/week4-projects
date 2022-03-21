function PizzaOrder(name, size, crust, toppings) {
  this.pizzaName = name;
  this.size = size;
  this.crust = crust;
  this.toppings = toppings;
  this.address;
}

function Address(fName, lName, house, street, town) {
  this.fName = fName;
  this.lName = lName;
  this.house = house;
  this.street = street;
  this.town = town;
}
