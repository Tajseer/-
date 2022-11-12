const li = Array.prototype.slice.call(document.getElementsByClassName("page"));
window.addEventListener("load", () => {
  interactive("الفهرس", "", true, false, true);
});
const savHandler = (isSave) => {
  let c = 0;
  let arr = [];
  li.forEach((el) => {
    if (isSave) {
      // arr.push(el.innerHTML);
      // let obj = { el: el.innerHTML };

      // console.log(obj.el);
      arr.push(el.innerHTML);
      localStorage.setItem(`new`, JSON.stringify(arr));
      // for (let i = 0; i < arr.length; i++) {
      // }
    } else {
      let saved = JSON.parse(localStorage.getItem(`new`));

      if (saved !== null) {
        // console.log(saved);
        for (let i = 0; i < saved.length; i++) {
          li[i].innerHTML = saved[i];
        }
      }
    }
    c++;
  });
};
const closeDiv = () => {
  document
    .getElementsByClassName("currentPageDiv")[0]
    .classList.remove("height");
  localStorage.setItem("current-page", 0);
  console.log("0 from main");
};
const moveToCurrentPage = () => {
  let currentPage = localStorage.getItem("current-page");
  if (currentPage != 0 && localStorage.getItem("state") === "false") {
    window.top.nav.to(currentPage);
    document
      .getElementsByClassName("currentPageDiv")[0]
      .classList.remove("height");
  }
};

if (localStorage.getItem("current-page")) {
  if (
    localStorage.getItem("current-page") == 0 ||
    localStorage.getItem("current-page") == "null"
  ) {
    document
      .getElementsByClassName("currentPageDiv")[0]
      .classList.remove("height");
  } else {
    document
      .getElementsByClassName("currentPageDiv")[0]
      .classList.add("height");
  }
}

const savedVersion = window.localStorage.getItem("new");
if (savedVersion) {
  savHandler(false);
}

let btn = document.querySelector(".edit-tools").querySelectorAll(".nav-link");
let ls = document.querySelectorAll(".link");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

function setTitle() {
  const navs = document.querySelector("nav");
  for (let i = 0; i < btn.length; i++) {
    let t = [
      "إزالة التمييز",
      "تمييز",
      "إضافة ملاحظة",
      "بحث في جوجل",
      "بحث في ويكيبيديا",
      "الصفحات المميزة",
      "الفهرس",
    ];
    btn[i].setAttribute("title", t[i]);
  }
}
window.onload = setTitle;
window.onresize = setTitle;

let selRange = null;
let sel = null;
let h = false;
let g = false;
let w = false;
let isHl = false;
let timer = null;
const editTools = document.querySelector(".edit-tools");

