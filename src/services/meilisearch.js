import { MeiliSearch } from 'meilisearch';

// Configura conexión con el servidor Meili
const client = new MeiliSearch({
  host: 'http://172.233.139.197',
  apiKey: 'd388d2446bccc07114debedcca01058d239ee3afd4553c93c6f1ad7bea61'
});

export default client;
