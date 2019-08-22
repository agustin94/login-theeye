
const puppeteer = require('puppeteer');
const fs = require('fs')
const CONF_PATH = '/root/config.json';
test('login',async()=>{
    const browser = await puppeteer.launch({
      //headless: false,
      args: ['--start-fullscreen']
    });
  const page = await browser.newPage();
  
    //assertions
  const contenido = fs.readFileSync(CONF_PATH);
  const jsonContenido = JSON.parse(contenido);
  const user = jsonContenido.user;
  var pass = jsonContenido.pass;
  await page.setViewport({ width: 1366, height: 768});
  //ingresamos al sitio
  await page.goto('https://theeye.io/');
  //click a "ingrese"
  const linkHandlers = await page.$x('//*[@id="navbarCollapse"]/ul/li[5]/a');  
  if (linkHandlers.length > 0) {
    await linkHandlers[0].click()
  } else {
    throw new Error("Link no encontrado");
  }
  await page.waitFor(3000);
  //insertamos nuestro email en el input
  const selector = 'input.form-input';
  await page.waitForSelector(selector);
  await page.type(selector, user);
  //insertamos nuestra contraseña en el input
  await page.keyboard.press('Tab');
  await page.keyboard.type(pass);
  //click a login
  let buttonSelector = 'button[data-hook="start-login"]';
  await page.click(buttonSelector);
  browser.close();
  process.exit;
},30000);