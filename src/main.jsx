import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./styles.css";

const services = [
  {
    id: "harmonizacao",
    name: "Harmonização Facial",
    category: "Facial",
    description: "Plano personalizado para valorizar proporções, contornos e pontos de luz com resultado elegante e natural.",
    duration: 75,
    price: 890,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "bioestimulador",
    name: "Bioestimulador de Colágeno",
    category: "Facial",
    description: "Estímulo progressivo de colágeno para firmeza, sustentação e melhora da qualidade da pele.",
    duration: 60,
    price: 1290,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "laser",
    name: "Laser de Alta Performance",
    category: "Laser",
    description: "Tecnologia para uniformização do tom, textura, poros e revitalização com protocolo individualizado.",
    duration: 50,
    price: 690,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "drenagem",
    name: "Drenagem Premium",
    category: "Corporal",
    description: "Técnica exclusiva para conforto, redução de retenção e sensação imediata de leveza.",
    duration: 60,
    price: 240,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "criolipolise",
    name: "Criolipólise 360º",
    category: "Corporal",
    description: "Protocolo corporal com avaliação de medidas, planejamento de áreas e acompanhamento de evolução.",
    duration: 90,
    price: 790,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "terapia-capilar",
    name: "Terapia Capilar Integrada",
    category: "Capilar",
    description: "Avaliação do couro cabeludo e protocolo combinado para força, densidade e saúde dos fios.",
    duration: 60,
    price: 390,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
  },
];

const professionals = [
  {
    id: "helena",
    name: "Dra. Helena Martins",
    role: "Biomédica Esteta",
    specialties: "Harmonização • Bioestimuladores • Laser",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "camila",
    name: "Dra. Camila Azevedo",
    role: "Fisioterapeuta Dermatofuncional",
    specialties: "Corporal • Pós-procedimento • Drenagem",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "laura",
    name: "Dra. Laura Nunes",
    role: "Especialista em Saúde Capilar",
    specialties: "Terapia capilar • Tricoscopia • Protocolos integrados",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=85",
  },
];

const timeSlots = ["09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:30", "17:30"];
const statuses = ["Pendente", "Confirmado", "Em atendimento", "Concluído", "Cancelado", "Não compareceu"];
const todayISO = () => new Date().toISOString().split("T")[0];
const dateOffset = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
};
const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const formatDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
const digits = (value) => value.replace(/\D/g, "");

const demoAppointments = [
  { code: "LUM-8142", serviceId: "harmonizacao", professionalId: "helena", date: dateOffset(0), time: "10:00", clientName: "Marina Costa", phone: "(11) 98844-1172", email: "marina@example.com", notes: "Primeira avaliação.", status: "Confirmado" },
  { code: "LUM-5027", serviceId: "drenagem", professionalId: "camila", date: dateOffset(0), time: "14:30", clientName: "Patrícia Almeida", phone: "(11) 99751-3408", email: "patricia@example.com", notes: "", status: "Pendente" },
  { code: "LUM-3291", serviceId: "terapia-capilar", professionalId: "laura", date: dateOffset(1), time: "11:00", clientName: "Luciana Prado", phone: "(11) 98302-9087", email: "luciana@example.com", notes: "Relata aumento de queda.", status: "Confirmado" },
];

function useAppointments() {
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem("lumera-appointments-v1");
      return saved ? JSON.parse(saved) : demoAppointments;
    } catch {
      return demoAppointments;
    }
  });

  const persist = (next) => {
    setAppointments(next);
    localStorage.setItem("lumera-appointments-v1", JSON.stringify(next));
  };

  const createAppointment = (data) => {
    const appointment = { ...data, code: `LUM-${String(Date.now()).slice(-6)}`, status: "Pendente" };
    persist([appointment, ...appointments]);
    return appointment;
  };

  const updateStatus = (code, status) => persist(appointments.map((item) => item.code === code ? { ...item, status } : item));
  const reset = () => persist(demoAppointments);
  const cancel = (code, phone) => {
    const found = appointments.some((item) => item.code.toUpperCase() === code.trim().toUpperCase() && digits(item.phone) === digits(phone) && item.status !== "Concluído");
    if (!found) return false;
    persist(appointments.map((item) => item.code.toUpperCase() === code.trim().toUpperCase() && digits(item.phone) === digits(phone) ? { ...item, status: "Cancelado" } : item));
    return true;
  };

  return { appointments, createAppointment, updateStatus, cancel, reset };
}

