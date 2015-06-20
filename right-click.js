var clickedEl = null;

document.addEventListener("mousedown", function(event){
  if(event.button == 2) { 
    clickedEl = event.target;
  }
}, true);

function onMessage(request, sender, sendResponse) {
  if (request.type == "fill_email") {
    clickedEl.value = request.value
  }
}

chrome.runtime.onMessage.addListener(onMessage);