const select = (isTouch) => {
  sel = window.getSelection();
  selRange = sel.toString().trim();
  // timer = setInterval(selRange, 1050);
  if (selRange && !isTouch) {
    let rect = sel.getRangeAt(0).getBoundingClientRect();
    editTools.style.top = `calc(${rect.top}px + ${rect.height}px)`;
    editTools.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 130px)`;
    editTools.style.transform = "scale(1)";
  } else if (selRange && isTouch) {
    editTools.style.position = "fixed";
    editTools.style.top = 0;
    editTools.style.left = "50%";
    editTools.style.transform = "scale(1) translateX(-50%)";
  } else {
    editTools.style.position = "absolute";
    editTools.style.top = "-100%";
    editTools.style.left = "-100%";
    editTools.style.transform = "scale(0)";
    const c = document.getElementsByTagName("html")[0];
    // savHandler(true);

    for (let i = 0; i < btn.length; i++) {
      btn[i].classList.remove("active");
    }
    activateBookMarking(false);
    document.getElementsByTagName("html")[0].classList.remove("cursor");
  }
};

const cont = document.getElementById("container-wrap");

cont.addEventListener("click", (e) => {
  // e.preventDefault();
  select(false);
});
cont.addEventListener("touchend", (e) => {
  // e.preventDefault();
  select(true);
});
let hl = function () {
  for (let i = 0; i < btn.length; i++) {
    if (i != 1) {
      g = false;
      w = false;
      activateBookMarking(false);
    }
  }
  h = true;

  if (h) {
    document.designMode = "on";
    sel = window.getSelection();
    selRange = sel.toString().trim();
    document.execCommand("BackColor", false, "#ffba53");
    document.designMode = "off";
    editTools.style.top = "-100%";
    editTools.style.left = "-100%";
    editTools.style.transform = "scale(0)";
    const c = document.getElementsByTagName("html")[0];
    savHandler(true);
  }
  // clearInterval(timer);
  sel.removeAllRanges();
  h = false;
};

const hlBtn = document.getElementById("hl");
const delHlBtn = document.getElementById("delHl");

hlBtn.addEventListener("click", hl, false);
hlBtn.addEventListener("touchend", hl, false);

const delHl = () => {
  document.designMode = "on";
  document.execCommand("BackColor", false, "transparent");
  document.designMode = "off";
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
  const c = document.getElementsByTagName("html")[0];
  savHandler(true);
  sel.removeAllRanges();
};

delHlBtn.addEventListener("click", delHl, false);
delHlBtn.addEventListener("touchend", delHl, false);

const closeModal = () => {
  const bookMark = document.querySelector(".bookmarks-div");
  const accitms = document.querySelectorAll(".accordion-item");
  bookMark.classList.remove("show");
  // btn[5].classList.remove("active");
};

//! *********************************** Comment  Start**********************************

const addCommentButton = document.getElementById("add-comment");

const comments = JSON.parse(window.localStorage.getItem("comments")) || {};
let counter = JSON.parse(window.localStorage.getItem("counter")) || 0;
let targetId = "";

const textArea = document.querySelector("textarea");
const saveComment = document.getElementById("save");

for (const key in comments) {
  // console.log(key);
  const div = document.getElementById(key);
  commentButtoListener(div);
}

const isSetCommentAllowed = () => {
  for (let i = 0; i < btn.length; i++) {
    if (i != 2) {
      btn[i].classList.remove("active");
      h = false;
      g = false;
      w = false;
    }
  }
  // console.log("hh");
  btn[2].classList.toggle("active");
  document.getElementsByTagName("html")[0].classList.toggle("cursor");
};

saveComment.addEventListener("click", () => {
  if (textArea.value && !comments[targetId]) {
    comments[`btn-${counter}`] = textArea.value;
    textArea.value = "";
    commentBlockVisability({ isVisable: false });
    btn[2].classList.remove("active");
    const c = document.getElementsByTagName("html")[0];
    savHandler(true);
    window.localStorage.setItem("comments", JSON.stringify(comments));
  } else {
    comments[targetId] = textArea.value;
    // targetId = "none";
    textArea.value = "";
    window.localStorage.setItem("comments", JSON.stringify(comments));
  }
  counter++;
  window.localStorage.setItem("counter", JSON.stringify(counter));
  commentBlockVisability({ isVisable: false });
  btn[2].classList.remove("active");
  //isSetCommentAllowed();
});

const closeComments = () => {
  const div = document.getElementById("comment-block");
  div.style.display = "none";
  btn[2].classList.remove("active");
  comments[targetId] = textArea.value;
  textArea.value = "";
  hideTools();
  document.getElementById(`btn-${counter}`).remove();
  const c = document.getElementsByTagName("html")[0];
  savHandler(true);
};

const createCommentIcon = (e, page) => {
  const div = document.createElement("div");
  div.id = `btn-` + counter;
  div.style.position = "absolute";
  div.className = "comment";
  page.append(div);
  targetId = div.id;
  div.style.top = `${
    e.pageY -
    page.getBoundingClientRect().top -
    getComputedStyle(div).height.slice(0, -2)
  }px`;
  div.style.left = `${
    e.pageX -
    page.getBoundingClientRect().left -
    getComputedStyle(div).width.slice(0, -2 - 6)
  }px`;

  commentBlockVisability({ isVisable: true, commentIcon: div });

  commentButtoListener(div);
  btn[2].classList.remove("active");
};

const commentBlockVisability = ({ isVisable, commentIcon }) => {
  hideTools();
  document.getElementsByTagName("html")[0].classList.remove("cursor");
  const div = document.getElementById("comment-block");
  const cancelComment = document.getElementById("delete-comment");
  div.style.display = isVisable ? "flex" : "none";
  cancelComment.addEventListener("click", () => {
    // console.log(isVisable, commentIcon);
    textArea.value = "";
    div.style.display = "none";

    if (commentIcon && commentIcon.id == targetId) {
      commentIcon.remove();
      delete comments[targetId];
      window.localStorage.setItem("comments", JSON.stringify(comments));
      savHandler(true);
    }

    document.getElementsByTagName("html")[0].classList.toggle("cursor");
    // commentIcon.remove();
  });
};

function commentButtoListener(div) {
  div.addEventListener("click", () => {
    const id = div.id;
    textArea.value = comments[id];
    targetId = id;
    commentBlockVisability({ isVisable: true, commentIcon: div });
  });
  return;
}

//! *********************************** Comment  End**********************************

/******************************/

const searchInGoogle = () => {
  for (let i = 0; i < btn.length; i++) {
    if (i != 3) {
      btn[i].classList.remove("active");
      h = false;
      w = false;
      activateBookMarking(false);
    }
  }
  g = true;

  if (g && selRange) {
    window.open("https://www.google.com/search?q=" + selRange, "_blank");
  }
  g = false;
};
const searchInWiki = () => {
  for (let i = 0; i < btn.length; i++) {
    if (i != 4) {
      btn[i].classList.remove("active");
      h = false;
      g = false;
      activateBookMarking(false);
    }
  }
  w = true;

  if (w && selRange) {
    window.open("https://ar.wikipedia.org/wiki/" + selRange, "_blank");
  }
  w = false;
};

const bookingPages = JSON.parse(localStorage.getItem("bookingPages")) || {};
const createButton = ({ id, text }) => {
  return $(`<button id =${id}> ${text} </button>`)[0];
};

const createCheckBox = ({ id, onchange }) => {
  //`<input type="checkbox"  class=${"checkbox"} />`

  return $(
    `   <img id=${
      "radio-" + id
    }  src=${"assets/png/disabledBookMark.png"} alt="1"  class=${"checkbox"} />
    `
  )[0];
};

//! ***********************************functions******************************************
const addCheckMarkToPages = () => {
  const pages = Array.prototype.slice.call(
    document.getElementsByClassName("page")
  );
  addCommentsToScreen(pages);
  printPage(pages);
  if (!savedVersion) {
    pages.forEach((page, index) => {
      const checkbox = createCheckBox({ id: index + 1 });
      if (index % 2 === 0) {
        checkbox.style.right = "0";
      } else {
        checkbox.style.left = "0";
      }
      checkbox.onclick = (e) => {
        if (!bookingPages[e.target.id]) {
          bookingPages[e.target.id] = index + 1;
          //../assets/png/ref.png
          checkbox.src = "assets/png/activBookMark.png";
        } else {
          // if (btn[5].classList.contains("active")) {
          delete bookingPages[e.target.id];
          // }

          showBookmark();
          checkbox.src = "assets/png/disabledBookMark.png";
          // if (!bookMarkButton.classList.contains("active")) {
          //   checkbox.src = "assets/png/activBookMark.png";
          // }
        }
        savHandler(true);
        window.localStorage.setItem(
          "bookingPages",
          JSON.stringify(bookingPages)
        );
      };

      page.append(checkbox);
      activateBookMarking(true);
    });
  } else {
    const bookmarks = Array.prototype.slice.call(
      document.getElementsByClassName("checkbox")
    );
    bookmarks.forEach((bookMark, index) => {
      if (!bookingPages[bookMark.id]) {
        bookMark.src = "assets/png/disabledBookMark.png";
      }
      bookMark.addEventListener("click", (e) => {
        if (!bookingPages[e.target.id]) {
          bookingPages[e.target.id] = index + 1;
          //../assets/png/ref.png
          bookMark.src = "assets/png/activBookMark.png";
        } else {
          // if (btn[5].classList.contains("active")) {
          delete bookingPages[e.target.id];
          // }

          showBookmark();
          bookMark.src = "assets/png/disabledBookMark.png";

          // if (!bookMarkButton.classList.contains("active")) {
          //   bookMark.src = "assets/png/activBookMark.png";
          // }
        }
        savHandler(true);
        window.localStorage.setItem(
          "bookingPages",
          JSON.stringify(bookingPages)
        );
      });
    });
  }
};
const addCommentsToScreen = (pages) => {
  pages.forEach((page, index) => {
    page.style.position = "relative";
    page.onclick = (e) => {
      if (btn[2].classList.contains("active")) {
        createCommentIcon(e, page);
      }
    };
  });
};

const printPage = (pages) => {
  pages.forEach((page, index) => {
    const print = document.getElementById("print");
    if (window.innerWidth >= 768) {
      print.onclick = (e) => {
        hideTools();
        window.moveTo(0, 0);
        window.resizeTo(640, 480);
        window.print();
      };
    } else {
      print.ontouchend = (e) => {
        hideTools();
        window.moveTo(0, 0);
        window.resizeTo(640, 480);
        window.print();
      };
    }
  });
};
const activateBookMarking = (isActivate) => {
  const checkBoxes = Array.prototype.slice.call(
    document.getElementsByClassName("checkbox")
  );
  checkBoxes.forEach((checkbox) => {
    if (isActivate) {
      checkbox.style.display = "block";
    } else {
      const img = document.createElement("img");
      img.src = "assets/png/disabledBookMark.png";
      // if (checkbox.src == img.src) {
      //   checkbox.style.display = "none";
      // }
    }
  });
};

const bookmarkContainer = () => {
  // for (let i = 0; i < btn.length; i++) {
  //   if (i != 5) {
  //     btn[i].classList.remove("active");
  //     h = false;
  //     g = false;
  //     w = false;
  //     activateBookMarking(false);
  //   } else {
  //     btn[5].classList.toggle("active");
  //   }
  // }
  const bookMark = document.querySelector(".bookmarks-div");

  showBookmark();
  bookMark.classList.toggle("show");
};

const modalClose = document.getElementById("close-interactive");

const interactive = (title, content, isModal, isImg, isIndex) => {
  const modalParent = document.querySelector(".bookmarks-div");
  const modalBox = document.getElementsByClassName("modal-content")[0];
  const modalContent = document.getElementsByClassName("modal-body")[0];
  const modalTitle = document.getElementsByClassName("modal-title")[0];
  let iframe = $(
    `<iframe width="100%" height="100%" src="${content}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  );
  if (isModal) {
    modalTitle.innerText = title;
    if (isImg) {
      iframe = $(`<img class="modal-img" src="${content}">`);
    }
    if (isIndex) {
      iframe = $(`<span>${content}</span>`);
      const accor = document.getElementsByClassName("accordion")[0];

      if (!accor.children.length) {
        fillIndex();
      }
    }
    modalContent.append(iframe[0]);
    modalBox.style.backgroundColor = "transparent";
    modalTitle.style.color = "#fff";
    modalClose.classList.add("close");
    modalContent.style.width = "100vw";
    modalContent.style.height = "100vh";
    modalParent.classList.add("show");
  } else {
    modalContent.remove();
    const modalBody = document.createElement("div");
    const acc = document.createElement("div");
    modalBody.className = "modal-body";
    acc.className = "accordion";
    acc.id = "accordionExample";
    modalBox.append(modalBody);
    document.getElementsByClassName("modal-body")[0].append(acc);
    modalBox.style.backgroundColor = "#fff";
    // modalBox.style.border = "2px solid #E9A954";
    modalTitle.style.color = "#000";
    modalClose.classList.remove("close");
  }
};

