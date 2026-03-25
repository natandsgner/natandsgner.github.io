const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]")
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target)
    tabContents.forEach((tc) => {
      tc.classList.remove("filters__active")
    })
    target.classList.add("filters__active")
    tabs.forEach((t) => {
      t.classList.remove("filter-tab-active")
    })
    tab.classList.add("filter-tab-active")
  })
})
const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "ri-sun-line"
const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light")
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line")
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](iconTheme)
}
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem("selected-theme", getCurrentTheme())
  localStorage.setItem("selected-icon", getCurrentIcon())
})

// Classe para gerenciar o carrossel de projetos
class ProjectCarousel {
  constructor() {
    this.carouselSlides = document.getElementById("carouselSlides")
    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.indicatorsContainer = document.querySelector(".carousel-indicators")

    this.currentSlide = 0
    this.cardsPerPage = 4 // 4 cards por página

    this.autoPlayInterval = null
    this.autoPlayDelay = 15000
    this.isAutoPlaying = true

    this.init()
  }

  init() {
    this.organizeCards()
    this.createIndicators()
    this.updateCarousel()
    this.bindEvents()
    this.startAutoPlay()
  }

  organizeCards() {
    // Pega todos os cards existentes no HTML
    const allCards = Array.from(this.carouselSlides.querySelectorAll(".projects__card"))

    // Limpa o container
    this.carouselSlides.innerHTML = ""

    // Organiza os cards em grupos de 4
    const cardGroups = []
    for (let i = 0; i < allCards.length; i += this.cardsPerPage) {
      cardGroups.push(allCards.slice(i, i + this.cardsPerPage))
    }

    // Cria os slides dinamicamente
    cardGroups.forEach((group, index) => {
      const slide = document.createElement("div")
      slide.className = "carousel-slide"
      if (index === 0) slide.classList.add("active")

      group.forEach((card) => {
        slide.appendChild(card)
      })

      this.carouselSlides.appendChild(slide)
    })

    // Atualiza as referências
    this.slides = document.querySelectorAll(".carousel-slide")
    this.totalSlides = this.slides.length
  }

  createIndicators() {
    // Limpa indicadores existentes
    this.indicatorsContainer.innerHTML = ""

    // Cria novos indicadores baseado no número de slides
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement("button")
      indicator.className = "indicator"
      indicator.setAttribute("data-slide", i)
      if (i === 0) indicator.classList.add("active")

      indicator.addEventListener("click", () => {
        this.goToSlide(i)
        this.resetAutoPlay()
      })

      this.indicatorsContainer.appendChild(indicator)
    }

    // Atualiza a referência dos indicadores
    this.indicators = document.querySelectorAll(".indicator")
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => {
      this.prevSlide()
      this.resetAutoPlay()
    })

    this.nextBtn.addEventListener("click", () => {
      this.nextSlide()
      this.resetAutoPlay()
    })

    // Mantidos apenas os eventos de hover para pausar/retomar auto-play
    this.carouselSlides.addEventListener("mouseenter", () => this.pauseAutoPlay())
    this.carouselSlides.addEventListener("mouseleave", () => this.resumeAutoPlay())
  }

  startAutoPlay() {
    if (!this.isAutoPlaying) return

    this.autoPlayInterval = setInterval(() => {
      if (this.currentSlide < this.totalSlides - 1) {
        this.nextSlide()
      } else {
        this.goToSlide(0)
      }
    }, this.autoPlayDelay)
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }

  resumeAutoPlay() {
    if (this.isAutoPlaying && !this.autoPlayInterval) {
      this.startAutoPlay()
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay()
    this.resumeAutoPlay()
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--
      this.updateCarousel()
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++
      this.updateCarousel()
    }
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex
    this.updateCarousel()
  }

  updateCarousel() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide)
    })

    this.prevBtn.disabled = this.currentSlide === 0
    this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1

    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide)
    })
  }
}

// Inicializa o carrossel quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new ProjectCarousel()
})

// Import ScrollReveal library
const ScrollReveal = window.ScrollReveal

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
})
sr.reveal(`.profile__border`)
sr.reveal(`.profile__name`, {
  delay: 500,
})
sr.reveal(`.profile__profession`, {
  delay: 600,
})
sr.reveal(`.profile__social`, {
  delay: 700,
})
sr.reveal(`.profile__info-group`, {
  interval: 100,
  delay: 700,
})
sr.reveal(`.profile__buttons`, {
  delay: 800,
})
sr.reveal(`.filters__content`, {
  delay: 900,
})
sr.reveal(`.filters`, {
  delay: 1000,
})
