import serverConfig from '@arcticzeroo/switch-stock-common/config/serverConfig';
import app from './app';

app.listen(serverConfig.port, () => console.log(`Server is now listening on port ${serverConfig.port}`));