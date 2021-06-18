


<div align="center" >
	<h1>Eliper API</h1>
	<h3> 
		API do aplicativo eliper.
	</h3>
	<p>
		<a href="#sobre">Sobre</a> •
		<a href="#funcionalidades">Funcionalidades</a> • 
		<a href="#tecnologias">Tecnologias</a> • 
		<a href="#como-usar">Como usar</a> • 
		<a href="#outras-informações">Outras Informações</a> • 
		<a href="#deploy">Deploy</a> • 
		<a href="#licenca">Licença</a> 
	</p>
</div>

<br><br>

<h1 id='sobre'>📖 Sobre</h1>


Desenvolvido no trabalho de conclusão de curso para o título de bacharel em Ciência da computação,
o Eliper tem como objetivo auxiliar as pessoas no controle das suas informações médicas. Embora nos dias atuais existam diversas soluções de prontuário eletrônico, sua grande maioria opera de forma privada e muita das vezes os pacientes não podem colaborar de forma direta com alguma informação relevante.


Outro grande problema observado é que muitos sistemas não possuem a opção de compartilhar informações com o usuário e assim surge a necessidade de a cada nova consulta, levanta-se um breve histórico médico dos acontecimentos.


Assim, foi desenvolvido um aplicativo que fornece funcionalidades para que os usuários possam gerenciar suas informações médicas de forma fácil.

O meu trabalho de conclusão de curso está disponível no [Google Drive](https://drive.google.com/drive/folders/1DidhdKeYfi_1n8Ajigipc3R2GEGPfay6?usp=sharing).

<br><br>

<h1 id='funcionalidades'>⚙️ Funcionalidades</h1>

- [x] Cadastro de usuário
- [x] Login de usuário
- [x] Sair da conta
- [x] Redefinição de senha 
- [x] Exclusão de conta 
- [x] Atualiazação de informações 
- [x] CRUD de doenças 
- [x] CRUD de anotações 
- [x] CRUD de internações 
- [x] CRUD de Cirurgias 
- [x] CRUD de Exames 
- [x] CRUD de Remedios
-	[ ] CRUD de consultas
-	[ ] CRUD de histórico familiar

<br><br>

<h1 id='tecnologias'>🚀 Tecnologias</h1>

- [TypeScript](https://www.typescriptlang.org)
- [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- [CORS](https://github.com/expressjs/cors)
- [DotENV](https://github.com/motdotla/dotenv)
- [Express](https://expressjs.com/pt-br/)
- [HandleBars](https://handlebarsjs.com)
- [Json Web Token](https://github.com/auth0/node-jsonwebtoken)
- [Multer](https://github.com/expressjs/multer)
- [MySQL](https://github.com/mysqljs/mysql)
- [Axios](https://github.com/axios/axios)
- [NodeMailer](https://nodemailer.com/about/)
- [TypeORM](https://typeorm.io/#/)
- [UUID](https://github.com/uuidjs/uuid)
- [MomentJs](https://momentjs.com)
- [Yup](https://github.com/jquense/yup)
- [Docker](https://www.docker.com) + [Docker Compose](https://docs.docker.com/compose/)
- [AWS](https://aws.amazon.com/pt/)

<br><br>

# 📱 Como usar

Para clonar e executar este aplicativo, você precisará do [Git](https://git-scm.com), [Node.js v14.16](nodejs.org/) ou superior. Se você quiser, pode utilizar o [Yarn v1.22](https://yarnpkg.com) ou superior instalado no seu computador. Caso você utilize o Docker e o Docker Compose, a API possui uma configuração para a criação do servidor e do banco de dados.

Para utilizar o servidor, basta seguir os seguintes passos:


- Para baixar o projeto, execute o seguinte comando:
```
1. git clone https://github.com/jvrapi/eliper-api.git
```
- Depois, renomeie o arquivo .env.example para .env . Esse arquivo possui algumas configurações padrões do banco de dados criado usando o docker compose. Para instalar as dependencias, execute:

```
2. cd eliper-api
3. yarn install ou npm install
```
- Para iniciar o servidor, basta executar:
```
# para rodar em dispositivos android
4. yarn dev ou npm run dev

```
Para criar o container só do banco de dados, basta você dentro da pasta da API, executar o comando:
```
docker-compose up -d db
```

Foi utilizado também a funcionalidades de migrações do TypeORM, assim é possivel criar toda a estrutura do banco de dados executando:
```
yarn typeorm migration:run

ou

npm run typeorm migration:run
```


O aplicativo se encontra disponivel também no [GitHub](https://github.com/jvrapi/eliper-app).

<br><br>


<h1 id="deploy"> 🗃 Deploy</h1>

O deploy da API foi feito utilizando serviço [EC2](https://aws.amazon.com/pt/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc) da Amazon AWS. Foi utilizado o [Docker Machine](https://docs.docker.com/machine/) no processo de implatação da API.

A API está disponivel nessa [URL](http://54.210.242.175:3000).

<br><br>

<h1 id="licenca">📝 Licenca</h1>
Este projeto está sob a licença do MIT. Consulte a [licença](LICENSE) para obter mais informações.
<br><br>

<hr>
<br><br>
<div align="center">


Feito com  ❤ por João Vitor Santos 👋 Entre em contato!



[![Linkedin Badge](https://img.shields.io/badge/-João%20Vitor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/joaovitorssdelima/)](https://www.linkedin.com/in/joaovitorssdelima/) 
[![Gmail Badge](https://img.shields.io/badge/-joaooviitoorr@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:joaooviitoorr@gmail.com)](mailto:joaooviitoorr@gmail.com) 
[![Hotmail Badge](https://img.shields.io/badge/-joaooviitorr@hotmail.com-0078d4?style=flat-square&logo=microsoft-outlook&logoColor=white&link=mailto:joaooviitorr@hotmail.com)](mailto:joaooviitorr@hotmail.com)

</div>