modalClose.addEventListener("click", () => {
  interactive(null, null, false, false, false);
});

const showBookmark = () => {
  const checkListDiv = document.getElementsByClassName("modal-body")[0];
  const modalTitle = document.getElementsByClassName("modal-title")[0];
  modalTitle.innerText = "الصفحات المميزة";
  checkListDiv.innerHTML = "";
  for (const key in bookingPages) {
    const parent = $(`<div class="parent"></div>`)[0];
    const btn = $(`<button> صفحة ${bookingPages[key]}</button>`)[0];
    const delBtn = $(
      `<div><img style="width:100%;max-width:20px;" title="إزالة" src="../assets/png/delete.png"></div>`
    )[0];
    btn.addEventListener("click", () => {
      closeDiv();
      window.top.nav.to(bookingPages[key]);
      closeModal();
    });
    delBtn.addEventListener("click", () => {
      delete bookingPages[key];
      showBookmark();
      window.localStorage.setItem("bookingPages", JSON.stringify(bookingPages));
      document.getElementById(key).src = "assets/png/disabledBookMark.png";
      // if (!bookMarkButton.classList.contains("active")) {
      //   document.getElementById(key).style.display = "none";
      // }
    });
    parent.append(btn, delBtn);
    checkListDiv.append(parent, $("<hr/>")[0]);
  }
};

