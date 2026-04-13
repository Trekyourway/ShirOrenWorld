# Sprint 1 · Header + Article Navigation Stabilization

מסמך זה מתרגם את ה-handover לתכנית ביצוע קצרה, עם עדיפות גבוהה לתיקונים קטנים ויציבים בלי לשבור את השפה העיצובית הקיימת.

## Scope
- טיפול בהדר וניווט עולם (desktop + mobile).
- טיפול בניווט פנימי במאמר (לשעבר "תוכן עניינים", מעכשיו "ניווט במאמר").
- שיפור קריאות והיררכיה בדפי מאמרים, בלי רה-דיזיין מלא.

## Out of scope
- כתיבת 4 המאמרים החסרים (ייכנס ל-Sprint 2).
- שינוי מבנה generator או קבצי data generated.

---

## P0 (חובה לפני הרחבת תוכן)

### T1 · Article Reading Mode UX בסיסי
**קבצים:**
- `assets/js/site-shell.js`
- `assets/css/site-shell.css`

**מה עושים:**
1. עדכון מיקרו-קופי בכפתור ובפאנל מ-"תוכן עניינים" ל-"ניווט במאמר".
2. יצירת state class אחיד בזמן פתיחת ניווט מאמר (`site-shell-article-nav-open`).
3. מניעת התנגשות מובייל: פתיחת תפריט עולם סוגרת ניווט מאמר, ולהפך.

**בדיקות קבלה:**
- במאמר במובייל לא ניתן להשאיר בו-זמנית גם תפריט עולם וגם ניווט מאמר.
- Escape סוגר פאנל פתוח.
- כותרות/aria מעודכנות ל"ניווט במאמר".

### T2 · Mobile TOC readability + overlay hierarchy
**קבצים:**
- `assets/css/site-shell.css`

**מה עושים:**
1. הרחבת פאנל הניווט במאמר במובייל (רוחב/גובה/spacing).
2. overlay חזק יותר + blur עדין להפרדת מצב קריאה מול מצב ניווט.
3. הגדלת אזור סגירה (tap target).
4. הורדת בולטות הכפתור הצף בזמן פאנל פתוח.

**בדיקות קבלה:**
- אין רכיב צף שחוצה את הפאנל.
- הרקע מאחור מופרד ויזואלית מספיק בזמן panel open.
- הקריאות ברשימת סעיפי המאמר נוחה יותר במסכים צרים.

---

## P1 (מייד אחרי ייצוב)

### T3 · Desktop dropdown readability
**קבצים:**
- `assets/css/site-shell.css`

**מה עושים:**
1. קביעת רוחב dropdown יציב.
2. clamp לשמות מאמרים ארוכים (עד 2 שורות).
3. בידול "לכל המאמרים" כפעולה משנית (divider + spacing).

**בדיקות קבלה:**
- שמות ארוכים לא שוברים סריקה.
- ברור מה פריט מאמר ומה פעולה משנית.
- dropdown אינו יוצר תחושת overlay אגרסיבית.

### T4 · אינטראקציות פתיחה/סגירה אחידות
**קבצים:**
- `assets/js/site-shell.js`

**מה עושים:**
1. איחוד לוגיקה של close/open בין overlay, close button ו-Escape.
2. מניעת מצבים ״תקועים״ (panel נשאר פתוח בגלילה/מעבר).

**בדיקות קבלה:**
- אין מצב שבו overlay נשאר פתוח בלי panel.
- אין מצב שבו panel פתוח בלי aria-expanded מתאים.

---

## P2 (ניקוי וחיזוק UX)

### T5 · שפה וכיווניות
**קבצים:**
- `assets/js/site-shell.js`
- `data/site-shell.variables.json` (אם נדרש טקסט נוסף)

**מה עושים:**
1. אחידות מונחים בעברית לכל action labels בהדר/ניווט מאמר.
2. מעבר סדור על RTL/LTR בדפי EN/HE.

**בדיקות קבלה:**
- אין ערבוב מונחים סותר באותו רכיב ניווט.
- בדפי EN אין שבירות יישור חריגות בהדר.

---

## Preview before full rollout
**קובץ מוק אינטראקטיבי:**
- `docs/ui-preview/ai-nav-article-interactive-preview.html`

**4 מצבים לבדיקה מהירה:**
1. `/ai/` דסקטופ עם dropdown פתוח.
2. מאמר במובייל עם ניווט מאמר סגור.
3. מאמר במובייל עם ניווט מאמר פתוח + overlay.
4. מאמר בדסקטופ עם ניווט מאמר גלוי.

---

## Working discipline
- אין עריכה ידנית ל-`data/navigation.generated.json`.
- כל שינוי ניווט עובר דרך build generator בלבד.
- PR checklist קצר לכל שינוי:
  1. nav states
  2. article metadata impact
  3. build output sanity
  4. smoke pages
