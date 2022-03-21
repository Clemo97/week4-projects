//constructor for Pizza order and address
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
//define first and last name function protoype
Address.prototype.fullName = function () {
    return this.fName + " " + this.lName;
};

var orderNames = [];
var orderSizes = [];
var orderCrusts = [];
var orderToppings = [];
var orderPrices = [];
var grandTotalsArray = [];


$(document).ready(function () {
    $(".removeOrder")
        .last()
        .click(function () {
            $(this).parentsUntil("#new-designs").remove();
        });
    $("button#addPizza").click(function () {
        $("#new-designs").append(htmlString);
        $(".checkoutHide").show();
        $(".removeOrder")
            .last()
            .click(function () {
                $(this).parentsUntil("#new-designs").remove();
            });
    });
    $("form#myForm").submit(function (event) {
        event.preventDefault();
        $(".new-design").each(function () {
            var thisName;
            var thisSize = [];
            var thisCrust = [];
            var thisToppings = [];
            thisName = $(this).find("input#pizza-name").val();
            $(this)
                .find('input[name="size"]:checked')
                .each(function () {
                    thisSize.push(this.value);
                });
            $(this)
                .find('input[name="crust"]:checked')
                .each(function () {
                    thisCrust.push(this.value);
                });
            $(this)
                .find('input[name="topping"]:checked')
                .each(function () {
                    thisToppings.push(this.value);
                });
            orderNames.push(thisName);
            orderSizes.push(thisSize);
            orderCrusts.push(thisCrust);
            orderToppings.push(thisToppings);
        });
        var validateResult = validate(orderSizes, orderCrusts, orderToppings);
        if (validateResult === false) {
            return false;
        }
        var orderObject = new PizzaOrder(
            orderNames,
            orderSizes,
            orderCrusts,
            orderToppings
        );
        $("#new-designs").children().remove();
        $(".checkoutHide").hide();
        $(".yourAddress").remove();
        $(".deliveryAsk").remove();
        ordersDisplay(orderObject);
        clearOrder(orderObject);
        $(".deliveryDiv").remove();
    });
});

function validate(size, crust, toppings) {
    if (orderSizes.length < 1) {
        $(".checkoutHide").hide();
        alert("Add at least one pizza");
        return false;
    }
    for (var index = 0; index < size.length; index += 1) {
        if (
            size[index].length < 1 ||
            crust[index].length < 1 ||
            toppings[index].length < 1
        ) {
            alert("You have missing pizza inputs");
            falseOrderClear();
            return false;
        } else if (size[index].length > 1 || crust[index].length > 1) {
            alert("Select only one size and crust per pizza");
            falseOrderClear();
            return false;
        }
    }
}