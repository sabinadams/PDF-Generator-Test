
const Puppeteer = require('puppeteer'),
    fillDataByFieldName = require('./fillDataByFieldName')

module.exports = async (html, css) => {
    const browser = await Puppeteer.launch(),
          page = await browser.newPage()

    const embeddedHTML = `
        <html>
            <body>
                ${html}
            </body>
        </html>
    `

    await page.setContent(embeddedHTML)
    
    await fillDataByFieldName(page, 'regname', 'Sabin Adams')
    await fillDataByFieldName(page, 'due', 99.23)

    await page.addStyleTag({ content: css })

    return await page.pdf({
        printBackground: true
    })
}