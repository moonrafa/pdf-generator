const express = require('express')
const ejs = require('ejs')
const path = require('path')
//const pdf = require('html-pdf')
const puppeteer = require('puppeteer')
const app = express()

const collegeSubjects = [
  {
    name: 'Verificação, Validação e Teste de Software ',
    workload: 68,
    semester: 6
  },
  {
    name: 'Técnicas Avançadas de Desenvolvimento de Software',
    workload: 72,
    semester: 5
  },
  {
    name: 'Sistemas de Informação',
    workload: 70,
    semester: 6
  },
  {
    name: 'Laboratório de Banco de Dados',
    workload: 51,
    semester: 4
  },
  {
    name: 'Infraestrutura para Sistemas de Software',
    workload: 38,
    semester: 3
  },
  {
    name: 'Interface Humano-computador',
    workload: 90,
    semester: 2
  },
  {
    name: 'Engenharia de Software',
    workload: 50,
    semester: 2
  },
  {
    name: 'Fundamentos de Web',
    workload: 30,
    semester: 1
  },
  {
    name: 'Formação Profissional em Computação',
    workload: 78,
    semester: 4
  },
  {
    name: 'Desenvolvimento para Dispositivos Móveis',
    workload: 71,
    semester: 3
  }
]
//caminho do tailwindcss
app.use(express.static(path.join(__dirname, '/dist')))

app.get('/pdf', async (request, response) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0'
  })
  const pdf = await page.pdf({
    printBackground: true,
    format: 'Letter',
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px'
    }
  })
  await browser.close()
  response.contentType('application/pdf')
  return response.send(pdf)
  //const browser = await puppeteer.launch({headless: false })
  //const page = await browser.newPage()
  //await page.goto('https://google.com), { waitUntil: 'networkidle0})
  //await browser.close()
  //return response.send('feito)
})

app.get('/', (request, response) => {
  const filePath = path.join(__dirname, '/print.ejs')
  ejs.renderFile(filePath, { collegeSubjects }, (err, html) => {
    if (err) {
      return response.send('Erro na leitura do arquivo, verifique o caminho')
    }
    /*configurar pdf

    const options = {
      height: '11.25in',
      width: '8.5in',
      header: {
        height: '20mm'
      },
      footer: {
        height: '20mm'
      }
    }
    //criar pdf

    pdf.create(html, options).toFile('report.pdf', (err, data) => {
      if (err) {
        return response.send('Erro ao gerar o PDF')
      }
      //enviar resposta
      return response.send(html)
    })*/
    return response.send(html)
  })
})

app.listen(3000)
