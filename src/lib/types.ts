export interface NavLink {
  href: string;
  label: string;
  badge?: string;
}

export interface ClientLogo {
  name: string;
  logoUrl: string;
}

export interface ServiceSeo {
  title: string;
  description: string;
  keywords?: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  /** Цена «от» для страницы услуг, например "от 25 000 ₽" */
  priceFrom?: string;
  /** SEO: title ≤60, description ≤160 */
  seo?: ServiceSeo;
  /** Полный текст для страницы услуги (абзацы через \n\n) */
  fullDescription?: string;
  faq?: FaqItem[];
  /** Что входит в услугу */
  includes?: string[];
  /** Для кого подходит */
  forWhom?: string[];
  /** Преимущества */
  benefits?: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  /** Старая цена для перечёркнутой (акция), в рублях */
  priceOld?: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectItem {
  slug: string;
  name: string;
  categories: string[];
  sector: string;
  logoUrl: string;
  imageUrl: string;
  /** Краткое описание для карточки и meta */
  excerpt?: string;
  /** Полное описание кейса (абзацы через \n\n) */
  description?: string;
  /** Ключевые цифры для страницы кейса */
  stats?: ProjectStat[];
  /** Доп. изображения для галереи (URL) */
  galleryImages?: string[];
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  duration: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  /** Полный текст статьи для страницы новости (абзацы через \n\n) */
  content?: string;
  /** Meta description для SEO (если не задан — используется excerpt) */
  metaDescription?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterTestimonial {
  quote: string;
  author: string;
  role: string;
  logoUrl: string;
}

export interface FooterNavGroup {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}
