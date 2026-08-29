// ============================================================
// 合同会社Y2FinTech ウェブサイト
// ============================================================

// ▼▼▼ お問い合わせの送信先メールアドレス（要変更） ▼▼▼
// 実際に使用するメールアドレスに書き換えてください。
const CONTACT_EMAIL = "info@example.com";
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

document.addEventListener("DOMContentLoaded", () => {

  // ---------- ヘッダーの影（スクロール時） ----------
  const header = document.getElementById("header");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- ハンバーガーメニュー ----------
  const menuBtn = document.getElementById("menuBtn");
  const gnav = document.getElementById("gnav");

  menuBtn.addEventListener("click", () => {
    const isOpen = gnav.classList.toggle("is-open");
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  // メニュー内リンクをタップしたら閉じる
  gnav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      gnav.classList.remove("is-open");
      menuBtn.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- 追従CTA（ヒーローを過ぎたら表示） ----------
  const floatCta = document.getElementById("floatCta");
  const hero = document.querySelector(".hero");
  const contactSection = document.getElementById("contact");

  const updateFloatCta = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const contactTop = contactSection.getBoundingClientRect().top;
    // ヒーローを過ぎ、かつお問い合わせセクションに入る前だけ表示
    const show = heroBottom < 0 && contactTop > window.innerHeight * 0.5;
    floatCta.classList.toggle("is-visible", show);
  };
  window.addEventListener("scroll", updateFloatCta, { passive: true });
  updateFloatCta();

  // ---------- スクロールで要素をふわっと表示 ----------
  const revealTargets = document.querySelectorAll(
    ".issue__card, .strength__card, .promise__card, .works__featured, .works__field, .process__step, .message__box"
  );
  revealTargets.forEach((el) => {
    // 読み込み時点で画面内（または画面より上）にある要素は、隠さずそのまま表示する
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => {
    if (el.classList.contains("reveal")) observer.observe(el);
  });

  // ---------- お問い合わせフォーム（mailto送信） ----------
  // フォームサービス（Googleフォーム・formrun等）を使う場合は、
  // index.html のフォームごと埋め込みコードに置き換えてください。
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const company = form.elements["company"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();

    const subject = "【無料相談のお申し込み】" + name + " 様";
    const body =
      "お名前：" + name + "\n" +
      "会社名：" + (company || "（未記入）") + "\n" +
      "メールアドレス：" + email + "\n\n" +
      "ご相談内容：\n" + message + "\n";

    window.location.href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
});
