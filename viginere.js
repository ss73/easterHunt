var decrypt_button;
var message_textarea;
var password_input;

encrypted_text = 
  "NTIsMTI4LDcsNzUsNCw4LDIxLDIsMjEsMTUxLDgzLDMxLDI2LDQsODIsNCwzLDE0MiwxOCwyNSw3MiwxMiwyMywxLDgwLDE0NSwxNTEsNSwxMiwxOCw2LDEyLDE5LDE0MiwyOCwyNSw3Miw4LDgyLDE5LDIxLDEyOSwzMSwxNDIsMTIsMCwyOCw3NSw4MCwxODMsMTUxLDAsNiwwLDgyLDEzLDUsMTUxLDgzLDYsMTQxLDE1LDIxLDQsODAsMTQ1LDE1MSw1LDEyLDE4LDYsMTIsMTksMTQyLDI4LDI1LDcyLDE4LDI5LDgsODAsMTMxLDI2LDUsNiwxOCw4MiwxMiw4MCwxNDcsMTgsMjUsMiw0LDgyLDksMTQ5LDEyOSwxOCw2OSw5OCwxMDcsNTksNjksMzAsMSwwLDMxLDksNjUsNywyMSwwLDEzMCwyNiwxMywyOCw2NSwzMSwxMjgsMywxNDUsMjIsNzUsMTIsMjAsODIsMTQsMzEsMTM2LDMwLDEwLDcyLDgsMjYsMTI4LDIzLDE5NywyNywzMCwyNiw2NSwzMSwxMjgsMzAsMTMwLDE4LDc1LDI4LDEzMywyOCwxLDMsMTQ1LDI2LDgsMywxNCwwLDY5LDMsMTM4LDMwLDc1LDQsOCwyMSwyLDIxLDE1MSw4MywyLDcyLDIzLDE5LDIzLDI2LDEyOCw4Myw3LDE0MSw1LDE5LDk1LDEyMiwxOTcsOTQsNzUsNDYsMTUxLDAsMjIsNCwxOTcsMjMsMTQsNiw2NSwzMSwxMiwzMCwxNTAsNywxMCw3MiwxMywxNTEsMSwxNywxMzksMTIxLDc1LDY5LDY1LDMzLDAsMjAsMTMyLDI5LDc1LDUsNCwzMCw5LDE3LDEzOSwzMSwxNDIsMTIsMCwyOCw2OSwxMjIsMTk3LDk0LDc1LDU5LDgsMSwxNyw4MCwxMjksMjIsNSw3MiwxOCw2LDE0NywyLDE1MCw3LDEwLDcyLDEzLDE1MSwxLDE3LDEzOQ==";

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