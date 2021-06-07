function loadDoc(e) {
    const file = e.target.files[0];
  
    if (!file) {
      throw new Error('You need to choose an XML file first')
      alert('You need to choose an XML file first')
      return false
    }
  
    readDoc(file).then(parseDoc).then(showDocInTable).catch(onError)
  }
  
  function readDoc(file) {
    const reader = new FileReader()
  
    return new Promise((ok) => {
      reader.readAsText(file)
      reader.onload = function() {
        ok(reader.result)
      }
    })
  }
  
  function parseDoc(rawXML) {
    const parser = new DOMParser()
    const xml = parser.parseFromString(rawXML, 'text/html')
    return xml
  }
  
  function showDocInTable(xml) {
    const table = document.querySelector('#pagosTable > tbody')
    const datasource = xml.querySelector('Pagos')
    const books = datasource.querySelectorAll('Pago')
  
    table.removeChild(table.children[0])
  
    Array.from(books).map((book, i) => {
      const tr = document.createElement('tr')
      const id = tagToData(book.querySelector('ID'))
      const agencia = tagToData(book.querySelector('Agencia'))
      const ag_origen = tagToData(book.querySelector('AG_Origen'))
      const dpa = tagToData(book.querySelector('DPA'))
      const dpa_origen = tagToData(book.querySelector('DPA_Origen'))
      const fecha_ec = tagToData(book.querySelector('Fecha_EC'))
      const fecha_pago = tagToData(book.querySelector('Fecha_Pago'))
      const importe = tagToData(book.querySelector('Importe'))
      const referencia = tagToData(book.querySelector('Referencia'))
      const Referencia_Origen = tagToData(book.querySelector('Referencia_Origen'))
      const codigo_barra = tagToData(book.querySelector('Codigo_Barra'))
      const nit = tagToData(book.querySelector('NIT'))
      const impuesto = tagToData(book.querySelector('Impuesto'))
      const periodo = tagToData(book.querySelector('Periodo'))
      const contribuyente = tagToData(book.querySelector('Contribuyente'))
  
      tr.append(id, agencia, ag_origen, dpa, dpa_origen, fecha_ec, fecha_pago, importe, referencia, Referencia_Origen, codigo_barra, nit, impuesto, periodo, contribuyente)
      table.appendChild(tr)
    })
  }

  function tagToData(tag) {
    const td = document.createElement('td')
    td.textContent = tag.textContent
    return td
  }
  
  function onError(reason) {
    console.error(reason)
  }