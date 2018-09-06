/* eslint no-console:0 */
const WebSocket = require('ws');
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/3.2.json');
const configuration = require('./config.js');

(async () => {
  try {
    console.log('Creating session app on engine.');
    const session = enigma.create({
      schema,
      url: 'ws://localhost:19076/app/',
      createSocket: url => new WebSocket(url),
    });
    const qix = await session.open();
    //const app = await qix.createSessionApp();
    //const app = await qix.createApp(configuration.appName);
    const app = await qix.openDoc(configuration.appName);
    
    console.log('Creating data connection to local files.');
    await app.createConnection({
      qName: 'data',
      qConnectionString: '/data/',
      qType: 'folder',
    });

    console.log('Running reload script.');
    const script = `Issues:
                      LOAD * FROM [lib://data/repo_recent_issues.csv]
                      (txt, utf8, embedded labels, delimiter is ',');`;
    await app.setScript(script);
    res = await app.doReloadEx();
    console.log(res);
    console.log('Creating session.');
    const issuesCount = 10;
    const properties = {
      qInfo: { qType: 'hello-data' },
      qHyperCubeDef: {
        qDimensions: [{ qDef: { qFieldDefs: ['date'] } }],
        qInitialDataFetch: [{ qHeight: issuesCount, qWidth: 1 }],
      },
    };
    const object = await app.createSessionObject(properties);
    const layout = await object.getLayout();
    const issues = layout.qHyperCube.qDataPages[0].qMatrix;

    console.log(`Listing the ${issuesCount} first issues:`);
    issues.forEach((issue) => { console.log(issue[0].qText); });

    await session.close();
    console.log('Session closed.');
  } catch (err) {
    console.log('Whoops! An error occurred.', err);
    process.exit(1);
  }
})();