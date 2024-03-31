var decrypt_button;
var message_textarea;
var password_input;


function parseForm() {
  var formdata = message_textarea.elt.value.trim();
  console.log(formdata);
  var password = password_input.elt.value.trim().toLowerCase();
  console.log(password);
  console.log(encrypt(formdata, password));
  //console.log(decrypt(formdata, password));
  try {
    message_textarea.elt.value = encrypt(formdata, password);
  }
  catch(error) {
    console.log(error);
    message_textarea.elt.placeholder=encrypted_text;
  }
}

function encrypt(message, password) {
  var ciphertext = [];
  for(var i = 0; i < message.length; i++) {
    ciphertext.push(
      (0xFF & message.charCodeAt(i)) ^ 
      (0xFF & password.charCodeAt(i % password.length))
    );
  }
  return btoa(ciphertext);
}

function decrypt(message, password) {
  var bytes = atob(message).split(',');
  var plaintext = "";
  for(var i = 0; i < bytes.length; i++) {
    char = parseInt(bytes[i]) ^ (0xFF & password.charCodeAt(i % password.length));
    plaintext += String.fromCharCode(char);
  }
  return plaintext;
}

function setup() {
  encrypt_button = select('#encrypt-button');
  encrypt_button.mouseClicked(parseForm);
  select('#clear-button').mouseClicked(() => {message_textarea.elt.placeholder=""});
  message_textarea = select('#message-textarea');
  //message_textarea.elt.placeholder=encrypted_text;
  password_input = select('#password-input');
}

function draw() {
}