const bookmark = () => {
  bookMarkButton.classList.add("active");
  activateBookMarking(true);
};

//! *********************************** Execute Functions******************************************
addCheckMarkToPages();

const index = ({ id1, id2, arrow, num, title, isUse, arr }) => {
  hideTools();
  const accordion = document.getElementById("accordionExample");
  const acItem = $(`<div class="accordion-item"></div>`)[0];
  if (id1 === "headingOne") {
    const accHeader = document.createElement("div");
    accHeader.className = "accordion-item acc-header";
    const accHeaderContent = $(
      `<div class="acc-row p-2"><div class="acc-col">الصفحة</div><div class="acc-col">العنوان</div></div>`
    )[0];
    accHeader.append(accHeaderContent);
    accordion.append(accHeader);
  }
  const accContent = $(`<h2 class="accordion-header" id=${id1}>
<button class="accordion-button collapsed ${arrow}" type="button" data-bs-toggle="collapse" data-bs-target="#${id2}" aria-expanded="true" aria-controls="${id2}">
    <span class="num">${num}</span>
    <div class='title'>
    <span>${title}</span>
    </div>
  </button>
</h2>`)[0];

  accContent.onclick = () => {
    closeDiv();
    window.top.nav.to(num);
    if (arr.length === 0) {
      closeModal();
      interactive(null, null, false, false, false);
    }
  };
  accordion.append(acItem);
  acItem.append(accContent);

  const addDiv =
    $(`<div id="${id2}" class="accordion-collapse collapse" aria-labelledby=${id1} data-bs-parent="#accordionExample">
<div class="accordion-body">
<ul class="lists index-lists">
  
</ul>
</div>
</div>`)[0];
  if (arr.length !== 0) {
    arr.forEach((ele, index) => {
      const addLi =
        $(`<li class="acc-list" style="z-index:3;padding:8px 0;list-style:none;">
     
      <span class="num">${ele.num}</span>
      <span>${ele.title}</span>
      
      </li>
   `)[0];
      acItem.append(addDiv);
      Array.prototype.slice
        .call(document.getElementsByClassName("index-lists"))
        .forEach((el) => {
          el.append(addLi);
        });
      // addDiv.append(addLi);

      addLi.onclick = () => {
        closeModal();
        interactive(null, null, false, false, false);
        window.top.nav.to(ele.num);
      };
    });
  }
};

