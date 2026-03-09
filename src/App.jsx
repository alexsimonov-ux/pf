import { useState } from "react";

const COLORS = {
  bg: "#080c14",
  surface: "#0f1624",
  border: "#1a2540",
  accent: "#4fffb0",
  accentDim: "#1a4d38",
  text: "#e8edf5",
  muted: "#5a6a8a",
  danger: "#ff4d6d",
  warn: "#ffbe0b",
};

const employees = [
  { id: 1, name: "Алина Ковалёва", role: "Product Designer", dept: "Product", status: "active", joined: "12 янв 2024", avatar: "АК" },
  { id: 2, name: "Дмитрий Орлов", role: "Backend Engineer", dept: "Engineering", status: "active", joined: "3 мар 2024", avatar: "ДО" },
  { id: 3, name: "Мария Соколова", role: "HR Manager", dept: "HR", status: "active", joined: "20 фев 2023", avatar: "МС" },
  { id: 4, name: "Иван Петров", role: "Frontend Engineer", dept: "Engineering", status: "on-leave", joined: "8 июл 2023", avatar: "ИП" },
  { id: 5, name: "Наталья Фёдорова", role: "Data Analyst", dept: "Analytics", status: "active", joined: "15 авг 2024", avatar: "НФ" },
  { id: 6, name: "Андрей Волков", role: "DevOps Engineer", dept: "Engineering", status: "active", joined: "1 окт 2023", avatar: "АВ" },
];

const jobs = [
  { id: 1, title: "Senior React Developer", dept: "Engineering", candidates: 14, stage: "Интервью", urgent: true },
  { id: 2, title: "UX Researcher", dept: "Product", candidates: 7, stage: "Скрининг", urgent: false },
  { id: 3, title: "Growth Marketing Lead", dept: "Marketing", candidates: 21, stage: "Оффер", urgent: false },
  { id: 4, title: "ML Engineer", dept: "Engineering", candidates: 5, stage: "Скрининг", urgent: true },
];

const candidates = [
  { id: 1, name: "Кирилл Захаров", job: "Senior React Developer", stage: "Техническое", score: 87, avatar: "КЗ" },
  { id: 2, name: "Елена Смирнова", job: "UX Researcher", stage: "HR-звонок", score: 72, avatar: "ЕС" },
  { id: 3, name: "Тимур Исаев", job: "ML Engineer", stage: "Оффер", score: 94, avatar: "ТИ" },
  { id: 4, name: "Ольга Нечаева", job: "Growth Marketing Lead", stage: "Финальное", score: 81, avatar: "ОН" },
];

function Avatar({ initials, size = 36, color = COLORS.accent }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${color}22, ${color}44)`,
      border: `1px solid ${color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0,
      letterSpacing: "0.02em",
    }}>
      {initials}
    </div>
  );
}

function Badge({ label, type = "default" }) {
  const styles = {
    default: { bg: "#1a2540", color: COLORS.muted },
    active: { bg: "#0d3326", color: COLORS.accent },
    leave: { bg: "#2d1f00", color: COLORS.warn },
    urgent: { bg: "#2d0015", color: COLORS.danger },
    offer: { bg: "#0d3326", color: COLORS.accent },
  };
  const s = styles[type] || styles.default;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
    }}>
      {label}
    </span>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: COLORS.surface, border: `1px solid ${COLORS.border}`,
      borderRadius: 16, padding: "24px 28px", flex: 1, minWidth: 160,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -20, right: -20, width: 80, height: 80,
        borderRadius: "50%", background: `${accent || COLORS.accent}0a`,
        border: `1px solid ${accent || COLORS.accent}15`,
      }} />
      <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: accent || COLORS.accent, marginTop: 8, fontWeight: 500 }}>{sub}</div>}
    </div>
  );
}

