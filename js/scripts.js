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

function falseOrderClear() {
    for (var orders = 0; orders <= orderSizes.length + 1; orders += 1) {
        orderNames.pop();
        orderSizes.pop();
        orderCrusts.pop();
        orderToppings.pop();
    }
}
function ordersDisplay(orderObject) {
    $(".yourOrder").show();
    $(".orderSummary").append(
        '<div class="col-12 padTop">' +
        "<h5>Orders you just submitted</h5>" +
        "</div>"
    );
    for (var orderNum = 0; orderNum < orderObject.size.length; orderNum += 1) {
        var pizzaNm = orderObject.pizzaName[orderNum];
        var orderSz = orderObject.size[orderNum];
        var orderCr = orderObject.crust[orderNum];
        var orderTopps = orderObject.toppings[orderNum];
        var orderPrice = priceDeterminer(orderSz, orderCr, orderTopps);
        $(".orderSummary").append(
            '<div class="col-12 col-md-6 col-lg-3 padTop">' +
            '<div class="order-bg-color">' +
            "<h5>Order: " +
            (orderNum + 1).toString() +
            "</h5>" +
            "<h6>Pizza name</h6>" +
            "<p>" +
            pizzaNm +
            "</p>" +
            "<h6>Size</h6>" +
            "<p>" +
            orderSz.join(", ") +
            "</p>" +
            "<h6>Crust</h6>" +
            "<p>" +
            orderCr.join(", ") +
            "</p>" +
            "<h6>Toppings</h6>" +
            "<p>" +
            orderTopps.join(", ") +
            "</p><br><br><br>" +
            '<div class="bottom-align">' +
            "<strong><h6>Price</h6></strong>" +
            "<p>Ksh. " +
            orderPrice +
            "<p>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
    }
    var orderTotals = totalPrice();
    $(".orderSummary").append(
        '<div class="col-12 padTop">' +
        "<div>" +
        '<span id="orderTotals">Total: Ksh. ' +
        orderTotals +
        "</span><br><br>" +
        "</div>" +
        "</div>" +
        '<div class="col-12 deliveryAsk">' +
        '<span id="question">Want your orders delivered at an extra Ksh. 200? </span>' +
        '<button type="button" class="btn btn-sm btn-outline-secondary yes">Yes</button>' +
        " " +
        '<button type="button" class="btn btn-sm btn-secondary no">No</button>' +
        "</div>"
    );
    $(".no").click(function () {
        $(".deliveryAsk").remove();
        $(".deliveryDiv").remove();
    });
    $(".yes").click(function () {
        $(".deliveryAsk").remove();
        $(".deliveryDiv").remove();
        $(".yourOrder").append(
            '<div class="deliveryDiv">' +
            '<div class="row">' +
            '<div class="col-12">' +
            '<form id="deliveryForm">' +
            "<h5>Your Address</h5>" +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="firstName" placeholder="First Name" required>' +
            "</div>" +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="lastName" placeholder="Last Name" required>' +
            "</div>" +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="house" placeholder="House Number" required>' +
            "</div>" +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="street" placeholder="Street" required>' +
            "</div>" +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="town" placeholder="Town" required>' +
            "</div>" +
            '<button type="submit" class="btn btn-secondary">Submit</button>' +
            "</form>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
        $(document).on("submit", "#deliveryForm", function (e) {
            e.preventDefault();
            var inputtedFName = $("input#firstName").val();
            var inputtedLName = $("input#lastName").val();
            var inputtedHouse = $("input#house").val();
            var inputtedStreet = $("input#street").val();
            var inputtedTown = $("input#town").val();
            $(".deliveryDiv").remove();
            var addressObject = new Address(
                inputtedFName,
                inputtedLName,
                inputtedHouse,
                inputtedStreet,
                inputtedTown
            );
            $(".yourOrder").append(
                '<div class="yourAddress">' +
                '<div class="row">' +
                '<div class="col-12">' +
                "<h5>Your orders will be delivered to this address after payment:</h5>" +
                "<p>Name: " +
                addressObject.fullName() +
                "</p>" +
                "<p>House: " +
                addressObject.house +
                "</p>" +
                "<p>Street: " +
                addressObject.street +
                "</p>" +
                "<p>Town: " +
                addressObject.town +
                "</p><br>" +
                "<p>Delivery fee: Ksh. 200</p>" +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-12">' +
                '<span class="grand-total">Total + Delivery: Ksh. ' +
                grandTotalPrice() +
                "</span>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
            $(this).off(e);
        });
    });
}
function totalPrice() {
    var total = 0;
    orderPrices.forEach(function (orderPrice) {
        total = total + orderPrice;
    });
    clearOrderPrices();
    grandTotalsArray.push(total);
    return total;
}
function grandTotalPrice() {
    var total = 0;
    grandTotalsArray.forEach(function (grandTotal) {
        total = total + grandTotal;
    });
    var totalAndDelivery = total + 200;
    return totalAndDelivery;
}

function clearOrderPrices() {
    for (var index = 0; index <= orderPrices.length + 1; index += 1) {
        orderPrices.pop();
    }
}
function priceDeterminer(orderSz, orderCr, orderTopps) {
    var large = new Large();
    var medium = new Medium();
    var small = new Small();
    var orderPrice = 0;
    if (orderSz[0] === "Large") {
        orderPrice = orderPrice + large[orderCr[0]];
        orderTopps.forEach(function (orderTopp) {
            orderPrice = orderPrice + large[orderTopp];
        });
        orderPrices.push(orderPrice);
        return orderPrice;
    } else if (orderSz[0] === "Medium") {
        orderPrice = orderPrice + medium[orderCr[0]];
        orderTopps.forEach(function (orderTopp) {
            orderPrice = orderPrice + medium[orderTopp];
        });
        orderPrices.push(orderPrice);
        return orderPrice;
    } else if (orderSz[0] === "Small") {
        orderPrice = orderPrice + small[orderCr[0]];
        orderTopps.forEach(function (orderTopp) {
            orderPrice = orderPrice + small[orderTopp];
        });
        orderPrices.push(orderPrice);
        return orderPrice;
    }
}

function clearOrder(orderObject) {
    for (var index = 0; index <= orderObject.size.length + 1; index += 1) {
        orderObject.pizzaName.pop();
        orderObject.size.pop();
        orderObject.crust.pop();
        orderObject.toppings.pop();
        orderNames.pop();
        orderSizes.pop();
        orderCrusts.pop();
        orderToppings.pop();
    }
}

function Large() {
    this.Thin = 650;
    this.Flatbread = 600;
    this.Thick = 700;
    this.WoodFired = 650;
    this.Focaccia = 750;
    this.Pepperoni = 70;
    this.Coriander = 90;
    this.Pepper = 60;
    this.Garlic = 50;
    this.Bacon = 110;
    this.Mozzarella = 60;
    this.Salami = 70;
    this.Pineapple = 50;
    this.Ham = 200;
    this.Pork = 200;
    this.Chicken = 250;
    this.Beef = 250;
}

function Medium() {
    this.Thin = 550;
    this.Flatbread = 500;
    this.Thick = 600;
    this.WoodFired = 550;
    this.Focaccia = 650;
    this.Pepperoni = 60;
    this.Coriander = 80;
    this.Pepper = 50;
    this.Garlic = 40;
    this.Bacon = 90;
    this.Mozzarella = 50;
    this.Salami = 60;
    this.Pineapple = 40;
    this.Ham = 150;
    this.Pork = 150;
    this.Chicken = 200;
    this.Beef = 200;
}

function Small() {
    this.Thin = 450;
    this.Flatbread = 400;
    this.Thick = 500;
    this.WoodFired = 450;
    this.Focaccia = 550;
    this.Pepperoni = 50;
    this.Coriander = 70;
    this.Pepper = 40;
    this.Garlic = 30;
    this.Bacon = 70;
    this.Mozzarella = 40;
    this.Salami = 50;
    this.Pineapple = 30;
    this.Ham = 100;
    this.Pork = 100;
    this.Chicken = 150;
    this.Beef = 150;
}

