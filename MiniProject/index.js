var profileCard = document.getElementById("profileCard");
var btn = document.querySelector(".card-action .btn");
var cardName = document.querySelector(".profile-name");
var cardTitle = document.querySelector(".profile-tag");
var profileBio = document.querySelector(".profile-bio");
var socialIcons = document.querySelectorAll(".social-section .icon");
var body = document.body;

var isDark = localStorage.getItem("isDark") === "true";
// var isDark = localStorage.getItem("isDark") === "true" ? true : false;isDark = false;

btn.addEventListener("click", function () {
  if (!isDark) {
    profileCard.style.backgroundColor = "#111827";
    cardName.style.color = "#E5E7EB";
    cardTitle.style.color = "#8B9CF6";
    profileBio.style.color = "#9CA3AF";
    body.style.backgroundImage =
      "linear-gradient(135deg, #020617, #0F172A, #1E293B)";

    for (var i = 0; i < socialIcons.length; i++) {
      socialIcons[i].style.color = "#94A3B8";
    }

    btn.style.color = "#FFFFFF";
    isDark = true;
    localStorage.setItem("isDark", isDark);
  } else {
    profileCard.style.backgroundColor = "white";
    cardName.style.color = "#0e1e36";
    cardTitle.style.color = "#6c63ff";
    profileBio.style.color = "#666";
    body.style.backgroundImage = "linear-gradient(135deg, #667eea, #764ba2)";

    for (var i = 0; i < socialIcons.length; i++) {
      socialIcons[i].style.color = " #0e1a32";
    }

    btn.style.color = "white";
    isDark = false;
    localStorage.setItem("isDark", isDark);
  }
});
localStorage.setItem("isDark", isDark);
onload = function () {
  var storedIsDark = localStorage.getItem("isDark");
  if (storedIsDark === "true") {
    profileCard.style.backgroundColor = "#111827";
    cardName.style.color = "#E5E7EB";
    cardTitle.style.color = "#8B9CF6";
    profileBio.style.color = "#9CA3AF";
    for (var i = 0; i < socialIcons.length; i++) {
      socialIcons[i].style.color = "#94A3B8";
    }
    body.style.backgroundImage =
      "linear-gradient(135deg, #020617, #0F172A, #1E293B)";
  } else {
    profileCard.style.backgroundColor = "white";
    cardName.style.color = "#0e1e36";
    cardTitle.style.color = "#6c63ff";
    profileBio.style.color = "#666";
    body.style.backgroundImage = "linear-gradient(135deg, #667eea, #764ba2)";
  }
};

// onload();
