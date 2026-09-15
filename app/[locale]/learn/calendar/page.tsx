'use client'

import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { useLocale } from 'next-intl'
import { useState } from 'react'

const WEEK_DAYS = [
  { num: 1, en: 'Yom Rishon', nl: 'Yom Rishon', en_meaning: 'First Day', nl_meaning: 'Eerste Dag', greg: 'Sun', shabbat: false },
  { num: 2, en: 'Yom Sheni', nl: 'Yom Sheni', en_meaning: 'Second Day', nl_meaning: 'Tweede Dag', greg: 'Mon', shabbat: false },
  { num: 3, en: 'Yom Shlishi', nl: 'Yom Shlishi', en_meaning: 'Third Day', nl_meaning: 'Derde Dag', greg: 'Tue', shabbat: false },
  { num: 4, en: "Yom Revi'i", nl: "Yom Revi'i", en_meaning: 'Fourth Day', nl_meaning: 'Vierde Dag', greg: 'Wed', shabbat: false },
  { num: 5, en: 'Yom Chamishi', nl: 'Yom Chamishi', en_meaning: 'Fifth Day', nl_meaning: 'Vijfde Dag', greg: 'Thu', shabbat: false },
  { num: 6, en: 'Yom Shishi', nl: 'Yom Shishi', en_meaning: 'Sixth Day · Preparation', nl_meaning: 'Zesde Dag · Voorbereiding', greg: 'Fri', shabbat: false },
  { num: 7, en: 'Shabbat', nl: 'Shabbat', en_meaning: 'Rest · Set-Apart Day', nl_meaning: 'Rust · Afgesonderde Dag', greg: 'Sat', shabbat: true },
]

const LUNISOLAR_MONTHS = [
  { num: 1, en: 'Aviv', nl: 'Aviv', also: 'Nisan', days: '29-30', note_en: 'New Year · Pesach 14th · Matzot 15-21', note_nl: 'Nieuwjaar · Pesach 14e · Matzot 15-21' },
  { num: 2, en: 'Ziv', nl: 'Ziv', also: 'Iyar', days: '29-30', note_en: 'Solomon began building the Temple', note_nl: 'Salomo begon de Tempel te bouwen' },
  { num: 3, en: 'Sivan', nl: 'Sivan', also: '', days: '30', note_en: 'Shavuot · Torah given at Sinai', note_nl: 'Shavuot · Torah gegeven op Sinai' },
  { num: 4, en: 'Tammuz', nl: 'Tammuz', also: '', days: '29', note_en: '', note_nl: '' },
  { num: 5, en: 'Av', nl: 'Av', also: '', days: '30', note_en: 'Both Temples destroyed on 9 Av', note_nl: 'Beide Tempels verwoest op 9 Av' },
  { num: 6, en: 'Elul', nl: 'Elul', also: '', days: '29', note_en: 'Month of repentance', note_nl: 'Maand van berouw' },
  { num: 7, en: 'Ethanim', nl: 'Ethanim', also: 'Tishri', days: '30', note_en: 'Yom Teruah · Yom Kippur · Sukkot', note_nl: 'Yom Teruah · Yom Kippur · Sukkot' },
  { num: 8, en: 'Bul', nl: 'Bul', also: 'Cheshvan', days: '29-30', note_en: 'Solomon completed the Temple', note_nl: 'Salomo voltooide de Tempel' },
  { num: 9, en: 'Kislev', nl: 'Kislev', also: '', days: '29-30', note_en: '', note_nl: '' },
  { num: 10, en: 'Tevet', nl: 'Tevet', also: '', days: '29', note_en: 'Siege of Yerushalayim began', note_nl: 'Belegering van Yerushalayim begon' },
  { num: 11, en: 'Shevat', nl: 'Shevat', also: '', days: '30', note_en: 'Moshe began repeating Torah (Deb. 1:3)', note_nl: 'Moshe herhaalde de Torah (Deb. 1:3)' },
  { num: 12, en: 'Adar', nl: 'Adar', also: '', days: '29', note_en: 'Purim · Adar II added in leap years', note_nl: 'Purim · Adar II in schrikkeljaar' },
]

