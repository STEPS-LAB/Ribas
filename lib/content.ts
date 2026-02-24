export type Locale = "ua" | "en";

export type Room = {
  id: string;
  title: string;
  price: string;
  details: string;
  image: string;
  imageMobile: string;
};

export type Amenity = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageMobile: string;
};

export type WhyItem = {
  id: string;
  title: string;
  description: string;
};

type LocalizedContent = {
  navBook: string;
  navRooms: string;
  navSpa: string;
  navRestaurant: string;
  navContacts: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTag: string;
  searchDates: string;
  searchGuests: string;
  searchButton: string;
  searchAiText: string;
  searchSuccessMessage: string;
  calendarLabel: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutBody: string;
  roomsLabel: string;
  roomsTitle: string;
  roomsSubtitle: string;
  exploreButton: string;
  amenitiesLabel: string;
  amenitiesTitle: string;
  amenitiesSubtitle: string;
  whyLabel: string;
  whyTitle: string;
  whySubtitle: string;
  chatCta: string;
  chatGreeting: string;
  stickyBook: string;
  footerNewsletter: string;
  footerSubscribe: string;
  contactHeading: string;
  socialHeading: string;
  footerAddress: string;
  footerInstagram: string;
  footerFacebook: string;
  emailPlaceholder: string;
  footerCredits: string;
  bookingModalTitle: string;
  checkIn: string;
  checkOut: string;
  guestsLabel: string;
  pickRoomButton: string;
  modalClose: string;
}

export const BOOKING_MODAL_MAX_GUESTS = 8;

