const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializa o client com ajustes para ambientes como Railway
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Exibe o QR code no terminal (log do Railway)
client.on('qr', qr => {
    console.log('🔄 Gerando QR Code no terminal...');
    qrcode.generate(qr, { small: true });
});

// Confirma conexão
client.on('ready', () => {
    console.log('✅ Cliente conectado com sucesso!');
});

// Define respostas
client.on('message', async msg => {
    const texto = msg.body.toLowerCase();

    if (texto === 'menu') {
        await msg.reply(
            '📋 *Menu BorziBot*\n' +
            '1️⃣ - Informações sobre nossos serviços\n' +
            '2️⃣ - Falar com atendente\n' +
            '3️⃣ - Horário de funcionamento\n' +
            '4️⃣ - Encerrar atendimento\n\n' +
            'Digite o número da opção desejada.'
        );
    }

    if (texto === '1') {
        await msg.reply('📌 Oferecemos soluções de automação para WhatsApp com IA e atendimento 24/7!');
    }

    if (texto === '2') {
        await msg.reply('👨‍💼 Um atendente será acionado em breve. Por favor, aguarde...');
    }

    if (texto === '3') {
        await msg.reply('🕒 Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.');
    }

    if (texto === '4') {
        await msg.reply('👋 Atendimento encerrado. Obrigado pelo contato!');
    }

    if (texto === 'oi' || texto === 'olá' || texto === 'bom dia') {
        await msg.reply('Olá! 👋 Eu sou o *BorziBot*.\nDigite *menu* para ver as opções.');
    }
});

client.initialize();