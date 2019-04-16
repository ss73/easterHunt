var decrypt_button;
var message_textarea;
var password_input;

encrypted_text = 
  "NTcsMTk3LDI5LDE0MywyNywyMSwxOSw2OSw1L" +
  "DE0OSwzLDEyLDEsNyw2LDY5LDI5LDAsMCwzMS" +
  "wxMyw2NSwyMiwxNiw4MCwxMzYsMTgsMzEsOSw" +
  "2NSwyNywxMSw4MCwxNDUsMSwxNCw3MiwyMywx" +
  "NTAsMjMsMjAsMTI4LDI5LDgxLDk4LDEwNyw4M" +
  "iw2OSw2NSwyMDMsODMsMzUsMjksMTksODIsOC" +
  "wxNDksMTM5LDIwLDEwLDcyLDIxLDE1MCwxMSw" +
  "yMCwxNTAsNywyLDExLDEwLDI5LDIzLDgwLDEz" +
  "MSwyNiw1LDYsMTgsODIsMTIsODAsMTUwLDMsM" +
  "TAsMjYsNiwwLDEyLDMsMTI4LDI5LDg0LDk4LD" +
  "Y1LDgyLDg3LDk0LDE5NywzNywyLDQsMTAsMjM" +
  "sMTcsODAsMTI5LDE4LDMxLDI5LDEyLDgyLDIy" +
  "LDQsMCwxLDc1LDI0LDEzMiw4Miw0LDI4LDEzN" +
  "iwxOCw1LDksMiwyNSw0LDMwLDIxOCwxMjEsNz" +
  "UsNzIsODIsOTIsNjksNTYsMTQ0LDEsNzUsNSw" +
  "xMzIsMjgsMiwxNywxOTcsMjIsNywxMyw3LDE5" +
  "LDExLDQsMTI4LDEsNzUsMTQsOCwyOCwxMSwzL" +
  "DE5NywzLDE0Miw3MiwxMCwxOSwxNCwyMSwxMz" +
  "csNiwxMiw2LDQsMjgsOTAsMTIyLDIzOSwzMiw" +
  "yNyw5LDE5LDIxLDIzLDI1LDE1MCwyMiw1LDcy" +
  "LDksMjcsMTcsNCwxMzIsMSw3NSwxMiwyMCw4M" +
  "iwxMiw4MCwxNDEsMTgsNyw0LDQsMjgsNjksMC" +
  "wwLDgzLDksMTcsMTksMTUxLDExLDk0";

function parseForm() {
  var formdata = message_textarea.elt.placeholder;
  var password = password_input.elt.value.trim().toLowerCase();
  //console.log(encrypt(mess, password));
  //console.log(decrypt(formdata, password));
  try {
    message_textarea.elt.placeholder = decrypt(formdata, password);
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
  decrypt_button = select('#decrypt-button');
  decrypt_button.mouseClicked(parseForm);
  select('#clear-button').mouseClicked(() => {message_textarea.elt.placeholder=encrypted_text;});
  message_textarea = select('#message-textarea');
  message_textarea.elt.placeholder=encrypted_text;
  password_input = select('#password-input');
}

function draw() {
}