const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', qr => {
    console.log('📲 Escaneie o QR Code abaixo para autenticar no WhatsApp:\n');
    qrcode.generate(qr, { small: true });

    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300`;
    console.log('\n🔗 Link alternativo para escanear com WhatsApp Web:');
    console.log(url);
});

client.on('ready', () => {
    console.log('\n✅ WhatsApp conectado com sucesso!');
});

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
    const comando = msg.body.toLowerCase();

    if (comando === 'menu') {
        const menu = `
🦾 *Chatbot Borzi* - Opções disponíveis:

1️⃣ *Horário de atendimento*
2️⃣ *Endereço da clínica*
3️⃣ *Agendar consulta*
4️⃣ *Falar com atendente*
❌ *Sair*

Envie o número da opção que deseja.`;
        await msg.reply(menu);
    }

    if (comando === '1') {
        await msg.reply('🕒 Nosso horário de atendimento é de segunda a sexta, das 8h às 18h.');
    }

    if (comando === '2') {
        await msg.reply('📍 Estamos localizados na Av. Exemplo, 123 - Centro.');
    }

    if (comando === '3') {
        await msg.reply('📅 Para agendar uma consulta, envie seu nome completo e a especialidade desejada.');
    }

    if (comando === '4') {
        await msg.reply('👩‍💼 Encaminhando para um atendente. Aguarde um momento...');
    }

    if (comando === '5' || comando === '❌' || comando === 'sair') {
        await msg.reply('👋 Obrigado por usar o Chatbot Borzi. Até logo!');
    }
});

client.initialize();