"use strict";

const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const palo = ["bastos", "oros", "copas", "espadas"];

var user = "";
var dinero = 100;
var baraja = [];
var puntosCliente = 0;
var puntosBanca = 0;
var orden = 0;
var apuesta = 0;

$(document).ready(function() {
	$("#numero").attr("max", dinero);

	$("#empezar").on("click", function() {
		user = $("#nombre").val();
		if (user != "") {
			$("section").css("display", "flex");
			$("header").css("display", "none");
			$("#cliente #perfil h2").text(user);
		}

	})

	$("#total").text(dinero + "€");

	crearBaraja();

	$("#pedir").on("click", function() {
		let carta = baraja[orden];
		// console.log(carta.valor);
		resultadoC(carta.valor);

		$("#cartasC").append("<img src='cartas/" + carta.tipo + "/" + carta.valor +
			".jpg' alt='" + carta.valor + "'/>");

		$("#pCliente").text(puntosCliente);

		orden++;
		if (puntosCliente > 7.5) {
			bloqueo();
			comprobar("Ha ganado la banca");
		}
	})

	$("#retirada").on("click", function() {

		bloqueo();

		while (puntosBanca < puntosCliente) {

			let carta = baraja[orden];

			resultadoB(carta.valor);
			// console.log(carta.valor);
			$("#cartasB").append("<img src='cartas/" + carta.tipo + "/" + carta.valor +
				".jpg' alt='" + carta.valor + "'/>");

			$("#pBanca").text(puntosBanca);

			orden++;

		}

		if (puntosBanca == puntosCliente && puntosBanca < 7.5) {
			let carta = baraja[orden];

			resultadoB(carta.valor);
			// console.log(carta.valor);
			$("#cartasB").append("<img src='cartas/" + carta.tipo + "/" + carta.valor +
				".jpg' alt='" + carta.valor + "'/>");

			$("#pBanca").text(puntosBanca);

			orden++;

		}

		if (puntosBanca > 7.5) {
			comprobar(user + " ha ganado");
			dinero = dinero + apuesta * 2;
			$("#total").text(dinero + "€");
		} else if (puntosBanca == puntosCliente) {
			comprobar("Empate, el dinero es para la banca");
			dinero = dinero + apuesta;
		} else if (puntosBanca > puntosCliente) {
			comprobar("Ha ganado la banca");
		}

	})

	$("#reiniciar input").on("click", function() {
		puntosBanca = 0;
		$("#pBanca").text(puntosBanca);
		puntosCliente = 0;
		$("#pCliente").text(puntosCliente);
		orden = 0;
		$("#cartasC").empty();
		$("#cartasB").empty()
		barajar();
		$("#subir input:button").attr("disabled", false);
		$("#final").css("display", "none");
		$("#reiniciar input").attr("disabled", true);
		$("#numero").attr("disabled", false);
		$("#numero").attr("max", dinero);
	});

	$("#subir input:button").on("click", function() {
		if ($("#numero").val() == 0) {
			console.log($("#numero").val());
		} else {
			$("#apuestas input").attr("disabled", false);
			$("#subir input:button").attr("disabled", true);
			$("#numero").attr("disabled", true);
			apuesta = $("#numero").val();
			dinero = dinero - apuesta;
			$("#total").text(dinero + "€");
			$("#apo").text("Dinero apostado: " + apuesta + "€");
		}
		// console.log("apuesta= "+apuesta);
	});

});


/**
 * Crea el array de objetos cartas
 * @return {Array} Object
 */
function crearBaraja() {

	for (let c of valores) {
		for (let p of palo) {
			var carta = {
				valor: c,
				tipo: p
			}
			baraja.push(carta);
		}
	}

	barajar();

}

/**
 * Desordenar cartas
 * @return {Array} objects carta
 */
function barajar() {

	baraja = baraja.sort(function() {
		return Math.random() - 0.5
	});
	// console.log(baraja);
}

/**
 * Resultado del cliente
 * @param  {int} valor int
 * @return {int}       int
 */
function resultadoC(valor) {
	console.log("funcion resultado");
	console.log(valor);
	if (valor > 7) {
		puntosCliente += 0.5;
	} else {
		puntosCliente += valor;
	}

}

/**
 * resultado de la banca
 * @param  {int} valor int
 * @return {int}       int
 */
function resultadoB(valor) {
	console.log("funcion resultado");
	console.log(valor);
	if (valor > 7) {
		puntosBanca += 0.5;
	} else {
		puntosBanca += valor;
	}

}
/**
 * Bloquear botones del cliente
 */
function bloqueo() {
	$("#apuestas input").attr("disabled", true);
}

/**
 * Muestra quien gana o pierde
 * @param  {String} texto string
 */
function comprobar(texto) {
	$("#final").css("display", "flex");
	$("#resultado").html("<h2>" + texto + "</h2>");
	$("#reiniciar input").attr("disabled", false);
}