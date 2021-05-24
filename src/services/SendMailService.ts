import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

interface Variables {
	name: string;
	title: string;
	description: string;
	user_id: string;
	code: string;
}

class SendMailService {
	private client: Transporter;

	constructor() {
		/*Create test account for send e-mail */
		nodemailer.createTestAccount().then((account) => {
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});

			this.client = transporter;
		});
	}

	async execute(
		to: string,
		subject: string,
		variables: Variables,
		path: string
	) {
		let html;
		try {
			/* Load file */
			const templateFileContent = fs.readFileSync(path).toString('utf8');

			/*Convert file */
			const mailTemplateParse = handlebars.compile(templateFileContent);

			/*Add the variables in template file */
			html = mailTemplateParse(variables);
		} catch {
			throw new Error('Erro ao tentar carregar o arquivo de template');
		}
		try {
			const message = await this.client.sendMail({
				to,
				subject,
				html,
				from: 'EHR <noreplay@eleper.com.br>',
			});
			console.log('Message sent: %s', message.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
			return message;
		} catch {
			throw new Error('Erro ao tentar enviar o email');
		}
	}
}

export default new SendMailService();
