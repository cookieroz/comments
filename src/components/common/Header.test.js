import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Header from './Header';

let container = null;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("renders logo", () => {
	act(() => {
		render(<Header />, container);
	});

	expect(
		container.querySelector('.header__logo img').getAttribute("alt")
	).toEqual("logo image");
});
