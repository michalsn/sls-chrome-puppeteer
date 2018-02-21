import puppeteer from 'puppeteer/node6/lib/Puppeteer';

const getChromePath = require('../chrome/init')({
  path: '/tmp'
})

const isLocal = process.env.IS_LOCAL
const getExecutablePath = async () => (isLocal ? undefined : getChromePath())

export default async function version () {

  let extraArgs = ['--disable-gpu', '--single-process', '--no-zygote', '--no-sandbox']

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await getExecutablePath(),
    args: extraArgs,
  });
  const version = await browser.version()
  await browser.close()

  return version
}