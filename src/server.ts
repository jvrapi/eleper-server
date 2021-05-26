import app from './app';

const port = process.env.PORT || 3333;

app.listen(+port, '0.0.0.0', () => {
	console.log(`🏃 Running Server on port ${port} `);
});
