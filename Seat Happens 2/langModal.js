class UniversalTranslator {
  constructor() {
    this.currentLang = this.getSavedLanguage() || 'en-US';
    this.translations = {
      'fil': {
        'welcome': 'Maligayang Pagdating Sa',
        'title': 'CHES CAFE RESTAURANT',
        'tagline': 'Higit Pa Sa Kape. Ito Ang Inyong Tanay Escape',
        'about': 'TUNGKOL SA AMIN',
        'book': 'MAG-BOOK NGAYON',
        'queue': 'TIGNAN ANG PILA',
        'selectLang': 'Piliin Ang Inyong Wika',
        'helpQuestion': 'Paano namin kayo matutulungan?',
        'address': 'Hangganan ng Tanay-Pililla, Manila East Road 1910 Pililla, Pilipinas',
        'phone': '0945 306 6376',
        'hours': 'Lunes-Linggo 10:00 AM - 10:00 PM',
        'aboutTitle': 'Tungkol Sa Ches Cafe',
        'aboutDescription': 'Kami ay isang family restaurant na naghahain ng masasarap na pagkain sa mainit na kapaligiran.',
        'menuTitle': 'Aming Menu',
        'appetizers': 'Pampagana',
        'mainCourse': 'Pangunahing Ulam',
        'desserts': 'Panghimagas',
        'beverages': 'Inumin',
        'contactTitle': 'Makipag-ugnayan Sa Amin',
        'nameLabel': 'Pangalan:',
        'emailLabel': 'Email:',
        'messageLabel': 'Mensahe:',
        'namePlaceholder': 'Ilagay ang inyong pangalan',
        'emailPlaceholder': 'Ilagay ang inyong email',
        'messagePlaceholder': 'Isulat ang inyong mensahe',
        'submitBtn': 'Ipadala',
        // Guest selection page
        'howManyGuests': 'Ilan sa inyo ang sasama sa amin?',
        'largerParty': 'Kung ang inyong grupo ay higit sa 12 bisita, mangyaring direktang makipag-ugnayan sa restaurant.',
        // Calendar page
        'whenJoin': 'Kailan ninyo gustong',
        'likeToJoin': 'sumama sa amin?',
        // Time selection page
        'whatTime': 'Anong oras ninyo gustong',
        'joiningUs': 'sumama sa amin?',
        'on': 'sa',
        'whatReserve': 'Para sa ano ninyo gustong mag-reserve?',
        'indoor': 'LOOB',
        'outdoor': 'LABAS',
        'finalOrders': 'Tumatanggap kami ng huling order hanggang 9:30 PM.',
        // Reserved place page
        'reserveFor': 'Para sa ano ninyo gustong mag-reserve?'
      },
      'es': {
        'welcome': 'Bienvenido a',
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
        'welcome': 'Bienvenue à',
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
        'welcome': 'Benvenuto a',
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
        'welcome': 'Willkommen bei',
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
        'welcome': 'Bem-vindo ao',
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
      },

      'nl': {
        'welcome': 'Welkom bij',
        'title': 'CHES CAFE RESTAURANT',
        'tagline': 'Meer dan een Café. Het is jouw Tanay Ontsnapping',
        'about': 'OVER ONS',
        'book': 'NU BOEKEN',
        'queue': 'RIJ BEKIJKEN',
        'selectLang': 'Selecteer je Taal',
        'helpQuestion': 'Hoe kunnen we je helpen?',
        'address': 'Tanay-Pililla Grens, Manila East Road 1910 Pililla, Filipijnen',
        'phone': '0945 306 6376',
        'hours': 'Maandag-Zondag 10:00 - 22:00',
        'aboutTitle': 'Over Ches Cafe',
        'aboutDescription': 'Wij zijn een familierestaurant dat heerlijk eten serveert in een warme sfeer.',
        'menuTitle': 'Ons Menu',
        'appetizers': 'Voorgerechten',
        'mainCourse': 'Hoofdgerecht',
        'desserts': 'Desserts',
        'beverages': 'Dranken',
        'contactTitle': 'Neem Contact Op',
        'nameLabel': 'Naam:',
        'emailLabel': 'E-mail:',
        'messageLabel': 'Bericht:',
        'namePlaceholder': 'Voer je naam in',
        'emailPlaceholder': 'Voer je e-mail in',
        'messagePlaceholder': 'Schrijf je bericht',
        'submitBtn': 'Versturen',
        'howManyGuests': 'Hoeveel van jullie komen bij ons?',
        'largerParty': 'Als jullie groep groter is dan 12 gasten, neem dan direct contact op met het restaurant.',
        'whenJoin': 'Wanneer willen jullie',
        'likeToJoin': 'bij ons komen?',
        'whatTime': 'Hoe laat willen jullie',
        'joiningUs': 'bij ons komen?',
        'on': 'op',
        'whatReserve': 'Wat willen jullie reserveren?',
        'indoor': 'BINNEN',
        'outdoor': 'BUITEN',
        'finalOrders': 'We nemen laatste bestellingen tot 21:30.',
        'reserveFor': 'Wat willen jullie reserveren?'
      },
      'pl': {
        'welcome': 'Witamy w',
        'title': 'RESTAURACJA CHES CAFE',
        'tagline': 'Więcej niż Kawiarnia. To Twoja Ucieczka Tanay',
        'about': 'O NAS',
        'book': 'ZAREZERWUJ TERAZ',
        'queue': 'ZOBACZ KOLEJKĘ',
        'selectLang': 'Wybierz swój Język',
        'helpQuestion': 'Jak możemy ci pomóc?',
        'address': 'Granica Tanay-Pililla, Manila East Road 1910 Pililla, Filipiny',
        'phone': '0945 306 6376',
        'hours': 'Poniedziałek-Niedziela 10:00 - 22:00',
        'aboutTitle': 'O Ches Cafe',
        'aboutDescription': 'Jesteśmy rodzinną restauracją serwującą pyszne jedzenie w ciepłej atmosferze.',
        'menuTitle': 'Nasze Menu',
        'appetizers': 'Przystawki',
        'mainCourse': 'Danie Główne',
        'desserts': 'Desery',
        'beverages': 'Napoje',
        'contactTitle': 'Skontaktuj się z Nami',
        'nameLabel': 'Imię:',
        'emailLabel': 'E-mail:',
        'messageLabel': 'Wiadomość:',
        'namePlaceholder': 'Wprowadź swoje imię',
        'emailPlaceholder': 'Wprowadź swój e-mail',
        'messagePlaceholder': 'Napisz swoją wiadomość',
        'submitBtn': 'Wyślij',
        'howManyGuests': 'Ile z was dołączy do nas?',
        'largerParty': 'Jeśli wasza grupa liczy więcej niż 12 gości, skontaktujcie się bezpośrednio z restauracją.',
        'whenJoin': 'Kiedy chcielibyście',
        'likeToJoin': 'dołączyć do nas?',
        'whatTime': 'O której godzinie chcielibyście',
        'joiningUs': 'dołączyć do nas?',
        'on': 'w',
        'whatReserve': 'Co chcielibyście zarezerwować?',
        'indoor': 'WNĘTRZE',
        'outdoor': 'NA ZEWNĄTRZ',
        'finalOrders': 'Przyjmujemy ostatnie zamówienia do 21:30.',
        'reserveFor': 'Co chcielibyście zarezerwować?'
      },
      'ro': {
        'welcome': 'Bine ați venit la',
        'title': 'RESTAURANTUL CHES CAFE',
        'tagline': 'Mai mult decât o Cafenea. Este Evadarea ta Tanay',
        'about': 'DESPRE NOI',
        'book': 'REZERVĂ ACUM',
        'queue': 'VEZI COADA',
        'selectLang': 'Selectează limba ta',
        'helpQuestion': 'Cum te putem ajuta?',
        'address': 'Granița Tanay-Pililla, Manila East Road 1910 Pililla, Filipine',
        'phone': '0945 306 6376',
        'hours': 'Luni-Duminică 10:00 - 22:00',
        'aboutTitle': 'Despre Ches Cafe',
        'aboutDescription': 'Suntem un restaurant de familie care servește mâncare delicioasă într-o atmosferă caldă.',
        'menuTitle': 'Meniul nostru',
        'appetizers': 'Aperitive',
        'mainCourse': 'Felul Principal',
        'desserts': 'Deserturi',
        'beverages': 'Băuturi',
        'contactTitle': 'Contactează-ne',
        'nameLabel': 'Nume:',
        'emailLabel': 'E-mail:',
        'messageLabel': 'Mesaj:',
        'namePlaceholder': 'Introdu numele tău',
        'emailPlaceholder': 'Introdu e-mailul tău',
        'messagePlaceholder': 'Scrie mesajul tău',
        'submitBtn': 'Trimite',
        'howManyGuests': 'Câți dintre voi ne veți vizita?',
        'largerParty': 'Dacă grupul vostru are mai mult de 12 oaspeți, vă rugăm să contactați restaurantul direct.',
        'whenJoin': 'Când ați dori să',
        'likeToJoin': 'ne vizitați?',
        'whatTime': 'La ce oră ați dori să',
        'joiningUs': 'ne vizitați?',
        'on': 'pe',
        'whatReserve': 'Ce ați dori să rezervați?',
        'indoor': 'INTERIOR',
        'outdoor': 'EXTERIOR',
        'finalOrders': 'Primim ultimele comenzi până la 21:30.',
        'reserveFor': 'Ce ați dori să rezervați?'
      },
      'sv': {
        'welcome': 'Välkommen till',
        'title': 'CHES CAFE RESTAURANG',
        'tagline': 'Mer än ett Kafé. Det är din Tanay Flykt',
        'about': 'OM OSS',
        'book': 'BOKA NU',
        'queue': 'SE KÖ',
        'selectLang': 'Välj ditt Språk',
        'helpQuestion': 'Hur kan vi hjälpa dig?',
        'address': 'Tanay-Pililla Gräns, Manila East Road 1910 Pililla, Filippinerna',
        'phone': '0945 306 6376',
        'hours': 'Måndag-Söndag 10:00 - 22:00',
        'aboutTitle': 'Om Ches Cafe',
        'aboutDescription': 'Vi är en familjerestaurang som serverar läcker mat i en varm atmosfär.',
        'menuTitle': 'Vår Meny',
        'appetizers': 'Förrätter',
        'mainCourse': 'Huvudrätt',
        'desserts': 'Efterrätter',
        'beverages': 'Drycker',
        'contactTitle': 'Kontakta Oss',
        'nameLabel': 'Namn:',
        'emailLabel': 'E-post:',
        'messageLabel': 'Meddelande:',
        'namePlaceholder': 'Ange ditt namn',
        'emailPlaceholder': 'Ange din e-post',
        'messagePlaceholder': 'Skriv ditt meddelande',
        'submitBtn': 'Skicka',
  'howManyGuests': 'Hur många av er kommer att besöka oss?',
  'largerParty': 'Om er grupp har fler än 12 gäster, vänligen kontakta restaurangen direkt.',
  'whenJoin': 'När skulle ni vilja',
  'likeToJoin': 'besöka oss?',
  'whatTime': 'Vilken tid skulle ni vilja',
  'joiningUs': 'besöka oss?',
  'on': 'den',
  'whatReserve': 'Vad skulle ni vilja reservera?',
  'indoor': 'INOMHUS',
  'outdoor': 'UTOMHUS',
  'finalOrders': 'Vi tar emot sista beställningen kl. 21:30.',
  'reserveFor': 'Vad skulle ni vilja reservera?'
}, 

'fi': {
  'welcome': 'Tervetuloa',
  'title': 'RESTAURANT CHES CAFE',
  'tagline': 'Enemmän kuin kahvila. Se on pakopaikkasi Tanayssa',
  'about': 'MEISTÄ',
  'book': 'VARAA NYT',
  'queue': 'NÄYTÄ JONO',
  'selectLang': 'Valitse kieli',
  'helpQuestion': 'Kuinka voimme auttaa?',
  'address': 'Tanay‑Pililla rajalla, Manila East Road 1910 Pililla, Filippiinit',
  'phone': '0945 306 6376',
  'hours': 'Ma‑Su 10:00–22:00',
  'aboutTitle': 'Tietoa Ches Cafesta',
  'aboutDescription': 'Olemme perheravintola, joka tarjoilee herkullista ruokaa kodikkaassa ilmapiirissä.',
  'menuTitle': 'Menumme',
  'appetizers': 'Alkupalat',
  'mainCourse': 'Pääruoka',
  'desserts': 'Jälkiruoat',
  'beverages': 'Juomat',
  'contactTitle': 'Ota yhteyttä',
  'nameLabel': 'Nimi:',
  'emailLabel': 'Sähköposti:',
  'messageLabel': 'Viesti:',
  'namePlaceholder': 'Kirjoita nimesi',
  'emailPlaceholder': 'Kirjoita sähköpostisi',
  'messagePlaceholder': 'Kirjoita viesti',
  'submitBtn': 'Lähetä',
  'howManyGuests': 'Kuinka moni teistä liittyy seuraamme?',
  'largerParty': 'Jos ryhmäsi on yli 12 henkeä, ota yhteys ravintolaan suoraan.',
  'whenJoin': 'Milloin haluaisitte',
  'likeToJoin': 'käydä luonamme?',
  'whatTime': 'Mihin aikaan haluaisitte',
  'joiningUs': 'käydä luonamme?',
  'on': 'päivänä',
  'whatReserve': 'Mitä haluatte varata?',
  'indoor': 'SISÄTILAT',
  'outdoor': 'ULKOTILAT',
  'finalOrders': 'Otamme viimeiset tilaukset klo 21:30.',
  'reserveFor': 'Mitä haluatte varata?'
},

'da': {
  'welcome': 'Velkommen til',
  'title': 'RESTAURANT CHES CAFE',
  'tagline': 'Mere end en Café. Dit tilflugtssted i Tanay',
  'about': 'OM OS',
  'book': 'BOOK NU',
  'queue': 'SE KØ',
  'selectLang': 'Vælg dit sprog',
  'helpQuestion': 'Hvordan kan vi hjælpe?',
  'address': 'Tanay‑Pililla grænse, Manila East Road 1910 Pililla, Filippinerne',
  'phone': '0945 306 6376',
  'hours': 'Man‑Søn 10:00–22:00',
  'aboutTitle': 'Om Ches Cafe',
  'aboutDescription': 'Vi er en familierestaurant, der serverer lækker mad i en hyggelig atmosfære.',
  'menuTitle': 'Vores Menu',
  'appetizers': 'Forretter',
  'mainCourse': 'Hovedret',
  'desserts': 'Desserter',
  'beverages': 'Drikkevarer',
  'contactTitle': 'Kontakt os',
  'nameLabel': 'Navn:',
  'emailLabel': 'Email:',
  'messageLabel': 'Besked:',
  'namePlaceholder': 'Indtast dit navn',
  'emailPlaceholder': 'Indtast din email',
  'messagePlaceholder': 'Skriv din besked',
  'submitBtn': 'Send',
  'howManyGuests': 'Hvor mange af jer kommer?',
  'largerParty': 'Hvis jeres gruppe er på over 12 gæster, kontakt venligst restauranten direkte.',
  'whenJoin': 'Hvornår vil I gerne',
  'likeToJoin': 'besøge os?',
  'whatTime': 'Hvad tid vil I gerne',
  'joiningUs': 'besøge os?',
  'on': 'den',
  'whatReserve': 'Hvad vil I gerne reservere?',
  'indoor': 'INDENDØRS',
  'outdoor': 'UDENDØRS',
  'finalOrders': 'Vi modtager sidste bestilling kl. 21:30.',
  'reserveFor': 'Hvad vil I gerne reservere?'
},
'no': {
  'welcome': 'Velkommen til',
  'title': 'RESTAURANT CHES CAFE',
  'tagline': 'Mer enn en kafé. Din flukt fra Tanay',
  'about': 'OM OSS',
  'book': 'RESERVER NÅ',
  'queue': 'SE KØ',
  'selectLang': 'Velg språk',
  'helpQuestion': 'Hvordan kan vi hjelpe?',
  'address': 'Tanay‑Pililla grensen, Manila East Road 1910 Pililla, Filippinene',
  'phone': '0945 306 6376',
  'hours': 'Man‑Søn 10:00–22:00',
  'aboutTitle': 'Om Ches Cafe',
  'aboutDescription': 'Vi er en familierestaurant som serverer deilig mat i en koselig atmosfære.',
  'menuTitle': 'Vår meny',
  'appetizers': 'Forretter',
  'mainCourse': 'Hovedrett',
  'desserts': 'Desserter',
  'beverages': 'Drikke',
  'contactTitle': 'Kontakt oss',
  'nameLabel': 'Navn:',
  'emailLabel': 'E‑post:',
  'messageLabel': 'Melding:',
  'namePlaceholder': 'Skriv inn navnet ditt',
  'emailPlaceholder': 'Skriv inn e‑postadressen din',
  'messagePlaceholder': 'Skriv meldingen din',
  'submitBtn': 'Send',
  'howManyGuests': 'Hvor mange av dere vil bli med oss?',
  'largerParty': 'Hvis gruppen består av mer enn 12 gjester, vennligst kontakt restauranten direkte.',
  'whenJoin': 'Når ønsker dere å',
  'likeToJoin': 'bli med oss?',
  'whatTime': 'Når tid ønsker dere å',
  'joiningUs': 'bli med oss?',
  'on': 'den',
  'whatReserve': 'Hva ønsker dere å reservere?',
  'indoor': 'INNENDØRS',
  'outdoor': 'UTENDØRS',
  'finalOrders': 'Vi tar imot siste bestilling kl. 21:30.',
  'reserveFor': 'Hva ønsker dere å reservere?'
},

'cz': {
  'welcome': 'Vítejte v',
  'title': 'RESTAURACE CHES CAFE',
  'tagline': 'Více než kavárna. Vaše únikové místo v Tanayu',
  'about': 'O NÁS',
  'book': 'REZERVOVAT NYNÍ',
  'queue': 'ZOBRAZIT FRONTU',
  'selectLang': 'Vyberte jazyk',
  'helpQuestion': 'Jak vám můžeme pomoci?',
  'address': 'Na hranici Tanay‑Pililla, Manila East Road 1910 Pililla, Filipíny',
  'phone': '0945 306 6376',
  'hours': 'Po–Ne 10:00–22:00',
  'aboutTitle': 'O Ches Cafe',
  'aboutDescription': 'Jsme rodinná restaurace, která podává vynikající jídlo v útulné atmosféře.',
  'menuTitle': 'Naše menu',
  'appetizers': 'Předkrmy',
  'mainCourse': 'Hlavní chod',
  'desserts': 'Dezerty',
  'beverages': 'Nápoje',
  'contactTitle': 'Kontaktujte nás',
  'nameLabel': 'Jméno:',
  'emailLabel': 'E‑mail:',
  'messageLabel': 'Zpráva:',
  'namePlaceholder': 'Zadejte své jméno',
  'emailPlaceholder': 'Zadejte svůj e‑mail',
  'messagePlaceholder': 'Napište svou zprávu',
  'submitBtn': 'Odeslat',
  'howManyGuests': 'Kolik z vás se k nám připojí?',
  'largerParty': 'Pokud je vaše skupina větší než 12 hostů, kontaktujte prosím restauraci přímo.',
  'whenJoin': 'Kdy byste si přáli',
  'likeToJoin': 'nás navštívit?',
  'whatTime': 'V kolik hodin byste si přáli',
  'joiningUs': 'nás navštívit?',
  'on': 'v',
  'whatReserve': 'Co byste si přáli rezervovat?',
  'indoor': 'VNITŘEK',
  'outdoor': 'VENKOVNÍ',
  'finalOrders': 'Poslední objednávky přijímáme do 21:30.',
  'reserveFor': 'Co byste si přáli rezervovat?'
},

'hu': {
  'welcome': 'Üdvözöllek a',
  'title': 'RESTAURANT CHES CAFE',
  'tagline': 'Több mint egy kávézó. A menekülésed Tanayból',
  'about': 'RÓLUNK',
  'book': 'FOGLALJ MOST',
  'queue': 'SORKÖVETÉS',
  'selectLang': 'Válassz nyelvet',
  'helpQuestion': 'Miben segíthetünk?',
  'address': 'Tanay‑Pililla határ, Manila East Road 1910 Pililla, Fülöp-szigetek',
  'phone': '0945 306 6376',
  'hours': 'H–V 10:00–22:00',
  'aboutTitle': 'A Ches Cafe-ról',
  'aboutDescription': 'Családi étterem vagyunk, amely finom ételeket kínál meghitt környezetben.',
  'menuTitle': 'Az étlapunk',
  'appetizers': 'Előételek',
  'mainCourse': 'Főétel',
  'desserts': 'Desszertek',
  'beverages': 'Italok',
  'contactTitle': 'Kapcsolat',
  'nameLabel': 'Név:',
  'emailLabel': 'Email:',
  'messageLabel': 'Üzenet:',
  'namePlaceholder': 'Add meg a neved',
  'emailPlaceholder': 'Add meg az emailed',
  'messagePlaceholder': 'Írd meg az üzeneted',
  'submitBtn': 'Küldés',
  'howManyGuests': 'Hányan csatlakoztok hozzánk?',
  'largerParty': 'Ha a csoportotok több mint 12 fő, kérjük, közvetlenül lépjetek kapcsolatba az étteremmel.',
  'whenJoin': 'Mikor szeretnétek',
  'likeToJoin': 'minket meglátogatni?',
  'whatTime': 'Mikor szeretnétek',
  'joiningUs': 'minket meglátogatni?',
  'on': 'én/én',  
  'whatReserve': 'Mit szeretnétek foglalni?',
  'indoor': 'BELTÉR',
  'outdoor': 'KÜLTÉR',
  'finalOrders': 'Az utolsó rendeléseket 21:30-ig fogadjuk.',
  'reserveFor': 'Mit szeretnétek foglalni?'
},

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
      case 'fil':
        if (guests === 1) return 'kayo';
        else if (guests === 2) return 'kayong dalawa';
        else return `kayong ${guests}`;
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