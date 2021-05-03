"use strict";

const template = document.querySelector("template");

const content = template.content.cloneNode(true);

document.body.append(content);