const ENOCH_MONTHS_13 = [
  { num: 1, en: 'Aviv', nl: 'Aviv', note_en: 'New Year always on Day 1 (Yom Rishon)', note_nl: 'Nieuwjaar altijd op Dag 1 (Yom Rishon)' },
  { num: 2, en: 'Ziv', nl: 'Ziv', note_en: '', note_nl: '' },
  { num: 3, en: 'Sivan', nl: 'Sivan', note_en: 'Shavuot always on Day 1', note_nl: 'Shavuot altijd op Dag 1' },
  { num: 4, en: 'Tammuz', nl: 'Tammuz', note_en: '', note_nl: '' },
  { num: 5, en: 'Av', nl: 'Av', note_en: '', note_nl: '' },
  { num: 6, en: 'Elul', nl: 'Elul', note_en: '', note_nl: '' },
  { num: 7, en: 'Ethanim', nl: 'Ethanim', note_en: 'Yom Teruah always on Day 1', note_nl: 'Yom Teruah altijd op Dag 1' },
  { num: 8, en: 'Bul', nl: 'Bul', note_en: '', note_nl: '' },
  { num: 9, en: 'Kislev', nl: 'Kislev', note_en: '', note_nl: '' },
  { num: 10, en: 'Tevet', nl: 'Tevet', note_en: '', note_nl: '' },
  { num: 11, en: 'Shevat', nl: 'Shevat', note_en: '', note_nl: '' },
  { num: 12, en: 'Adar', nl: 'Adar', note_en: '', note_nl: '' },
  { num: 13, en: '(unnamed in 1 Ḥanok)', nl: '(unnamed in 1 Ḥanok)', note_en: 'Completes the year · 52 weeks exactly', note_nl: 'Voltooit het jaar · 52 weken precies' },
]

