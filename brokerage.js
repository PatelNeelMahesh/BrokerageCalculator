	var bp, sp, qty = 0;
	var ecn_counter = 0;
	var comm_ecn_counter = 0;
	var sample_ecn_counter = 0;

	cal_intra();
	cal_delivery();
	cal_etf_intra();
	cal_etf_delivery();

	function cal_etf_delivery(){
		bp = parseFloat(parseFloat(document.getElementsByClassName("del_etf_bp")[0].value).toFixed(2));
		sp = parseFloat(parseFloat(document.getElementsByClassName("del_etf_sp")[0].value).toFixed(2));
		qty = parseFloat(parseFloat(document.getElementsByClassName("del_etf_qty")[0].value).toFixed(2));

		if (isNaN(qty) || (isNaN(bp) && isNaN(sp))) {
			var elements = document.querySelector("#delivery-etf-equity-calc").querySelectorAll(".valuation-block");
			for (var i = 0; i < elements.length; i++) {
				elements[i].querySelector("span").innerHTML = 0
			}
			document.getElementById("del_etf_pnl").innerHTML = 0;
			return;
		}
		if (isNaN(bp) || bp == 0) {
			bp = 0;
			bse_tran_charge_buy = 0;
		}
		if (isNaN(sp) || sp == 0) {
			sp = 0;
			bse_tran_charge_sell = 0;
		}

		var turnover = parseFloat(parseFloat((bp+sp)*qty).toFixed(2));

		var brokerage = 0;

		var dp_charges = 15.93;

		var stt_total = Math.round(parseFloat(parseFloat(turnover * 0).toFixed(2)));

		var exc_trans_charge = (document.getElementsByClassName("del_etf_nse")[0].checked) ? parseFloat(parseFloat(0.0000345*turnover).toFixed(2)):parseFloat(parseFloat(0.0000345*turnover).toFixed(2));
		var cc = 0;

		var stax = parseFloat(parseFloat(0.18 * (brokerage + exc_trans_charge)).toFixed(2));
 
		var sebi_charges = parseFloat(parseFloat(turnover*0.000001).toFixed(2));

		var stamp_charges = parseFloat(parseFloat(bp*qty*0.00015).toFixed(2));

		var total_tax = parseFloat(parseFloat(dp_charges + brokerage + stt_total + exc_trans_charge + cc + stax + sebi_charges + stamp_charges).toFixed(2));

		var breakeven = parseFloat(parseFloat(total_tax / qty).toFixed(2));
		breakeven = isNaN(breakeven) ? 0 : breakeven

		var net_profit = parseFloat(parseFloat(((sp - bp) * qty) - total_tax).toFixed(2));

		document.querySelector("#del_etf_turn").innerHTML = turnover;
		document.querySelector("#del_etf_brokerage").innerHTML = brokerage;
		document.querySelector("#del_etf_stt").innerHTML = stt_total;
		document.querySelector("#del_etf_etc").innerHTML = exc_trans_charge;
		document.querySelector("#del_etf_cc").innerHTML = cc;
		document.querySelector("#del_etf_st").innerHTML = stax;
		document.querySelector("#etf_sebi_delivery").innerHTML = sebi_charges;
		document.querySelector("#etf_stamp_duty_delivery").innerHTML = stamp_charges;
		document.querySelector("#del_etf_total").innerHTML = total_tax;
		document.querySelector("#del_etf_breakeven").innerHTML = breakeven;
		document.querySelector("#del_etf_pnl").innerHTML = net_profit;
		if (parseFloat(net_profit) > 0) {
			document.querySelector("#del_etf_pnl").classList.remove("neg")
			document.querySelector("#del_etf_pnl").classList.add("pos")
		} else {
			document.querySelector("#del_etf_pnl").classList.remove("pos")
			document.querySelector("#del_etf_pnl").classList.add("neg")
		}
	}	

	function cal_etf_intra(){
		bp = parseFloat(parseFloat(document.getElementsByClassName("intra_etf_bp")[0].value).toFixed(2));
		sp = parseFloat(parseFloat(document.getElementsByClassName("intra_etf_sp")[0].value).toFixed(2));
		qty = parseFloat(parseFloat(document.getElementsByClassName("intra_etf_qty")[0].value).toFixed(2));

		if (isNaN(qty) || (isNaN(bp) && isNaN(sp))) {
			var elements = document.querySelector("#intraday-etf-equity-calc").querySelectorAll(".valuation-block");
			for (var i = 0; i < elements.length; i++) {
				elements[i].querySelector("span").innerHTML = 0;
			}
			document.getElementById("intra_etf_pnl").innerHTML = 0;
			return;
		}
		if (isNaN(bp) || bp == 0) {
			bp = 0;
			bse_tran_charge_buy = 0;
		}
		if (isNaN(sp) || sp == 0) {
			sp = 0;
			bse_tran_charge_sell = 0;
		}
		var brokerage_buy = ((bp * qty * 0.0003)>20) ? 20:parseFloat(parseFloat(bp * qty * 0.0003).toFixed(2));
		var brokerage_sell = ((sp * qty * 0.0003)>20) ? 20:parseFloat(parseFloat(sp * qty * 0.0003).toFixed(2));
		var brokerage = parseFloat(parseFloat(brokerage_buy + brokerage_sell).toFixed(2));

		var turnover = parseFloat(parseFloat((bp+sp)*qty).toFixed(2));

		var stt_total = Math.round(parseFloat(parseFloat((sp * qty) * 0).toFixed(2)));

		var exc_trans_charge = (document.getElementsByClassName("intra_nse_etf")[0].checked) ? parseFloat(parseFloat(0.0000345*turnover).toFixed(2)) : parseFloat(parseFloat(0.0000345*turnover).toFixed(2));
		var cc = 0;

		var stax = parseFloat(parseFloat(0.18 * (brokerage + exc_trans_charge)).toFixed(2));

		var sebi_charges = parseFloat(parseFloat(turnover*0.000001).toFixed(2));

		var stamp_charges = parseFloat(parseFloat((bp*qty)*0.00003).toFixed(2));

		var total_tax = parseFloat(parseFloat(brokerage + stt_total + exc_trans_charge + cc + stax + sebi_charges + stamp_charges).toFixed(2));

		var breakeven = parseFloat(parseFloat(total_tax / qty).toFixed(2));
		breakeven = isNaN(breakeven) ? 0 : breakeven

		var net_profit = parseFloat(parseFloat(((sp - bp) * qty) - total_tax).toFixed(2));

		document.querySelector("#intra_etf_turn").innerHTML = turnover;
		document.querySelector("#intra_etf_brokerage").innerHTML = brokerage;
		document.querySelector("#intra_etf_stt").innerHTML = stt_total;
		document.querySelector("#intra_etf_etc").innerHTML = exc_trans_charge;
		document.querySelector("#intra_etf_cc").innerHTML = cc;
		document.querySelector("#intra_etf_st").innerHTML = stax;
		document.querySelector("#etf_sebi").innerHTML = sebi_charges;
		document.querySelector("#etf_stamp_duty").innerHTML = stamp_charges;
		document.querySelector("#intra_etf_total").innerHTML = total_tax;
		document.querySelector("#intra_etf_breakeven").innerHTML = breakeven;
		document.querySelector("#intra_etf_pnl").innerHTML = net_profit;
		if (parseFloat(net_profit) > 0) {
			document.querySelector("#intra_etf_pnl").classList.remove("neg")
			document.querySelector("#intra_etf_pnl").classList.add("pos")
		} else {
			document.querySelector("#intra_etf_pnl").classList.remove("pos")
			document.querySelector("#intra_etf_pnl").classList.add("neg")
		}
	}

	function cal_intra(){
		bp = parseFloat(parseFloat(document.getElementsByClassName("intra_bp")[0].value).toFixed(2));
		sp = parseFloat(parseFloat(document.getElementsByClassName("intra_sp")[0].value).toFixed(2));
		qty = parseFloat(parseFloat(document.getElementsByClassName("intra_qty")[0].value).toFixed(2));

		if (isNaN(qty) || (isNaN(bp) && isNaN(sp))) {
			var elements = document.querySelector("#intraday-equity-calc").querySelectorAll(".valuation-block");
			for (var i = 0; i < elements.length; i++) {
				elements[i].querySelector("span").innerHTML = 0;
			}
			document.getElementById("intra_pnl").innerHTML = 0;
			return;
		}
		if (isNaN(bp) || bp == 0) {
			bp = 0;
			bse_tran_charge_buy = 0;
		}
		if (isNaN(sp) || sp == 0) {
			sp = 0;
			bse_tran_charge_sell = 0;
		}
		var brokerage_buy = ((bp * qty * 0.0003)>20) ? 20:parseFloat(parseFloat(bp * qty * 0.0003).toFixed(2));
		var brokerage_sell = ((sp * qty * 0.0003)>20) ? 20:parseFloat(parseFloat(sp * qty * 0.0003).toFixed(2));
		var brokerage = parseFloat(parseFloat(brokerage_buy + brokerage_sell).toFixed(2));

		var turnover = parseFloat(parseFloat((bp+sp)*qty).toFixed(2));

		var stt_total = Math.round(parseFloat(parseFloat((sp * qty) * 0.00025).toFixed(2)));

		var exc_trans_charge = (document.getElementsByClassName("intra_nse")[0].checked) ? parseFloat(parseFloat(0.0000345*turnover).toFixed(2)) : parseFloat(parseFloat(0.0000345*turnover).toFixed(2));
		var cc = 0;

		var stax = parseFloat(parseFloat(0.18 * (brokerage + exc_trans_charge)).toFixed(2));

		var sebi_charges = parseFloat(parseFloat(turnover*0.000001).toFixed(2));

		var stamp_charges = parseFloat(parseFloat((bp*qty)*0.00003).toFixed(2));

		var total_tax = parseFloat(parseFloat(brokerage + stt_total + exc_trans_charge + cc + stax + sebi_charges + stamp_charges).toFixed(2));

		var breakeven = parseFloat(parseFloat(total_tax / qty).toFixed(2));
		breakeven = isNaN(breakeven) ? 0 : breakeven

		var net_profit = parseFloat(parseFloat(((sp - bp) * qty) - total_tax).toFixed(2));

		document.querySelector("#intra_turn").innerHTML = turnover;
		document.querySelector("#intra_brokerage").innerHTML = brokerage;
		document.querySelector("#intra_stt").innerHTML = stt_total;
		document.querySelector("#intra_etc").innerHTML = exc_trans_charge;
		document.querySelector("#intra_cc").innerHTML = cc;
		document.querySelector("#intra_st").innerHTML = stax;
		document.querySelector("#sebi").innerHTML = sebi_charges;
		document.querySelector("#stamp_duty").innerHTML = stamp_charges;
		document.querySelector("#intra_total").innerHTML = total_tax;
		document.querySelector("#intra_breakeven").innerHTML = breakeven;
		document.querySelector("#intra_pnl").innerHTML = net_profit;
		if (parseFloat(net_profit) > 0) {
			document.querySelector("#intra_pnl").classList.remove("neg")
			document.querySelector("#intra_pnl").classList.add("pos")
		} else {
			document.querySelector("#intra_pnl").classList.remove("pos")
			document.querySelector("#intra_pnl").classList.add("neg")
		}
	}

	function cal_delivery(){
		bp = parseFloat(parseFloat(document.getElementsByClassName("del_bp")[0].value).toFixed(2));
		sp = parseFloat(parseFloat(document.getElementsByClassName("del_sp")[0].value).toFixed(2));
		qty = parseFloat(parseFloat(document.getElementsByClassName("del_qty")[0].value).toFixed(2));

		if (isNaN(qty) || (isNaN(bp) && isNaN(sp))) {
			var elements = document.querySelector("#delivery-equity-calc").querySelectorAll(".valuation-block");
			for (var i = 0; i < elements.length; i++) {
				elements[i].querySelector("span").innerHTML = 0
			}
			document.getElementById("del_pnl").innerHTML = 0;
			return;
		}
		if (isNaN(bp) || bp == 0) {
			bp = 0;
			bse_tran_charge_buy = 0;
		}
		if (isNaN(sp) || sp == 0) {
			sp = 0;
			bse_tran_charge_sell = 0;
		}

		var turnover = parseFloat(parseFloat((bp+sp)*qty).toFixed(2));

		var brokerage = 0;

		var dp_charges = 15.93;

		var stt_total = Math.round(parseFloat(parseFloat(turnover * 0.001).toFixed(2)));

		var exc_trans_charge = (document.getElementsByClassName("del_nse")[0].checked) ? parseFloat(parseFloat(0.0000345*turnover).toFixed(2)):parseFloat(parseFloat(0.0000345*turnover).toFixed(2));
		var cc = 0;

		var stax = parseFloat(parseFloat(0.18 * (brokerage + exc_trans_charge)).toFixed(2));
 
		var sebi_charges = parseFloat(parseFloat(turnover*0.000001).toFixed(2));

		var stamp_charges = parseFloat(parseFloat(bp*qty*0.00015).toFixed(2));

		var total_tax = parseFloat(parseFloat(dp_charges + brokerage + stt_total + exc_trans_charge + cc + stax + sebi_charges + stamp_charges).toFixed(2));

		var breakeven = parseFloat(parseFloat(total_tax / qty).toFixed(2));
		breakeven = isNaN(breakeven) ? 0 : breakeven

		var net_profit = parseFloat(parseFloat(((sp - bp) * qty) - total_tax).toFixed(2));

		document.querySelector("#del_turn").innerHTML = turnover;
		document.querySelector("#del_brokerage").innerHTML = brokerage;
		document.querySelector("#del_stt").innerHTML = stt_total;
		document.querySelector("#del_etc").innerHTML = exc_trans_charge;
		document.querySelector("#del_cc").innerHTML = cc;
		document.querySelector("#del_st").innerHTML = stax;
		document.querySelector("#sebi_delivery").innerHTML = sebi_charges;
		document.querySelector("#stamp_duty_delivery").innerHTML = stamp_charges;
		document.querySelector("#del_total").innerHTML = total_tax;
		document.querySelector("#del_breakeven").innerHTML = breakeven;
		document.querySelector("#del_pnl").innerHTML = net_profit;
		if (parseFloat(net_profit) > 0) {
			document.querySelector("#del_pnl").classList.remove("neg")
			document.querySelector("#del_pnl").classList.add("pos")
		} else {
			document.querySelector("#del_pnl").classList.remove("pos")
			document.querySelector("#del_pnl").classList.add("neg")
		}
	}

	