const fillIndex = () => {
  index({
    id1: "headingOne",
    id2: "collapseOne",
    arrow: "arrow",
    num: 7,
    title: "شكر وتقدير",
    isUse: false,
    arr: [],
  });
  index({
    id1: "headingTwo",
    id2: "collapseTwo",
    arrow: "arrow",
    num: 8,
    title: "مقدمة إلى أدلة المنهج الوطني",
    isUse: false,
    arr: [],
  });
  index({
    id1: "headingThree",
    id2: "collapseThree",
    arrow: "arrow",
    num: 12,
    title: "القسم الأول: <br>مدخل إلى معيار نهج التعلم",
    isUse: false,
    arr: [],
  });
  index({
    id1: "headingFour",
    id2: "collapseFour",
    arrow: "arrow",
    num: 18,
    title:
      "القسم الثاني: <br>دليل المعلمة في التخطيط وتطبيق الممارسات التربوية الداعمة لمعيار نهج التعلم -دعم معيار نهج التعلم من الولادة وحتى 6 سنوات)",
    isUse: false,
    arr: [],
  });

  index({
    id1: "headingFive",
    id2: "collapseFive",
    arrow: "",
    num: 21,
    title: "فئة الأطفال الرضًّع الصغار (من الميلاد إلى 9أشهر)",
    isUse: true,
    arr: [
      {
        num: 21,
        title:
          "لممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 26,
        title:
          "لممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 32,
        title:
          "الممارسة الثالثة: تطبيق المعلمات المهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 39,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر.",
      },
    ],
  });
  index({
    id1: "headingSix",
    id2: "collapseSix",
    arrow: "",
    num: 41,
    title: "فئة الرضّع الدارجين (من 9إلى 18 شهرا)",
    isUse: true,
    arr: [
      {
        num: 41,
        title:
          "لممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 50,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 54,
        title:
          "الممارسة الثالثة: تطبيق المعلمات المهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 61,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر.",
      },
    ],
  });
  index({
    id1: "headingSeven",
    id2: "collapseSeven",
    arrow: "",
    num: 65,
    title: "فئة الأطفال الفطم (من 15-36 شهرا)",
    isUse: true,
    arr: [
      {
        num: 65,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات لمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 71,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 75,
        title:
          "الممارسة الثالثة: تطبيق المعلمات الممهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 85,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر",
      },
    ],
  });
  index({
    id1: "headingEight",
    id2: "collapseEight",
    arrow: "",
    num: 86,
    title: "فئة أطفال الروضة (3-4) سنوات",
    isUse: true,
    arr: [
      {
        num: 86,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 94,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 98,
        title:
          "الممارسة الثالثة: تطبيق المعلمات الممهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 109,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر",
      },
    ],
  });
  index({
    id1: "headingNine",
    id2: "collapseNine",
    arrow: "",
    num: 105,
    title: "فئة أطفال الروضة (4-6) سنوات",
    isUse: true,
    arr: [
      {
        num: 112,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 119,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 124,
        title:
          "الممارسة الثالثة: تطبيق المعلمات المهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 140,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر.",
      },
    ],
  });
  index({
    id1: "headingTen",
    id2: "collapseTen",
    arrow: "arrow",
    num: 142,
    title: "المراجع",
    isUse: false,
    arr: [],
  });
};

