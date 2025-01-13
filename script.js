
            let irri = [false, false, false, false, false]; // array para contabilizar si se enciende o apaga
            let caudales = [getRandomCaudal(), getRandomCaudal(), getRandomCaudal(), getRandomCaudal(), getRandomCaudal()];
            let cambios = [0, 0, 0, 0, 0];
    
            // Obtenemos random los valores del caudal
            function getRandomCaudal() {
                return Math.floor(Math.random() * 10) + 1;
            }
    
            //actualizar el caudal cada 5 segs
            setInterval(() => {
            for (let i = 0; i < 5; i++) { // Bucle para cambiar los caudales
                 if (irri[i]) { // Solo se actualiza si el irrigador está encendido
                    let cambio = Math.floor(Math.random() * 5) - 2; // Cambio aleatorio de -2 a 2
                    caudales[i] += cambio;

                    // Limitar el caudal entre 0 y 10
                    if (caudales[i] < 0) caudales[i] = 0;
                    if (caudales[i] > 10) caudales[i] = 10;

                    // Establecer las necesidades de riego según el cultivo
                    let minCaudal, maxCaudal;
                    switch (i) {
                        case 0: // Irrigador 1 - Maíz
                            minCaudal = 6;
                            maxCaudal = 8;
                            break;
                        case 1: // Irrigador 2 - Trigo
                            minCaudal = 5;
                            maxCaudal = 7;
                            break;
                        case 2: // Irrigador 3 - Girasol
                            minCaudal = 4;
                            maxCaudal = 6;
                            break;
                        case 3: // Irrigador 4 - Soja
                            minCaudal = 7;
                            maxCaudal = 9;
                            break;
                        case 4: // Irrigador 5 - Arroz
                            minCaudal = 3;
                            maxCaudal = 5;
                            break;
                    }

                    // Cambiar el color del caudal según el valor
                    let caudalElement = document.getElementById("caudal" + (i + 1));
                    
                    if (caudales[i] < minCaudal) {
                        // Si el caudal está por debajo del mínimo, el color será rojo
                        caudalElement.style.color = "red";
                    } else if (caudales[i] >= minCaudal && caudales[i] <= maxCaudal) {
                        // Si el caudal está dentro del rango adecuado, el color será verde
                        caudalElement.style.color = "green";
                    } else {
                        // Si el caudal está por encima del máximo, lo dejamos en negro (puedes ajustarlo)
                        caudalElement.style.color = "yellow";
                    }

                    // Actualizar el texto del caudal y el cambio
                    caudalElement.textContent = `Caudal: ${caudales[i]} L/min`;
                    document.getElementById("cambio" + (i + 1)).textContent = `Cambio: ${cambio} L/min`;
                }
            }
        }, 2000);

    
            // Función para encender o apagar los irrigadores
            function Encender(index) {
                let button = document.getElementById("b" + index);
                let caudal = document.getElementById("caudal" + index);
                let cambio = document.getElementById("cambio" + index);
                let div = document.getElementById("d" + index);
                let divc = document.getElementById("cont" + index);
                
                // Verificamos si la imagen ya existe, si no, la creamos
                let img = document.getElementById("img" + index);
                if (!img) {
                    img = document.createElement("img");
                    img.id = "img" + index;  // Asignamos un id único a la imagen para cada irrigador
                    img.src = "gotas.png";  // Ruta de la imagen
                    img.alt = "Gotas";  // Texto alternativo para accesibilidad
                    
                    // Si la imagen no se carga correctamente, se mostrará un error en consola
                    img.onerror = function() {
                        console.error("No se pudo cargar la imagen 'gotas.png'. Verifica la ruta.");
                    };
            
                    img.style.width = "20px";  // Ajustamos el tamaño de la imagen
                    img.style.marginLeft = "10px"; // Ajustamos el espacio con respecto al texto
                    img.style.verticalAlign = "middle"; // Alineamos la imagen con el texto
                }
            
                irri[index - 1] = !irri[index - 1]; // Cambiar estado del irrigador
            
                if (irri[index - 1]) {
                    button.style.backgroundColor = "green";
                    button.value = "I";
                    div.style.backgroundColor = "#e0f7fa";
                    
                    // Agregar la imagen solo si no se ha agregado ya
                    button.appendChild(img); 
                    
                    caudal.style.display = "block"; // Mostrar caudal
                    cambio.style.display = "block"; // Mostrar cambio
                    divc.style.display = "block";
                    caudal.textContent = `Caudal: ${caudales[index - 1]} L/min`;
                    cambio.textContent = `Cambio: ${cambios[index - 1]} L/min`;
                } else {
                    button.style.backgroundColor = "red";
                    button.value = "D";
                    div.style.backgroundColor = "white";
                    
                    // Ocultar caudal, cambio y div asociado
                    caudal.style.display = "none"; 
                    cambio.style.display = "none";
                    divc.style.display = "none";
                    
                    // Eliminar la imagen cuando el irrigador está apagado
                    if (img) {
                        button.removeChild(img);
                    }
                }
            }
            
           
        