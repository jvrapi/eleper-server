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
		const {
			EMAIL_HOST,
			EMAIL_PORT,
			EMAIL_USERNAME,
			EMAIL_PASSWORD,
		} = process.env;

		const transporter = nodemailer.createTransport({
			host: EMAIL_HOST,
			port: +(EMAIL_PORT as string),
			secure: false,
			auth: {
				user: EMAIL_USERNAME,
				pass: EMAIL_PASSWORD,
			},
		});

		this.client = transporter;
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

		const mailOptions = {
			to,
			subject,
			html,
			from: process.env.EMAIL_USERNAME,
		};

		try {
			await this.client.sendMail(mailOptions);
		} catch (error) {
			throw new Error('Erro ao tentar enviar o email');
		}
	}
}

export default new SendMailService();
