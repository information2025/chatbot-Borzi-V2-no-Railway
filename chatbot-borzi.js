// chatbot-borzi.js com debug

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
    }
});

// Gera QR code como link de imagem
client.on('qr', async (qr) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}`;
    console.log('\n📱 Escaneie o QR code com seu WhatsApp:\n');
    console.log(qrUrl);
});

client.on('ready', () => {
    console.log('✅ Tudo certo! WhatsApp conectado.');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Falha na autenticação', msg);
});

client.on('disconnected', (reason) => {
    console.log('❌ Cliente desconectado:', reason);
});

client.on('message', async msg => {
    console.log(`📩 Mensagem recebida de ${msg.from}: ${msg.body}`);

    const texto = msg.body.toLowerCase();

    if (texto.includes('oi') || texto.includes('olá') || texto.includes('ola')) {
        await client.sendMessage(msg.from, 'Olá! Tudo bem? Sou a assistente virtual do *Mentor de Alta Performance, André Borzi*\n\nDigite a opção abaixo para que eu possa te ajudar:\n1 - Conheça o Mentor André Borzi\n2 - Agendar uma sessão on-line com André Borzi\n3 - Análise de Perfil Comportamental com devolutiva de 1 hora\n4 - Baixar os e-books para auto-desenvolvimento\n5 - Cancelar uma sessão agendada');
        return;
    }

    switch (texto.trim()) {
        case '1':
            await client.sendMessage(msg.from, 'Casado com a Aline e pai da Beatriz... [texto completo aqui]');
            break;
        case '2':
            await client.sendMessage(msg.from, 'Clique no link e marque o dia e horário disponível para você:\nhttps://calendly.com/andreborzi/30min');
            break;
        case '3':
            await client.sendMessage(msg.from, 'Clique no link e preencha o formulário:\nForm.google.com');
            break;
        case '4':
            await client.sendMessage(msg.from, 'Clique no link e escolha o material que te ajudará nesse momento:\nKwifi.com');
            break;
        case '5':
            await client.sendMessage(msg.from, 'Para cancelar uma sessão, acesse o seu e-mail cadastrado no agendamento e clique em "cancelar agendamento".');
            break;
        default:
            await client.sendMessage(msg.from, `🤖 Recebi sua mensagem: "${msg.body}". Digite "oi" ou "menu" para começar.`);
    }
});

client.initialize();