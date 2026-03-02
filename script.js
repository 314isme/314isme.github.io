(() => {
  "use strict";

  const KONAMI = [
    "ArrowUp","ArrowUp",
    "ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight",
    "ArrowLeft","ArrowRight",
    "KeyB","KeyA"
  ];

  const headerEl = document.getElementById("code-header");
  const mainEl = document.getElementById("code-main");
  const tpl = document.getElementById("links-template");

  function span(cls, text) {
    const s = document.createElement("span");
    s.className = cls;
    s.textContent = text;
    return s;
  }

  function line(parts, cls="") {
    const p = document.createElement("p");
    if (cls) p.className = cls;
    parts.forEach(part => {
      if (typeof part === "string") p.appendChild(document.createTextNode(part));
      else p.appendChild(part);
    });
    return p;
  }

  function getLinks() {
    return Array.from(tpl.content.querySelectorAll("a")).map(a => ({
      name: a.textContent,
      anchor: a.cloneNode(true)
    }));
  }

  function sym(name) {
    let s = name.replace(/[^A-Za-z0-9]/g, "_");
    if (/^\d/.test(s)) s = "_" + s;
    return "link_" + s;
  }

  function asmHeader() {
    const root = document.createElement("div");

    root.appendChild(line([span("keyword","bits")," ",span("type","64")]));
    root.appendChild(line([span("keyword","default")," ",span("highlight","rel")]));
    root.appendChild(line([""]));
    root.appendChild(line([span("keyword","global")," ",span("highlight","links")]));
    root.appendChild(line([span("keyword","global")," ",span("highlight","LINK_COUNT")]));
    root.appendChild(line([""]));
    root.appendChild(line([span("keyword","section")," ",span("quote",".rodata")]));
    root.appendChild(line([""]));

    root.appendChild(line([span("highlight","links:")]));
    root.appendChild(line([span("keyword","align")," ",span("type","8")],"indent"));

    const links = getLinks();

    links.forEach(l => {
      root.appendChild(line([span("keyword","dq")," ",span("highlight",sym(l.name))],"indent"));
    });

    root.appendChild(line([span("highlight","links_end:")]));
    root.appendChild(line([""]));

    links.forEach(l => {
      root.appendChild(line([span("highlight",sym(l.name)+":")]));
      l.anchor.textContent = `"${l.name}"`;
      root.appendChild(line([
        span("keyword","db")," ",
        l.anchor,", ",
        span("type","0")
      ],"indent"));
    });

    root.appendChild(line([""]));
    root.appendChild(line([
      span("highlight","LINK_COUNT"),
      " ",
      span("keyword","equ"),
      " ",
      span("type","(links_end - links) / 8")
    ]));

    root.appendChild(line([""]));
    root.appendChild(line([
      span("type",">"),
      " vim main.asm",
      span("blink","_")
    ],"cursor-line"));

    headerEl.replaceChildren(root);
  }

  function asmMain() {
    const root = document.createElement("div");

    root.appendChild(line([span("keyword","bits")," ",span("type","64")]));
    root.appendChild(line([span("keyword","default")," ",span("highlight","rel")]));
    root.appendChild(line([""]));
    root.appendChild(line([span("keyword","global")," ",span("highlight","_start")]));
    root.appendChild(line([span("keyword","section")," ",span("quote",".text")]));
    root.appendChild(line([""]));

    root.appendChild(line([span("highlight","_start:")]));
    root.appendChild(line([span("keyword","mov")," ",span("type","rax"),", ",span("type","1")],"indent"));
    root.appendChild(line([span("keyword","mov")," ",span("type","rdi"),", ",span("type","1")],"indent"));
    root.appendChild(line([span("keyword","lea")," ",span("type","rsi"),", ",span("highlight","[rel msg]")],"indent"));
    root.appendChild(line([span("keyword","mov")," ",span("type","rdx"),", ",span("highlight","msg_len")],"indent"));
    root.appendChild(line([span("keyword","syscall")],"indent"));
    root.appendChild(line([span("keyword","mov")," ",span("type","rax"),", ",span("type","60")],"indent"));
    root.appendChild(line([span("keyword","xor")," ",span("type","rdi"),", ",span("type","rdi")],"indent"));
    root.appendChild(line([span("keyword","syscall")],"indent"));
    root.appendChild(line([""]));

    root.appendChild(line([span("keyword","section")," ",span("quote",".rodata")]));
    root.appendChild(line([span("highlight","msg:")]));
    root.appendChild(line([
      span("keyword","db"),
      " ",
      span("",'"ドットと申します。 ASMプログラマー\\n"'),
      ", ",
      span("type","0")
    ],"indent"));
    root.appendChild(line([
      span("highlight","msg_len"),
      " ",
      span("keyword","equ"),
      " ",
      span("type","$ - msg")
    ]));

    mainEl.replaceChildren(root);
  }

function cHeader() {
  const root = document.createElement("div");

  root.appendChild(line([
    span("keyword","#ifndef"),
    " ",
    span("highlight","LINKS_H")
  ]));

  root.appendChild(line([
    span("keyword","#define"),
    " ",
    span("highlight","LINKS_H")
  ]));

  root.appendChild(line([""]));

  root.appendChild(line([
    span("keyword","static"),
    " ",
    span("keyword","const"),
    " ",
    span("type","char"),
    " *",
    span("highlight","links"),
    "[] = {"
  ]));

  const links = getLinks();
  links.forEach(l => {
    l.anchor.textContent = `"${l.name}",`;
    root.appendChild(line([l.anchor],"indent"));
  });

  root.appendChild(line(["};"]));

  root.appendChild(line([
    span("keyword","#define"),
    " ",
    span("highlight","LINK_COUNT"),
    " ",
    span("type","12")
  ]));

  root.appendChild(line([
    span("keyword","#endif")
  ]));

  root.appendChild(line([""]));

  root.appendChild(line([
    span("type",">"),
    " vim main.c",
    span("blink","_")
  ],"cursor-line"));

  headerEl.replaceChildren(root);
}

function cMain() {
  const root = document.createElement("div");

  root.appendChild(line([
    span("keyword","#include"),
    " ",
    span("quote","\"links.h\"")
  ]));

  root.appendChild(line([""]));

  root.appendChild(line([
    span("keyword","int"),
    " ",
    span("highlight","main"),
    "(",
    span("keyword","void"),
    ") {"
  ]));

  root.appendChild(line([
    span("highlight","printf"),
    "(",
    span("",'"ドットと申します。 ASMとCプログラマー\\n"'),
    ");"
  ],"indent"));

  root.appendChild(line([
    span("keyword","return"),
    " ",
    span("type","0"),
    ";"
  ],"indent"));

  root.appendChild(line(["}"]));

  mainEl.replaceChildren(root);
}

  const MODES = ["C","ASM"];
  let mode = 0;
  let idx = 0;

  function render() {
    document.title = `。 (${MODES[mode]})`;
    if (MODES[mode] === "ASM") {
      asmHeader();
      asmMain();
    } else {
      cHeader();
      cMain();
    }
  }

  function next() {
    mode = (mode + 1) % MODES.length;
    render();
  }

  render();

  window.addEventListener("keydown", e => {
    if (e.code === KONAMI[idx]) {
      idx++;
      if (idx === KONAMI.length) {
        next();
        idx = 0;
      }
    } else {
      idx = e.code === KONAMI[0] ? 1 : 0;
    }
  });
})();