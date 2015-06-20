console.log("Mailed Extension Init")

function newEmail(info, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    $.ajax({
      url: 'http://localhost:3000/addresses',
      type: "POST",
      headers: {          
        "Accept" : "application/json; charset=utf-8",         
        "Content-Type": "application/json; charset=utf-8"   
      },
      data: '{ "address": { "name": "New Address" } }',
      dataType: 'json',
      processData: false,
      success: function(data, status, response) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "fill_email", value: response.responseJSON.email});
      },
      error: function(response) {
        if (response.status == 401) {
          chrome.tabs.create({ url: "http://localhost:3000" });
        }
      }
    });
  });
}

chrome.contextMenus.create({"title": "Make Email", "contexts":['editable'], "onclick": newEmail});