if (!savedVersion) {
  fillIndex();
} else {
  for (let i = 0; i < btn.length; i++) {
    btn[i].classList.remove("active");
    activateBookMarking(false);
  }
  const accItem = Array.prototype.slice.call(
    document.getElementsByClassName("accordion-header")
  );
  const list = Array.prototype.slice.call(
    document.getElementsByClassName("acc-list")
  );
  accItem.forEach((item, index) => {
    item.onclick = () => {
      const num = item.innerText[0] + item.innerText[1] + item.innerText[2];
      window.top.nav.to(num);
    };
  });
  list.forEach((list, index) => {
    list.onclick = () => {
      const l = list.innerText[0] + list.innerText[1] + list.innerText[2];
      window.top.nav.to(l);
    };
  });
}

const navBar = document.querySelector(".index");
const menuBtns = document.getElementById("index");
const openMenu = () => {
  navBar.classList.add("open");
};
const closeMenu = () => {
  navBar.classList.remove("open");
  // this.style.zIndex = 2;
};

nextBtn.addEventListener("click", () => {
  if (selRange) {
    sel.removeAllRanges();
  }
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
  activateBookMarking(false);
});
backBtn.addEventListener("click", () => {
  if (selRange) {
    sel.removeAllRanges();
  }
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
  activateBookMarking(false);
});