export const localized: Record<Locale, LocalizedContent> = {
  ua: {
    navBook: "Забронювати",
    navRooms: "Номери",
    navSpa: "SPA та Відпочинок",
    navRestaurant: "Ресторан",
    navContacts: "Контакти",
    heroTitle: "RIBAS KARPATY",
    heroSubtitle: "Відпочинок, що не має пауз",
    heroTag: "Premium mountain escape",
    searchDates: "Дати",
    searchGuests: "Гості",
    searchButton: "Знайти",
    searchAiText: "AI підбирає найкращий номер для вашого відпочинку...",
    searchSuccessMessage: "Підходящий номер знайдено. Перенаправляємо до бронювання...",
    calendarLabel: "Оберіть дати",
    aboutLabel: "ПРО НАС",
    aboutTitle: "Тиша, яка звучить як розкіш",
    aboutBody:
      "Ribas Karpaty створено для гостей, які цінують час, приватність і відчуття довершеного сервісу. Тут кожна деталь підкреслює спокій Карпат, а технології залишаються невидимими, щоб ваш відпочинок був бездоганно легким.",
    roomsLabel: "Номери",
    roomsTitle: "Номери, що відповідають вашому ритму",
    roomsSubtitle: "Обирайте простір, у якому хочеться залишитися довше.",
    exploreButton: "Детальніше",
    amenitiesLabel: "Сервіси",
    amenitiesTitle: "Сервіси для повного перезавантаження",
    amenitiesSubtitle:
      "Від ранкового сніданку до вечірнього SPA - усе працює як єдина преміальна екосистема.",
    whyLabel: "Чому ми",
    whyTitle: "Чому обирають Ribas Karpaty",
    whySubtitle: "Ми поєднали природу, архітектуру сервісу та сучасний комфорт.",
    chatCta: "Запитайте що завгодно про Ribas",
    chatGreeting:
      "Привіт! Я AI-консьєрж Ribas. Я знаю все про наші сніданки, SPA та вільні номери. Чим допомогти?",
    stickyBook: "Забронювати",
    footerNewsletter: "Підписка на новини",
    footerSubscribe: "Підписатися",
    contactHeading: "Контакти",
    socialHeading: "Соцмережі",
    footerAddress: "Буковель, Івано-Франківська область, Україна",
    footerInstagram: "Instagram",
    footerFacebook: "Facebook",
    emailPlaceholder: "you@example.com",
    footerCredits: "Designed by STEPS LAB x Ribas Concept",
    bookingModalTitle: "Бронювання",
    checkIn: "Заїзд",
    checkOut: "Виїзд",
    guestsLabel: "Гості",
    pickRoomButton: "Підібрати номер",
    modalClose: "Закрити",
  },
  en: {
    navBook: "Book now",
    navRooms: "Rooms",
    navSpa: "SPA & Relaxation",
    navRestaurant: "Restaurant",
    navContacts: "Contacts",
    heroTitle: "RIBAS KARPATY",
    heroSubtitle: "A pause-free way to recharge",
    heroTag: "Premium mountain escape",
    searchDates: "Dates",
    searchGuests: "Guests",
    searchButton: "Find",
    searchAiText: "AI is selecting the best room for your stay...",
    searchSuccessMessage: "Perfect match found. Redirecting to booking demo...",
    calendarLabel: "Select stay",
    aboutLabel: "About",
    aboutTitle: "Silence that feels like luxury",
    aboutBody:
      "Ribas Karpaty is designed for guests who value time, privacy, and refined hospitality. Every detail amplifies the calm of the mountains, while technology stays invisible so your stay feels effortless.",
    roomsLabel: "Rooms",
    roomsTitle: "Rooms aligned with your pace",
    roomsSubtitle: "Choose a space you will want to stay in longer.",
    exploreButton: "Explore",
    amenitiesLabel: "Amenities",
    amenitiesTitle: "Amenities for complete reset",
    amenitiesSubtitle:
      "From breakfast rituals to evening SPA, everything works as one premium ecosystem.",
    whyLabel: "Why us",
    whyTitle: "Why guests choose Ribas Karpaty",
    whySubtitle: "Nature, service architecture, and modern comfort in one place.",
    chatCta: "Ask anything about Ribas",
    chatGreeting:
      "Hello! I am Ribas AI concierge. I know everything about our breakfasts, SPA and available rooms. How can I help?",
    stickyBook: "Book now",
    footerNewsletter: "Newsletter",
    footerSubscribe: "Subscribe",
    contactHeading: "Contact",
    socialHeading: "Social",
    footerAddress: "Bukovel, Ivano-Frankivsk region, Ukraine",
    footerInstagram: "Instagram",
    footerFacebook: "Facebook",
    emailPlaceholder: "you@example.com",
    footerCredits: "Designed by STEPS LAB x Ribas Concept",
    bookingModalTitle: "Booking",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guestsLabel: "Guests",
    pickRoomButton: "Pick a room",
    modalClose: "Close",
  },
};

const roomImages = {
  standard: { desktop: "/images/standart%20desktop.webp", mobile: "/images/standart%20mobile.webp" },
  deluxe: { desktop: "/images/deluxe%20desktop.webp", mobile: "/images/deluxe%20mobile.webp" },
  luxe: { desktop: "/images/luxe%20desktop.webp", mobile: "/images/luxe%20mobile.webp" },
};

export const rooms: Record<Locale, Room[]> = {
  ua: [
    {
      id: "standard",
      title: "Standard",
      price: "6800 UAH / ніч",
      details: "19-24 m², сніданок включено, клімат-контроль, мінібар, Wi-Fi.",
      image: roomImages.standard.desktop,
      imageMobile: roomImages.standard.mobile,
    },
    {
      id: "deluxe",
      title: "Deluxe",
      price: "9500 UAH / ніч",
      details: "25 m², зона відпочинку, преміальна постіль, панорамний комфорт.",
      image: roomImages.deluxe.desktop,
      imageMobile: roomImages.deluxe.mobile,
    },
    {
      id: "luxe",
      title: "Luxe",
      price: "11000 UAH / ніч",
      details: "25 m², покращений вид, ексклюзивні зручності.",
      image: roomImages.luxe.desktop,
      imageMobile: roomImages.luxe.mobile,
    },
  ],
  en: [
    {
      id: "standard",
      title: "Standard",
      price: "6800 UAH / night",
      details: "19-24 m2, breakfast included, climate control, minibar, Wi-Fi.",
      image: roomImages.standard.desktop,
      imageMobile: roomImages.standard.mobile,
    },
    {
      id: "deluxe",
      title: "Deluxe",
      price: "9500 UAH / night",
      details: "25 m2, lounge area, premium bedding, panoramic comfort.",
      image: roomImages.deluxe.desktop,
      imageMobile: roomImages.deluxe.mobile,
    },
    {
      id: "luxe",
      title: "Luxe",
      price: "11000 UAH / night",
      details: "25 m2, elevated view options, signature luxury amenities.",
      image: roomImages.luxe.desktop,
      imageMobile: roomImages.luxe.mobile,
    },
  ],
};