function Brand() {
  return <Link className="brand" to="/"><span className="brand-mark">L</span><span><strong>Luméra</strong><small>Estética Avançada</small></span></Link>;
}

function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav">
          <a href="/#tratamentos">Tratamentos</a><a href="/#experiencia">Experiência</a><a href="/#equipe">Equipe</a><a href="/#contato">Contato</a>
        </nav>
        <div className="header-actions"><Link className="link-admin" to="/admin">Painel demo</Link><Link className="button button-small button-gold" to="/agendar">Agendar avaliação</Link></div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><Brand /><p>Beleza com intenção, tecnologia e acompanhamento em cada etapa.</p></div>
        <div><strong>Clínica</strong><a href="/#tratamentos">Tratamentos</a><a href="/#equipe">Especialistas</a><Link to="/agendar">Agendamento</Link></div>
        <div><strong>Atendimento</strong><span>Segunda a sexta, 9h às 19h</span><span>Sábado, 9h às 15h</span><span>São Caetano do Sul — SP</span></div>
        </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Luméra Clinic.</span>
        <span>Desenvolvido por Leonardo de Paula — Software Developer</span>
      </div>
    </footer>
  );
}

function CancelCard({ onCancel }) {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const ok = onCancel(code, phone);
    setMessage(ok ? "Agendamento cancelado com sucesso." : "Não localizamos um agendamento ativo com esses dados.");
    if (ok) { setCode(""); setPhone(""); }
  };
  return (
    <form className="cancel-card" onSubmit={submit}>
      <div><span className="eyebrow">Já tem horário?</span><h3>Consulte ou cancele seu agendamento</h3><p>Use o código da confirmação e o telefone informado.</p></div>
      <label>Código<input value={code} onChange={(e) => setCode(e.target.value)} placeholder="LUM-000000" required /></label>
      <label>Telefone<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" required /></label>
      <button className="button button-primary" type="submit">Cancelar agendamento</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

function HomePage({ onCancel }) {
  return (
    <><Header /><main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow light">Estética avançada em São Caetano</span>
            <h1>Cuidado de alta performance com resultados que preservam <em>a sua identidade.</em></h1>
            <p>Protocolos personalizados, tecnologia e acompanhamento próximo para tratamentos faciais, corporais, capilares e a laser.</p>
            <div className="hero-actions"><Link className="button button-gold" to="/agendar">Agendar avaliação</Link><a className="button button-ghost" href="#tratamentos">Conhecer tratamentos</a></div>
            <div className="hero-trust"><div><strong>4,9</strong><span>avaliação média</span></div><div><strong>+8 mil</strong><span>atendimentos</span></div><div><strong>12 anos</strong><span>de experiência</span></div></div>
          </div>
          <div className="hero-visual"><div className="hero-photo" /><div className="floating-card top"><span>✦</span><div><strong>Avaliação personalizada</strong><small>Plano construído para você</small></div></div><div className="floating-card bottom"><span>01</span><div><strong>Tecnologia + precisão</strong><small>Protocolos seguros e responsáveis</small></div></div></div>
        </div>
        <div className="hero-strip"><span>Harmonização natural</span><span>Bioestimuladores</span><span>Laser</span><span>Estética corporal</span><span>Terapia capilar</span></div>
      </section>

      <section className="section intro" id="experiencia"><div className="shell intro-grid"><div><span className="eyebrow">A experiência Luméra</span><h2>Antes de qualquer procedimento, existe uma conversa.</h2></div><div><p className="lead">Nossa abordagem começa pela compreensão da sua rotina, objetivos e histórico. A partir disso, combinamos técnicas, tecnologias e acompanhamento.</p><div className="principles"><article><span>01</span><div><h3>Diagnóstico cuidadoso</h3><p>Avaliação criteriosa e expectativas alinhadas.</p></div></article><article><span>02</span><div><h3>Plano individual</h3><p>Protocolos ajustados à anatomia e ao momento de cada pessoa.</p></div></article><article><span>03</span><div><h3>Acompanhamento</h3><p>Evolução registrada e decisões orientadas por resposta clínica.</p></div></article></div></div></div></section>

      <section className="section section-soft" id="tratamentos"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Tratamentos</span><h2>Protocolos que unem ciência, técnica e refinamento.</h2></div><Link className="text-link" to="/agendar">Ver agenda disponível →</Link></div><div className="services-grid">{services.map((service) => <article className="service-card" key={service.id}><div className="service-image" style={{backgroundImage:`url(${service.image})`}}><span>{service.category}</span></div><div className="service-content"><div><h3>{service.name}</h3><p>{service.description}</p></div><div className="service-meta"><span>{service.duration} min</span><strong>A partir de {currency.format(service.price)}</strong></div></div></article>)}</div></div></section>

      <section className="section technology"><div className="shell technology-grid"><div className="technology-photo" /><div><span className="eyebrow light">Tecnologia com propósito</span><h2>Equipamentos avançados. Decisões humanas.</h2><p>Cada tecnologia é escolhida pelo que pode oferecer ao seu plano. A indicação parte da avaliação e respeita segurança, tempo de recuperação e resultado esperado.</p><div className="technology-list"><div><strong>Diagnóstico integrado</strong><span>Registro de histórico, objetivos e evolução.</span></div><div><strong>Protocolos combinados</strong><span>Técnicas complementares em uma jornada organizada.</span></div><div><strong>Seguimento pós-atendimento</strong><span>Orientações e retornos previstos desde o início.</span></div></div><Link className="button button-gold" to="/agendar">Agendar minha avaliação</Link></div></div></section>

      <section className="section" id="equipe"><div className="shell"><div className="section-heading centered"><div><span className="eyebrow">Especialistas</span><h2>Uma equipe preparada para cuidar de cada detalhe.</h2></div></div><div className="team-grid">{professionals.map((professional) => <article className="team-card" key={professional.id}><div className="team-photo" style={{backgroundImage:`url(${professional.image})`}} /><div className="team-content"><h3>{professional.name}</h3><p>{professional.role}</p><span>{professional.specialties}</span></div></article>)}</div></div></section>

      <section className="section testimonials"><div className="shell"><div className="section-heading"><div><span className="eyebrow light">Experiências</span><h2>Resultados também são sobre como você se sente no processo.</h2></div></div><div className="testimonials-grid"><blockquote><b>“</b><p>A experiência foi impecável desde a avaliação. O plano foi explicado com clareza e o resultado ficou natural.</p><cite>Renata M.</cite></blockquote><blockquote><b>“</b><p>Ambiente acolhedor, equipe cuidadosa e acompanhamento de verdade. Senti segurança em todas as etapas.</p><cite>Juliana R.</cite></blockquote><blockquote><b>“</b><p>O agendamento foi simples e a clínica respeitou meu tempo. Atendimento sofisticado sem perder a proximidade.</p><cite>Fernanda C.</cite></blockquote></div></div></section>

      <section className="section booking-section" id="contato"><div className="shell booking-grid"><div><span className="eyebrow">Sua jornada começa aqui</span><h2>Agende uma avaliação e receba um plano pensado para você.</h2><p className="lead">Escolha tratamento, especialista, data e horário em poucos passos. Neste MVP, os dados ficam no navegador.</p><Link className="button button-primary" to="/agendar">Iniciar agendamento</Link></div><CancelCard onCancel={onCancel} /></div></section>
    </main><Footer /></>
  );
}

function BookingPage({ appointments, onCreate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ serviceId:"", professionalId:"", date:"", time:"", clientName:"", phone:"", email:"", notes:"" });
  const [confirmed, setConfirmed] = useState(null);
  const change = (field, value) => setForm({ ...form, [field]: value });
  const selectedService = services.find((item) => item.id === form.serviceId);
  const selectedProfessional = professionals.find((item) => item.id === form.professionalId);
  const availableTimes = useMemo(() => timeSlots.filter((slot) => !appointments.some((item) => item.date === form.date && item.professionalId === form.professionalId && item.time === slot && !["Cancelado", "Não compareceu"].includes(item.status))), [appointments, form.date, form.professionalId]);
  const submit = (event) => { event.preventDefault(); setConfirmed(onCreate(form)); };
  const canContinue = (step === 1 && form.serviceId) || (step === 2 && form.professionalId) || (step === 3 && form.date && form.time);

  if (confirmed) return <><Header /><main className="booking-page"><section className="shell confirmation"><span className="check">✓</span><span className="eyebrow">Solicitação recebida</span><h1>Seu agendamento foi registrado.</h1><p>Nesta versão demonstrativa, a solicitação já aparece no painel administrativo.</p><div className="code-box"><span>Código do agendamento</span><strong>{confirmed.code}</strong></div><div className="summary-grid"><div><span>Tratamento</span><strong>{selectedService?.name}</strong></div><div><span>Especialista</span><strong>{selectedProfessional?.name}</strong></div><div><span>Data e horário</span><strong>{formatDate(form.date)} às {form.time}</strong></div><div><span>Status</span><strong>Pendente</strong></div></div><div className="actions"><Link className="button button-primary" to="/">Voltar ao site</Link><Link className="button button-outline" to="/admin">Ver no painel demo</Link></div></section></main><Footer /></>;

  return <><Header /><main className="booking-page"><section className="shell"><div className="booking-header"><span className="eyebrow">Agendamento online</span><h1>Reserve sua avaliação em poucos passos.</h1><p>Escolha o tratamento e encontre um horário que se encaixe na sua rotina.</p></div><div className="stepper">{["Tratamento", "Especialista", "Horário", "Seus dados"].map((label, index) => <div className={step >= index+1 ? "step active" : "step"} key={label}><span>{index+1}</span><strong>{label}</strong></div>)}</div><form className="booking-form" onSubmit={submit}>
    <div className="booking-step">
      {step === 1 && <><div className="step-heading"><h2>Qual tratamento você procura?</h2><p>Você poderá ajustar o plano durante a avaliação.</p></div><div className="selection-grid">{services.map((service) => <label className={form.serviceId === service.id ? "selection-card selected" : "selection-card"} key={service.id}><input type="radio" checked={form.serviceId === service.id} onChange={() => change("serviceId", service.id)} /><div className="selection-image" style={{backgroundImage:`url(${service.image})`}} /><div><span>{service.category}</span><h3>{service.name}</h3><p>{service.description}</p><div className="selection-meta"><span>{service.duration} min</span><strong>{currency.format(service.price)}</strong></div></div></label>)}</div></>}
      {step === 2 && <><div className="step-heading"><h2>Escolha a especialista.</h2><p>O sistema poderia filtrar profissionais conforme cada procedimento.</p></div><div className="professional-list">{professionals.map((professional) => <label className={form.professionalId === professional.id ? "professional-option selected" : "professional-option"} key={professional.id}><input type="radio" checked={form.professionalId === professional.id} onChange={() => change("professionalId", professional.id)} /><div className="professional-photo" style={{backgroundImage:`url(${professional.image})`}} /><div><h3>{professional.name}</h3><p>{professional.role}</p><span>{professional.specialties}</span></div><b>✓</b></label>)}</div></>}
      {step === 3 && <><div className="step-heading"><h2>Escolha data e horário.</h2><p>Horários ocupados para a especialista selecionada são removidos automaticamente.</p></div><div className="schedule-grid"><label>Data<input type="date" min={todayISO()} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })} required /></label><div><label>Horários disponíveis</label><div className="time-grid">{availableTimes.map((slot) => <button className={form.time === slot ? "selected" : ""} type="button" key={slot} onClick={() => change("time", slot)}>{slot}</button>)}</div></div></div></>}
      {step === 4 && <><div className="step-heading"><h2>Informe seus dados.</h2><p>A clínica usaria estas informações para confirmação e orientações prévias.</p></div><div className="client-grid"><label>Nome completo<input value={form.clientName} onChange={(e) => change("clientName", e.target.value)} required /></label><label>Telefone<input value={form.phone} onChange={(e) => change("phone", e.target.value)} placeholder="(11) 99999-9999" required /></label><label>E-mail<input type="email" value={form.email} onChange={(e) => change("email", e.target.value)} required /></label><label className="full">Observações<textarea rows="4" value={form.notes} onChange={(e) => change("notes", e.target.value)} /></label></div><div className="summary-grid"><div><span>Tratamento</span><strong>{selectedService?.name}</strong></div><div><span>Especialista</span><strong>{selectedProfessional?.name}</strong></div><div><span>Data</span><strong>{form.date ? formatDate(form.date) : "—"}</strong></div><div><span>Horário</span><strong>{form.time || "—"}</strong></div></div></>}
    </div>
    <div className="booking-nav">{step > 1 ? <button className="button button-outline" type="button" onClick={() => setStep(step-1)}>Voltar</button> : <Link className="button button-outline" to="/">Cancelar</Link>}{step < 4 ? <button className="button button-primary" type="button" disabled={!canContinue} onClick={() => setStep(step+1)}>Continuar</button> : <button className="button button-primary" type="submit" disabled={!form.clientName || !form.phone || !form.email}>Confirmar agendamento</button>}</div>
  </form></section></main><Footer /></>;
}

