var check_button;
var message_p;
var password_input;
var hash;
const wanted_hash = "9bf99655d5c8022845c36b4096cfc5d71ce6a996ec0a4b99883fff36793989e8";

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }

async function parseForm() {
  var password = password_input.elt.value.trim().toLowerCase();
  hash = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(password));
  var hashstr = toHexString(new Uint8Array(hash));
  console.log(hashstr)
  if(hashstr == wanted_hash) {
      message_p.elt.innerText = "Grattis! koden till hänglåset är:";
      message_h.elt.innerText = "242";
  }
  else {
    message_p.elt.innerText = "Tyvärr fel - försök igen.";
  }
}

function setup() {
    check_button  = select('#check-button');
    message_p = select('#message-p');
    message_h = select('#message-h');
    password_input = select('#password-input');
    check_button.mouseClicked(parseForm);
}

function draw() {
}