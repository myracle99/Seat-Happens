class UniversalTranslator {
  constructor() {
    this.currentLang = this.getSavedLanguage() || 'en-US';
    this.translations = {
      'es': {
        'welcome': 'BIENVENIDO A',
        'title': 'RESTAURANTE CHES CAFE',
        'tagline': 'Más que un Café. Es tu Escape de Tanay',
        'about': 'SOBRE NOSOTROS',
        'book': 'RESERVAR AHORA',
        'queue': 'VER COLA',
        'selectLang': 'Selecciona tu Idioma',
        'helpQuestion': '¿Cómo podemos ayudarte?',
        'address': 'Límite Tanay-Pililla, Manila East Road 1910 Pililla, Filipinas',
        'phone': '0945 306 6376',
        'hours': 'Lunes-Domingo 10:00 AM - 10:00 PM',
        'aboutTitle': 'Sobre Ches Cafe',
        'aboutDescription': 'Somos un restaurante familiar que sirve deliciosa comida en un ambiente acogedor.',
        'menuTitle': 'Nuestro Menú',
        'appetizers': 'Aperitivos',
        'mainCourse': 'Plato Principal',
        'desserts': 'Postres',
        'beverages': 'Bebidas',
        'contactTitle': 'Contáctanos',
        'nameLabel': 'Nombre:',
        'emailLabel': 'Correo:',
        'messageLabel': 'Mensaje:',
        'namePlaceholder': 'Ingresa tu nombre',
        'emailPlaceholder': 'Ingresa tu correo',
        'messagePlaceholder': 'Escribe tu mensaje',
        'submitBtn': 'Enviar',
        // Guest selection page
        'howManyGuests': '¿Cuántos de ustedes se unirán a nosotros?',
        'largerParty': 'Si tu grupo es mayor a 12 invitados, por favor contacta al restaurante directamente.',
        // Calendar page
        'whenJoin': '¿Cuándo les gustaría',
        'likeToJoin': 'acompañarnos?',
        // Time selection page
        'whatTime': '¿A qué hora les gustaría',
        'joiningUs': 'acompañarnos?',
        'on': 'el',
        'whatReserve': '¿Para qué les gustaría reservar?',
        'indoor': 'INTERIOR',
        'outdoor': 'EXTERIOR',
        'finalOrders': 'Tomamos pedidos finales a las 9:30 PM.',
        // Reserved place page
        'reserveFor': '¿Para qué les gustaría reservar?'
      },
      'fr': {
        'welcome': 'BIENVENUE À',
        'title': 'RESTAURANT CHES CAFE',
        'tagline': 'Plus qu\'un Café. C\'est votre Évasion Tanay',
        'about': 'À PROPOS',
        'book': 'RÉSERVER',
        'queue': 'VOIR LA FILE',
        'selectLang': 'Sélectionnez votre Langue',
        'helpQuestion': 'Comment pouvons-nous vous aider?',
        'address': 'Frontière Tanay-Pililla, Manila East Road 1910 Pililla, Philippines',
        'phone': '0945 306 6376',
        'hours': 'Lundi-Dimanche 10h00 - 22h00',
        'aboutTitle': 'À Propos de Ches Cafe',
        'aboutDescription': 'Nous sommes un restaurant familial servant une délicieuse cuisine dans une atmosphère chaleureuse.',
        'menuTitle': 'Notre Menu',
        'appetizers': 'Entrées',
        'mainCourse': 'Plat Principal',
        'desserts': 'Desserts',
        'beverages': 'Boissons',
        'contactTitle': 'Contactez-nous',
        'nameLabel': 'Nom:',
        'emailLabel': 'E-mail:',
        'messageLabel': 'Message:',
        'namePlaceholder': 'Entrez votre nom',
        'emailPlaceholder': 'Entrez votre e-mail',
        'messagePlaceholder': 'Écrivez votre message',
        'submitBtn': 'Envoyer',
        // Guest selection page
        'howManyGuests': 'Combien d\'entre vous nous rejoindront?',
        'largerParty': 'Si votre groupe compte plus de 12 invités, veuillez contacter le restaurant directement.',
        // Calendar page
        'whenJoin': 'Quand aimeriez-vous',
        'likeToJoin': 'nous rejoindre?',
        // Time selection page
        'whatTime': 'À quelle heure aimeriez-vous',
        'joiningUs': 'nous rejoindre?',
        'on': 'le',
        'whatReserve': 'Pour quoi aimeriez-vous réserver?',
        'indoor': 'INTÉRIEUR',
        'outdoor': 'EXTÉRIEUR',
        'finalOrders': 'Nous prenons les commandes finales à 21h30.',
        // Reserved place page
        'reserveFor': 'Pour quoi aimeriez-vous réserver?'
      },
      'zh': {
        'welcome': '欢迎来到',
        'title': 'CHES咖啡餐厅',
        'tagline': '不仅仅是咖啡厅。这是您的塔奈逃逸',
        'about': '关于我们',
        'book': '立即预订',
        'queue': '查看队列',
        'selectLang': '选择您的语言',
        'helpQuestion': '我们如何帮助您？',
        'address': '塔奈-皮利拉边界，马尼拉东路1910皮利拉，菲律宾',
        'phone': '0945 306 6376',
        'hours': '周一至周日 10:00 上午 - 10:00 下午',
        'aboutTitle': '关于Ches咖啡厅',
        'aboutDescription': '我们是一家家庭经营的餐厅，在温馨的环境中提供美味的食物。',
        'menuTitle': '我们的菜单',
        'appetizers': '开胃菜',
        'mainCourse': '主菜',
        'desserts': '甜点',
        'beverages': '饮料',
        'contactTitle': '联系我们',
        'nameLabel': '姓名：',
        'emailLabel': '邮箱：',
        'messageLabel': '消息：',
        'namePlaceholder': '输入您的姓名',
        'emailPlaceholder': '输入您的邮箱',
        'messagePlaceholder': '写下您的消息',
        'submitBtn': '提交',
        // Guest selection page
        'howManyGuests': '您们几位将加入我们？',
        'largerParty': '如果您的聚会人数超过12位客人，请直接联系餐厅。',
        // Calendar page
        'whenJoin': '您们什么时候',
        'likeToJoin': '想加入我们？',
        // Time selection page
        'whatTime': '您们什么时间',
        'joiningUs': '想加入我们？',
        'on': '在',
        'whatReserve': '您想预订什么？',
        'indoor': '室内',
        'outdoor': '室外',
        'finalOrders': '我们在晚上9:30接受最后订单。',
        // Reserved place page
        'reserveFor': '您想预订什么？'
      },
      'ja': {
        'welcome': 'ようこそ',
        'title': 'チェスカフェレストラン',
        'tagline': 'カフェ以上の存在。あなたのタナイエスケープ',
        'about': '私たちについて',
        'book': '今すぐ予約',
        'queue': 'キューを見る',
        'selectLang': '言語を選択',
        'helpQuestion': 'どのようにお手伝いしましょうか？',
        'address': 'タナイ・ピリリャ境界、マニラ東道路1910ピリリャ、フィリピン',
        'phone': '0945 306 6376',
        'hours': '月〜日 午前10:00 - 午後10:00',
        'aboutTitle': 'チェスカフェについて',
        'aboutDescription': '私たちは温かい雰囲気で美味しい料理を提供する家族経営のレストランです。',
        'menuTitle': '私たちのメニュー',
        'appetizers': '前菜',
        'mainCourse': 'メインコース',
        'desserts': 'デザート',
        'beverages': '飲み物',
        'contactTitle': 'お問い合わせ',
        'nameLabel': '名前：',
        'emailLabel': 'メール：',
        'messageLabel': 'メッセージ：',
        'namePlaceholder': 'お名前を入力',
        'emailPlaceholder': 'メールアドレスを入力',
        'messagePlaceholder': 'メッセージを書く',
        'submitBtn': '送信',
        // Guest selection page
        'howManyGuests': '何名様でいらっしゃいますか？',
        'largerParty': '12名様を超える場合は、直接レストランにお問い合わせください。',
        // Calendar page
        'whenJoin': 'いつ',
        'likeToJoin': 'お越しになりますか？',
        // Time selection page
        'whatTime': '何時に',
        'joiningUs': 'お越しになりますか？',
        'on': 'の',
        'whatReserve': '何を予約されますか？',
        'indoor': '屋内',
        'outdoor': '屋外',
        'finalOrders': '最終注文は午後9:30までです。',
        // Reserved place page
        'reserveFor': '何を予約されますか？'
      },
      'it': {
        'welcome': 'BENVENUTO A',
        'title': 'RISTORANTE CHES CAFE',
        'tagline': 'Più di un Caffè. È la tua Fuga Tanay',
        'about': 'CHI SIAMO',
        'book': 'PRENOTA ORA',
        'queue': 'VEDI CODA',
        'selectLang': 'Seleziona la tua Lingua',
        'helpQuestion': 'Come possiamo aiutarti?',
        'address': 'Confine Tanay-Pililla, Manila East Road 1910 Pililla, Filippine',
        'phone': '0945 306 6376',
        'hours': 'Lunedì-Domenica 10:00 - 22:00',
        // Guest selection page
        'howManyGuests': 'Quanti di voi si uniranno a noi?',
        'largerParty': 'Se il vostro gruppo è più grande di 12 ospiti, contattate direttamente il ristorante.',
        // Calendar page
        'whenJoin': 'Quando vorreste',
        'likeToJoin': 'unirvi a noi?',
        // Time selection page
        'whatTime': 'A che ora vorreste',
        'joiningUs': 'unirvi a noi?',
        'on': 'il',
        'whatReserve': 'Cosa vorreste prenotare?',
        'indoor': 'INTERNO',
        'outdoor': 'ESTERNO',
        'finalOrders': 'Accettiamo ordini finali fino alle 21:30.',
        // Reserved place page
        'reserveFor': 'Cosa vorreste prenotare?'
      },
      'de': {
        'welcome': 'WILLKOMMEN BEI',
        'title': 'CHES CAFE RESTAURANT',
        'tagline': 'Mehr als ein Café. Es ist dein Tanay Escape',
        'about': 'ÜBER UNS',
        'book': 'JETZT BUCHEN',
        'queue': 'WARTESCHLANGE ANZEIGEN',
        'selectLang': 'Wähle deine Sprache',
        'helpQuestion': 'Wie können wir dir helfen?',
        'address': 'Tanay-Pililla Grenze, Manila East Road 1910 Pililla, Philippinen',
        'phone': '0945 306 6376',
        'hours': 'Montag-Sonntag 10:00 - 22:00',
        // Guest selection page
        'howManyGuests': 'Wie viele von euch werden sich uns anschließen?',
        'largerParty': 'Wenn eure Gruppe größer als 12 Gäste ist, kontaktiert bitte das Restaurant direkt.',
        // Calendar page
        'whenJoin': 'Wann möchtet ihr',
        'likeToJoin': 'euch uns anschließen?',
        // Time selection page
        'whatTime': 'Um welche Zeit möchtet ihr',
        'joiningUs': 'euch uns anschließen?',
        'on': 'am',
        'whatReserve': 'Was möchtet ihr reservieren?',
        'indoor': 'INNENBEREICH',
        'outdoor': 'AUSSENBEREICH',
        'finalOrders': 'Wir nehmen letzte Bestellungen bis 21:30 Uhr an.',
        // Reserved place page
        'reserveFor': 'Was möchtet ihr reservieren?'
      },
      'pt': {
        'welcome': 'BEM-VINDO AO',
        'title': 'RESTAURANTE CHES CAFE',
        'tagline': 'Mais que um Café. É o seu Escape Tanay',
        'about': 'SOBRE NÓS',
        'book': 'RESERVAR AGORA',
        'queue': 'VER FILA',
        'selectLang': 'Selecione seu Idioma',
        'helpQuestion': 'Como podemos ajudá-lo?',
        'address': 'Fronteira Tanay-Pililla, Manila East Road 1910 Pililla, Filipinas',
        'phone': '0945 306 6376',
        'hours': 'Segunda-Domingo 10:00 - 22:00',
        // Guest selection page
        'howManyGuests': 'Quantos de vocês se juntarão a nós?',
        'largerParty': 'Se seu grupo for maior que 12 convidados, entre em contato diretamente com o restaurante.',
        // Calendar page
        'whenJoin': 'Quando vocês gostariam de',
        'likeToJoin': 'se juntar a nós?',
        // Time selection page
        'whatTime': 'A que horas vocês gostariam de',
        'joiningUs': 'se juntar a nós?',
        'on': 'no',
        'whatReserve': 'O que vocês gostariam de reservar?',
        'indoor': 'INTERNO',
        'outdoor': 'EXTERNO',
        'finalOrders': 'Aceitamos pedidos finais até às 21:30.',
        // Reserved place page
        'reserveFor': 'O que vocês gostariam de reservar?'
      }
    };

    this.init();
  }

  init() {
    this.updateCurrentLangDisplay();

    // Apply translations immediately if not English
    if (this.currentLang !== 'en-US') {
      this.applyTranslations();
    }

    this.setupEventListeners();
  }

  getSavedLanguage() {
    // First check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    if (langFromUrl) {
      // Save to localStorage when found in URL
      localStorage.setItem('selectedLanguage', langFromUrl);
      return langFromUrl;
    }

    // Then check localStorage
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
      return savedLang;
    }

    // Finally check window variable (fallback)
    return window.selectedLanguage || 'en-US';
  }

  saveLanguage(lang) {
    this.currentLang = lang;
    // Save to both localStorage and window variable
    localStorage.setItem('selectedLanguage', lang);
    window.selectedLanguage = lang;
    this.updateNavigationLinks(lang);
  }

  updateNavigationLinks(lang) {
    const links = document.querySelectorAll('a[href*=".html"]');
    links.forEach(link => {
      let href = link.getAttribute('href');
      if (!href) return;

      try {
        // Create URL object to properly handle the href
        const url = new URL(href, window.location.href);
        url.searchParams.set('lang', lang);
        
        // Update the link with the new URL
        link.setAttribute('href', url.pathname + url.search);
      } catch (error) {
        // Fallback for relative URLs
        const separator = href.includes('?') ? '&' : '?';
        link.setAttribute('href', href + separator + 'lang=' + lang);
      }
    });
  }

  updateCurrentLangDisplay() {
    const currentLangSpan = document.getElementById('currentLang');
    if (currentLangSpan) {
      currentLangSpan.textContent = this.currentLang.split('-')[0].toUpperCase();
    }
  }

  applyTranslations() {
    const baseLang = this.currentLang.split('-')[0]; // e.g., 'es' from 'es-ES'
    const langData = this.translations[baseLang];
    
    if (!langData) return; // No translation available, stay in English

    // Translate text content
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
      const key = element.getAttribute('data-translate');
      if (langData[key]) {
        element.textContent = langData[key];
      }
    });

    // Translate placeholders
    const elementsWithPlaceholders = document.querySelectorAll('[data-translate-placeholder]');
    elementsWithPlaceholders.forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      if (langData[key]) {
        element.setAttribute('placeholder', langData[key]);
      }
    });

    // Translate alt text
    const elementsWithAltText = document.querySelectorAll('[data-translate-alt]');
    elementsWithAltText.forEach(element => {
      const key = element.getAttribute('data-translate-alt');
      if (langData[key]) {
        element.setAttribute('alt', langData[key]);
      }
    });

    // Translate title attributes
    const elementsWithTitle = document.querySelectorAll('[data-translate-title]');
    elementsWithTitle.forEach(element => {
      const key = element.getAttribute('data-translate-title');
      if (langData[key]) {
        element.setAttribute('title', langData[key]);
      }
    });

    // Custom translation for dynamic content (like guest count text)
    this.translateDynamicContent();
  }

  translateDynamicContent() {
    const baseLang = this.currentLang.split('-')[0];
    const langData = this.translations[baseLang];
    
    if (!langData) return;

    // Handle dynamic guest count text in calendar and time pages
    const guestCountElement = document.getElementById('guest-count');
    if (guestCountElement) {
      const guests = parseInt(localStorage.getItem('guests')) || 2;
      let guestText = this.getGuestText(guests, baseLang);
      guestCountElement.textContent = guestText;
    }
  }

  getGuestText(guests, lang) {
    switch (lang) {
      case 'es':
        if (guests === 1) return 'tú';
        else if (guests === 2) return 'ustedes 2';
        else return `todos los ${guests} de ustedes`;
      case 'fr':
        if (guests === 1) return 'vous';
        else if (guests === 2) return 'vous 2';
        else return `vous ${guests}`;
      case 'zh':
        if (guests === 1) return '您';
        else if (guests === 2) return '您们2位';
        else return `您们${guests}位`;
      case 'ja':
        if (guests === 1) return 'あなた';
        else if (guests === 2) return 'お二人';
        else return `${guests}名様`;
      case 'it':
        if (guests === 1) return 'tu';
        else if (guests === 2) return 'voi 2';
        else return `tutti i ${guests} di voi`;
      case 'de':
        if (guests === 1) return 'du';
        else if (guests === 2) return 'ihr 2';
        else return `alle ${guests} von euch`;
      case 'pt':
        if (guests === 1) return 'você';
        else if (guests === 2) return 'vocês 2';
        else return `todos os ${guests} de vocês`;
      default:
        if (guests === 1) return 'you';
        else if (guests === 2) return 'the 2 of you';
        else return `all ${guests} of you`;
    }
  }

  setupEventListeners() {
    const currentPage = window.location.pathname.split('/').pop() || 'homepage.html';

    // Always update navigation links regardless of page
    this.updateNavigationLinks(this.currentLang);

    // Only set up modal on homepage
    if (currentPage === 'homepage.html' || currentPage === '') {
      this.setupLanguageModal();
    }
  }

  setupLanguageModal() {
    const langBtn = document.getElementById('langBtn');
    const langModal = document.getElementById('langModal');
    const closeModal = document.getElementById('closeModal');

    if (langBtn && langModal && closeModal) {
      langBtn.addEventListener('click', () => {
        langModal.style.display = 'block';
      });

      closeModal.addEventListener('click', () => {
        langModal.style.display = 'none';
      });

      window.addEventListener('click', e => {
        if (e.target === langModal) {
          langModal.style.display = 'none';
        }
      });

      const langOptions = document.querySelectorAll('.lang-option');
      langOptions.forEach(option => {
        option.addEventListener('click', () => {
          const selectedLang = option.getAttribute('data-lang');
          
          // Save the language
          this.saveLanguage(selectedLang);
          
          // Apply translations immediately
          this.applyTranslations();
          this.updateCurrentLangDisplay();
          
          // Close modal
          langModal.style.display = 'none';

          // Optional: Refresh page to ensure all elements are properly translated
          // You can remove this if you prefer instant translation without page reload
          setTimeout(() => {
            const url = new URL(window.location);
            url.searchParams.set('lang', selectedLang);
            window.location.href = url.toString();
          }, 100);
        });
      });
    }
  }

  // Method to manually trigger translation (useful for dynamic content)
  retranslate() {
    this.applyTranslations();
    this.updateCurrentLangDisplay();
    this.updateNavigationLinks(this.currentLang);
  }
}

// Initialize translator when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.translator = new UniversalTranslator();
});

// Make translator globally available
window.UniversalTranslator = UniversalTranslator;