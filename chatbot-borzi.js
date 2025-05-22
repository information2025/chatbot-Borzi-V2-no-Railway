const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log("🚀 Iniciando o bot Borzi...");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

client.on('qr', (qr) => {
  console.log("📱 Escaneie o QR code com seu WhatsApp:");
  qrcode.generate(qr, { small: true });
  console.log(`🔗 Ou acesse: https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`);
});

client.on('ready', () => {
  console.log("✅ Tudo certo! WhatsApp conectado.");
});

client.on('auth_failure', (msg) => {
  console.error("❌ Falha na autenticação:", msg);
});

client.on('disconnected', (reason) => {
  console.warn("⚠️ Cliente desconectado:", reason);
});

client.on('message', async msg => {
  console.log("💬 Mensagem recebida:", msg.body);

  const menu = `Olá! Sou a assistente virtual do *Mentor de Alta Performance, André Borzi*!\n\nDigite a opção abaixo para que eu possa te ajudar:\n1 - Conheça o Mentor André Borzi\n2 - Agendar uma sessão on-line com André Borzi\n3 - Realizar a Análise de Perfil Comportamental com devolutiva de 1 hora com André Borzi\n4 - Baixar os e-books para auto-desenvolvimento\n5 - Cancelar uma sessão agendada`;

  const respostas = {
    "1": `Casado com a Aline e pai da Beatriz... (biografia completa)`,
    "2": `📅 Clique no link e marque seu horário: https://calendly.com/andreborzi/30min`,
    "3": `📝 Preencha o formulário: https://form.google.com`,
    "4": `📚 Escolha seu material: https://kwifi.com`,
    "5": `❌ Para cancelar, acesse seu e-mail do agendamento e clique em "cancelar sessão".`
  };

  const texto = msg.body.trim();

  if (respostas[texto]) {
    await msg.reply(respostas[texto]);
  } else {
    await msg.reply(menu);
  }
});

client.initialize();