function Sidebar({ page, setPage, collapsed, setCollapsed }) {
  const nav = [
    { id: "dashboard", icon: "⬡", label: "Дашборд" },
    { id: "employees", icon: "◈", label: "Сотрудники" },
    { id: "recruitment", icon: "◎", label: "Рекрутинг" },
    { id: "reviews", icon: "◇", label: "Ревью" },
    { id: "settings", icon: "⊙", label: "Настройки" },
  ];
  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      background: COLORS.surface,
      borderRight: `1px solid ${COLORS.border}`,
      display: "flex", flexDirection: "column",
      transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
      overflow: "hidden", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? "24px 0" : "24px 24px",
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex", alignItems: "center", gap: 12,
        justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.accent}, #00b8ff)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0,
        }}>⬆</div>
        {!collapsed && <span style={{ fontSize: 17, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.03em" }}>Antigravity</span>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {nav.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center",
            gap: 14, padding: collapsed ? "12px 0" : "12px 20px",
            justifyContent: collapsed ? "center" : "flex-start",
            background: page === item.id ? `${COLORS.accent}12` : "transparent",
            border: "none", cursor: "pointer",
            borderLeft: page === item.id ? `3px solid ${COLORS.accent}` : "3px solid transparent",
            color: page === item.id ? COLORS.accent : COLORS.muted,
            fontSize: 18, transition: "all 0.15s",
          }}>
            <span>{item.icon}</span>
            {!collapsed && <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.01em" }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button onClick={() => setCollapsed(!collapsed)} style={{
        margin: "16px auto", width: 36, height: 36, borderRadius: 10,
        background: COLORS.border, border: "none", cursor: "pointer",
        color: COLORS.muted, fontSize: 14, display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        {collapsed ? "▶" : "◀"}
      </button>
    </aside>
  );
}