const amenityImages = {
  restaurant: { desktop: "/images/resto%20desktop.webp", mobile: "/images/resto%20mobile.webp" },
  spa: { desktop: "/images/spa%20desktop.webp", mobile: "/images/spa%20mobile.webp" },
  pool: { desktop: "/images/pool%20desktop.webp", mobile: "/images/pool%20mobile.webp" },
};

export const amenities: Record<Locale, Amenity[]> = {
  ua: [
    {
      id: "restaurant",
      title: "Ресторан",
      description:
        "Сезонна кухня з місцевих продуктів у затишній атмосфері.",
      image: amenityImages.restaurant.desktop,
      imageMobile: amenityImages.restaurant.mobile,
    },
    {
      id: "spa",
      title: "SPA",
      description:
        "Фінська сауна, масаж та зони відновлення для глибокого відпочинку.",
      image: amenityImages.spa.desktop,
      imageMobile: amenityImages.spa.mobile,
    },
    {
      id: "pool",
      title: "Басейн",
      description:
        "Спокійний, мінімалістичний простір для відпочинку цілий рік.",
      image: amenityImages.pool.desktop,
      imageMobile: amenityImages.pool.mobile,
    },
  ],
  en: [
    {
      id: "restaurant",
      title: "Restaurant",
      description:
        "Seasonal cuisine with local ingredients, curated in an intimate setting.",
      image: amenityImages.restaurant.desktop,
      imageMobile: amenityImages.restaurant.mobile,
    },
    {
      id: "spa",
      title: "SPA",
      description:
        "Finnish sauna, massage rituals, and wellness zones tuned for deep recovery.",
      image: amenityImages.spa.desktop,
      imageMobile: amenityImages.spa.mobile,
    },
    {
      id: "pool",
      title: "Pool",
      description:
        "A calm, architecturally minimal water space for year-round relaxation.",
      image: amenityImages.pool.desktop,
      imageMobile: amenityImages.pool.mobile,
    },
  ],
};

export const whyItems: Record<Locale, WhyItem[]> = {
  ua: [
    {
      id: "location",
      title: "Найкраще розташування",
      description: "В серці Буковеля з легким доступом до основних маршрутів.",
    },
    {
      id: "panorama",
      title: "Гірська панорама",
      description: "Види на ліс та річку, що змінюють ваш щоденний ритм.",
    },
    {
      id: "spa-complex",
      title: "SPA-комплекс",
      description: "Простори для відновлення тіла та розуму.",
    },
    {
      id: "service",
      title: "Стандарт сервісу",
      description: "Турботливий прийом та стабільна якість.",
    },
  ],
  en: [
    {
      id: "location",
      title: "Prime location",
      description: "In the heart of Bukovel with effortless access to key routes.",
    },
    {
      id: "panorama",
      title: "Mountain panorama",
      description: "Views of forest and river that reframe your daily rhythm.",
    },
    {
      id: "spa-complex",
      title: "SPA complex",
      description: "Recovery-oriented spaces designed for body and mind reset.",
    },
    {
      id: "service",
      title: "Service standard",
      description: "Thoughtful hospitality with premium-level consistency.",
    },
  ],
};
