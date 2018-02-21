import puppeteer from 'puppeteer/node6/lib/Puppeteer';

const getChromePath = require('../chrome/init')({
  path: '/tmp'
})

const isLocal = process.env.IS_LOCAL
const getExecutablePath = async () => (isLocal ? undefined : getChromePath())

export default async function dom (request) {

  let extraArgs = ['--disable-gpu', '--single-process', '--no-zygote', '--no-sandbox']
  // set proxy if available
  if (request.proxy) {
    extraArgs.push('--proxy-server='+request.proxy)
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await getExecutablePath(),
    args: extraArgs,
  });
  const page = await browser.newPage()

  await page.setRequestInterception(true)

  // when proxy available and we have user and password
  if (request.proxy && request.proxyUsername && request.proxyPassword) {
    page.authenticate({username: request.proxyUsername, password: request.proxyPassword});
  }

  // set user agent if available
  if (request.userAgent) {
    await page.setUserAgent(request.userAgent)
  }

  // block images, styles and fonts we don't really need them
  page.on('request', (request) => {
    let resource = request.resourceType()
    switch (resource) {
      case "stylesheet":
      case "image":
      case "font": {
        request.abort()
        break;
      }
      default: {
        request.continue()
        break;
      }
    }
  });

  const response = await page.goto(request.url)

  const output = await page['content']()

  let json = {};

  if (response.status() != 200) {
    json.status = false
    json.error_code = response.status()
    json.error_msg = output.toString('base64')
    json.url = response.url()
  } else {
    json.status = true
    json.data = output.toString('base64')
    json.url = response.url()
  }

  await browser.close();

  return json;
}