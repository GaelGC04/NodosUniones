const CANTIDAD_NODOS = 20;
const DISTANCIA_MINIMA_NODOS = 150;
const DISTANCIA_NODOS = 450;

let contenedorNodos = null;
let contenedorNodosWidth = null;
let contenedorNodosHeight = null;
let contenedorNodosTop = null;
let contenedorNodosLeft = null;
let contenedorNodosRight = null;
let contenedorNodosBottom = null;

let tamanioNodo = 5;

const nodos = [];

function obtenerDistancia(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function hacerLineaNodos() {
    for (iteradorNodos = 0; iteradorNodos < nodos.length; iteradorNodos++) {
        let nodoActual = nodos[iteradorNodos];
        let nodoActualPosicion_X = nodoActual.offsetLeft;
        let nodoActualPosicion_Y = nodoActual.offsetTop;
        for (iteradorNodos2 = iteradorNodos; iteradorNodos2 < nodos.length; iteradorNodos2++) {
            if (iteradorNodos === iteradorNodos2) {
                continue;
            }
            let nodoIterada = nodos[iteradorNodos2];
            let nodoIteradaPosicion_X = nodoIterada.offsetLeft;
            let nodoIteradaPosicion_Y = nodoIterada.offsetTop;
            let distancia = obtenerDistancia(nodoActualPosicion_X, nodoActualPosicion_Y, nodoIteradaPosicion_X, nodoIteradaPosicion_Y);
            if (distancia <= DISTANCIA_NODOS) {
                const linea = document.createElement('div');
                linea.classList.add('linea');
                linea.style.position = 'absolute'
                linea.style.width = `${distancia}px`;
                linea.style.transformOrigin = `0% 0%`;
                linea.style.transform = `translate(${nodoActualPosicion_X - contenedorNodosLeft + (tamanioNodo / 2)}px, ${nodoActualPosicion_Y - contenedorNodosTop + (tamanioNodo / 2)}px) rotate(${Math.atan2(nodoIteradaPosicion_Y - nodoActualPosicion_Y, nodoIteradaPosicion_X - nodoActualPosicion_X)}rad)`;
                linea.style.boxShadow = '0px 0px 5px rgba(255,255,255,1)';
                if (distancia > DISTANCIA_MINIMA_NODOS) {
                    linea.style.backgroundColor = 'rgba(255,255,255,0.2)';
                    linea.style.boxShadow = '0px 0px 1px rgba(255,255,255,0.5)';
                }
                contenedorNodos.appendChild(linea);
            }
        }
    }
}

function eliminarLineas() {
    const lineas = document.querySelectorAll('.linea');
    lineas.forEach(linea => {
        linea.remove();
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    contenedorNodos = document.querySelector('.contenedor-nodos');
    contenedorNodosWidth = contenedorNodos.clientWidth;
    contenedorNodosHeight = contenedorNodos.clientHeight;
    contenedorNodosTop = contenedorNodos.offsetTop;
    contenedorNodosLeft = contenedorNodos.offsetLeft;
    contenedorNodosRight = contenedorNodosLeft + contenedorNodosWidth;
    contenedorNodosBottom = contenedorNodosTop + contenedorNodosHeight;

    for (let i=0; i < CANTIDAD_NODOS; i++) {
        const nodo = document.createElement('div');
        nodo.classList.add('nodo');
        nodo.style.position = 'absolute';
        nodo.style.top = `${contenedorNodosTop + (Math.random() * contenedorNodosHeight)}px`;
        nodo.style.left = `${contenedorNodosLeft + (Math.random() * contenedorNodosWidth)}px`;

        nodo.style.width = `${tamanioNodo}px`;
        nodo.style.height = `${tamanioNodo}px`;

        contenedorNodos.appendChild(nodo);
        nodos.push(nodo);
    }

    function determinarPosicion(nodo) {
        let esMenorX = Math.floor(Math.random() * 2) == 1;
        let esMenorY = Math.floor(Math.random() * 2) == 1;
        let esDentroX = Math.floor(Math.random() * 2) == 1;
        
        let velocidad = (Math.random() * 10) + 5;

        posX = esDentroX ? contenedorNodosLeft + (Math.random() * contenedorNodosWidth) : esMenorX ? contenedorNodosLeft : contenedorNodosRight;
        posY = !esDentroX ? contenedorNodosTop + (Math.random() * contenedorNodosHeight) : esMenorY ? contenedorNodosTop : contenedorNodosBottom;
        nodo.style.transition = `${velocidad}s linear`;
        nodo.style.left = `${posX}px`;
        nodo.style.top = `${posY}px`;
    }

    function animar() {
        nodos.forEach(nodo => {
            const nodoBound = nodo.getBoundingClientRect();
            const contenedorBound = contenedorNodos.getBoundingClientRect();
            if (
                nodoBound.top <= contenedorBound.top + 5 ||
                nodoBound.top >= contenedorBound.bottom - 5 ||
                nodoBound.left <= contenedorBound.left + 5 ||
                nodoBound.left >= contenedorBound.right - 5
            ) {
                nodo.classList.remove('no-animar');
            }

            if (nodo.classList.contains('no-animar')) {
                return;
            }

            nodo.classList.add('no-animar');
            determinarPosicion(nodo);
        });

        eliminarLineas();
        hacerLineaNodos();

        requestAnimationFrame(animar);
    }
    animar();
})