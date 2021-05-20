require('dotenv').config();
import bottle from './bottle';

const port = process.env.PORT || 3000;
bottle.container.app.listen(port, () => console.log(`The app is running port ${port}.`));
