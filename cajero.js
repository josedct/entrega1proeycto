//Defino el objeto Cuenta
class Cuenta{
    constructor(numCuenta, nip, saldo){
        this.numCuenta = numCuenta
        this.nip = nip
        this.saldo = saldo
    }

    //metodo que devuelve el saldo actual
    verSaldo(){
        return this.saldo
    }

    //metodo que devuelve el nip
    verNip(){
        return this.nip
    }

    //metodo que devuelve el numero de cuenta
    verNumCuenta(){
        return this.numCuenta
    }

    //metodo que realiza un retiro en el saldo actual y lo actualiza
    retirarSaldo(cantidad){
        this.saldo = this.saldo - cantidad
    }
    
    //metodo que realiza un deposito en el saldo actual y lo actualiza
    depositarSaldo(cantidad){
        this.saldo = this.saldo + cantidad
    }
}

//defino el objeto Movimiento, que registrara cualquier moviemiento en la cuenta
class Movimiento{
    constructor(numCuenta, tipo, fecha, monto){
        this.numCuenta = numCuenta
        this.tipo = tipo
        this.fecha = fecha
        this.monto = monto
    }
    
    //metodo para mostrar los datos del movimiento
    verMovimiento(){
        return this.numCuenta+" "+this.tipo+" "+this.fecha+" "+this.monto
    }
}



//Creo varios objetos cuenta en un array
const Cuentas = []
Cuentas.push(new Cuenta(45261623, 1258, 10000))
Cuentas.push(new Cuenta(64165234, 2589, 30000))
Cuentas.push(new Cuenta(62215473, 2569, 25608))

//Creo un arreglo para registrar los moviemientos de la cuenta elegida
const Movimientos = []

// variable que guarda la opcion del menu elegida
let opc = 0

// variables del dom
//let operaciones = document.querySelector(".operaciones ul")
//let li = document.createElement("li")

//funcion para obtener la fecha actual
function fechaActual(){
    let fecha = new Date()
    let fechaRegistro = fecha.getDay()+"-"+fecha.getMonth()+"-"+fecha.getFullYear()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
    return fechaRegistro
}



//funcion para buscar una cuenta en particular
function findCuenta(uTarjeta, uNip){
    let cont = -1
    for (const cuen of Cuentas) {
        cont = cont + 1
        if(cuen.verNumCuenta() == uTarjeta && cuen.verNip() == uNip){
            return cont
        }
    }
    return -1
}

//funcion que simula el funcionamiento basico de un cajero
function simulaCajero(){
    let usuarioTarjeta = prompt("Ingresa los 8 dígitos de tu tarjeta:\n")
    let usuarioNip = prompt("Ingresa el NIP de tu tarjeta:\n")
    let indCuenta = findCuenta(usuarioTarjeta,usuarioNip)
    let moviString = ""
    let operaciones = document.querySelector(".operaciones ul")
    let li
    if (indCuenta > -1) {
    li = document.createElement("li")
        do{
            li = document.createElement("li")
            opc = Number(prompt("Cuenta::"+ Cuentas[indCuenta].verNumCuenta() +"\nMenu principal\n [ 1 ] Ver saldo\n [ 2 ] Depositar\n [ 3 ] Retirar\n [ 4 ] Ver movimientos\n [ 5 ]Salir\nEscriba el numero de la opción que desea:\n"))
            while(opc < 1 || opc > 5){
                opc = prompt("Cuenta::"+ Cuentas[indCuenta].verNumCuenta() +"\nMenu principal\n *** Error ingrese una opción valida ***\n [ 1 ] Ver saldo\n [ 2 ] Depositar\n [ 3 ] Retirar\n [ 4 ] Ver movimientos\n [ 5 ] Salir\nEscriba el numero de la opción que desea:\n")
            }
            switch(opc){
                case 1:
                    //Muestra el saldo actual
                    alert("Saldo disponible: $" + Cuentas[indCuenta].verSaldo())
                    li.innerHTML = "Saldo disponible: $" + Cuentas[indCuenta].verSaldo()
                    operaciones.appendChild(li)
                    break
                case 2:
                    //realiza un deposito y muestra el movimiento
                    let deposito = Number(prompt("Ingrese el saldo a depositar:\n"))
                    Cuentas[indCuenta].depositarSaldo(deposito)
                    Movimientos.push(new Movimiento(Cuentas[indCuenta].verNumCuenta(),"Deposito", fechaActual(), "$"+deposito))
                    alert("Saldo Anterior:$"+(Cuentas[indCuenta].verSaldo()-deposito)+"\nDeposito:$"+deposito+"\nSaldo Actual:$"+Cuentas[indCuenta].verSaldo())
                    li.innerHTML = "Saldo Anterior:$"+(Cuentas[indCuenta].verSaldo()-deposito)+"\nDeposito:$"+deposito+"\nSaldo Actual:$"+Cuentas[indCuenta].verSaldo()
                    operaciones.appendChild(li)
                    break
                case 3:
                    //realiza un retiro y muestra el movimiento
                    let retiro = Number(prompt("Ingrese el saldo a retirar:\n"))
                    Cuentas[indCuenta].retirarSaldo(retiro)
                    Movimientos.push(new Movimiento(Cuentas[indCuenta].verNumCuenta(),"Retiro", fechaActual(), "$"+retiro))
                    alert("Saldo Anterior:$"+(Cuentas[indCuenta].verSaldo()+retiro)+"\nRetiro:$"+retiro+"\nSaldo Actual:$"+Cuentas[indCuenta].verSaldo())
                    li.innerHTML = "Saldo Anterior:$"+(Cuentas[indCuenta].verSaldo()+retiro)+"\nRetiro:$"+retiro+"\nSaldo Actual:$"+Cuentas[indCuenta].verSaldo()
                    operaciones.appendChild(li)
                    break
                case 4:
                    if(Movimientos.length > 0){
                        for (const movi of Movimientos) {
                            moviString = moviString + movi.verMovimiento()+"\n"
                        }
                        alert("Historial de movimientos:\n"+moviString)
                        li.innerHTML = "Historial de movimientos:\n"+moviString
                        operaciones.appendChild(li)
                    }else{
                        alert("Historial de movimientos:\nSin movimientos")
                        li.innerHTML = "Historial de movimientos:\nSin movimientos"
                        operaciones.appendChild(li)
                    }
                    break
            }
        }while(opc != 5);
        alert("Gracias por usar nuestro cajero\nVuelva pronto")  
        li.innerHTML = "Gracias por usar nuestro cajero\nVuelva pronto"
        operaciones.appendChild(li) 
    } else {
        alert("Usuario no reconocido, recargue e intente nuevamente")
        li.innerHTML = "Usuario no reconocido, recargue e intente nuevamente"
        operaciones.appendChild(li) 
    }
    moviString = ""
    Movimientos.splice(0,Movimientos.length)
}

let actSimu = document.querySelector(".iniSimu")
actSimu.onclick = simulaCajero