const ineractive1 = document
  .getElementsByClassName("ineractive-1")[0]
  .querySelectorAll("li");

ineractive1.forEach((li) => {
  li.onclick = () => {
    let title = "";
    let content = null;
    if (li.className === "video") {
      title = "فيديو تفاعلي";
      content =
        "/../assets/interactive/case02/story_content/video_5kMbnTilyUm_18_160_1920x1080.mp4";
      interactive(title, content, true, false, false);
    } else if (li.className === "message") {
      title = "حالة تدريبية";
      content = "/../assets/interactive/case02/index.html";
      interactive(title, content, true, false, false);
    }
  };
});

//   const title = "فيديو تفاعلي";
//   const content = "/../assets/interactive/case/story.html";
//   interactive(title,content,true);

function handleSearch() {
  hideTools();
  const offcanvas = document.getElementsByClassName("offcanvas")[0];
  const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
  const ul = document.getElementsByClassName("search-elements")[0];
  /*********** li => search resault  ************************* */
  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }
  const searchTxt = document.getElementById("search").value;

  const liParent = document.getElementsByTagName("li");
  let arr = [];
  let targetId = "";

  for (let i = 0; i < liParent.length; i++) {
    if (liParent[i].dataset.name) {
      const p = liParent[i].innerText;
      let index = p.indexOf(searchTxt);

      if (searchTxt.length > 0 && index >= 0) {
        targetId = liParent[i].dataset.name;

        const li = $(
          `<li class="search-list" data-bs-dismiss="offcanvas">صفحة ${targetId}</li>`
        );
        ul.append(li[0]);

        arr = [{ id: targetId, li: li[0] }];
        arr.forEach((e) => {
          li[0].onclick = () => {
            closeDiv();
            removeSearch(liParent[i], searchTxt, true);
            window.top.nav.to(e.id);
            document.getElementById("search").value = "";
            while (ul.firstChild) {
              ul.removeChild(ul.lastChild);
            }
          };
        });
      }
      nextBtn.addEventListener("click", () => {
        removeSearch(liParent[i], null, false);
      });
      backBtn.addEventListener("click", () => {
        removeSearch(liParent[i], null, false);
      });
      nextBtn.addEventListener("touchend", () => {
        removeSearch(liParent[i], null, false);
      });
      backBtn.addEventListener("touchend", () => {
        removeSearch(liParent[i], null, false);
      });
    }
  }
}

function removeSearch(n, searchTxt, status) {
  let newP = n.getElementsByTagName("p");
  let newli = n.getElementsByTagName("li");

  let pVal = [];

  for (let j = 0; j < newP.length; j++) {
    // console.log(newP.firstChild ? newP.firstChild : "false");
    newP[j].innerText ? pVal.push({ p: newP[j], val: newP[j].innerText }) : "";
  }
  for (let l = 0; l < newli.length; l++) {
    pVal.push({ p: newli[l], val: newli[l].innerText });
  }
  // console.log(pVal[0].p);
  const c = document.getElementsByTagName("html")[0];
  pVal.forEach((e) => {
    if (status) {
      e.p.innerText = e.val;
      if (e.val.indexOf(searchTxt) != -1) {
        let l = searchTxt.length;
        while (l) {
          let word = `<span style="background:yellow;">${e.val.slice(
            e.val.indexOf(searchTxt),
            e.val.indexOf(searchTxt) + searchTxt.length
          )}</span>`;
          e.p.innerHTML = e.val.replaceAll(searchTxt, word);
          l--;
        }
      }
    } else {
      e.p.innerText = e.val;
      savHandler(false);
    }
  });
}

function hideTools() {
  editTools.position = "absolute";
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
}
