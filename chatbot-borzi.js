// chatbot-borzi.js
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

client.on('qr', async (qr) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`;
  console.log('\n📱 Escaneie o QR code com seu WhatsApp:');
  console.log(qrUrl);
});

client.on('ready', () => {
  console.log('✅ Tudo certo! WhatsApp conectado.');
});

client.on('message', async (msg) => {
  const menu = `Olá! Sou a assistente virtual do *Mentor de Alta Performance, André Borzi*!\n\nDigite a opção abaixo para que eu possa te ajudar:\n1 - Conheça o Mentor André Borzi\n2 - Agendar uma sessão on-line com André Borzi\n3 - Realizar a Análise de Perfil Comportamental\n4 - Baixar os e-books para auto-desenvolvimento\n5 - Cancelar uma sessão agendada`;

  if (msg.body === '1') {
    msg.reply(`Casado com a Aline e pai da Beatriz, fundei a CoHE Institute nos EUA, logo quando voltei de uma especialização em Coaching e Gestão...`);
  } else if (msg.body === '2') {
    msg.reply('Clique no link e marque o dia e horário disponível para você: https://calendly.com/andreborzi/30min');
  } else if (msg.body === '3') {
    msg.reply('Clique no link e preencha o formulário: Form.google.com');
  } else if (msg.body === '4') {
    msg.reply('Clique no link e escolha o material que te ajudará nesse momento: Kwifi.com');
  } else if (msg.body === '5') {
    msg.reply('Para cancelar uma sessão, acesse o e-mail cadastrado no agendamento e clique em cancelar agendamento.');
  } else {
    msg.reply(menu);
  }
});

client.initialize();