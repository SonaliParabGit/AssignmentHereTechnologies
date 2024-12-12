class MyProfileCard extends HTMLElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["cta-text", "background", "location", "avtar", "name"];
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", "card-wrapper");

    this.cardHeader = document.createElement("div");
    this.cardHeader.setAttribute("class", "card-header");
    if (this.hasAttribute("background")) {
      const backgroundImage = this.getAttribute("background");
      this.cardHeader.style.backgroundImage = `url('${backgroundImage}')`;
    }

    this.avtarImg = document.createElement("img");
    if (this.hasAttribute("avtar")) {
      this.avtarImg.src = this.getAttribute("avtar");
    }
    this.avtarImg.setAttribute("class", "card-avtar-img");

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    this.cardBodyNameTxt = document.createElement("h3");
    this.cardBodyNameTxt.setAttribute("class", "card-body-name");
    if (this.hasAttribute("name")) {
      this.cardBodyNameTxt.innerText = this.getAttribute("name").toUpperCase();
    }
    this.cardBodyLocationTxt = document.createElement("h4");
    this.cardBodyLocationTxt.setAttribute("class", "card-body-location");
    if (this.hasAttribute("location")) {
      this.cardBodyLocationTxt.innerHTML = this.formatLocationTxt(
        this.getAttribute("location")
      );
    }

    this.ctaBtn = document.createElement("button");
    this.ctaBtn.setAttribute("class", "card-cta-btn");
    if (this.hasAttribute("cta-text")) {
      this.ctaBtn.textContent = this.getAttribute("cta-text");
    }

    this.ctaBtn.addEventListener("click", () => {
      const customEvent = new CustomEvent("ctaClick", {
        detail: { value: "CTA button clicked" },
      });
      console.log("event", customEvent);
      this.dispatchEvent(customEvent);
    });

    const style = document.createElement("style");
    style.textContent = `
        .card-wrapper {
            width: 200px;
            background-color: rgb(244, 242, 242);
            border: 1px solid rgb(209 207 207);
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            text-align: center;
        }
        .card-header {
            height: 120px;
            position: relative;
        }
        .card-avtar-img {
            border-radius: 50%;
            height: 100px;
            width: 100px;
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            bottom: -45%;
            border: 4px solid rgb(246, 243, 243);
        }
        .card-body {
            padding: 60px 20px 20px;
        }
        .card-body-name {
            padding-bottom: 0;
            margin-bottom: 0;
        }
        .card-body-location {
            padding-top: 10px;
            margin-top: 0;
            font-size: 12px;
            color: rgb(105 98 98);
            text-align: center;
            margin-bottom: 25px;
        }
        .card-body-location img {
            height: 15px;
            width: 15px;
        }
        .card-cta-btn {
            padding: 8px 20px;
            border-radius: 18px;
            background: rgb(255, 94, 0);
            color: white;
            border: none;
            cursor: pointer;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .card-cta-btn:hover {
            background: orange;
        }

    `;
    shadow.appendChild(style);
    shadow.appendChild(cardWrapper);
    this.cardHeader.appendChild(this.avtarImg);
    cardBody.appendChild(this.cardBodyNameTxt);
    cardBody.appendChild(this.cardBodyLocationTxt);
    cardBody.appendChild(this.ctaBtn);
    cardWrapper.appendChild(this.cardHeader);
    cardWrapper.appendChild(cardBody);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "cta-text":
        if (this.ctaBtn) this.ctaBtn.textContent = newValue;
        break;
      case "background":
        if (this.cardHeader)
          this.cardHeader.style.backgroundImage = `url('${newValue}')`;
        break;
      case "name":
        if (this.cardBodyNameTxt)
          this.cardBodyNameTxt.textContent = newValue.toUpperCase();
        break;
      case "avtar":
        if (this.avtarImg) this.avtarImg.src = newValue;
        break;
      case "location":
        if (this.cardBodyLocationTxt)
          this.cardBodyLocationTxt.innerHTML = this.formatLocationTxt(newValue);
        break;
    }
  }
  formatLocationTxt(locationVal) {
    return `<img src="./locationimg.png" alt="Location">
                                            ${locationVal}`;
  }
}
customElements.define("my-profile-card", MyProfileCard);
