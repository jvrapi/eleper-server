Hey,

Esse projeto foi desenvolvido como parte do trabalho de conclusão de curso em ciência da computação.

Esse projeto utiliza: Docker, NodeJs, TypeORM e MySQL.

Algumas instruções para esse projeto:

<p>
	<strong> Crie um arquivo </strong>
	<i>.env </i>
	<strong> com as seguintes variaveis: </strong>
</p>

<ul>
	<li>BD_TYPE = <i>Define o tipo de banco de dados</i> </li>
	<li>BD_DATABASE= <i>Define o nome do banco de dados usado</i></li>
	<li>BD_USERNAME= <i>Define o usuario do banco de dados</i></li>
	<li>BD_PASSWORD= <i>Define a senha do usuario</i></li>
	<li>BD_PORT= <i>Define a porta em que o banco está rodando</i></li>
</ul>

<p>
	<strong> Para criar o container no docker, rode o comando: </strong> 
	<i>docker-compose up -d</i>
</p>

<p>
	<strong> Para iniciar o servidor localmente, basta rodar o comando: </strong> 
	<i>yarn dev ou npm run dev</i>
</p>