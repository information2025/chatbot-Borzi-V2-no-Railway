// chatbot-borzi.js com QR code único (não renova a cada minuto)

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

let qrAlreadyShown = false;

client.on('qr', async (qr) => {
  if (qrAlreadyShown) return; // Impede múltiplos QR
  qrAlreadyShown = true;

  console.log('\n📱 Escaneie o QR code com seu WhatsApp:\n');
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}`;
  console.log(qrImageUrl);
});

client.on('ready', () => {
  console.log('\n✅ Tudo certo! WhatsApp conectado.');
});

client.on('message', async (msg) => {
  const content = msg.body.toLowerCase();

  if (content === '1') {
    msg.reply(`Casado com a Aline e pai da Beatriz, fundei a CoHE Institute nos EUA...`);
  } else if (content === '2') {
    msg.reply('Clique no link e marque o dia e horário disponível para você\nhttps://calendly.com/andreborzi/30min');
  } else if (content === '3') {
    msg.reply('Clique no link e preencha o formulário.\nForm.google.com');
  } else if (content === '4') {
    msg.reply('Clique no link e escolha o material que te ajudará nesse momento\nKwifi.com');
  } else if (content === '5') {
    msg.reply('Para cancelar uma sessão, acesse o seu e-mail cadastrado no agendamento e clique em cancelar agendamento');
  } else if (['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'].includes(content)) {
    msg.reply(`Olá! Sou a assistente virtual do *Mentor de Alta Performance, André Borzi*!\n\nDigite a opção abaixo para que eu possa te ajudar:\n1 - Conheça o Mentor André Borzi\n2 - Agendar uma sessão on-line com André Borzi\n3 - Realizar a Análise de Perfil Comportamental com devolutiva de 1 hora com André Borzi\n4 - Baixar os e-books para auto-desenvolvimento\n5 - Cancelar uma sessão agendada`);
  }
});

client.initialize();