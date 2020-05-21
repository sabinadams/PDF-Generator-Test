module.exports = async (page, fieldName, value) => {
    return await page.evaluate( data => {
        return document
            .querySelectorAll(`[data-field="${data.fieldName}"]`)
            .forEach( regName => {
                regName.innerHTML = data.value
                regName.classList.remove('placeholder-data')
            })
    }, { fieldName, value })
}