function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, marginBottom: 6, letterSpacing: "-0.04em" }}>
        Добро пожаловать, Мария 👋
      </h1>
      <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 32 }}>Понедельник, 9 марта 2026</p>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <StatCard label="Сотрудников" value="124" sub="↑ 3 за месяц" />
        <StatCard label="Открытых вакансий" value="8" sub="4 срочных" accent={COLORS.warn} />
        <StatCard label="Кандидатов" value="47" sub="12 активных" accent="#00b8ff" />
        <StatCard label="Ревью в этом квартале" value="31" sub="18 завершено" accent="#b86bff" />
      </div>

      {/* Recent activity + Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Activity */}
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Последние события
          </h2>
          {[
            { icon: "◎", text: "Тимур Исаев получил оффер на ML Engineer", time: "2ч назад", color: COLORS.accent },
            { icon: "◈", text: "Алина Ковалёва обновила профиль", time: "5ч назад", color: "#00b8ff" },
            { icon: "⬡", text: "Завершено ревью: Дмитрий Орлов", time: "Вчера", color: "#b86bff" },
            { icon: "◎", text: "Новая заявка на Senior React Developer", time: "Вчера", color: COLORS.warn },
            { icon: "◈", text: "Иван Петров вышел из отпуска", time: "2 дня назад", color: COLORS.accent },
          ].map((ev, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "12px 0", borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none",
            }}>
              <span style={{ fontSize: 18, color: ev.color, marginTop: 1 }}>{ev.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>{ev.text}</div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3 }}>{ev.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Быстрые действия
            </h2>
            {[
              { label: "Добавить сотрудника", icon: "＋", color: COLORS.accent },
              { label: "Создать вакансию", icon: "◎", color: "#00b8ff" },
              { label: "Запустить ревью", icon: "◇", color: "#b86bff" },
            ].map((a, i) => (
              <button key={i} style={{
                width: "100%", padding: "11px 16px", borderRadius: 10, marginBottom: 8,
                background: `${a.color}10`, border: `1px solid ${a.color}30`,
                color: a.color, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10, letterSpacing: "0.01em",
              }}>
                <span style={{ fontSize: 16 }}>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>

          {/* Dept breakdown */}
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              По отделам
            </h2>
            {[
              { dept: "Engineering", count: 52, pct: 42 },
              { dept: "Product", count: 23, pct: 18 },
              { dept: "Marketing", count: 19, pct: 15 },
              { dept: "HR", count: 14, pct: 11 },
              { dept: "Analytics", count: 16, pct: 13 },
            ].map((d, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: COLORS.muted }}>{d.dept}</span>
                  <span style={{ fontSize: 12, color: COLORS.text, fontWeight: 600 }}>{d.count}</span>
                </div>
                <div style={{ height: 4, background: COLORS.border, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${d.pct}%`, borderRadius: 2,
                    background: `linear-gradient(90deg, ${COLORS.accent}, #00b8ff)`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeesPage() {
  const [search, setSearch] = useState("");
  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.04em", marginBottom: 4 }}>Сотрудники</h1>
          <p style={{ color: COLORS.muted, fontSize: 14 }}>{employees.length} человек в команде</p>
        </div>
        <button style={{
          padding: "10px 20px", borderRadius: 10, background: COLORS.accent,
          border: "none", color: "#040a14", fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>
          + Добавить
        </button>
      </div>

      <input
        placeholder="Поиск по имени или роли..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "12px 18px", borderRadius: 12, marginBottom: 20,
          background: COLORS.surface, border: `1px solid ${COLORS.border}`,
          color: COLORS.text, fontSize: 14, outline: "none", boxSizing: "border-box",
        }}
      />

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 100px",
          padding: "12px 24px", borderBottom: `1px solid ${COLORS.border}`,
          fontSize: 11, color: COLORS.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          <span>Сотрудник</span><span>Должность</span><span>Отдел</span><span>Дата</span><span>Статус</span>
        </div>

        {filtered.map((emp, i) => (
          <div key={emp.id} style={{
            display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 100px",
            padding: "16px 24px", alignItems: "center",
            borderBottom: i < filtered.length - 1 ? `1px solid ${COLORS.border}` : "none",
            cursor: "pointer", transition: "background 0.1s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#ffffff05"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={emp.avatar} size={36} />
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{emp.name}</span>
            </div>
            <span style={{ fontSize: 13, color: COLORS.muted }}>{emp.role}</span>
            <span style={{ fontSize: 13, color: COLORS.muted }}>{emp.dept}</span>
            <span style={{ fontSize: 13, color: COLORS.muted }}>{emp.joined}</span>
            <Badge label={emp.status === "active" ? "Активен" : "Отпуск"} type={emp.status === "active" ? "active" : "leave"} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RecruitmentPage() {
  const [tab, setTab] = useState("jobs");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.04em", marginBottom: 4 }}>Рекрутинг</h1>
          <p style={{ color: COLORS.muted, fontSize: 14 }}>{jobs.length} открытых вакансии · {candidates.length} активных кандидата</p>
        </div>
        <button style={{
          padding: "10px 20px", borderRadius: 10, background: COLORS.accent,
          border: "none", color: "#040a14", fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>
          + Вакансия
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 4, width: "fit-content" }}>
        {[{ id: "jobs", label: "Вакансии" }, { id: "candidates", label: "Кандидаты" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer",
            background: tab === t.id ? COLORS.accent : "transparent",
            color: tab === t.id ? "#040a14" : COLORS.muted,
            fontSize: 13, fontWeight: 700,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "jobs" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {jobs.map(job => (
            <div key={job.id} style={{
              background: COLORS.surface, border: `1px solid ${job.urgent ? COLORS.danger + "44" : COLORS.border}`,
              borderRadius: 16, padding: 24, cursor: "pointer",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{job.title}</div>
                  <div style={{ fontSize: 13, color: COLORS.muted }}>{job.dept}</div>
                </div>
                {job.urgent && <Badge label="Срочно" type="urgent" />}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: COLORS.muted }}>
                  <span style={{ color: COLORS.accent, fontWeight: 700 }}>{job.candidates}</span> кандидатов
                </span>
                <Badge label={job.stage} type={job.stage === "Оффер" ? "offer" : "default"} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 80px",
            padding: "12px 24px", borderBottom: `1px solid ${COLORS.border}`,
            fontSize: 11, color: COLORS.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span>Кандидат</span><span>Вакансия</span><span>Этап</span><span>Балл</span>
          </div>
          {candidates.map((c, i) => (
            <div key={c.id} style={{
              display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 80px",
              padding: "16px 24px", alignItems: "center",
              borderBottom: i < candidates.length - 1 ? `1px solid ${COLORS.border}` : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={c.avatar} size={34} color="#00b8ff" />
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{c.name}</span>
              </div>
              <span style={{ fontSize: 13, color: COLORS.muted }}>{c.job}</span>
              <span style={{ fontSize: 13, color: COLORS.muted }}>{c.stage}</span>
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 44, height: 28, borderRadius: 8,
                background: c.score >= 90 ? "#0d3326" : c.score >= 75 ? "#1a2540" : "#2d1f00",
                color: c.score >= 90 ? COLORS.accent : c.score >= 75 ? "#00b8ff" : COLORS.warn,
                fontSize: 13, fontWeight: 700,
              }}>
                {c.score}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.04em", marginBottom: 8 }}>Performance Ревью</h1>
      <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 32 }}>Q1 2026 · 31 ревью запущено</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {[
          { name: "Алина Ковалёва", role: "Product Designer", status: "Завершено", score: 4.8, color: COLORS.accent },
          { name: "Дмитрий Орлов", role: "Backend Engineer", status: "В процессе", score: null, color: "#00b8ff" },
          { name: "Мария Соколова", role: "HR Manager", status: "Завершено", score: 4.5, color: COLORS.accent },
          { name: "Иван Петров", role: "Frontend Engineer", status: "Не начато", score: null, color: COLORS.muted },
          { name: "Наталья Фёдорова", role: "Data Analyst", status: "В процессе", score: null, color: "#00b8ff" },
          { name: "Андрей Волков", role: "DevOps Engineer", status: "Завершено", score: 4.2, color: COLORS.accent },
        ].map((r, i) => (
          <div key={i} style={{
            background: COLORS.surface, border: `1px solid ${COLORS.border}`,
            borderRadius: 16, padding: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Avatar initials={r.name.split(" ").map(n => n[0]).join("")} size={40} color={r.color} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{r.name}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{r.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: r.color, fontWeight: 600 }}>{r.status}</span>
              {r.score && (
                <span style={{ fontSize: 20, fontWeight: 800, color: r.color }}>{r.score}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.04em", marginBottom: 32 }}>Настройки</h1>
      <div style={{ maxWidth: 560 }}>
        {[
          { section: "Компания", fields: [{ label: "Название", val: "Antigravity Inc." }, { label: "Домен", val: "antigravity.io" }] },
          { section: "Уведомления", fields: [{ label: "Email-уведомления", val: "Включены" }, { label: "Slack-интеграция", val: "Подключён" }] },
        ].map((sec, si) => (
          <div key={si} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>{sec.section}</h2>
            {sec.fields.map((f, fi) => (
              <div key={fi} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: fi < sec.fields.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                <span style={{ fontSize: 14, color: COLORS.muted }}>{f.label}</span>
                <span style={{ fontSize: 14, color: COLORS.text, fontWeight: 600 }}>{f.val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const pages = {
    dashboard: <DashboardPage />,
    employees: <EmployeesPage />,
    recruitment: <RecruitmentPage />,
    reviews: <ReviewsPage />,
    settings: <SettingsPage />,
  };

  return (
    <div style={{
      display: "flex", height: "100vh", background: COLORS.bg,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1a2540; border-radius: 4px; }
        input::placeholder { color: #5a6a8a; }
      `}</style>

      <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />

      <main style={{ flex: 1, overflow: "auto", padding: "36px 40px" }}>
        {pages[page]}
      </main>
    </div>
  );
}
