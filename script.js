document.addEventListener("DOMContentLoaded", function () {

  /* 1. Mobil menyu tugmasi */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }

  /* 2. Joriy sahifa havolasini belgilash */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* 3. Footerdagi yil */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* 4. Menyu filtri (menu.html) */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var dishes = document.querySelectorAll(".dish");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.dataset.filter;

      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      dishes.forEach(function (dish) {
        var show = filter === "all" || dish.dataset.category === filter;
        dish.classList.toggle("hidden", !show);
      });
    });
  });

  /* 5. Aloqa formasi tekshiruvi (contact.html) */
  var form = document.getElementById("contact-form");

  if (form) {
    var fields = {
      name: {
        el: document.getElementById("name"),
        error: document.getElementById("name-error"),
        validate: function (v) {
          return v.trim().length >= 2 ? "" : "Iltimos, ismingizni kiriting.";
        }
      },
      phone: {
        el: document.getElementById("phone"),
        error: document.getElementById("phone-error"),
        validate: function (v) {
          var digits = v.replace(/\D/g, "");
          return digits.length >= 9 ? "" : "To'g'ri telefon raqamini kiriting.";
        }
      },
      message: {
        el: document.getElementById("message"),
        error: document.getElementById("message-error"),
        validate: function (v) {
          return v.trim().length >= 5 ? "" : "Xabar kamida 5 ta belgidan iborat bo'lsin.";
        }
      }
    };

    function checkField(field) {
      var msg = field.validate(field.el.value);
      field.error.textContent = msg;
      field.el.parentElement.classList.toggle("invalid", msg !== "");
      return msg === "";
    }

    Object.keys(fields).forEach(function (key) {
      fields[key].el.addEventListener("input", function () {
        checkField(fields[key]);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var allValid = true;
      Object.keys(fields).forEach(function (key) {
        if (!checkField(fields[key])) allValid = false;
      });

      var success = document.getElementById("form-success");
      if (allValid) {
        success.hidden = false;
        form.reset();
        setTimeout(function () { success.hidden = true; }, 6000);
      } else {
        success.hidden = true;
      }
    });
  }

});