function AdminPage({ appointments, onStatusChange, onReset }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const filtered = appointments.filter((item) => (filter === "Todos" || item.status === filter) && `${item.clientName} ${item.code} ${item.phone}`.toLowerCase().includes(query.toLowerCase()));
  const active = appointments.filter((item) => !["Cancelado", "Não compareceu"].includes(item.status));
  const today = appointments.filter((item) => item.date === todayISO() && item.status !== "Cancelado");
  const revenue = active.reduce((sum, item) => sum + (services.find((service) => service.id === item.serviceId)?.price || 0), 0);
  return <div className="admin-shell"><aside className="sidebar"><Brand /><nav><a className="active" href="#dashboard">◫ Visão geral</a><a href="#agenda">◷ Agenda</a><a href="#clientes">◎ Clientes</a><a href="#servicos">✦ Procedimentos</a><a href="#equipe">♙ Profissionais</a></nav><div className="sidebar-footer"><span>Ambiente demonstrativo</span><Link to="/">← Voltar ao site</Link></div></aside><main className="admin-main"><header className="admin-top"><div><span className="eyebrow">Painel administrativo</span><h1>Bom dia, equipe Luméra.</h1><p>Acompanhe agenda, clientes e indicadores da operação.</p></div><div className="admin-user"><span>LM</span><div><strong>Larissa Mendes</strong><small>Administradora</small></div></div></header><section className="metrics" id="dashboard"><article><span>◷</span><div><small>Atendimentos hoje</small><strong>{today.length}</strong><p>{Math.min(100, Math.round(today.length/8*100))}% da agenda ocupada</p></div></article><article><span>✓</span><div><small>Confirmados</small><strong>{appointments.filter((item) => item.status === "Confirmado").length}</strong><p>em toda a agenda</p></div></article><article><span>R$</span><div><small>Receita estimada</small><strong>{currency.format(revenue)}</strong><p>agendamentos ativos</p></div></article><article><span>◎</span><div><small>Clientes registrados</small><strong>{new Set(appointments.map((item) => item.phone)).size}</strong><p>base demonstrativa</p></div></article></section><section className="admin-panel" id="agenda"><div className="panel-head"><div><span className="eyebrow">Agenda</span><h2>Atendimentos</h2></div><div className="panel-actions"><button className="button button-outline" onClick={onReset}>Restaurar demo</button><Link className="button button-primary" to="/agendar">Novo agendamento</Link></div></div><div className="filters"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar cliente, telefone ou código..." /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>Todos</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div><div className="table-wrap"><table><thead><tr><th>Cliente</th><th>Procedimento</th><th>Profissional</th><th>Data</th><th>Status</th></tr></thead><tbody>{filtered.map((item) => { const service = services.find((service) => service.id === item.serviceId); const professional = professionals.find((professional) => professional.id === item.professionalId); return <tr key={item.code}><td><strong>{item.clientName}</strong><small>{item.code} · {item.phone}</small></td><td><strong>{service?.name}</strong><small>{service?.duration} min</small></td><td><strong>{professional?.name}</strong><small>{professional?.role}</small></td><td><strong>{formatDate(item.date)}</strong><small>{item.time}</small></td><td><select className="status" value={item.status} onChange={(e) => onStatusChange(item.code, e.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>})}</tbody></table>{filtered.length === 0 && <div className="empty">Nenhum agendamento encontrado.</div>}</div></section></main></div>;
}

function App() {
  const { appointments, createAppointment, updateStatus, cancel, reset } = useAppointments();
  return <Routes><Route path="/" element={<HomePage onCancel={cancel} />} /><Route path="/agendar" element={<BookingPage appointments={appointments} onCreate={createAppointment} />} /><Route path="/admin" element={<AdminPage appointments={appointments} onStatusChange={updateStatus} onReset={reset} />} /></Routes>;
}

createRoot(document.getElementById("root")).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
