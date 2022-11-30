function generar(){
    const nombre = $("#nombre")
    const mensaje = $("#mensaje")
    const enviar = $("#enviar")

    const createPdf = function(body){
        let doc = new jspdf.jsPDF();
        let nombreTxt = "nombre : " + body.name
        let mensajeTxt = "mensaje : " + body.mensaje
        let tokenTxt = "firma : " + body.token
        doc.text(15, 15, nombreTxt, { maxWidth: 150 });
        doc.text(15, 15, mensajeTxt, { maxWidth: 150 });
        doc.text(15, 15, tokenTxt, { maxWidth: 150 });
        doc.save("Firma.pdf")
    }

    const getPdf = async function(){
        const nombreTxt = nombre.val()
        const mensajeTxt = mensaje.val()

        let url = "https://zuka505.github.io/CreacionFirmaDigital/pdf"
        console.log(url)
        const data = {
            name:nombreTxt,
            msg:mensajeTxt
        }
        const resp = await axios.post(url,
            data,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(resp)
        createPdf({name:nombreTxt, mensaje:mensajeTxt, token:resp.data})
    }

    enviar.click( async function(){
        console.log("enviar")
        await getPdf()
    })
}
