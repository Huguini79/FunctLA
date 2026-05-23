let div_contenido = document.getElementById('contenido');
let div_contenido2 = document.getElementById('contenido2');
let tabla = document.getElementById('tabla_de_valores');
let ctx = document.getElementById('grafica');

let data = []

let m;
let x;
let n;

let miGrafica = null;

function EncontrarMayorX() {
    let mayor_x = data[0].x;

    data.forEach((element) => {
        if (element.x > mayor_x) {
            mayor_x = element.x;
        }
    });

    return mayor_x;

}

function EncontrarMayorY() {
    let mayor_y = data[0].y;

    data.forEach((element) => {
        if (element.y > mayor_y) {
            mayor_y = element.y;
        }
    });

    return mayor_y;

}

function EncontrarMenorX() {
    let menor_x = data[0].x;

    data.forEach((element) => {
        if (element.x < menor_x) {
            menor_x = element.x;
        }
    });

    return menor_x;

}

function EncontrarMenorY() {
    let menor_y = data[0].y;

    data.forEach((element) => {
        if (element.y < menor_y) {
            menor_y = element.y;
        }
    });

    return menor_y;

}

function Grafica() {
    if (miGrafica) {
        miGrafica.destroy();
    }

    let mayor_x = EncontrarMayorX();
    let mayor_y = EncontrarMayorY();

    let menor_x = EncontrarMenorX();
    let menor_y = EncontrarMenorY();

    if (mayor_y == 0) {
        mayor_y = 5;
    }

    miGrafica = new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [{
                label: 'Gráfica',
                data: data,
                showLine: true,
                borderWidth: 2,
                borderColor: "green",
                tension: 0
            }]
        },
        options: {
            scales: {
                x: {
                    type: "linear",
                    min: menor_x,
                    max: mayor_x,
                    ticks: {
                        stepSize: 1
                    },
                    grid: {
                        color: "black"
                    }
                },
                y: {
                    type: "linear",
                    min: menor_y,
                    max: mayor_y,
                    ticks: {
                        stepSize: 1
                    },
                    grid: {
                        color: "black"
                    }
                }
            }
        }
    });

    if (m > 0) {
        div_contenido2.innerHTML = `
            <h2>m = ${m} > 0 -> Creciente</h2>
        `;

    } else if (m < 0) {
        div_contenido2.innerHTML = `
            <h2>m = ${m} < 0 -> Decreciente</h2>
        `;

    } else {
        div_contenido2.innerHTML = `
            <h2>m = ${m} = 0 -> Función Constante</h2>
        `;
    }

}

function AnadirALaTablaDeValoresLineal() {
    let input_x = parseInt(document.getElementById('input_valor_de_entrada').value);
    x = input_x;
    tabla_de_valores.innerHTML += `
        <tr>
            <td>${x}</td>
            <td>${m} · ${x} = ${m * x} -> (${x}, ${m * x})</td>
        </tr>
    `;

    data.push({
        x: x,
        y: m * x,
    });

    console.log(data);

    ConseguirXLineal();

}

function AnadirALaTablaDeValoresAfin() {
let input_x = parseInt(document.getElementById('input_valor_de_entrada').value);
    x = input_x;
    tabla_de_valores.innerHTML += `
        <tr>
            <td>${x}</td>
            <td>${m} · ${x} + ${n} = ${m * x + n} -> (${x}, ${m * x + n})</td>
        </tr>
    `;

    data.push({
        x: x,
        y: m * x + n,
    });

    console.log(data);

    ConseguirXAfin();
}

function ConseguirXLineal() {
    div_contenido.innerHTML = `
        <h2>Función seleccionada: Función Lineal</h2>
        <h2>Ecuación tipo: y = mx</h2>
        <label>Ahora introduce el valor de entrada (x): <input type="number" id="input_valor_de_entrada"></label>
        <br><br>
        <button onclick="AnadirALaTablaDeValoresLineal()">Añadir a la tabla de valores</button>
    `;
}

function ConseguirXAfin() {
    div_contenido.innerHTML = `
        <h2>Función seleccionada: Función Afín</h2>
        <h2>Ecuación tipo: y = mx + n</h2>
        <label>Ahora introduce el valor de entrada (x): <input type="number" id="input_valor_de_entrada"></label>
        <br><br>
        <button onclick="AnadirALaTablaDeValoresAfin()">Añadir a la tabla de valores</button>
    `;
}

function SeleccionarPendiente() {
    let input_pendiente = parseInt(document.getElementById('input_pendiente').value);
    m = input_pendiente;
    ConseguirXLineal();
}

function SeleccionarPendienteYOrdenada() {
    let input_pendiente = parseInt(document.getElementById('input_pendiente').value);
    let input_ordenada_en_el_origen = parseInt(document.getElementById('input_ordenada_en_el_origen').value);
    m = input_pendiente;
    n = input_ordenada_en_el_origen;
    ConseguirXAfin();
}


function Lineal() {
    div_contenido.innerHTML = `
        <h2>Función seleccionada: Función Lineal</h2>
        <h2>Ecuación tipo: y = mx</h2>
        <br>
        <label>Introduce la pendiente (m): <input type="number" id="input_pendiente"></label>
        <br><br>
        <button onclick="SeleccionarPendiente()">Seleccionar esta pendiente</button>
    `;
}

function Afin() {
    div_contenido.innerHTML = `
        <h2>Función seleccionada: Función Afín</h2>
        <h2>Ecuación tipo: y = mx + n</h2>
        <br>
        <label>Introduce la pendiente (m): <input type="number" id="input_pendiente"></label>
        <br>
        <br>
        <label>Introduce la ordenada en el origen (n): <input type="number" id="input_ordenada_en_el_origen"></label>
        <br><br>
        <button onclick="SeleccionarPendienteYOrdenada()">Seleccionar esta pendiente y ordenada</button>
    `;
}

function Pdf() {
    window.print();
}
