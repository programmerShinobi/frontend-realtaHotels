const chatWA = () => {
    const qrcode = require('qrcode-terminal');
    const { Client } = require('whatsapp-web.js');
    
    const client = new Client();
    
    client.on('qr', (qr:any) => {
      // Generate and scan the QR code to authenticate
      qrcode.generate(qr, { small: true });
    });
    
    client.on('ready', () => {
      console.log('Client is ready!');
    });
    
    client.initialize();
    
    const sendMessage = async (phone:any, message:any) => {
      const formattedPhone = phone.includes('@c.id') ? phone : `${phone}@c.id`;
      const chat = await client.getChatById(formattedPhone);
    
      await chat.sendMessage(message);
    };
    
    sendMessage('82121991992', 'Hello, World!').catch(console.error);

}    


export default chatWA