import cloudinary from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
  cloud_name: 'downe22q2', 
  api_key: '561179869514785', 
  api_secret: 'Mvk0VGOtDYJ1E3gVBo0s8ChYJZA' 
});


describe('Pruebas en fileupload', () => {

    //npm install cloudinary--save-dev


    test('debe de cargar un archivo y retornar el url ', async() => { 
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png'); // Construimos el archivo a subir

        const url = await fileUpload(file)  // Lo subimos a cloudinary

        expect( typeof url ).toBe('string'); // Esperariamos que el url devuelto por cloudinary fuese un string
    
        //Borrado de la imagen en cloudinary
        const segments = url.split('/');                                    // Creamos un array con los segmentos del url separados por /
        const imageId = segments[ segments.length -1].replace('.png','')    // Seleccionamos del array el nombre y le quitamos la extensión    
        await cloudinary.v2.api.delete_resources(imageId, {}, ()=>{               // Borramos la imagen 
            console.log('borrado de imagen');
        });
    })
    
    test('debe de retornar un error ', async() => {
        
        const file = new File([], 'foto.jpg'); // Construimos el archivo a subir vacio

        const url = await fileUpload(file)  // Lo subimos a cloudinary

        expect( url ).toBe( null ); // Esperariamos que el url devuelto por cloudinary fuese un null
    })
})