export default function CalendarPage() {
  const locale = useLocale()
  const isNl = locale === 'nl'
  const [open, setOpen] = useState<'lunisolar' | 'enoch' | null>(null)

  const weekRow = (d: typeof WEEK_DAYS[0], i: number) => (
    <div key={d.num} style={{
      display: 'grid', gridTemplateColumns: '24px 1fr 36px', gap: '0.5rem', alignItems: 'center',
      padding: '0.55rem 0.75rem',
      background: d.shabbat ? 'rgba(180,140,60,0.12)' : i % 2 === 0 ? 'var(--th-bg)' : 'transparent',
      borderRadius: '6px',
      borderLeft: d.shabbat ? '3px solid var(--th-gold)' : '3px solid transparent',
    }}>
      <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--th-gold)', textAlign: 'center' }}>{d.num}</span>
      <span>
        <span style={{ fontSize: '13px', fontWeight: d.shabbat ? 700 : 600, color: d.shabbat ? 'var(--th-gold)' : 'var(--th-text)' }}>
          {isNl ? d.nl : d.en}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--th-muted)', marginLeft: '0.5rem' }}>
          — {isNl ? d.nl_meaning : d.en_meaning}
        </span>
      </span>
      <span style={{ fontSize: '11px', color: 'var(--th-muted)', textAlign: 'right' }}>{d.greg}</span>
    </div>
  )

  return (
    <div style={{ maxWidth: '44rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 0.4rem' }}>
        {isNl ? 'De Hebreeuwse Kalender' : 'The Hebrew Calendar'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', marginBottom: '2rem' }}>
        {isNl
          ? 'Twee belangrijke kalendertraities. Beide worden eerlijk gepresenteerd zodat u zelf kunt onderzoeken.'
          : 'Two significant calendar traditions. Both are presented honestly so you can study and discern for yourself.'}
      </p>

      {/* CALENDAR 1: LUNISOLAR */}
      <div className="theme-card" style={{ marginBottom: '1rem', overflow: 'hidden' }}>
        <button
          onClick={() => setOpen(open === 'lunisolar' ? null : 'lunisolar')}
          style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '1.25rem 1.5rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <span style={{ fontSize: '2rem' }}>🌙</span>
          <span style={{ flex: 1 }}>
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--th-gold)', display: 'block' }}>
              {isNl ? 'Kalender 1 - De Lunisolaire Kalender' : 'Calendar 1 - The Lunisolar Calendar'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--th-muted)' }}>
              {isNl ? '12 maanden (29-30 dagen) · Maan + Zon · Torah / Traditioneel' : '12 months (29-30 days) · Moon + Sun · Torah / Traditional'}
            </span>
          </span>
          <span style={{ fontSize: '20px', color: 'var(--th-gold)', lineHeight: 1 }}>{open === 'lunisolar' ? '-' : '+'}</span>
        </button>

        {open === 'lunisolar' && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--th-border)' }}>
            <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--th-text)', margin: '1.25rem 0' }}>
              {isNl
                ? 'Elke maand begint met een nieuwe maan (Rosh Chodesh). Maanden duren 29 of 30 dagen. Elke 2-3 jaar wordt een 13e maand (Adar II) ingevoegd om Pesach in de lente te houden.'
                : 'Each month begins with a new moon (Rosh Chodesh). Months are 29 or 30 days. Every 2-3 years a 13th month (Adar II) is added to keep Pesach in spring.'}
            </p>

            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              {isNl ? 'Dagen van de week' : 'Days of the week'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '1.5rem' }}>
              {WEEK_DAYS.map((d, i) => weekRow(d, i))}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--th-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              {isNl ? 'In de lunisolaire kalender kan een maand op elke willekeurige weekdag beginnen.' : 'In the lunisolar calendar a month can begin on any day of the week.'}
            </p>

            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              {isNl ? 'De 12 maanden' : 'The 12 months'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {LUNISOLAR_MONTHS.map((m, i) => {
                const note = isNl ? m.note_nl : m.note_en
                return (
                  <div key={m.num} style={{ display: 'grid', gridTemplateColumns: '24px 110px 1fr 44px', gap: '0.5rem', alignItems: 'center', padding: '0.6rem 0.75rem', background: i % 2 === 0 ? 'var(--th-bg)' : 'transparent', borderRadius: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--th-gold)', textAlign: 'center' }}>{m.num}</span>
                    <span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--th-text)' }}>{isNl ? m.nl : m.en}</span>
                      {m.also && <span style={{ fontSize: '11px', color: 'var(--th-muted)', marginLeft: '4px' }}>/ {m.also}</span>}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--th-muted)' }}>{note}</span>
                    <span style={{ fontSize: '12px', color: 'var(--th-muted)', textAlign: 'right', fontWeight: 600 }}>{m.days}d</span>
                  </div>
                )
              })}
              <div style={{ display: 'grid', gridTemplateColumns: '24px 110px 1fr 44px', gap: '0.5rem', alignItems: 'center', padding: '0.6rem 0.75rem', background: 'rgba(180,140,60,0.08)', borderRadius: '6px', borderLeft: '3px solid var(--th-accent)' }}>
                <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--th-accent)', textAlign: 'center' }}>+1</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--th-accent)' }}>Adar II</span>
                <span style={{ fontSize: '11px', color: 'var(--th-muted)' }}>{isNl ? 'Schrikkeljaar (~elke 2-3 jaar)' : 'Leap year (~every 2-3 years)'}</span>
                <span style={{ fontSize: '12px', color: 'var(--th-accent)', textAlign: 'right', fontWeight: 600 }}>29-30d</span>
              </div>
            </div>
            <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--th-bg)', borderRadius: '8px', fontSize: '12px', color: 'var(--th-muted)' }}>
              <strong style={{ color: 'var(--th-text)' }}>{isNl ? 'Sleutelverzen: ' : 'Key verses: '}</strong>
              Bereshit 1:14 · Shemoth 12:2 · Tehillim 104:19 · Yeshayahu 66:23
            </div>
          </div>
        )}
      </div>

      {/* CALENDAR 2: ENOCH */}
      <div className="theme-card" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
        <button
          onClick={() => setOpen(open === 'enoch' ? null : 'enoch')}
          style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '1.25rem 1.5rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <span style={{ fontSize: '2rem' }}>☀️</span>
          <span style={{ flex: 1 }}>
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--th-gold)', display: 'block' }}>
              {isNl ? 'Kalender 2 - De Enoch-kalender' : 'Calendar 2 - The Enoch Calendar'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--th-muted)' }}>
              {isNl ? '13 maanden x 28 dagen = 364 dagen = 52 weken · Puur zonnekalender' : '13 months x 28 days = 364 days = 52 weeks · Pure solar calendar'}
            </span>
          </span>
          <span style={{ fontSize: '20px', color: 'var(--th-gold)', lineHeight: 1 }}>{open === 'enoch' ? '-' : '+'}</span>
        </button>

        {open === 'enoch' && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--th-border)' }}>
            <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--th-text)', margin: '1.25rem 0' }}>
              {isNl
                ? '364 dagen = 52 volledige weken. 13 maanden van precies 28 dagen (4 weken) elk. Elke maand begint altijd op Dag 1 (Yom Rishon). Bronnen: 1 Ḥanok 72-82; Jubileeën 6:29-38; Dode Zee-rollen.'
                : '364 days = 52 complete weeks. 13 months of exactly 28 days (4 weeks) each. Every month always begins on Day 1 (Yom Rishon). Sources: 1 Ḥanok 72-82; Jubilees 6:29-38; Dead Sea Scrolls.'}
            </p>

            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              {isNl ? 'Dagen van de week' : 'Days of the week'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '0.5rem' }}>
              {WEEK_DAYS.map((d, i) => weekRow(d, i))}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--th-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              {isNl ? 'In de Enoch-kalender begint elke maand altijd op Dag 1 (Yom Rishon) - omdat 28 = precies 4 weken.' : 'In the Enoch calendar every month always begins on Day 1 (Yom Rishon) - because 28 = exactly 4 weeks.'}
            </p>

            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              {isNl ? 'De 13 maanden (elk 28 dagen = 4 weken)' : 'The 13 months (each 28 days = 4 weeks)'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {ENOCH_MONTHS_13.map((m, i) => {
                const note = isNl ? m.note_nl : m.note_en
                const isLast = m.num === 13
                return (
                  <div key={m.num} style={{ display: 'grid', gridTemplateColumns: '24px 180px 1fr 36px', gap: '0.5rem', alignItems: 'center', padding: '0.6rem 0.75rem', background: isLast ? 'rgba(180,140,60,0.08)' : i % 2 === 0 ? 'var(--th-bg)' : 'transparent', borderRadius: '6px', borderLeft: isLast ? '3px solid var(--th-gold)' : '3px solid transparent' }}>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--th-gold)', textAlign: 'center' }}>{m.num}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: isLast ? 'var(--th-muted)' : 'var(--th-text)', fontStyle: isLast ? 'italic' : 'normal' }}>{isNl ? m.nl : m.en}</span>
                    <span style={{ fontSize: '11px', color: 'var(--th-muted)' }}>{note}</span>
                    <span style={{ fontSize: '12px', color: 'var(--th-gold)', textAlign: 'right', fontWeight: 700 }}>28d</span>
                  </div>
                )
              })}
            </div>

            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {[
                { label: isNl ? 'Totaal' : 'Total', value: isNl ? '364 dagen' : '364 days' },
                { label: isNl ? 'Weken' : 'Weeks', value: isNl ? '52 volledige weken' : '52 complete weeks' },
                { label: isNl ? 'Maanden' : 'Months', value: '13 x 28 ' + (isNl ? 'dagen' : 'days') },
                { label: isNl ? 'Begin elke maand' : 'Every month starts', value: isNl ? 'Altijd Dag 1' : 'Always Day 1' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '0.6rem 0.75rem', background: 'var(--th-bg)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--th-muted)', display: 'block' }}>{s.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--th-gold)' }}>{s.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--th-bg)', borderRadius: '8px', fontSize: '12px', color: 'var(--th-muted)' }}>
              <strong style={{ color: 'var(--th-text)' }}>{isNl ? 'Sleutelbronnen: ' : 'Key sources: '}</strong>
              {'1 Ḥanok 72-82 · '}{isNl ? 'Jubileeën' : 'Jubilees'}{' 6:29-38 · '}{isNl ? 'Dode Zee-rollen (Qumran)' : 'Dead Sea Scrolls (Qumran)'}
            </div>
          </div>
        )}
      </div>

      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem' }}>
          {isNl ? 'Het Debat' : 'The Debate'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>
              {isNl ? 'Voor de Lunisolaire' : 'For the Lunisolar'}
            </p>
            <ul style={{ paddingLeft: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {(isNl ? [
                'Bereshit 1:14 - maan aangesteld voor Moadim',
                'Tehillim 104:19 - maan voor vastgestelde tijden',
                'Torah geeft feestdata op maandagen (14e, 15e...)',
                'Gebruikt door profeten en volk door eeuwen heen',
                'Zichtbare tekenen die iedereen kan waarnemen',
              ] : [
                'Bereshit 1:14 - moon appointed for Moadim',
                'Tehillim 104:19 - moon for appointed times',
                'Torah gives feast dates by day-of-month',
                "Used by all biblical prophets and Yisra'el",
                'Visible signs in creation anyone can observe',
              ]).map((pt, i) => <li key={i} style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--th-text)' }}>{pt}</li>)}
            </ul>
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>
              {isNl ? 'Voor de Enoch-kalender' : 'For the Enoch Calendar'}
            </p>
            <ul style={{ paddingLeft: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {(isNl ? [
                '1 Ḥanok 74:12 - maan verstoort de orde van de zon',
                'Jubileeën 6:36 - maan-volgers vieren feesten verkeerd',
                'Feestdagen vallen nooit op de Shabbat',
                'Gebruikt door Qumran - mogelijk door Yahusha zelf',
                'Perfect voorspelbaar - niet manipuleerbaar',
              ] : [
                '1 Ḥanok 74:12 - moon disrupts the order of the sun',
                'Jubilees 6:36 - moon-followers keep feasts wrongly',
                'Feast days never fall on the Shabbat',
                'Used by Qumran - possibly by Yahusha himself',
                'Perfectly predictable - cannot be manipulated',
              ]).map((pt, i) => <li key={i} style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--th-text)' }}>{pt}</li>)}
            </ul>
          </div>
        </div>
        <div style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            {isNl
              ? 'Dit platform volgt de lunisolaire kalender voor feestdatums. Maar de Enoch-kalender verdient serieuze studie. Onderzoek beide, bid om wijsheid, en laat de Ruach u leiden.'
              : "This platform follows the lunisolar calendar for feast dates. But the Enoch calendar deserves serious study. Study both, pray for wisdom, and let the Ruach guide you."}
          </p>
        </div>
      </section>

      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Shemitah en Yovel - de grote cycli' : 'Shemitah and Yovel - the great cycles'}
        </h2>
        <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--th-text)', marginBottom: '0.75rem' }}>
          <strong style={{ color: 'var(--th-gold)' }}>{isNl ? 'Shemitah (het 7e jaar)' : 'Shemitah (the 7th year)'}</strong>
          {isNl ? ' - landrust, kwijtschelding van schulden, wat groeit is voor iedereen (Debarim 15:1-2).' : ' - land rest, debt cancellation, what grows belongs to everyone (Debarim 15:1-2).'}
        </p>
        <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
          <strong style={{ color: 'var(--th-gold)' }}>{isNl ? 'Yovel (het 50e jaar)' : 'Yovel (the 50th year)'}</strong>
          {isNl ? ' - na 7 x 7 jaar klinkt de shofar op Yom Kippur. Alle grond terug, alle slaven vrij (Wayyiqra 25:8-55).' : ' - after 7 x 7 years the shofar sounds on Yom Kippur. All land returns, all slaves freed (Wayyiqra 25:8-55).'}
        </p>
      </section>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href={`/${locale}/learn/feasts`} style={{ padding: '10px 20px', borderRadius: '999px', background: 'var(--th-accent)', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
          {isNl ? 'Bekijk de Heilige Tijden' : 'View the Appointed Times'}
        </Link>
        <Link href={`/${locale}/learn`} style={{ padding: '10px 20px', borderRadius: '999px', background: 'var(--th-card)', border: '1px solid var(--th-accent)', color: 'var(--th-accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
          {isNl ? '<- Terug naar Leren' : '<- Back to Learn'}
        </Link>
      </div>
    </div>
  )
}
