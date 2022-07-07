var productArray = [];
$(".submitButton").on("click", function (event) {
  event.preventDefault();
  let productName = $(".productNameBox").val();
  let productQuantity = $(".productQuantity").val();
  let productPrice = $(".productPrice").val();
  let subTotPrice = $(".productPrice").val();
  var isAllValidate = validateData(productName, productQuantity, productPrice);
  let productObject = {
    Name: productName,
    Quantity: productQuantity,
    Price: productPrice,
    subTotPrice: subTotPrice,
  };
  if (isAllValidate) {
    productArray.push(productObject);
    $(".productNameBox").val("");
    $(".productPrice").val("");
    $(".productQuantity").val(1);
    clearTableData();
    renderData(productArray);
    grandSumFun(productArray);
    clearSummaryTableData();
    renderFinalData(productArray);
  }
});

function renderData(productArray) {
  for (var i = 0; i < productArray.length; i++) {
    $("table.productTable tbody").append(`
    <tr>
    <td>${i + 1}</td>
    <td>${productArray[i].Name}</td>
    <td><i class="fa fa-minus"></i> <input class="quantityInput" value="${productArray[i].Quantity}"/></td>
    <td class="actualPrice">${productArray[i].Price}</td>
    <td class="subTotPrice">${
      productArray[i].Price * productArray[i].Quantity
    }</td>
    <td class="removeProduct"><i class="fa fa-trash-o"></i></td>
    </tr>
    `);
  }
}

function validateData(productName, productQuantity, productPrice) {
  let isProductNameTrue = true,
    isProductQuantityTrue = true,
    isProductPriceTrue = true;

  var namePattern = /\d/;
  if (productName.length < 1) {
    isProductNameTrue = false;
    $(".productNameError").text("Please fill the details");
  } else if (productName.match(namePattern)) {
    $(".productNameError").text("product name should contain character only");
    isProductNameTrue = false;
  } 
  if (productQuantity.length < 1) {
    isProductQuantityTrue = false;
    $(".productPriceError").text("Please fill the details");
  } else if (productQuantity.match(/\D/)) {
    $(".productQuantityError").text(
      "product Quantity should contain number only"
    );
    isProductQuantityTrue = false;
  }

  if (productPrice.length < 1) {
    isProductPriceTrue = false;
    $(".productPriceError").text("Please fill the details");
  } else if (parseInt(productPrice) < 0) {
    isProductPriceTrue = false;
    $(".productPriceError").text("Price can not be negative");
  } else if (productPrice.match(/\D+.\D/)) {
    $(".productPriceError").text("product Quantity should contain number only");
    isProductPriceTrue = false;
  }

  if (isProductNameTrue & isProductQuantityTrue & isProductPriceTrue) {
    return true;
  } else {
    return false;
  }
}
function clearTableData() {
  $("table.productTable tbody").empty();
}
function clearSummaryTableData() {
  $("table.summaryTable tbody").empty();
}
var quantityInput = $(".quantityInput").val();
$(".productTable tbody").on("input", "td .quantityInput", function (e) {
  var indexis = $(this).parent("td").parent("tr").index();
  var quantity = $(this).val();
  var actualPrice = $(this).parent().prev().siblings(".actualPrice").text();
  var subTotPrice = quantity * parseFloat(actualPrice);
    $(this).parent().prev().siblings(".subTotPrice").text(subTotPrice);

    productArray[indexis].Quantity = quantity;
  productArray[indexis].subTotPrice = subTotPrice;
  grandSumFun(productArray);
  clearSummaryTableData();
  renderFinalData(productArray);
});

//delete the product 
$(".productTable tbody").on('click',".removeProduct",function(){
  debugger;
  var currentIndex = $(this).parent().index();
  productArray.splice(currentIndex,1)
  console.log(productArray);
  clearTableData();
  renderData(productArray);
  grandSumFun(productArray);
  clearSummaryTableData();
  renderFinalData(productArray);
});

//grand sum
function grandSumFun(productArray)
{
  // console.log("arrya length is "+productArray.length);
  var sum = 0;
  if(productArray.length==0)
  {
console.log("sum vlaue is "+ sum);
// sum =0;
  $(".grandSum").text(0);
  }
  else
  {
    for (var i = 0; i < productArray.length; i++) {
    sum +=  parseFloat(productArray[i].subTotPrice);
  }
    $(".grandSum").text(sum);
}
}
//Summary function 
function renderFinalData(productArray) {
  var totalQuantity=0;
  for (var i = 0; i < productArray.length; i++) {
    $("table.summaryTable tbody").append(`
    <tr>
    <td>${i + 1}</td>
    <td>${productArray[i].Quantity}</td>
    <td>${productArray[i].Name}</td>
    <td class="subTotPrice">${
      productArray[i].Price * productArray[i].Quantity
    }</td>
  
    </tr>
    `);
    
    totalQuantity+=productArray[i].Quantity;
  }
  $(".sumarryTotalQuantity").text(totalQuantity);
  console.log("total quantity is "+totalQuantity);
}

