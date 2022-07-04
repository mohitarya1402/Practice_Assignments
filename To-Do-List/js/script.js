$(document).ready(function () {
  let listItem = [];
  let liClickedIndex;
  let clickedIndexValue;
  $(".submitBtn").on("click", function () {
    var btnvalue = $(this).text();
    var inputvalue = $(".input-item").val();
    if (inputvalue.length > 1) {
      clearListFromScreen();
      if (btnvalue.toLowerCase() == "add") {
        addIntoList(inputvalue);
      } else {
        updateIntoList(inputvalue);
      }
      clearInputField();
    } else {
      alert("Please enter the value");
    }
  });
  function addIntoList(val) {
    listItem.push(val);
    renderData(listItem);
  }
  //---------------update------------
  //on clicking the list,displaying the data into the input box
  $(".list").on("click", ".singleLi", function () {
    clickedIndexValue = $(this).text();
    liClickedIndex = listItem.indexOf(clickedIndexValue);
    $(".input-item").val(clickedIndexValue);
    $(".addEdit").toggle("fa-edit");
    $(".submitBtn").text("Update");
  });
  //updating the data into array
  function updateIntoList(inputvalue) {
    listItem[liClickedIndex] = inputvalue;
    renderData(listItem);
    $(".submitBtn").text("ADD");
  }
  //displaying the data on the screen
  function renderData(item) {
    for (let i = 0; i < listItem.length; i++) {
      $(".list").append(
        `<li class="list-row"><span class="singleLi">${listItem[i]}</span><span class="remove-list"><i class="fas fa-trash " data-type="delete"></span></li>`
      );
    }
  }
  //remove item from the list
  $(document).on("click", ".remove-list", function () {
    var currentIndex = listItem.indexOf($(this).parent(".list-row").text());
    $(this).parent(".list-row").remove();
    listItem.splice(currentIndex, 1);
  });
  //removing the list from the page
  function clearListFromScreen() {
    $(".list").empty();
  }
  //clear input field
  function clearInputField() {
    $(".input-item").val("");
  }
});
