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