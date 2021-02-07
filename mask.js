const mask = (selector) => {
	const setCursorPosition = (pos, elem) => {
		elem.focus();
		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			let range = elem.createTextRange();
			range.collapse(true);
			range.moveStart("charecter", pos);
			range.moveEnd("charecter", pos);
			range.select();
		}
	};

	function createMask(event) {
		let i = 0;
		let val = this.value.replace(/\D/g, "");
		const matrix = "+7 (___) __ __ ___";
		const def = matrix.replace(/\D/g, "");
		if (val.length <= def.length) {
			val = def;
		}

		this.value = matrix.replace(/./g, function (a) {
			if (/[_\d]/.test(a) && i < val.length) {
				console.log(val);
				return val.charAt(i++);
			} else if (i >= val.length) {
				return "";
			} else {
				return a;
			}
		});

		if (event.type == "blur") {
			if (this.value.length == 2) {
				this.value = "";
			} else {
				setCursorPosition(this.value.length, this);
			}
		}
	}

	let inputs = document.querySelectorAll(selector);
	inputs.forEach((item) => {
		item.addEventListener("input", createMask);
		item.addEventListener("focus", createMask);
		item.addEventListener("blur", createMask);
	});
};

export default mask;
