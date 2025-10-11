# SEO Оптимизация - Инструкции

## ✅ Направени промени

1. ✅ Актуализиран Netlify URL във всички файлове
2. ✅ Добавен Open Graph image за социални мрежи
3. ✅ Актуализиран sitemap.xml
4. ✅ Актуализиран robots.txt

---

## 📊 Следващи стъпки за индексация

### 1. Google Search Console

**Стъпки:**
1. Отиди на: https://search.google.com/search-console
2. Кликни "Add property"
3. Избери "URL prefix"
4. Въведи: `https://vladimir-iliev-cv.netlify.app`
5. За верификация използвай кода, който вече е в `<head>`:
   ```html
   <meta name="google-site-verification" content="CtlFfoQwsXC4oYQtFamMD5oVr0C7d_Edc54-aaeQDdo" />
   ```
6. След верификация:
   - Отиди на "Sitemaps" (ляво меню)
   - Въведи: `sitemap.xml`
   - Кликни "Submit"
7. Изчакай 1-2 дни за индексация

**Request Indexing (незабавно):**
- В Search Console → URL Inspection
- Въведи: `https://vladimir-iliev-cv.netlify.app`
- Кликни "Request indexing"

---

### 2. Bing Webmaster Tools

**Стъпки:**
1. Отиди на: https://www.bing.com/webmasters
2. Кликни "Add site"
3. Въведи: `https://vladimir-iliev-cv.netlify.app`
4. За верификация използвай кода, който вече е в `<head>`:
   ```html
   <meta name="msvalidate.01" content="D36593B6FC1F59CB7E2801BFAEEB14C9" />
   ```
5. След верификация:
   - Отиди на "Sitemaps"
   - Въведи: `https://vladimir-iliev-cv.netlify.app/sitemap.xml`
   - Кликни "Submit"
6. Изчакай 1-3 дни за индексация

**URL Submission:**
- В Bing Webmaster → URL Submission
- Въведи URL-а и submit за бързо индексиране

---

### 3. Netlify настройки (препоръки)

Провери дали Netlify е конфигуриран правилно:

**netlify.toml** трябва да съдържа:
```toml
[[redirects]]
  from = "https://www.vladimir-iliev-cv.netlify.app/*"
  to = "https://vladimir-iliev-cv.netlify.app/:splat"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 🔍 Допълнителни SEO съвети

### Schema.org проверка
- Провери structured data на: https://validator.schema.org/
- Твоят сайт вече има Person schema ✅

### Социални мрежи
- Провери Open Graph тагове на: https://www.opengraph.xyz/
- Вече има og:image добавен ✅

### Скорост
- Провери на: https://pagespeed.web.dev/
- Оптимизирай изображения ако е нужно

### Мобилна версия
- Провери на: https://search.google.com/test/mobile-friendly
- Вече е оптимизирано с viewport meta tag ✅

---

## 📈 Мониторинг

**Проверявай редовно:**
1. Google Search Console - за грешки и покритие
2. Bing Webmaster Tools - за статус на индексация
3. Google Analytics (вече добавен с ID: G-7CQDZ28XK5)

**Очаквани резултати:**
- Google: 1-2 дни за индексация
- Bing: 1-3 дни за индексация
- SEO оптимизацията е перфектна с твоите скорости! 🚀

---

## 🎯 Keywords които са оптимизирани

✅ QA Manual Tester  
✅ Русе, България  
✅ Софтуерно тестване  
✅ Bug tracking  
✅ Postman, SQL, HTML/CSS  
✅ Test cases  
✅ Quality Assurance

Сайтът е пълно SEO готов! 🎉
