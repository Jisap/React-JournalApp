

export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/downe22q2/upload';        // url de cloudinary donde subimos la img

    const formData = new FormData();                                            // Instanciamos el form-data
    formData.append('upload_preset','react-journal');                           // Establecemos el contenido del form-data
    formData.append('file', file)

    try {

        const resp = await fetch(cloudUrl, {                                    // Enviamos form-data por el método post
            method: 'POST',
            body: formData
        })

        if(resp.ok){                                    // Si el envio fue bien
            const cloudResp = await resp.json();        // Recibimos la respuesta de cloudinary 
            return cloudResp.secure_url;                // y la mostramos, concretamente la secure_url -> FB
        }else{
            //throw await resp.json();                    // Si el envio fue mal mostramos la resp de cloudinary con el error.
            return null
        }

    } catch (error) {
        throw error;                                    // Error si existio por nuestra parte.
    }
    //return url cloudinary
}