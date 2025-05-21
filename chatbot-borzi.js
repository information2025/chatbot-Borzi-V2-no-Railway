const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'borzi-v2' }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot André Borzi V2 conectado com sucesso!');
});

client.initialize();

const menu = `Olá! 👋\n\nSou a assistente virtual do *Mentor de Alta Performance, André Borzi*!\n\nDigite a opção abaixo para que eu possa te ajudar:\n\n` +
`1 - Conheça o Mentor André Borzi\n` +
`2 - Agendar uma sessão on-line com André Borzi\n` +
`3 - Realizar a Análise de Perfil Comportamental\n` +
`4 - Baixar os e-books para auto-desenvolvimento\n` +
`5 - Cancelar uma sessão agendada`;

const respostas = {
  "1": "Casado com a Aline e pai da Beatriz, fundei a CoHE Institute nos EUA, logo após uma especialização em Coaching e Gestão. Sou apaixonado por transformar vidas com planejamento e fé!",
  "2": "Clique no link e marque o dia e horário disponível para você: https://calendly.com/andreborzi/30min",
  "3": "Clique no link e preencha o formulário para análise de perfil: https://form.google.com",
  "4": "Clique no link e escolha o material ideal pra você: https://kwifi.com",
  "5": "Para cancelar uma sessão, acesse o e-mail cadastrado no agendamento e clique em *cancelar agendamento*."
};

client.on('message', async msg => {
  const chat = await msg.getChat();
  const content = msg.body.trim();
  const isPrivate = msg.from.endsWith('@c.us');

  if (/^(menu|oi|olá|ola)$/i.test(content) && isPrivate) {
    await client.sendMessage(msg.from, menu);
    return;
  }

  if (respostas[content] && isPrivate) {
    await client.sendMessage(msg.from, respostas[content]);
  }
});
