// This is a base64 encoded mp3 file for a simple "unlock" sound
const base64Audio = "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFBQUFBQnJycnJycnJyc6Ojo6Ojo6Ok1NTU1NTU1NTWBgYGBgYGBgYHNzc3Nzc3Nzc4aGhoaGhoaGhpmZmZmZmZmZmaampqampqampqm5ubm5ubm5udvb29vb29vb2+jo6Ojo6Ojo6Pfr6/f39/f39/f/////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCQAAAAAAAAAAAAAAAAAD/+xDEAAPAAAKqgAAAIAAANIAAAAScJAUB///2JZxRT/WZFg8cxcJAkCQtlmRIEg+AgQE8HAQJAkHwfQftBIHg+CYPhMEwcH4Pi5KcP//+D4JwmD58HwfBAEwcBAEwfB8EwTBMHwTBAAAASQAAAAJYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFj/+yDECgPAAAJsAAAAIAAANIAAAARYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhY";

// Function to convert base64 to a file and save
function createAndDownloadMp3() {
  // Convert Base64 to binary
  const byteCharacters = Buffer.from(base64Audio, 'base64');
  
  // Write to file
  const fs = require("fs");
  fs.writeFileSync("public/assets/unlock.mp3", byteCharacters);
  console.log("Created unlock.mp3 sound effect file");
}

createAndDownloadMp3();