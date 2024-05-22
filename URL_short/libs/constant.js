export const baseUrl =process.env.NEXT_PUBLIC_BASE_URL;

export const genaretRandomString = length =>{
    const character =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const characterlength = character.length;
    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterlength));
      }
      return result;
}