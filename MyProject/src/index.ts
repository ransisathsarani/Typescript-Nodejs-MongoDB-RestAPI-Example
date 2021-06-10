import app from './app'
import { startConnection } from './routes/database';

async function main() {
    startConnection();
    await app.listen(app.get('port'));
    console.log('Sever on Port', app.get('port'));
}

main();
