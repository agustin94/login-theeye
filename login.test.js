
const puppeteer = require('puppeteer');
const fs = require('fs')
const CONFIG =  require ('/root/config.json');
let browser;
const AppPage = 'https://theeye.io/';
const AppPageDashboard = 'https://app.theeye.io/dashboard#';

test('login',async()=>{
  browser = await puppeteer.launch({
      headless: false,
      args: [//'--start-fullscreen',
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--window-size=1366,800']
    });
  const page = await browser.newPage();
  
    //assertions
  //const jsonContenido = JSON.parse(CONF);
  const user = CONFIG.user;
  const pass = CONFIG.pass;
  await page.setViewport({ width: 1366, height: 768});
  //ingresamos al sitio
  
  await page.goto(AppPage);
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

   //Click en test de prueba 
   await page.waitForXPath('//*[@id="collapse_header_5d6031937e5352000f83e27d"]/h4[2]/span/div/div[2]/li/button', 5000);
   const [setting] = await page.$x('//*[@id="collapse_header_5d6031937e5352000f83e27d"]/h4[2]/span/div/div[2]/li/button');
   if(setting) setting.click();

   await page.waitFor(3000);
   await page.waitForSelector('button[ data-hook="confirm"]');
   await page.$eval('button[ data-hook="confirm"]', el => el.click());

   //var button1 = await page.$('button[data-hook="confirm"]')
   //button1.click();

  //verificar si corre 
    await page.waitForXPath('//*[@id="collapse_container_5d6031937e5352000f83e27d"]/div/div[2]/div[2]/div/div/h4/div/div/li/button/i[2]');

    console.log("pass!!!");
  
    //iremos a menu
    await page.waitFor(1000);
    await page.waitForSelector('span[ data-hook="menu-toggle"]');
    await page.$eval('span[ data-hook="menu-toggle"]', el => el.click());

    //deslogueamos
    await page.waitFor(1000);
    await page.waitForSelector('a[ data-hook="logout"]');
    await page.$eval('a[ data-hook="logout"]', el => el.click());

    browser.close();
    //process.exit;
},50000);


