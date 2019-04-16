var check_button;
var number1_input;
var number2_input;
var number3_input;
var message_p;
var next_div;
var next_a;
var hash;
const wanted_hash = "a8c219305d612048c151791270dcb4b6de24adba26ba6d612253606dcc4cfa65";

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }

async function parseForm() {
  var number1 = number1_input.elt.value;
  var number2 = number2_input.elt.value;
  var number3 = number3_input.elt.value;
  const invalue = number1.trim() + "_" + number2.trim() + "_" + number3.trim();
  console.log(invalue);
  hash = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(invalue));
  var hashstr = toHexString(new Uint8Array(hash));
  if(hashstr == wanted_hash) {
      message_p.elt.innerText = "Rätt! Fortsätt till nästa steg.";
      next_div.elt.style.display = 'block';
      next_a.elt.href=invalue + ".html"
  }
  else {
    message_p.elt.innerText = "Tyvärr fel - försök igen.";
    next_div.elt.style.display = 'none';    
  }
}

function setup() {
    console.log("Setup");
    check_button  = select('#check-button');
    console.log(check_button);
    number1_input = select('#number1-input');
    number2_input = select('#number2-input');
    number3_input = select('#number3-input');
    message_p = select('#message-p');
    next_div = select('#next-div');
    next_a = select('#next-a');
    check_button.mouseClicked(parseForm);
}

function draw() {
}