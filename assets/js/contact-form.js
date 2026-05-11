/**
 * Contact form for static hosting (GitHub Pages).
 *
 * 1) Optional: set WEB3FORMS_ACCESS_KEY (free at https://web3forms.com) for
 *    reliable delivery to the email you register there (e.g. Gmail).
 * 2) Otherwise tries FormSubmit AJAX to slee45@uw.edu.
 * 3) If both fail, opens a mailto: draft so the visitor can send from their
 *    own mail app (still addressed to slee45@uw.edu).
 *
 * Web forms cannot SMS your phone; your number is included in the email body.
 */
(function () {
  var form = document.getElementById("contact-form-3");
  if (!form) return;

  /** Paste your Web3Forms access key here (https://web3forms.com) or leave "". */
  var WEB3FORMS_ACCESS_KEY = "";

  var RECIPIENT_EMAIL = "slee45@uw.edu";

  function showSent() {
    var ok = document.getElementById("contact-form-sent");
    if (ok) ok.style.display = "block";
    var err = document.getElementById("contact-form-error");
    if (err) {
      err.style.display = "none";
      err.textContent = "";
    }
    form.reset();
    try {
      history.replaceState(null, "", "contact.html");
    } catch (e) {}
  }

  function showNotice(msg) {
    var err = document.getElementById("contact-form-error");
    if (err) {
      err.textContent = msg;
      err.style.display = "block";
    }
  }

  function hideNotice() {
    var err = document.getElementById("contact-form-error");
    if (err) {
      err.style.display = "none";
      err.textContent = "";
    }
  }

  function mailtoFallback(name, email, phone, message) {
    var subject = encodeURIComponent("Portfolio contact: " + name);
    var body =
      "Name: " +
      name +
      "\nEmail: " +
      email +
      "\nPhone: " +
      phone +
      "\n\n" +
      message;
    var bodyEnc = encodeURIComponent(body);
    var href = "mailto:" + RECIPIENT_EMAIL + "?subject=" + subject + "&body=" + bodyEnc;
    if (href.length > 2000) {
      bodyEnc = encodeURIComponent(
        body.slice(0, 1200) + "\n\n[Message shortened — ask visitor to resend details]"
      );
      href = "mailto:" + RECIPIENT_EMAIL + "?subject=" + subject + "&body=" + bodyEnc;
    }
    window.location.href = href;
  }

  async function tryWeb3Forms(name, email, phone, message) {
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.length < 16) return false;
    var res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Portfolio contact (seunghyun-lee.com)",
        name: name,
        email: email,
        phone: phone,
        message: message,
      }),
    });
    var data = await res.json().catch(function () {
      return {};
    });
    return !!(res.ok && data && data.success);
  }

  async function tryFormSubmit(name, email, phone, message, honey) {
    var res = await fetch("https://formsubmit.co/ajax/" + RECIPIENT_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        message: message,
        _subject: "Portfolio contact (seunghyun-lee.com)",
        _replyto: email,
        _captcha: "false",
        _honey: honey || "",
      }),
    });
    await res.json().catch(function () {
      return {};
    });
    return !!res.ok;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideNotice();

    var nameEl = form.elements.namedItem("name");
    var emailEl = form.elements.namedItem("email");
    var phoneEl = form.elements.namedItem("phone");
    var messageEl = form.elements.namedItem("message");
    var honeyEl = form.elements.namedItem("_honey");

    var name = (nameEl && nameEl.value && nameEl.value.trim()) || "";
    var email = (emailEl && emailEl.value && emailEl.value.trim()) || "";
    var phone = (phoneEl && phoneEl.value && phoneEl.value.trim()) || "";
    var message = (messageEl && messageEl.value && messageEl.value.trim()) || "";
    var honey = (honeyEl && honeyEl.value) || "";

    if (honey) return false;

    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    var ok = false;
    try {
      ok = await tryWeb3Forms(name, email, phone, message);
    } catch (err) {
      ok = false;
    }
    if (!ok) {
      try {
        ok = await tryFormSubmit(name, email, phone, message, honey);
      } catch (err2) {
        ok = false;
      }
    }

    if (ok) {
      showSent();
    } else {
      showNotice(
        "Automatic send did not go through. Your email app should open with a draft to " +
          RECIPIENT_EMAIL +
          " — please press Send there to deliver your message."
      );
      mailtoFallback(name, email, phone, message);
    }

    if (btn) btn.disabled = false;
    return false;
  });
})();
